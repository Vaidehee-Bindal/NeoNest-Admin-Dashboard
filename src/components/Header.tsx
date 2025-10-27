import { useState, useEffect } from 'react';
import { Moon, Sun, Bell, Search, User, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { SearchDialog } from './SearchDialog';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  onToggleMobileSidebar: () => void;
  onNavigate: (page: string) => void;
  admin: any;
}

export function Header({ 
  isDarkMode, 
  onToggleTheme, 
  onLogout, 
  onToggleMobileSidebar,
  onNavigate,
  admin 
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  // Start with empty notifications - badge will only show when count > 0
  // Uncomment below and comment out [] to test with sample notifications
  const [notifications, setNotifications] = useState([]);
  // const [notifications, setNotifications] = useState([
  //   { title: 'New verification pending', description: 'Priya Sharma submitted documents', time: '2 minutes ago' },
  //   { title: 'Booking confirmed', description: 'BK002 has been confirmed', time: '15 minutes ago' },
  //   { title: 'System update', description: 'Dashboard v1.1.0 available', time: '1 hour ago' },
  // ]);
  const notificationCount = notifications.length;

  // Keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
      >
        <div className="flex h-16 items-center gap-4 px-4 md:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleMobileSidebar}
            className="lg:hidden"
          >
            <Menu size={20} />
          </Button>

          {/* Search Button */}
          <div className="flex-1 max-w-md">
            <Button
              variant="outline"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={18} className="mr-2" />
              <span className="hidden sm:inline">Search dashboard...</span>
              <span className="sm:hidden">Search...</span>
            </Button>
          </div>

        <div className="flex-1 md:flex-none" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="relative"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-primary" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-[10px]">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>
                Notifications
                {notificationCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {notificationCount}
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-muted cursor-pointer border-b border-border last:border-0"
                      onClick={() => {
                        // Mark as read by removing it
                        setNotifications(prev => prev.filter((_, i) => i !== index));
                      }}
                    >
                      <p className="text-foreground mb-1">{notification.title}</p>
                      <p className="text-muted-foreground">{notification.description}</p>
                      <p className="text-muted-foreground mt-1 text-xs">{notification.time}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2 md:px-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <span className="hidden md:inline text-foreground">{admin?.name || 'Admin'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="text-foreground">{admin?.name}</p>
                  <p className="text-muted-foreground">{admin?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate('settings')}>
                <Settings className="mr-2" size={16} />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-destructive">
                <LogOut className="mr-2" size={16} />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>

    <SearchDialog
      open={searchOpen}
      onOpenChange={setSearchOpen}
      onNavigate={onNavigate}
    />
  </>
  );
}
