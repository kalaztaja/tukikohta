import { useEffect, useState } from "react";
import { getWeather } from "../api/weatherApi";
import { MainWeather } from "./MainWeather";
import { UpcomingWeather } from "./UpcomingWeather";

export interface SingleWeatherForecast {
  // Mille päivälle sääennuste kohdistuu
  timestamp: number;

  // Lämpötilaennusteet ajanjaksolle
  mornTemp: number;
  dayTemp: number;
  eveTemp: number;
  nightTemp: number;

  // Päivän maksimi ja minimi
  minTemp: number;
  maxTemp: number;

  // Miltä ulkona tuntuu
  feelsMornTemp: number;
  feelsDayTemp: number;
  feelsEveTemp: number;
  feelsNightTemp: number;

  // Kosteus ja pilviprosentti
  humPrcnt: number;
  cloudPrcnt: number;

  // Maksimi UV päivälle
  maxUV: number;

  // Sateen todennäköisyys
  rainPrcnt: number;

  // Iconin id
  iconId: string;
}

export interface CurrentWeather extends SingleWeatherForecast {
  // Mille päivälle sääennuste kohdistuu
  currentTemp: number;
  currentCloud: number;
  currentUV: number;
  currentRain: string;

  currentWind: number;
}

export const Weather = () => {
  const [weatherForecasts, setWeatherForecasts] =
    useState<Array<SingleWeatherForecast>>();
  const [todaysWeather, setTodaysWeather] = useState<CurrentWeather>();
  useEffect(() => {
    async function updateWeather() {
      const weatherForecast = await getWeather();
      const weatherData = weatherForecast?.data;
      const dailyForecasts = weatherData.daily;
      const forecastArray: Array<SingleWeatherForecast> = [];
      const currentDay = dailyForecasts[0];
      const currentForecast = weatherData.current;
      const currentWeather: CurrentWeather = {
        timestamp: currentDay.dt,
        mornTemp: currentDay.temp.morn,
        dayTemp: currentDay.temp.day,
        eveTemp: currentDay.temp.eve,
        nightTemp: currentDay.temp.night,
        minTemp: currentDay.temp.min,
        maxTemp: currentDay.temp.max,
        feelsMornTemp: currentDay.feels_like.morn,
        feelsDayTemp: currentDay.feels_like.day,
        feelsEveTemp: currentDay.feels_like.eve,
        feelsNightTemp: currentDay.feels_like.night,
        humPrcnt: currentDay.humidity,
        cloudPrcnt: currentDay.clouds,
        maxUV: currentDay.uvi,
        rainPrcnt: currentDay.rain,
        iconId: currentDay.weather[0].icon,
        currentTemp: currentForecast.temp,
        currentCloud: currentForecast.clouds,
        currentUV: currentForecast.uvi,
        currentWind: currentForecast.wind_speed,
        currentRain: currentForecast.rain,
      };
      setTodaysWeather(currentWeather);
      if (weatherData && dailyForecasts) {
        for (let i = 1; i < 4; i++) {
          const singleDayForecast = dailyForecasts[i];
          const oneWeatherPoint: SingleWeatherForecast = {
            timestamp: singleDayForecast.dt,
            mornTemp: singleDayForecast.temp.morn,
            dayTemp: singleDayForecast.temp.day,
            eveTemp: singleDayForecast.temp.eve,
            nightTemp: singleDayForecast.temp.night,
            minTemp: singleDayForecast.temp.min,
            maxTemp: singleDayForecast.temp.max,
            feelsMornTemp: singleDayForecast.feels_like.morn,
            feelsDayTemp: singleDayForecast.feels_like.day,
            feelsEveTemp: singleDayForecast.feels_like.eve,
            feelsNightTemp: singleDayForecast.feels_like.night,
            humPrcnt: singleDayForecast.humidity,
            cloudPrcnt: singleDayForecast.clouds,
            maxUV: singleDayForecast.uvi,
            rainPrcnt: singleDayForecast.rain,
            iconId: singleDayForecast.weather[0].icon,
          };
          forecastArray.push(oneWeatherPoint);
        }
      }
      setWeatherForecasts(forecastArray);
    }
    updateWeather();
  }, []);
  function weatherForecastElements() {
    if (weatherForecasts && weatherForecasts.length > 0) {
      return (
        <div className="col-span-12 flex">
          {weatherForecasts.map((forecast) => (
            <UpcomingWeather forecast={forecast} />
          ))}
        </div>
      );
    }
    return <></>;
  }
  return (
    <div className="grid grid-cols-12 w-full h-full">
      <div className="col-span-4">
        <MainWeather forecast={todaysWeather} />
      </div>
      <div className="col-span-8 grid grid-cols-12">
        {weatherForecastElements()}
        <div className="col-span-12 bg-black">jes</div>
      </div>
    </div>
  );
};
