import { getJson } from "./http";

export type GeocodingResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  country: string;
  admin1?: string;
  timezone?: string;
};

export type GeocodingResponse = {
  results?: GeocodingResult[];
};

export function searchLocations(name: string, count = 5) {
  const url =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${encodeURIComponent(name)}` +
    `&count=${count}` +
    `&language=en` +
    `&format=json`;
  return getJson<GeocodingResponse>(url);
}