import { motion } from 'motion/react';
import { Moon, Sun, Bell, Shield, Globe } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { useState } from 'react';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function Settings({ isDarkMode, onToggleTheme }: SettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your admin dashboard preferences and configurations.
        </p>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
              {isDarkMode ? <Moon className="text-white" size={20} /> : <Sun className="text-white" size={20} />}
            </div>
            <div className="min-w-0 flex-1">
              <h3>Appearance</h3>
              <p className="text-muted-foreground truncate">Customize the look and feel</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between py-3 gap-4">
            <div className="space-y-1 min-w-0 flex-1">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-muted-foreground">Enable dark theme</p>
            </div>
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={onToggleTheme}
            />
          </div>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-mint">
              <Bell className="text-white" size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <h3>Notifications</h3>
              <p className="text-muted-foreground truncate">Manage notification preferences</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 gap-4">
              <div className="space-y-1 min-w-0 flex-1">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-muted-foreground">Receive in-app notifications</p>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between py-3 gap-4">
              <div className="space-y-1 min-w-0 flex-1">
                <Label htmlFor="email-alerts">Email Alerts</Label>
                <p className="text-muted-foreground">Get email notifications for important updates</p>
              </div>
              <Switch
                id="email-alerts"
                checked={emailAlerts}
                onCheckedChange={setEmailAlerts}
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-secondary to-peach">
              <Shield className="text-white" size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <h3>Security</h3>
              <p className="text-muted-foreground truncate">Security and privacy settings</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <div className="py-3">
              <Label>Session Timeout</Label>
              <p className="text-muted-foreground">Auto logout after 30 minutes of inactivity</p>
            </div>
            <div className="py-3">
              <Label>Two-Factor Authentication</Label>
              <p className="text-muted-foreground">Coming soon</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* System */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-lavender to-[#B8A9D4]">
              <Globe className="text-white" size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <h3>System Information</h3>
              <p className="text-muted-foreground truncate">About this admin dashboard</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Version</span>
              <span className="text-foreground">1.0.0</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="text-foreground">October 27, 2025</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Environment</span>
              <span className="text-foreground">Production</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
