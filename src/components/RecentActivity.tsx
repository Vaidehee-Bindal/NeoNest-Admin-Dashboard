import { motion } from 'motion/react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

interface Activity {
  id: string;
  action: string;
  time: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const recentActivities: Activity[] = [
  {
    id: '1',
    action: 'Approved verification for Lakshmi Nair',
    time: '2 minutes ago',
    type: 'success',
  },
  {
    id: '2',
    action: 'New booking request received (BK007)',
    time: '15 minutes ago',
    type: 'info',
  },
  {
    id: '3',
    action: 'Rejected incomplete organization registration',
    time: '1 hour ago',
    type: 'error',
  },
  {
    id: '4',
    action: 'Booking BK003 marked as completed',
    time: '2 hours ago',
    type: 'success',
  },
  {
    id: '5',
    action: 'High verification queue detected',
    time: '3 hours ago',
    type: 'warning',
  },
];

export function RecentActivity() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-accent" size={16} />;
      case 'error':
        return <XCircle className="text-destructive" size={16} />;
      case 'warning':
        return <AlertCircle className="text-[#F6C6C7]" size={16} />;
      default:
        return <Clock className="text-primary" size={16} />;
    }
  };

  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground">Recent Activity</h3>
        <Badge variant="outline" className="text-xs">Live</Badge>
      </div>
      
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex-shrink-0 mt-1">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground break-words">{activity.action}</p>
                <p className="text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
