import searchIcon from '../assets/images/icon-search.svg'


function HomePage() {
    return (
        <div>
            <h1 className="pt-5">How's the sky looking today?</h1>
            <div className="d-flex gap-3 justify-content-center align-items-center mt-5">
                <div className='input-group'>
                    <span className='input-group-text'>
                        <img src={searchIcon} alt='search icon' />
                    </span>
                    <input type="text" className="form-control w-auto" placeholder="Search for location" />

                </div>
                <button className="btn btn-primary">Search</button>
            </div>
        </div>
    )
}

export default HomePage
