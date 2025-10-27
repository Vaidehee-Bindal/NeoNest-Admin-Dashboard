import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Verifications } from './pages/Verifications';
import { Bookings } from './pages/Bookings';
import { Settings } from './pages/Settings';
import { ActivityLogs } from './pages/ActivityLogs';
import { Analytics } from './pages/Analytics';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function App() {
  const { isAuthenticated, loading, login, logout, admin } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Keep sidebar open on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading NeoNest Admin...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={login} />
        <Toaster />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'analytics':
        return <Analytics />;
      case 'verifications':
        return <Verifications />;
      case 'bookings':
        return <Bookings />;
      case 'activity':
        return <ActivityLogs />;
      case 'settings':
        return <Settings isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onLogout={logout}
          onToggleMobileSidebar={() => {
            // Toggle sidebar on mobile, keep open on desktop
            if (window.innerWidth < 1024) {
              setSidebarOpen(!sidebarOpen);
            }
          }}
          onNavigate={setCurrentPage}
          admin={admin}
        />
        <main className="flex-1 overflow-auto flex flex-col">
          <div className="flex-1">
            {renderPage()}
          </div>
          <Footer />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
