import { SocialLayout } from "@/components/SocialLayout";
import { User, Bell, Shield, Lock, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  return (
    <SocialLayout>
      <div className="px-4 space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter italic leading-none text-foreground">Settings</h1>
          <p className="text-muted font-medium tracking-widest text-xs">Principal Observer Configuration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SettingItem
            icon={User}
            title="Observer Profile"
            desc="Manage tactical credentials and region tracking."
          />
          <SettingItem
            icon={Bell}
            title="Alert Mirroring"
            desc="Configure SMS and satellite push alerts."
          />
          <SettingItem
            icon={Shield}
            title="Privacy Guard"
            desc="Anonymization and GPS storage controls."
          />
          <SettingItem
            icon={Lock}
            title="Security & Auth"
            desc="Multi-factor authentication for broadcasts."
          />
        </div>
      </div>
    </SocialLayout>
  );
}

function SettingItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="premium-card p-8 rounded-4xl flex justify-between items-center cursor-pointer">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-foreground/5 rounded-3xl flex items-center justify-center text-primary-600">
          <Icon className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h3 className="text-md md:text-lg font-black uppercase tracking-tight text-foreground">{title}</h3>
          <p className="text-xs md:text-sm text-muted font-medium leading-relaxed">{desc}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted/30 group-hover:text-foreground transition-all group-hover:translate-x-1" />
    </div>
  );
}
