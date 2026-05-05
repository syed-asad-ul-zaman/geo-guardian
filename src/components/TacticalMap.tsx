"use client";

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ShieldCheck, MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { EONETEvent, getEventCoordinates } from "@/lib/api";

interface TacticalMapProps {
  events: EONETEvent[];
}

// Fix Leaflet icons for Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [20, 30],
  iconAnchor: [10, 30],
});

export default function TacticalMap({ events }: TacticalMapProps) {
  // Apply the default icon fix
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
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
  );
}
