import { useState, useEffect } from 'react';
import { Home, ShieldCheck, Calendar, Settings, Activity, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollArea } from './ui/scroll-area';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'verifications', label: 'Verifications', icon: ShieldCheck },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'activity', label: 'Activity Logs', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    // Only close sidebar on mobile screens (below lg breakpoint)
    if (!isDesktop) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isDesktop ? 0 : isOpen ? 0 : -280,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed lg:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border z-40 flex flex-col shadow-xl lg:shadow-none"
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex-shrink-0">
          <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            NeoNest Admin
          </h2>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 shadow-sm'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer Info */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="px-4 py-2 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground mb-1">Version 1.0.0</p>
            <p className="text-muted-foreground">© 2025 NeoNest</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
