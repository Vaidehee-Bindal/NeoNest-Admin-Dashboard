import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Users, Calendar, MapPin } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Skeleton } from '../components/ui/skeleton';
import { SystemStatus } from '../components/SystemStatus';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export function Analytics() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  const userGrowthData = [
    { month: 'Jan', users: 450, organizations: 12, caregivers: 89 },
    { month: 'Feb', users: 580, organizations: 18, caregivers: 112 },
    { month: 'Mar', users: 720, organizations: 25, caregivers: 145 },
    { month: 'Apr', users: 850, organizations: 32, caregivers: 178 },
    { month: 'May', users: 980, organizations: 45, caregivers: 215 },
    { month: 'Jun', users: 1120, organizations: 58, caregivers: 256 },
    { month: 'Jul', users: 1247, organizations: 72, caregivers: 298 },
    { month: 'Aug', users: 1380, organizations: 85, caregivers: 330 },
    { month: 'Sep', users: 1520, organizations: 89, caregivers: 342 },
  ];

  const cityDistribution = [
    { name: 'Mumbai', value: 320, color: '#A6DCEF' },
    { name: 'Delhi', value: 280, color: '#F6C6C7' },
    { name: 'Bangalore', value: 240, color: '#C8E6C9' },
    { name: 'Chennai', value: 180, color: '#D1C4E9' },
    { name: 'Pune', value: 150, color: '#FED7E2' },
    { name: 'Others', value: 77, color: '#CBD5E0' },
  ];

  const bookingTrends = [
    { day: 'Mon', bookings: 45, completed: 38 },
    { day: 'Tue', bookings: 52, completed: 45 },
    { day: 'Wed', bookings: 48, completed: 41 },
    { day: 'Thu', bookings: 61, completed: 54 },
    { day: 'Fri', bookings: 55, completed: 48 },
    { day: 'Sat', bookings: 67, completed: 59 },
    { day: 'Sun', bookings: 58, completed: 51 },
  ];

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
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
        <h1 className="mb-2">Analytics & Insights</h1>
        <p className="text-muted-foreground">
          Deep dive into platform metrics and performance trends.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Growth Rate</span>
              <TrendingUp className="text-accent" size={20} />
            </div>
            <h2 className="text-foreground mb-1">+23.5%</h2>
            <p className="text-muted-foreground">vs last month</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Avg Response Time</span>
              <Calendar className="text-primary" size={20} />
            </div>
            <h2 className="text-foreground mb-1">2.4 hrs</h2>
            <p className="text-muted-foreground">verification approval</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Active Users</span>
              <Users className="text-secondary" size={20} />
            </div>
            <h2 className="text-foreground mb-1">892</h2>
            <p className="text-muted-foreground">online today</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Top City</span>
              <MapPin className="text-[#D1C4E9]" size={20} />
            </div>
            <h2 className="text-foreground mb-1">Mumbai</h2>
            <p className="text-muted-foreground">320 users</p>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-4 md:p-6">
          <Tabs defaultValue="growth" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="cities">Cities</TabsTrigger>
            </TabsList>

            <TabsContent value="growth" className="space-y-4">
              <h3 className="text-foreground">User Growth Over Time</h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A6DCEF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#A6DCEF" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorCaregivers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C8E6C9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#C8E6C9" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
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
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#A6DCEF"
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                    name="Users"
                  />
                  <Area
                    type="monotone"
                    dataKey="caregivers"
                    stroke="#C8E6C9"
                    fillOpacity={1}
                    fill="url(#colorCaregivers)"
                    name="Caregivers"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4">
              <h3 className="text-foreground">Weekly Booking Trends</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={bookingTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="day" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#F6C6C7"
                    strokeWidth={2}
                    name="Total Bookings"
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#C8E6C9"
                    strokeWidth={2}
                    name="Completed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="cities" className="space-y-4">
              <h3 className="text-foreground">User Distribution by City</h3>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                <ResponsiveContainer width="100%" height={350} className="max-w-md">
                  <PieChart>
                    <Pie
                      data={cityDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {cityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-card)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '0.5rem',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {cityDistribution.map((city, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: city.color }}
                      />
                      <span className="text-foreground min-w-[100px]">{city.name}</span>
                      <span className="text-muted-foreground">{city.value} users</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <SystemStatus />
      </motion.div>
    </div>
  );
}
