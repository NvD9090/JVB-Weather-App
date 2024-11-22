// src/config/config.ts
const WEATHER_API_KEY = 'f5ac4be4a19c47d8a3e42522222112';
const WEATHER_API_URL = 'http://api.weatherapi.com/v1/forecast.json';

export const api = {
  apiKey: WEATHER_API_KEY,
  apiUrl: WEATHER_API_URL,
  defaultParams: {
    days: 3,
    aqi: 'no',
    alerts: 'yes',
  }
};
