import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import '../assets/weather.scss';
import NextDays from './NextDays';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://weatherdbi.herokuapp.com/data/weather/Brisbane`
    );
    setWeatherData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(weatherData);
  const currentCon = weatherData?.currentConditions;

  return (
    <div className="weather">
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <h1 className="weather-title">{weatherData.region}</h1>
          <div className="weather-details">
            <img src={currentCon.iconURL} alt="weatherIcon" />
            <div className="weather-conditions">
              <div className="weather-condition degrees-container">
                {currentCon.comment} {currentCon.temp.c}
                <div className="weather-condition-degrees">&deg;C</div>
              </div>
              <div className="weather-condition_minor-details">
                <div>Wind: {currentCon.wind.km}km/h </div>
                <div>Humidity: {currentCon.humidity}</div>
                <div>Precipitation: {currentCon.precip}</div>
              </div>
            </div>
          </div>
          <NextDays weatherData={weatherData} />
        </div>
      )}
    </div>
  );
};

export default Weather;
