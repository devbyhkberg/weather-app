export type WeatherEntry = {
    time: string;
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
    weather_code?: number;
    precipitation?: number;
}
export type DailyWeatherEntry = {
    time: string;
    temperature_2m_max?: number;
    temperature_2m_min?: number;
    precipitation_sum?: number;
    weather_code?: number;
}