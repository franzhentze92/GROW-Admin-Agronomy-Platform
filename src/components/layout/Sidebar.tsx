import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';
import { FaBug } from 'react-icons/fa';

// Import icons from lucide-react
import { 
  LayoutDashboard, 
  LineChart, 
  DollarSign, 
  Calendar,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Code,
  MessageSquare,
  Target,
  Inbox,
  ClipboardEdit,
  Settings,
  ListChecks,
  CalendarDays,
  Leaf,
  Shield,
  Crown,
  Sprout,
  Droplets,
  Activity,
  Plus,
  MessageCircle,
  Cloud,
  Scale,
  FileText,
  FolderOpen,
  BarChart,
  TrendingUp,
  Satellite,
  Zap,
  Calculator,
  Package,
  Thermometer,
  MapPin,
  ClipboardList,
  Folder,
  // Education section icons
  Book,
  GraduationCap,
  Mic,
  Video,
  HeartPulse,
  Gamepad2,
  HelpCircle,
  Upload,
  Home,
  Database,
  Factory,
  Truck,
  Users,
  Flower,
  Library,
  Layers
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const getIcon = (iconName: string) => {
  const iconMap = {
    'LayoutDashboard': LayoutDashboard,
    'LineChart': LineChart,
    'DollarSign': DollarSign,
    'Calendar': Calendar,
    'BarChart3': BarChart3,
    'Code': Code,
    'MessageSquare': MessageSquare,
    'Target': Target,
    'Inbox': Inbox,
    'ClipboardEdit': ClipboardEdit,
    'Settings': Settings,
    'Leaf': Leaf,
    'Shield': Shield,
    'Crown': Crown,
    'Sprout': Sprout,
    'Droplets': Droplets,
    'Activity': Activity,
    'Plus': Plus,
    'MessageCircle': MessageCircle,
    'Cloud': Cloud,
    'Scale': Scale,
    'FileText': FileText,
    'FolderOpen': FolderOpen,
    'BarChart': BarChart,
    'TrendingUp': TrendingUp,
    'Satellite': Satellite,
    'Zap': Zap,
    'Calculator': Calculator,
    'Package': Package,
    'Thermometer': Thermometer,
    'MapPin': MapPin,
    'ClipboardList': ClipboardList,
    'Folder': Folder,
    'Book': Book,
    'GraduationCap': GraduationCap,
    'Mic': Mic,
    'Video': Video,
    'HeartPulse': HeartPulse,
    'Gamepad2': Gamepad2,
    'HelpCircle': HelpCircle,
    'Upload': Upload,
    'Home': Home,
    'Database': Database,
    'Factory': Factory,
    'Truck': Truck,
    'Users': Users,
    'Flower': Flower,
    'Library': Library,
    'Layers': Layers,
    'FaBug': FaBug
  };
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || LayoutDashboard;
  return <IconComponent className="h-5 w-5" />;
};

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { sidebarOpen, toggleSidebar, hasRole, setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['grow-agronomist', 'grow-admin', 'grow-super-admin', 'grow-education']);
  const [expandedSubsections, setExpandedSubsections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleSubsection = (subsectionId: string) => {
    setExpandedSubsections(prev => 
      prev.includes(subsectionId) 
        ? prev.filter(id => id !== subsectionId)
        : [...prev, subsectionId]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  // Filter navigation items based on user role
  const filteredNavItems = NAV_ITEMS.filter(item => {
    if (!item.roles) return true; // If no roles specified, show to everyone
    return hasRole(item.roles);
  });

  // Helper to filter children by role recursively
  const filterChildrenByRole = (items: any[]): any[] => {
    return items
      .filter(item => {
        if (!item.roles) return true;
        return hasRole(item.roles);
      })
      .map(item =>
        item.children
          ? { ...item, children: filterChildrenByRole(item.children) }
          : item
      );
  };

  const renderNavItem = (item: any, level: number = 0) => {
    // Debug: log the current path
    // console.log('Sidebar location.pathname:', location.pathname);
    // Hide 'Analysis Reports' tab only if on the exact reports page
    if (item.id === 'analysis-reports' && location.pathname === '/app/agronomist/analysis/reports') {
      return null;
    }
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSubsections.includes(item.id);
    const isEducationSection = item.id === 'grow-education';
    const isMainSection = [
      'dashboard',
      'grow-agronomist',
      'grow-admin',
      'grow-super-admin',
      'grow-education'
    ].includes(item.id);
    
    if (hasChildren) {
      // Filter children by role before rendering
      const filteredChildren = filterChildrenByRole(item.children);
      if (filteredChildren.length === 0) return null;
      return (
        <div key={item.id}>
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium transition-colors",
              "text-muted-foreground hover:bg-muted hover:text-foreground",
              level === 1 ? "ml-4 text-sm" : level === 2 ? "ml-8 text-xs" : "",
              level === 1 ? "border-l-2 border-l-transparent hover:border-l-primary/20" : "",
              level === 2 ? "border-l-2 border-l-transparent hover:border-l-primary/10" : ""
            )}
            onClick={() => sidebarOpen && toggleSubsection(item.id)}
          >
            <div className="flex items-center">
              <span className={cn("mr-3", level === 1 ? "h-4 w-4" : level === 2 ? "h-3.5 w-3.5" : "h-5 w-5")}> {getIcon(item.icon)} </span>
              {sidebarOpen && (
                <span className={cn(
                  level === 1 ? "text-sm font-medium" : level === 2 ? "text-xs font-normal" : "text-base font-semibold",
                  isMainSection && "sidebar-main-green"
                )}>
                  {item.label}
                </span>
              )}
            </div>
            {sidebarOpen && (
              isExpanded ? 
                <ChevronUp className={cn("h-4 w-4", level === 2 ? "h-3 w-3" : "")}/> : 
                <ChevronDown className={cn("h-4 w-4", level === 2 ? "h-3 w-3" : "")}/>
            )}
          </Button>
          {sidebarOpen && isExpanded && (
            <div className="space-y-0.5 mt-1">
              {Array.isArray(filteredChildren) && filteredChildren.map((child: any) => renderNavItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) => cn(
            "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
            isActive 
              ? "bg-primary/10 text-primary border-l-2 border-l-primary" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground border-l-2 border-l-transparent hover:border-l-primary/20",
            level === 1 ? "ml-4 text-sm" : level === 2 ? "ml-8 text-xs" : level === 3 ? "ml-12 text-xs" : "",
            level === 1 ? "font-medium" : level === 2 ? "font-normal" : level === 3 ? "font-normal" : "font-semibold"
          )}
          end
        >
          <span className={cn("mr-3", level === 1 ? "h-4 w-4" : level === 2 ? "h-3.5 w-3.5" : level === 3 ? "h-3 w-3" : "h-5 w-5")}>{getIcon(item.icon)}</span>
          {sidebarOpen && (
            <div className="flex items-center justify-between w-full">
              <span className={cn(
                level === 1 ? "text-sm" : level === 2 ? "text-xs" : level === 3 ? "text-xs" : "text-base"
              )}>
                {item.label}
              </span>
            </div>
          )}
        </NavLink>
      );
    }
  };

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-background border-r border-border/40 transition-all duration-300",
      sidebarOpen ? "w-80" : "w-20",
      className
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/40">
        <img src="/grow_logo.png" alt="Logo" className="h-8 w-8" />
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="flex flex-col justify-between h-[calc(100vh-4rem)]">
        <nav className="mt-4 px-3 space-y-2 overflow-y-auto">
          {/* Render all nav items, including top-level links like Dashboard */}
          {filteredNavItems.map((item: any) =>
            item.children && item.children.length > 0
              ? renderNavItem(item, 0)
              : (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary border-l-2 border-l-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground border-l-2 border-l-transparent hover:border-l-primary/20",
                    "font-semibold"
                  )}
                  end
                >
                  <span className="mr-3 h-5 w-5">{getIcon(item.icon)}</span>
                  {sidebarOpen && <span className="text-base">{item.label}</span>}
                </NavLink>
              )
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;