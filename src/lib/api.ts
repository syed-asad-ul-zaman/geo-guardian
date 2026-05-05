export interface EONETCategory {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface EONETLayer {
  name: string;
  serviceUrl: string;
  serviceTypeId: string;
  parameters: any[];
}

export interface EONETEvent {
  id: string;
  title: string;
  description: string | null;
  link: string;
  closed: string | null;
  categories: Array<{ id: string; title: string }>;
  sources: Array<{ id: string; url: string }>;
  geometry: Array<{
    magnitudeValue: number | null;
    magnitudeUnit: string | null;
    date: string;
    type: string;
    coordinates: any; // Can be [lng, lat] or [[lng, lat], ...]
  }>;
}

const NASA_EONET_BASE = "https://eonet.gsfc.nasa.gov/api/v3";

export async function fetchCategories(): Promise<EONETCategory[]> {
  const res = await fetch(`${NASA_EONET_BASE}/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch EONET categories");
  const data = await res.json();
  return data.categories;
}

export async function fetchLayers(): Promise<EONETLayer[]> {
  const res = await fetch(`${NASA_EONET_BASE}/layers`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error("Failed to fetch EONET layers");
  const data = await res.json();
  return data.layers;
}

export async function fetchEventsByCategory(categoryId: string, limit = 100): Promise<EONETEvent[]> {
  // Use status=all and days=30 to get a robust list
  const res = await fetch(`${NASA_EONET_BASE}/categories/${categoryId}?status=all&limit=${limit}&days=30`, {
    next: { revalidate: 300 } 
  });
  if (!res.ok) throw new Error(`Failed to fetch events for ${categoryId}`);
  const data = await res.json();
  return data.events;
}

export async function fetchAllEvents(limit = 100): Promise<EONETEvent[]> {
  const res = await fetch(`${NASA_EONET_BASE}/events?status=all&limit=${limit}&days=30`, {
    next: { revalidate: 300 }
  });
  if (!res.ok) throw new Error("Failed to fetch NASA events");
  const data = await res.json();
  return data.events;
}

/**
 * Normalizes geometry to a single [lat, lng] point for distance calculations.
 * If it's a polygon, it takes the first point (simplification for v4).
 */
export function getEventCoordinates(event: EONETEvent): { lat: number; lng: number } {
  const latest = event.geometry[event.geometry.length - 1];
  const coords = latest.coordinates;
  
  if (latest.type === "Point") {
    return { lat: coords[1], lng: coords[0] };
  } else if (latest.type === "Polygon") {
    // Return first point of the first ring
    const firstPoint = coords[0][0];
    return { lat: firstPoint[1], lng: firstPoint[0] };
  }
  
  return { lat: 0, lng: 0 };
}

export async function fetchWeatherData(lat: number, lng: number) {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  if (!API_KEY) return null;
  
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lng}&aqi=no`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}
