import axios from "axios";

export function getWeather() {
  try {
    const response = axios.get(
      "https://api.openweathermap.org/data/2.5/onecall?lat=61.4978&lon=23.7610&exclude=minutely,hourly,alerts&appid=73d323b7bc45bc500a951ae1d8011c0c&units=metric"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
