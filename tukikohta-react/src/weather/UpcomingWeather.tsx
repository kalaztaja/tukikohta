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
        <div className="grid grid-cols-4 w-full col-span-12">
          {generateTempRow(props.forecast.mornTemp.toString(), "AP")}

          {generateTempRow(props.forecast.dayTemp.toString(), "P")}

          {generateTempRow(props.forecast.eveTemp.toString(), "IP")}

          {generateTempRow(props.forecast.nightTemp.toString(), "YÖ")}
        </div>
      );
    }
  }
  function generateTempRow(temp: string, label: string) {
    return (
      <div className=" col-span-2 grid grid-cols-12 space-x-4">
        <label className="col-span-2 pl-2 ">{label} </label>
        <div className="col-span-10 ">{temp} C</div>
      </div>
    );
  }
  return (
    <div className="bg-red-500 grid grid-cols-12 pb-4">
      <div className="col-span-1 col-start-6	content-center justify-center items-center">
        {getDayString()}
      </div>
      <div className="col-span-12">
        {getIcon(props.forecast.iconId ?? "error")}
      </div>
      {getTemp()}
    </div>
  );
};
