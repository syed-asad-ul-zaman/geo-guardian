import { fetchCategories, fetchEventsByCategory, fetchAllEvents, EONETCategory, EONETEvent } from "@/lib/api";
import { EventFeed } from "@/components/EventFeed";
import { GlobalStateProvider } from "@/components/GlobalStateProvider";
import { EventCardSkeleton } from "@/components/EventCard";
import { SocialLayout } from "@/components/SocialLayout";
import { Suspense } from "react";

export default async function Page() {
  let categories: EONETCategory[] = [];
  let initialEvents: EONETEvent[] = [];
  let initialActiveId = "wildfires";

  try {
    categories = await fetchCategories();
    const firstCat = categories.find(c => c.id === "wildfires") || categories[0];
    initialActiveId = firstCat?.id || "wildfires";
    initialEvents = await fetchEventsByCategory(initialActiveId);
  } catch (error) {
    console.error("SSR Fetch Error:", error);
    initialActiveId = "wildfires";
    initialEvents = await fetchAllEvents(40);
  }

  return (
    <GlobalStateProvider
      initialCategories={categories}
      initialActiveId={initialActiveId}
    >
      <SocialLayout>
        <Suspense fallback={<FeedSkeleton />}>
          <EventFeed initialEvents={initialEvents} />
        </Suspense>
      </SocialLayout>
    </GlobalStateProvider>
  );
}

function FeedSkeleton() {
  return (
    <div className="w-full space-y-12 animate-in fade-in duration-1000">
      <div className="flex gap-3 overflow-hidden opacity-50 px-2">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-100 dark:bg-gray-800 rounded-full shrink-0" />
        ))}
      </div>
      <div className="space-y-12">
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    </div>
  );
}
