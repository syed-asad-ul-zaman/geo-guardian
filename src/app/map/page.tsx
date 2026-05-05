"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchAllEvents, EONETEvent, getEventCoordinates } from "@/lib/api";
import { MobileNav } from "@/components/MobileNav";
import { formatDistanceToNow } from "date-fns";
import { List, ShieldCheck, MapPin, Globe, Clock, Flame, Wind, Mountain, Waves, Activity, Droplets, Sun, CloudFog, Zap, Thermometer, TriangleAlert, Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [20, 30],
  iconAnchor: [10, 30],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function TacticalMapPage() {
  const [events, setEvents] = useState<EONETEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "wildfires":
        return Flame;
      case "severeStorms":
        return Wind;
      case "volcanoes":
        return Mountain;
      case "seaLakeIce":
        return Waves;
      case "earthquakes":
        return Activity;
      case "floods":
        return Droplets;
      case "drought":
        return Sun;
      case "dustHaze":
        return CloudFog;
      case "manmade":
        return Zap;
      case "tempExtremes":
        return Thermometer;
      case "landslides":
        return TriangleAlert;
      case "snow":
        return Snowflake;
      default:
        return Globe;
    }
  };

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllEvents(100);
        setEvents(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="h-screen w-full bg-background overflow-hidden relative">
      {loading ? (
        <div className="absolute inset-0 z-1000 bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-16 rounded-full border-4 border-primary-600/20 border-t-primary-600 animate-spin" />
          <h2 className="text-xl font-black uppercase tracking-[0.3em] text-foreground">Syncing Satellite Grid...</h2>
        </div>
      ) : null}

      {/* View Toggle */}
      <div className="absolute top-8 right-20 z-1000 flex bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-border p-1 rounded-2xl shadow-2xl">
        <button
          onClick={() => setViewMode("map")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            viewMode === "map" ? "bg-foreground text-background shadow-lg" : "text-muted hover:text-foreground"
          )}
        >
          <Globe className="w-3.5 h-3.5" />
          Grid
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
            viewMode === "list" ? "bg-foreground text-background shadow-lg" : "text-muted hover:text-foreground"
          )}
        >
          <List className="w-3.5 h-3.5" />
          List
        </button>
      </div>

      <div className="h-full w-full">
        {viewMode === "map" ? (
          <MapContainer
            center={[20, 0]}
            zoom={3}
            scrollWheelZoom={true}
            className="h-full w-full grayscale-[0.5] contrast-[1.1] dark:invert dark:hue-rotate-180"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="topright" />

            {events.map((event) => {
              const coords = getEventCoordinates(event);
              const date = new Date(event.geometry[event.geometry.length - 1].date);

              return (
                <Marker key={event.id} position={[coords.lat, coords.lng]}>
                  <Popup className="premium-popup">
                    <div className="p-2 min-w-[200px] space-y-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted">NASA EONET</span>
                      </div>
                      <h3 className="text-sm font-black tracking-tight leading-none text-gray-900">{event.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-muted">
                        <MapPin className="w-3 h-3" />
                        <span>{coords.lat.toFixed(2)}, {coords.lng.toFixed(2)}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground italic">
                        {formatDistanceToNow(date, { addSuffix: true })}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        ) : (
          <div className="h-full w-full overflow-y-auto bg-gray-50 dark:bg-background p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex justify-between items-end mb-8 px-2">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter italic">Tactical Grid</h2>
                  <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mt-1">High-Density Object Feed</p>
                </div>
                <div className="flex items-center gap-2 text-primary-600">
                  <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Live Sync Active</span>
                </div>
              </div>

              {events.map((event) => {
                const coords = getEventCoordinates(event);
                const date = new Date(event.geometry[event.geometry.length - 1].date);
                const Icon = getCategoryIcon(event.categories[0]?.id);
                return (
                  <div key={event.id} className="premium-card p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary-600 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-muted group-hover:text-primary-600 transition-colors shadow-inner">
                        <Icon className="w-6 h-6 text-foreground group-hover:text-primary-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black uppercase tracking-tight leading-none text-foreground group-hover:text-primary-600 transition-colors">{event.title}</h4>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-primary-600" />
                            {coords.lat.toFixed(2)}, {coords.lng.toFixed(2)}
                          </span>
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-primary-600" />
                            {formatDistanceToNow(date, { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-foreground/5 rounded-full border border-border text-[10px] font-black uppercase tracking-widest self-start md:self-auto">
                      {event.categories[0]?.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Map Overlay HUD */}
      <div className="absolute top-8 left-8 z-1000 space-y-4">
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-border p-6 rounded-3xl shadow-2xl">
          <h1 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">Tactical Map</h1>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-success-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Global Incident Hub</span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-border px-4 py-3 rounded-2xl flex items-center gap-4 shadow-xl">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-muted">Tracked Events</span>
            <span className="text-lg font-bold tabular-nums">{events.length}</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-muted">Active Sector</span>
            <span className="text-lg font-bold">Planetary</span>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
