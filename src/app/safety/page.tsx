import { SocialLayout } from "@/components/SocialLayout";
import { Shield, Bell, CheckCircle } from "lucide-react";

export default function SafetyPage() {
  return (
    <SocialLayout>
      <div className="px-4 space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter italic leading-none text-foreground">Safety Center</h1>
          <p className="text-muted font-medium tracking-widest text-xs">Official Preparedness Protocols</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SafetyCard
            icon={Shield}
            title="Emergency Kit"
            desc="Ensure you have water, non-perishable food, and a first-aid kit ready for at least 72 hours."
          />
          <SafetyCard
            icon={Bell}
            title="Alert Settings"
            desc="Configure high-priority SMS mirroring for events within a 50km radius."
          />
        </div>
      </div>
    </SocialLayout>
  );
}

function SafetyCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="premium-card p-8 rounded-4xl space-y-6 cursor-pointer">
      <div className="w-14 h-14 bg-foreground/5 rounded-3xl flex items-center justify-center text-primary-600">
        <Icon className="w-7 h-7" />
      </div>
      <div className="space-y-2">
        <h3 className="text-md md:text-lg font-black uppercase tracking-tight text-foreground">{title}</h3>
        <p className="text-xs md:text-sm text-muted font-medium leading-relaxed">{desc}</p>
      </div>
      <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-600 hover:opacity-80 transition-opacity">
        <CheckCircle className="w-4 h-4" />
        Verified Protocol
      </button>
    </div>
  );
}
