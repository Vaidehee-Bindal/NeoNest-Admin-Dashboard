import { motion } from 'motion/react';
import { UserPlus, FileText, Download, RefreshCw } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface QuickActionsProps {
  onNavigate: (page: string) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const actions = [
    {
      icon: UserPlus,
      label: 'New Verification',
      description: 'Review pending verifications',
      onClick: () => onNavigate('verifications'),
      gradient: 'from-primary to-[#7BB3D3]',
    },
    {
      icon: FileText,
      label: 'View Reports',
      description: 'Generate analytics reports',
      onClick: () => onNavigate('analytics'),
      gradient: 'from-secondary to-[#E4A5A6]',
    },
    {
      icon: Download,
      label: 'Export Data',
      description: 'Download user data',
      onClick: () => alert('Export functionality coming soon!'),
      gradient: 'from-accent to-[#A5C9A7]',
    },
    {
      icon: RefreshCw,
      label: 'Sync System',
      description: 'Refresh dashboard data',
      onClick: () => window.location.reload(),
      gradient: 'from-[#D1C4E9] to-[#B8A9D4]',
    },
  ];

  return (
    <Card className="p-4 md:p-6">
      <h3 className="mb-4 text-foreground">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full h-auto flex flex-col items-start p-4 hover:shadow-md transition-all group"
                onClick={action.onClick}
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${action.gradient} mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={20} />
                </div>
                <div className="text-left w-full">
                  <p className="text-foreground mb-1">{action.label}</p>
                  <p className="text-muted-foreground text-xs">{action.description}</p>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
