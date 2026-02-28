import type { DailyWeatherEntry } from "../types/weather";
import { WeatherIcon } from "./WeatherIcon";

export function DailyWeather({ weatherEntry: dailyWeatherEntry, className }: { weatherEntry: DailyWeatherEntry, className?: string }) {
    return (
        <div className={className}>
            <div className='card'>
                <div className='card-body p-2'>
                    <div className='d-flex flex-column justify-content-between align-items-center gap-3' style={{ minHeight: "10em" }}>
                        <h6 className='card-title mt-2'>{new Date(dailyWeatherEntry.time).toLocaleDateString("en-US", { weekday: "short" })}</h6>
                        <WeatherIcon weatherCode={dailyWeatherEntry.weather_code ?? 100} style={{ height: "3em" }} />
                        <div className='d-flex justify-content-between mt-auto w-100 gap-2'>
                            <p className='card-text'>{dailyWeatherEntry.temperature_2m_min ?? '--'}°</p>
                            <p className='card-text'>{dailyWeatherEntry.temperature_2m_max ?? '--'}°</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}