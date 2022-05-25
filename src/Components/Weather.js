import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import '../assets/weather.scss';
import NextDays from './NextDays';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState('Brisbane');
  const [errorLocation, setErrorLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [loading, setLoading] = useState(true);
  const Error = ({ errorMsg }) => (
    <div style={{ color: 'red' }}>{errorMsg}</div>
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://weatherdbi.herokuapp.com/data/weather/${location}`
      );

      if (res.data.status === 'fail') {
        setErrorMsg(res.data.message);
        setErrorLocation(location);
      } else {
        setWeatherData(res.data);
        setErrorMsg('');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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
        <>
          {errorMsg ? (
            <>
              <Error errorMsg={errorMsg} />
              <h4>
                We were unable to find {errorLocation}, please try another
                location
              </h4>
              <div className="location-search-bar">
                <form>
                  <input
                    placeholder="View weather in..."
                    type="text"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    className="location-search-bar-input"
                  />
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="current-weather">
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
                <div className="location-search-bar">
                  <form>
                    <input
                      placeholder="View weather in..."
                      type="text"
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}
                      className="location-search-bar-input"
                    />
                    <input
                      type="submit"
                      onSubmit={fetchData}
                      onClick={fetchData}
                      style={{ display: 'none' }}
                    />
                  </form>
                </div>
              </div>
              <NextDays weatherData={weatherData} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;
