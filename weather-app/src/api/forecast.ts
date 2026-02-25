import { getJson } from "./http";

export type ForecastResponse = {
    latitude: number;
    longitude: number;
    timezone: string;
    current?: {
        time: string;
        temperature_2m?: number;
        apparent_temperature?: number;
        relative_humidity_2m?: number;
        wind_speed_10m?: number;
        weather_code?: number;
        precipitation?: number;
    };
    current_units?: {
        time: string;
        temperature_2m?: string;
        apparent_temperature?: string;
        relative_humidity_2m?: string;
        wind_speed_10m?: string;
        weather_code?: string;
        precipitation?: string;
    }
    daily?: {
        time: string[];
        temperature_2m_max?: number[];
        temperature_2m_min?: number[];
        precipitation_sum?: number[];
        weather_code?: number[];
    };
    daily_units?: {
        time: string;
        temperature_2m_max?: string;
        temperature_2m_min?: string;
        precipitation_sum?: string;
        weather_code?: string;
    };
    hourly?: {
        time: string[];
        temperature_2m?: number[];
        apparent_temperature?: number[];
        relative_humidity_2m?: number[];
        wind_speed_10m?: number[];
        weather_code?: number[];
        precipitation?: number[];
    };
    hourly_units?: {
        time: string;
        temperature_2m?: string;
        apparent_temperature?: string;
        relative_humidity_2m?: string;
        wind_speed_10m?: string;
        weather_code?: string;
        precipitation?: string;
    };
};

export function getForecast(lat: number, lon: number) {
    const params = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lon),

        // Open-Meteo supports a "current" list of variables. :contentReference[oaicite:4]{index=4}
        current: [
            "temperature_2m",
            "apparent_temperature",
            "relative_humidity_2m",
            "wind_speed_10m",
            "weather_code",
            "precipitation",
        ].join(","),

        // Daily needs timezone (per docs) so use auto for convenience. :contentReference[oaicite:5]{index=5}
        daily: ["temperature_2m_max", "temperature_2m_min", "precipitation_sum", "weather_code"].join(","),
        hourly: ["temperature_2m", "apparent_temperature", "relative_humidity_2m", "wind_speed_10m", "weather_code", "precipitation"].join(","),
        timezone: "auto",
    });

    return getJson<ForecastResponse>(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
}