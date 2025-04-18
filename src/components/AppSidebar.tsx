
import React from "react";
import { 
  Home, 
  FileText, 
  History, 
  Settings, 
  Database, 
  Search, 
  HelpCircle, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "../context/SidebarContext";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

const AppSidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  if (!isSidebarOpen) {
    return null;
  }

  return (
    <div className={`
      w-64 bg-white border-r border-border h-full flex flex-col 
      ${isMobile ? 'absolute z-50 shadow-lg' : 'relative'}
    `}>
      <div className="flex items-center justify-between p-4">
        <div className="font-bold text-blockchain-blue text-lg">Orchestratore</div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <Separator />
      
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <SidebarItem icon={<Home size={18} />} label="Dashboard" />
        <SidebarItem icon={<FileText size={18} />} label="I miei documenti" />
        <SidebarItem icon={<History size={18} />} label="Cronologia certificazioni" />
        <SidebarItem icon={<Database size={18} />} label="Stato blockchain" active />
        <SidebarItem icon={<Search size={18} />} label="Ricerca avanzata" />
        
        <div className="pt-4">
          <Separator className="my-2" />
        </div>
        
        <SidebarItem icon={<Settings size={18} />} label="Impostazioni" />
        <SidebarItem icon={<HelpCircle size={18} />} label="Guida" />
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-certification-green"></div>
          <span className="text-sm text-secondary-gray">Sistema attivo</span>
        </div>
        <div className="mt-1 text-xs text-secondary-gray">Ultimo blocco: 2 min fa</div>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active }) => {
  return (
    <button 
      className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm 
        ${active 
          ? 'bg-blockchain-blue text-white' 
          : 'text-secondary-gray hover:bg-gray-100'
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default AppSidebar;
