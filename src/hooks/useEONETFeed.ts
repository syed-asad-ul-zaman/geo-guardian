"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { EONETEvent, fetchEventsByCategory, getEventCoordinates } from "@/lib/api";
import { calculateDistance, Coordinates } from "@/lib/geo";
import { useGlobalState } from "@/components/GlobalStateProvider";

export function useEONETFeed(initialEvents: EONETEvent[], userLocation: Coordinates | null) {
  const { activeCategoryId } = useGlobalState();
  const [localEvents, setLocalEvents] = useState<EONETEvent[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"recent" | "proximity">("recent");
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
    setLocalEvents(initialEvents);
  }, [initialEvents]);

  useEffect(() => {
    // If it's all events or matching current category, skip
    if (activeCategoryId === "all") return;
    
    async function loadCategory() {
      setLoading(true);
      try {
        const events = await fetchEventsByCategory(activeCategoryId);
        // Delay slightly to ensure smooth transition
        setTimeout(() => {
          setLocalEvents(events);
          setLoading(false);
        }, 300);
      } catch (error) {
        console.error("Failed to load category:", error);
        setLoading(false);
      }
    }

    loadCategory();
  }, [activeCategoryId]);

  const processedEvents = useMemo(() => {
    const mapped = localEvents.map(event => {
      const eventCoords = getEventCoordinates(event);
      const distance = userLocation ? calculateDistance(userLocation, eventCoords) : 0;
      const latest = event.geometry[event.geometry.length - 1];
      return { event, distance, date: new Date(latest.date) };
    });

    if (sortOrder === "proximity" && userLocation) {
      return [...mapped].sort((a, b) => a.distance - b.distance);
    }

    // Default: Sort by date (recent first)
    return [...mapped].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [localEvents, userLocation, sortOrder]);

  return {
    events: processedEvents,
    setSortOrder,
    loading
  };
}
