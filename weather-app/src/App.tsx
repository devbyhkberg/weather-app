import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import logo from './assets/images/logo.svg'

function App() {

  return (
    <>
      <div className='weather-app container-fluid w-100 h-100'>
        <div className='d-flex w-100 sticky-top justify-content-between align-items-center p-3'>
          <img src={logo} alt='logo' className='logo' />
          <select className='form-select w-auto'>
            <option value='celsius'>°C</option>
            <option value='fahrenheit'>°F</option>
          </select>
        </div>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
