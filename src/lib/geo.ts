export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Calculates the distance between two points in kilometers using the Haversine formula.
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
  const dLng = (coord2.lng - coord1.lng) * (Math.PI / 180);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * (Math.PI / 180)) *
    Math.cos(coord2.lat * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatDistance(km: number): string {
  if (km < 1) return "Less than 1 km away";
  if (km < 100) return `${Math.round(km)} km away`;
  return `${km.toLocaleString(undefined, { maximumFractionDigits: 0 })} km away`;
}

export function getProximityTier(km: number): "critical" | "warning" | "global" {
  if (km <= 50) return "critical";
  if (km <= 200) return "warning";
  return "global";
}
