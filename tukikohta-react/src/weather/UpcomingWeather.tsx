import { getIcon } from "./common/getIcon";
import { SingleWeatherForecast } from "./Weather";

interface UpcomingWeatherpropss {
  forecast: SingleWeatherForecast;
}
export const UpcomingWeather = (props: UpcomingWeatherpropss) => {
  function getDayString() {
    if (props.forecast.timestamp) {
      const date = new Date(props.forecast.timestamp * 1000);
      const weekday = date.toLocaleString("en-GB", { weekday: "short" });
      return weekday;
    }
  }
  function getTemp() {
    if (props.forecast) {
      return (
        <div className="pl-2 flex w-full flex-col  col-span-12">
          {generateTempRow(props.forecast.mornTemp.toString(), "AP")}

          {generateTempRow(props.forecast.dayTemp.toString(), "P")}

          {generateTempRow(props.forecast.eveTemp.toString(), "IP")}
        </div>
      );
    }
  }
  function generateTempRow(temp: string, label: string) {
    return (
      <div className="grid grid-cols-12 space-x-3">
        <label className="pl-0 col-span-1">{label} </label>
        <span className="col-span-8">{temp} C</span>
      </div>
    );
  }
  function getAdditionalInfo() {
    if (props.forecast) {
      return (
        <div>
          <span>Rain {props.forecast.rainPrcnt}%</span>

          <span>Rain {props.forecast.rainPrcnt}mm</span>
        </div>
      );
    }
  }
  return (
    <div className="bg-red-500 grid grid-cols-12 pb-4">
      <div className="col-span-1 col-start-6	content-center justify-center items-center">
        {getDayString()}
      </div>
      <div className="col-span-12 flex items-center justify-center">
        {getIcon(props.forecast.iconId ?? "error")}
      </div>
      <div className="col-span-12 grid grid-cols-12">
        <div className="col-span-6">{getTemp()}</div>
        <div className="col-span-6">{getAdditionalInfo()}</div>
      </div>
    </div>
  );
};
