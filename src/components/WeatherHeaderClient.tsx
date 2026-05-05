"use client";

import { useEffect, useState } from "react";
import { WeatherHeader } from "./WeatherHeader";
import { fetchWeatherData } from "@/lib/api";

export function WeatherHeaderClient() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          const data = await fetchWeatherData(coords.lat, coords.lng);
          setWeather(data);
          setLoading(false);
        },
        () => setLoading(false)
      );
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <WeatherHeader
      weather={weather}
      city={weather?.location?.name}
      loading={loading}
    />
  );
}
