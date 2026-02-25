import searchIcon from '../assets/images/icon-search.svg'
import bgTodayBig from '../assets/images/bg-today-large.svg'
import bgTodaySmall from '../assets/images/bg-today-small.svg'
import iconSunny from '../assets/images/icon-sunny.webp'


function HomePage() {
    return (
        <div className='container'>
            <div className="d-flex flex-column justify-content-start align-items-center">
                <h1 className="pt-5">How's the sky looking today?</h1>
                {/* SEARCH BAR */}
                <div className="d-flex flex-md-row flex-column gap-3 justify-content-start align-items-stretch align-items-md-center mt-5">
                    <div className='input-group w-auto'>
                        <span className='input-group-text'>
                            <img src={searchIcon} alt='search icon' />
                        </span>
                        <input type="text" className="form-control w-auto" placeholder="Search for location" />

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
                            <div className='card-img-overlay d-flex justify-content-start align-items-center gap-4'>
                                <div className=' d-flex flex-column justify-content-center align-items-start p-5 gap-2'>
                                    <h5 className='card-title'>Berlin, Germany</h5>
                                    <p className='card-text'>Tuesday, Aug 5, 2025</p>
                                </div>
                                <img src={iconSunny} alt='sunny icon' className='ms-auto' style={{ height: "8em" }} />
                                <h1 className='display-1'>64°</h1>
                            </div>
                        </div>
                        {/* WEATHER DESCRIPTION*/}
                        <div className='row g-4'>
                            <div className='col-6 col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Feels like</h6>
                                        <p className='card-text'>64°</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Humidity</h6>
                                        <p className='card-text'>46%</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Wind</h6>
                                        <p className='card-text'>9 mph</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 col-md-3'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Precipitation</h6>
                                        <p className='card-text'>0 in</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 className='mt-5'>Daily forecast</h4>
                        {/* BOTTOM 7 DAILY FORECAST CARDS*/}
                        <div className='row g-3'>
                            <div className='col-4 col-md'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Mon</h6>
                                        <p className='card-text'>14</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4 col-md'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Tue</h6>
                                        <p className='card-text'>15</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4 col-md'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Wed</h6>
                                        <p className='card-text'>16</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4 col-md'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Thu</h6>
                                        <p className='card-text'>17</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4 col-md'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Fri</h6>
                                        <p className='card-text'>18</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4 col-md'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Sat</h6>
                                        <p className='card-text'>19</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4 col-md'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='card-title'>Sun</h6>
                                        <p className='card-text'>20</p>
                                    </div>
                                </div>
                            </div>
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
