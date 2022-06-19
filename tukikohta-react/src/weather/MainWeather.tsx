import { getIcon } from "./common/getIcon";
import { CurrentWeather } from "./Weather";
import { UVIndex } from "./common/UltravioletIndex";

export interface MainWeatherProps {
  forecast: CurrentWeather | undefined;
}

export const MainWeather = (props: MainWeatherProps) => {
  function weatherElement() {
    if (props.forecast) {
      return (
        <div className="flex flex-col">
          {getIcon(props.forecast.iconId)}
          Current temp {props.forecast.currentTemp}
          <br />
          {UVIndex(props.forecast.currentUV)}
        </div>
      );
    } else {
      return <>Something went wrong</>;
    }
  }
  return <div className="w-96 h-96 bg-blue-600">{weatherElement()}</div>;
};
