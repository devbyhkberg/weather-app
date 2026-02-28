import { WEATHER_ICON_BY_CODE, DEFAULT_WEATHER_ICON } from "../types/weatherIcons";

export function WeatherIcon({ weatherCode, className, style }: { weatherCode: number, className?: string, style?: React.CSSProperties }) {
    const iconDefinition = WEATHER_ICON_BY_CODE[weatherCode as keyof typeof WEATHER_ICON_BY_CODE] || DEFAULT_WEATHER_ICON;
    return (
        <img src={iconDefinition.src} alt={iconDefinition.alt} className={className} style={style} />
    )
}