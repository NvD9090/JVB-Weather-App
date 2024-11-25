import './Search.scss';
import { useDispatch } from 'react-redux';
import { getWeather } from '../../store/slices/weatherSlices';
import React, { useState, useEffect } from 'react';
import { AppDispatch } from '../../store';

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [citySearch, setCitySearch] = useState('Hanoi');
  const [lastSearchedCity, setLastSearchedCity] = useState<string | null>(null); // Lưu giá trị tìm kiếm gần nhất
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  useEffect(() => {
    dispatch(getWeather('Hanoi'));
    setLastSearchedCity('Hanoi');
  }, [dispatch]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (!citySearch.trim()) {
        // Display error message if the input is empty
        setErrorMessage('Please enter a city name.');
        return;
      }

      if (citySearch !== lastSearchedCity) {
        dispatch(getWeather(citySearch));
        setLastSearchedCity(citySearch);
        setErrorMessage(null); // Clear error message on successful search
      }
    }
  };

  return (
    <div className="search">
      <form className="form-search">
        <label htmlFor="city">Your city</label>
        <label htmlFor="">
          <input
            id="city"
            type="text"
            placeholder="Enter your city..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            onKeyDown={handleSearch}
            style={{ position: 'relative' }}
          />
          {errorMessage && <p style={{ position: 'absolute', color: 'red' }} className="error-message">{errorMessage}</p>}

        </label>

      </form>
    </div>
  );
};

export default Search;
