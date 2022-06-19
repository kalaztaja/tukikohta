import { getWeather } from "./api/weatherApi";
import { Weather } from "./weather/Weather";

function App() {
  getWeather();
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <Weather />
      </div>
    </div>
  );
}

export default App;
