import searchIcon from '../assets/images/icon-search.svg'
import bgTodayBig from '../assets/images/bg-today-large.svg'
import bgTodaySmall from '../assets/images/bg-today-small.svg'
import { WeatherIcon } from '../components/WeatherIcon'
import { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { searchLocations, type GeocodingResult } from '../api/geocoding'
import { getForecast, type ForecastResponse } from '../api/forecast'
import type { WeatherEntry, DailyWeatherEntry } from '../types/weather'
import { DailyWeather } from '../components/DailyWeather'
import { HourlyWeather } from '../components/HourlyWeather'

function HomePage() {
    const leftRef = useRef<HTMLDivElement>(null);
    const [leftHeight, setLeftHeight] = useState<number>(0);
    const [isDesktop, setIsDesktop] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<GeocodingResult | null>(null);
    const [forecast, setForecast] = useState<ForecastResponse | null>(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useLayoutEffect(() => {
        const el = leftRef.current;
        if (!el) return;

        const ro = new ResizeObserver(([entry]) => {
            setLeftHeight(entry.contentRect.height);
        });

        ro.observe(el);
        return () => ro.disconnect();
    }, []);


    const dailyForecast = useMemo<DailyWeatherEntry[]>(() => {
        if (!forecast) {
            return Array.from({ length: 7 }, (_, i) => ({
                time: '',
                temperature_2m_max: undefined,
                temperature_2m_min: undefined,
                precipitation_sum: undefined,
                weather_code: undefined
            }));
        }
        return forecast.daily?.time.map((time, index) => ({
            time: time,
            temperature_2m_max: forecast.daily?.temperature_2m_max?.[index],
            temperature_2m_min: forecast.daily?.temperature_2m_min?.[index],
            precipitation_sum: forecast.daily?.precipitation_sum?.[index],
            weather_code: forecast.daily?.weather_code?.[index]
        })) ?? [];
    }, [forecast]);

    const hourlyForecast = useMemo<WeatherEntry[]>(() => {
        if (!forecast) return [];
        return forecast.hourly?.time.map((time, index) => ({
            time: time,
            temperature_2m: forecast.hourly?.temperature_2m?.[index],
            precipitation: forecast.hourly?.precipitation?.[index],
            weather_code: forecast.hourly?.weather_code?.[index],
            apparent_temperature: forecast.hourly?.apparent_temperature?.[index],
            relative_humidity_2m: forecast.hourly?.relative_humidity_2m?.[index],
            wind_speed_10m: forecast.hourly?.wind_speed_10m?.[index],
        })) ?? [];
    }, [forecast]);

    function selectLocation(location: GeocodingResult) {
        setSelectedLocation(location);
        setSearchTerm('');

    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            searchLocations(debouncedSearchTerm).then((response) => {
                setSearchResults(response.results ?? []);
            });
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchTerm])

    useEffect(() => {
        if (selectedLocation) {
            getForecast(selectedLocation.latitude, selectedLocation.longitude).then((response) => {
                setForecast(response);
            });
        }
    }, [selectedLocation])
    return (
        <div className='container'>
            <div className="d-flex flex-column justify-content-start align-items-center">
                <h1 className="pt-5 ">How's the sky looking today?</h1>
                {/* SEARCH BAR */}
                <div className="d-flex flex-md-row flex-column gap-3 justify-content-start align-items-stretch align-items-md-center mt-5">
                    <div className='drowpdown'>
                        <div className='input-group w-auto'>
                            <span className='input-group-text'>
                                <img src={searchIcon} alt='search icon' />
                            </span>
                            <input
                                type="text"
                                className="form-control w-auto"
                                placeholder="Search for a place..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <ul className='dropdown-menu show'>
                            {searchResults.map((result) => (
                                <li key={result.id}>
                                    <button
                                        className='dropdown-item'
                                        onClick={() => selectLocation(result)}
                                    >
                                        {result.name}, {result.country}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="btn btn-primary">Search</button>
                </div>
                <div className='d-flex justify-content-center w-100 align-items-stretch flex-wrap flex-md-nowrap gap-4 mt-5'>
                    <div ref={leftRef} className='d-flex flex-column justify-content-start align-items-stretch gap-4 flex-fill'>
                        {/* MAIN CARD */}
                        <div className='card image-card card-rounded-md align-self-stretch'>
                            <picture>
                                <source srcSet={bgTodayBig} media="(min-width: 768px)" />
                                <img src={bgTodaySmall} className="card-img" alt="" />
                            </picture>
                            <div className='card-img-overlay flex-column flex-md-row d-flex justify-content-start align-items-center gap-4'>
                                <div className=' d-flex flex-column justify-content-center align-items-center align-items-md-start p-md-5 p-3 gap-2'>
                                    <h5 className='card-title'>{selectedLocation?.name}, {selectedLocation?.country}</h5>
                                    <p className='card-text'>{new Date().toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}</p>
                                </div>
                                <div className='d-flex justify-content-center align-items-center gap-4 ms-md-auto'>
                                    <WeatherIcon weatherCode={forecast?.current?.weather_code ?? 100} style={{ height: "8em" }} />
                                    <h1 className='display-1'>{forecast?.current?.temperature_2m ?? '--'}°</h1>
                                </div>

                            </div>
                        </div>
                        {/* WEATHER DESCRIPTION*/}
                        <div className='row g-4'>
                            <div className='col-6 col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Feels like</h6>
                                        <p className='card-text mt-3 fs-1 fw-light'>{forecast?.current?.apparent_temperature ?? '--'} {forecast?.current_units?.apparent_temperature}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Humidity</h6>
                                        <p className='card-text mt-3 fs-1 fw-light'>{forecast?.current?.relative_humidity_2m ?? '--'} {forecast?.current_units?.relative_humidity_2m}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Wind</h6>
                                        <p className='card-text mt-3 fs-1 fw-light'>{forecast?.current?.wind_speed_10m ?? '--'} {forecast?.current_units?.wind_speed_10m}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Precipitation</h6>
                                        <p className='card-text mt-3 fs-1 fw-light'>{forecast?.current?.precipitation ?? '--'} {forecast?.current_units?.precipitation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 className='mt-5'>Daily forecast</h4>
                        {/* BOTTOM 7 DAILY FORECAST CARDS*/}
                        <div className='row g-3'>
                            {dailyForecast.map((d, index) => (
                                <DailyWeather key={index} weatherEntry={d} className='col-4 col-md' />
                            ))}
                        </div>
                    </div>
                    {/* LONG RIGHT CARD*/}
                    <div style={{ height: isDesktop ? leftHeight : undefined, minHeight: 0 }} className="flex-md-grow-0 flex-fill align-self-stretch">
                        <HourlyWeather weatherEntries={hourlyForecast} className='h-100' />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
