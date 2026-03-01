import type { WeatherEntry } from "../types/weather";
import { useMemo, useState } from "react";
import { WeatherHour } from "./WeatherHour";

export function HourlyWeather({ weatherEntries, className }: { weatherEntries: WeatherEntry[], className?: string }) {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const availableDaysOfWeek = useMemo(() => {
        const daysSet = new Set<string>();
        weatherEntries.forEach(entry => {
            const day = new Date(entry.time).toLocaleDateString("en-US", { weekday: "long" });
            if (!daysSet.has(day)) {
                daysSet.add(day);
            }
        });
        return Array.from(daysSet);
    }, [weatherEntries]);

    const entriesByDay = useMemo(() => {
        const map = new Map<string, WeatherEntry[]>();
        weatherEntries.forEach(entry => {
            const day = new Date(entry.time).toLocaleDateString("en-US", { weekday: "long" });
            if (!map.has(day)) {
                map.set(day, []);
            }
            map.get(day)!.push(entry);
        });
        return map;
    }, [weatherEntries]);
    return (
        <div className={`card card-rounded-lg d-flex flex-column min-h-0 ${className}`}>
            <div className='card-body d-flex flex-column min-h-0 py-3 px-0'>
                <div className="d-flex flex-column gap-2 min-h-0">
                    <div className='d-flex justify-content-between align-items-center gap-3 mb-4 px-3'>
                        <h6 className='card-title'>Hourly forecast</h6>
                        <select className='form-select w-auto' value={selectedDay ?? ''} onChange={(e) => setSelectedDay(e.target.value)}>
                            {availableDaysOfWeek.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>  
                    <div className='d-flex hourly-scroll flex-column justify-content-start align-items-stretch gap-3 overflow-auto flex-grow-1 min-h-0 px-3'>
                        {entriesByDay.get(selectedDay ?? availableDaysOfWeek[0])?.map((entry, index) => (
                            <WeatherHour key={index} weatherEntry={entry} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}