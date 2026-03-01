import type { WeatherEntry } from "../types/weather";
import { WeatherIcon } from "./WeatherIcon";

export function WeatherHour({ weatherEntry, className }: { weatherEntry: WeatherEntry, className?: string }) {

    return (
        <div className={className}>
            <div className='card daily-card'>
                <div className='card-body p-2'>
                    <div className='d-flex justify-content-start align-items-center gap-3'>
                        <WeatherIcon weatherCode={weatherEntry.weather_code ?? 100} style={{ height: "3em" }} />
                        <p className='card-title mt-2'>{new Date(weatherEntry.time).toLocaleTimeString("en-US", { hour: "numeric", hour12: true })}</p>
                        <p className='card-text ms-auto'>{weatherEntry.temperature_2m ?? '--'}°</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

