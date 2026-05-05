import { SocialLayout } from "@/components/SocialLayout";
import { Book, Code, Globe, Shield, Terminal } from "lucide-react";

export default function DocsPage() {
  return (
    <SocialLayout>
      <div className="px-4 space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter italic leading-none text-foreground">Technical Infra</h1>
          <p className="text-muted font-medium tracking-widest text-xs">
            GeoGuardian is powered by NASA EONET v3 and GIBS Satellite layers, providing sub-second latency for natural event tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <DocSection
            icon={Globe}
            title="EONET v3 API"
            content="Real-time event data for natural events, ranging from wildfires to volcanic eruptions."
          />
          <DocSection
            icon={Terminal}
            title="SSR Architecture"
            content="Built with Next.js 16+, using Server Components for instant initial authority and client hydration for tactical proximity."
          />
          <DocSection
            icon={Shield}
            title="Safety Protocols"
            content="Automated guidance systems synced with local hazard reports and FEMA response criteria."
          />
          <DocSection
            icon={Code}
            title="Developer SDK"
            content="Integrate GeoGuardian data into your own disaster response systems via our coming-soon WebSocket stream."
          />
        </div>
      </div>
    </SocialLayout>
  );
}

function DocSection({ icon: Icon, title, content }: { icon: any, title: string, content: string }) {
  return (
    <div className="premium-card p-8 rounded-4xl space-y-6 cursor-pointer">
      <div className="w-14 h-14 bg-foreground/5 rounded-3xl flex items-center justify-center text-primary-600">
        <Icon className="w-7 h-7" />
      </div>
      <div className="space-y-2">
        <h3 className="text-md md:text-lg font-black uppercase tracking-tight text-foreground">{title}</h3>
        <p className="text-xs md:text-sm text-muted font-medium leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
