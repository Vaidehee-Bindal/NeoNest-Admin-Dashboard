import { useEffect, useState } from 'react';
import { Users, Building2, Heart, Calendar, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { StatCard } from '../components/StatCard';
import { QuickActions } from '../components/QuickActions';
import { RecentActivity } from '../components/RecentActivity';
import { Card } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { dashboardAPI, DashboardStats, MonthlyBooking } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [monthlyBookings, setMonthlyBookings] = useState<MonthlyBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, bookingsData] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getMonthlyBookings(),
      ]);
      setStats(statsData);
      setMonthlyBookings(bookingsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-48 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <Skeleton className="h-96 rounded-lg lg:col-span-2" />
          <Skeleton className="h-96 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with NeoNest today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers.toLocaleString() || '0'}
          icon={Users}
          gradient="from-[#A6DCEF] to-[#7BB3D3]"
          delay={0.1}
        />
        <StatCard
          title="Organizations"
          value={stats?.totalOrganizations.toLocaleString() || '0'}
          icon={Building2}
          gradient="from-[#F6C6C7] to-[#E4A5A6]"
          delay={0.2}
        />
        <StatCard
          title="Caregivers"
          value={stats?.totalCaregivers.toLocaleString() || '0'}
          icon={Heart}
          gradient="from-[#C8E6C9] to-[#A5C9A7]"
          delay={0.3}
        />
        <StatCard
          title="Total Bookings"
          value={stats?.totalBookings.toLocaleString() || '0'}
          icon={Calendar}
          gradient="from-[#D1C4E9] to-[#B8A9D4]"
          delay={0.4}
        />
        <StatCard
          title="Pending Verifications"
          value={stats?.pendingVerifications.toLocaleString() || '0'}
          icon={AlertCircle}
          gradient="from-[#FED7E2] to-[#F6AD55]"
          delay={0.5}
        />
      </div>

      {/* Quick Actions */}
      {onNavigate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <QuickActions onNavigate={onNavigate} />
        </motion.div>
      )}

      {/* Charts and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Monthly Bookings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2"
        >
          <Card className="p-4 md:p-6">
            <h2 className="mb-4 md:mb-6">Monthly Bookings Trend</h2>
            <div className="w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height={350} minWidth={300}>
              <BarChart data={monthlyBookings}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="month" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="bookings" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A6DCEF" />
                    <stop offset="100%" stopColor="#F6C6C7" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <RecentActivity />
        </motion.div>
      </div>
    </div>
  );
}
