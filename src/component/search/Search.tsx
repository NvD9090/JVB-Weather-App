import './Search.scss'
import { useDispatch } from 'react-redux'
import { getWeather } from '../../store/slices/weatherSlices'
import React, { useState, useEffect } from 'react'
import { AppDispatch } from '../../store'

const Search: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();


  const [citySearch, setCitySearch] = useState('Hanoi')

  useEffect(() => {
    dispatch(getWeather('Hanoi'));
  }, [dispatch]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      dispatch(getWeather(citySearch))
    }
  }

  return (
    <div className="search">
      <form className="form-search">
        <label htmlFor="city">Your city</label>
        <input
          id="city"
          type="text"
          placeholder="Enter your city..."
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
          onKeyDown={handleSearch}
        />
      </form>
    </div>
  )
}

export default Search
