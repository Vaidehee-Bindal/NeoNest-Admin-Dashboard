import { motion } from 'motion/react';
import { Server, Database, Wifi, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface StatusItem {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  icon: any;
  responseTime?: string;
}

const systemServices: StatusItem[] = [
  {
    name: 'API Server',
    status: 'operational',
    icon: Server,
    responseTime: '45ms',
  },
  {
    name: 'Database',
    status: 'operational',
    icon: Database,
    responseTime: '12ms',
  },
  {
    name: 'Network',
    status: 'operational',
    icon: Wifi,
    responseTime: '8ms',
  },
];

export function SystemStatus() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return (
          <Badge className="bg-accent text-accent-foreground">
            <CheckCircle size={12} className="mr-1" />
            Operational
          </Badge>
        );
      case 'degraded':
        return (
          <Badge className="bg-[#FED7E2] text-[#831843]">
            <AlertCircle size={12} className="mr-1" />
            Degraded
          </Badge>
        );
      case 'down':
        return (
          <Badge variant="destructive">
            <AlertCircle size={12} className="mr-1" />
            Down
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground">System Status</h3>
        <Badge variant="outline" className="bg-accent/20 text-accent-foreground border-accent">
          All Systems Go
        </Badge>
      </div>

      <div className="space-y-3">
        {systemServices.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground">{service.name}</p>
                  {service.responseTime && (
                    <p className="text-muted-foreground">{service.responseTime}</p>
                  )}
                </div>
              </div>
              {getStatusBadge(service.status)}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-muted-foreground text-center">
          Last checked: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </Card>
  );
}
