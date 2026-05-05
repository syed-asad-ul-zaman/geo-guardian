"use client";

import { useState, useEffect } from "react";
import { Coordinates } from "@/lib/geo";

export function useLocation() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [status, setLocationStatus] = useState<"loading" | "granted" | "denied" | "unsupported">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      return;
    }

    const handleSuccess = (pos: GeolocationPosition) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
      setLocationStatus("granted");
    };

    const handleError = (err: GeolocationPositionError) => {
      console.warn("Location error:", err.message);
      setLocationStatus("denied");
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }, []);

  return { location, status, error };
}
