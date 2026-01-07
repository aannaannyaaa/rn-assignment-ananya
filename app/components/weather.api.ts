import { WeatherData } from './weather.types';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  try {
    const geoResponse = await fetch(
      `${GEOCODING_API}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    const geoData = await geoResponse.json();
    
    if (!geoData.results?.length) {
      throw new Error('City not found');
    }

    const { latitude, longitude, name } = geoData.results[0];

    const weatherResponse = await fetch(
      `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto&forecast_days=1`
    );
    const weatherData = await weatherResponse.json();

    const current = weatherData.current!;
    return {
      city: name,
      temperature: Math.round(current.temperature_2m),
      description: getWeatherDescription(current.weather_code),
    };
  } catch (error) {
    throw new Error((error as Error).message || 'Failed to fetch weather');
  }
};

const getWeatherDescription = (code: number): string => {
  const descriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with heavy hail',
  };
  return descriptions[code] || 'Unknown';
};