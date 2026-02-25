import searchIcon from '../assets/images/icon-search.svg'
import bgTodayBig from '../assets/images/bg-today-large.svg'
import bgTodaySmall from '../assets/images/bg-today-small.svg'
import iconSunny from '../assets/images/icon-sunny.webp'
import { useState, useEffect, use } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { searchLocations, type GeocodingResult } from '../api/geocoding'
import { getForecast, type ForecastResponse } from '../api/forecast'

function HomePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<GeocodingResult | null>(null);
    const [forecast, setForecast] = useState<ForecastResponse | null>(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

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
                <h1 className="pt-5">How's the sky looking today?</h1>
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
                <div className='d-flex justify-content-center w-100 align-items-center flex-wrap flex-md-nowrap gap-4 mt-5'>
                    <div className='d-flex flex-column justify-content-center align-items-stretch gap-4 flex-fill'>
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
                                <div className='d-flex justify-content-center align-items-center gap-4'>
                                    <img src={iconSunny} alt='sunny icon' className='ms-auto' style={{ height: "8em" }} />
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
                                        <p className='card-text'>{forecast?.current?.apparent_temperature ?? '--'} {forecast?.current_units?.apparent_temperature}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Humidity</h6>
                                        <p className='card-text'>{forecast?.current?.relative_humidity_2m ?? '--'} {forecast?.current_units?.relative_humidity_2m}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Wind</h6>
                                        <p className='card-text'>{forecast?.current?.wind_speed_10m ?? '--'} {forecast?.current_units?.wind_speed_10m}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Precipitation</h6>
                                        <p className='card-text'>{forecast?.current?.precipitation ?? '--'} {forecast?.current_units?.precipitation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 className='mt-5'>Daily forecast</h4>
                        {/* BOTTOM 7 DAILY FORECAST CARDS*/}
                        <div className='row g-3'>
                            {forecast?.daily?.time.map((date, index) => (
                                <div className='col-4 col-md' key={index}>
                                    <div className='card'>
                                        <div className='card-body p-2'>
                                            <div className='d-flex flex-column justify-content-between align-items-center gap-3' style={{ minHeight: "10em" }}>
                                                <h6 className='card-title mt-2'>{new Date(date).toLocaleDateString("en-US", { weekday: "short" })}</h6>
                                                <img src={iconSunny} alt='sunny icon' style={{ height: "3em" }} />
                                                <div className='d-flex justify-content-between mt-auto w-100 gap-2'>
                                                <p className='card-text'>{forecast?.daily?.temperature_2m_min?.[index] ?? '--'}°</p>
                                                <p className='card-text'>{forecast?.daily?.temperature_2m_max?.[index] ?? '--'}°</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* LONG RIGHT CARD*/}
                    <div className='card card-rounded-lg align-self-stretch flex-fill flex-md-grow-0'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between align-items-center gap-3 mb-4'>
                                <h6 className='card-title'>Hourly forecast</h6>
                                <select className='form-select w-auto'>
                                    <option>Today</option>
                                    <option>Tomorrow</option>
                                    <option>Next 7 Days</option>
                                </select>
                            </div>
                            <p className='card-text'>United States</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
