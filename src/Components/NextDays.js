import React from 'react';
import '../assets/nextdays.scss';

const NextDays = ({ weatherData }) => {
  const nextDaysData = weatherData?.next_days;

  return (
    <div className="next-days_container">
      {nextDaysData.map((item, key) => {
        return (
          <div key={key} className="single-day">
            <h2 className="next-day_title">{item.day}</h2>
            <img src={item.iconURL} alt="next-days_weather" />
            <div className="degrees-container">
              {item.max_temp.c}
              <div className="weather-condition-degrees weather-condition_max-temp">
                &deg;C
              </div>{' '}
              <div className="weather-condition_min-temp">
                {item.min_temp.c}
              </div>
              <div className="weather-condition-degrees weather-condition_min-temp">
                &deg;C
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NextDays;
