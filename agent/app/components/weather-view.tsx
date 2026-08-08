// Allow use of Open Weather Map icons
/* eslint-disable @next/next/no-img-element */
import type { WeatherUIToolInvocation } from '../api/weatherAgent/weather-tool';

export default function WeatherView({
  invocation,
}: {
  invocation: WeatherUIToolInvocation;
}) {
  
  switch (invocation.state) {
    // example of pre-rendering streaming tool calls:
    case 'input-streaming':
      return <pre>{JSON.stringify(invocation.input, null, 2)}</pre>;
    case 'input-available':
      return (
        <div key={invocation.input.city} className="text-blue-500">
          Getting weather information for {invocation.input.city}...
        </div>
      );
    case 'output-available':
      return (
        <div key={invocation.input.city} className="my-4 p-4 border border-gray-300 rounded">
          {invocation.output.state === 'loading'
            ? 'Fetching weather information...'
            : <div className="text-yellow-500 bg-gradient-to-r from-blue-500 to-black p-4 rounded-md">
              <img src={`https://openweathermap.org/img/wn/${invocation.output.icon}.png`}
                   alt="weather icon" className="bg-gray-300 border inline-block mr-2 float-left"/>
              <span>Weather in {invocation.input.city}</span><br />
              <span className="text-2xl align-bottom">{invocation.output.temperatureFarenheit}</span>
              <span className="text-xl align-bottom"><sup>°F</sup></span>
              <span className="text-xl align-bottom">&nbsp;{invocation.output.weather}</span>
            </div>
          }
        </div>
      );
    case 'output-error':
      return <div className="text-red-500">Error: {invocation.errorText}</div>;
  }
}