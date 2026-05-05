import { SocialLayout } from "@/components/SocialLayout";
import { Zap } from "lucide-react";

export default function AlertsPage() {
  return (
    <SocialLayout>
      <div className="px-4 space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter italic leading-none text-foreground">Live Alerts</h1>
          <p className="text-muted font-medium tracking-widest text-xs">Tactical Response Stream</p>
        </div>

        <div className="space-y-4">
          <AlertItem title="Wildfire Alert: Los Angeles" intensity="High" time="2m ago" />
          <AlertItem title="Seismic Ping: Japan Region" intensity="Low" time="15m ago" />
          <AlertItem title="Storm Cell: Florida Coast" intensity="Medium" time="1h ago" />
        </div>
      </div>
    </SocialLayout>
  );
}

function AlertItem({ title, intensity, time }: { title: string, intensity: string, time: string }) {
  return (
    <div className="premium-card p-6 rounded-4xl flex items-center justify-between group cursor-pointer hover:border-primary-600">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${intensity === "High" ? "bg-error-600/10 text-error-600 shadow-inner" : intensity === "Medium" ? "bg-warning-600/10 text-warning-600 shadow-inner" : "bg-success-600/10 text-success-600 shadow-inner"}`}>
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-md font-black uppercase tracking-tight group-hover:text-primary-600 transition-colors">{title}</h4>
          <p className="text-xs text-muted font-medium tracking-widest mt-0.5">{time}</p>
        </div>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs text-center font-medium uppercase tracking-widest ${intensity === "High" ? "bg-error-600/10 text-error-600 shadow-inner" : intensity === "Medium" ? "bg-warning-600/10 text-warning-600 shadow-inner" : "bg-success-600/10 text-success-600 shadow-inner"}`}>
        {intensity}
      </div>
    </div>
  );
}
