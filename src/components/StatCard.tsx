import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from './ui/card';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, gradient, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-border">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-muted-foreground">{title}</p>
            <h3 className="text-foreground">{value}</h3>
          </div>
          <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
            <Icon className="text-white" size={24} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
