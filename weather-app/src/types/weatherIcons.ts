import iconSunny from '../assets/images/icon-sunny.webp'
import iconDrizzle from '../assets/images/icon-drizzle.webp'
import iconRain from '../assets/images/icon-rain.webp'
import iconSnow from '../assets/images/icon-snow.webp'
import iconStorm from '../assets/images/icon-storm.webp'
import iconFog from '../assets/images/icon-fog.webp'
import iconPartlyCloudy from '../assets/images/icon-partly-cloudy.webp'
import iconOvercast from '../assets/images/icon-overcast.webp'

export type WeatherCode = 0 | 1 | 2 | 3 | 45 | 48 | 51 | 53 | 55 | 56 | 57 | 61 | 63 | 65 | 66 | 67 | 71 | 73 | 75 | 77 | 80 | 81 | 82 | 85 | 86 | 95 | 96 | 99

type IconDefinition = { src: string, alt: string }

export const WEATHER_ICON_BY_CODE: Record<WeatherCode, IconDefinition> = {
    0: { src: iconSunny, alt: 'Sunny' },
    1: { src: iconPartlyCloudy, alt: 'Partly Cloudy' },
    2: { src: iconOvercast, alt: 'Overcast' },
    3: { src: iconOvercast, alt: 'Overcast' },
    45: { src: iconFog, alt: 'Fog' },
    48: { src: iconFog, alt: 'Fog' },
    51: { src: iconDrizzle, alt: 'Drizzle' },
    53: { src: iconDrizzle, alt: 'Drizzle' },
    55: { src: iconDrizzle, alt: 'Drizzle' },
    56: { src: iconSnow, alt: 'Freezing Drizzle' },
    57: { src: iconSnow, alt: 'Freezing Drizzle' },
    61: { src: iconRain, alt: 'Rain' },
    63: { src: iconRain, alt: 'Rain' },
    65: { src: iconRain, alt: 'Rain' },
    66: { src: iconSnow, alt: 'Freezing Rain' },
    67: { src: iconSnow, alt: 'Freezing Rain' },
    71: { src: iconSnow, alt: 'Snow' },
    73: { src: iconSnow, alt: 'Snow' },
    75: { src: iconSnow, alt: 'Snow' },
    77: { src: iconSnow, alt: 'Snow Grains' },
    80: { src: iconRain, alt: 'Rain Showers' },
    81: { src: iconRain, alt: 'Rain Showers' },
    82: { src: iconRain, alt: 'Rain Showers' },
    85: { src: iconSnow, alt: 'Snow Showers' },
    86: { src: iconSnow, alt: 'Snow Showers' },
    95: { src: iconStorm, alt: 'Thunderstorm' },
    96: { src: iconStorm, alt: 'Thunderstorm with Hail' },
    99: { src: iconStorm, alt: 'Thunderstorm with Hail' },
}

export const DEFAULT_WEATHER_ICON: IconDefinition = { src: '../assets/images/icon-error.webp', alt: 'Default Weather Icon' }