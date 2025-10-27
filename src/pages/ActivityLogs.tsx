import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, User, FileCheck, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { ScrollArea } from '../components/ui/scroll-area';

interface ActivityLog {
  id: string;
  type: 'verification' | 'booking' | 'system' | 'user';
  action: string;
  description: string;
  user: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

const mockLogs: ActivityLog[] = [
  {
    id: 'LOG001',
    type: 'verification',
    action: 'Approved Verification',
    description: 'Verified caregiver Lakshmi Nair from Chennai',
    user: 'Admin User',
    timestamp: '2025-10-27T14:30:00',
    status: 'success',
  },
  {
    id: 'LOG002',
    type: 'booking',
    action: 'Booking Confirmed',
    description: 'Confirmed booking BK001 for Meera Patel',
    user: 'Admin User',
    timestamp: '2025-10-27T13:15:00',
    status: 'success',
  },
  {
    id: 'LOG003',
    type: 'user',
    action: 'User Login',
    description: 'Admin user logged into the dashboard',
    user: 'Admin User',
    timestamp: '2025-10-27T09:00:00',
    status: 'info',
  },
  {
    id: 'LOG004',
    type: 'verification',
    action: 'Rejected Verification',
    description: 'Rejected organization registration - incomplete documents',
    user: 'Admin User',
    timestamp: '2025-10-26T16:45:00',
    status: 'warning',
  },
  {
    id: 'LOG005',
    type: 'system',
    action: 'System Alert',
    description: 'High number of pending verifications detected',
    user: 'System',
    timestamp: '2025-10-26T12:00:00',
    status: 'error',
  },
  {
    id: 'LOG006',
    type: 'booking',
    action: 'Booking Forwarded',
    description: 'Forwarded booking BK003 to another caregiver',
    user: 'Admin User',
    timestamp: '2025-10-26T10:30:00',
    status: 'info',
  },
  {
    id: 'LOG007',
    type: 'verification',
    action: 'Approved Verification',
    description: 'Verified mother Riya Kumar from Delhi',
    user: 'Admin User',
    timestamp: '2025-10-25T15:20:00',
    status: 'success',
  },
  {
    id: 'LOG008',
    type: 'booking',
    action: 'Booking Completed',
    description: 'Marked booking BK004 as completed',
    user: 'Admin User',
    timestamp: '2025-10-25T11:00:00',
    status: 'success',
  },
];

export function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLogs(mockLogs);
      setLoading(false);
    }, 600);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'verification':
        return FileCheck;
      case 'booking':
        return Calendar;
      case 'user':
        return User;
      case 'system':
        return AlertCircle;
      default:
        return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-accent text-accent-foreground';
      case 'warning':
        return 'bg-[#FED7E2] text-[#831843]';
      case 'error':
        return 'bg-destructive text-destructive-foreground';
      case 'info':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-2">Activity Logs</h1>
        <p className="text-muted-foreground">
          Track all actions and events across the admin dashboard.
        </p>
      </motion.div>

      {/* Activity Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-4 md:p-6">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            {loading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {logs.map((log, index) => {
                  const Icon = getIcon(log.type);
                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(log.status)}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h4 className="text-foreground">{log.action}</h4>
                          <Badge variant="outline" className="text-xs">
                            {log.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2 break-words">
                          {log.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            <span className="text-xs">{log.user}</span>
                          </span>
                          <span className="text-xs">{formatTimestamp(log.timestamp)}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </Card>
      </motion.div>
    </div>
  );
}
