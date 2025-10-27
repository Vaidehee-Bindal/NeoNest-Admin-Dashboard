import { useState } from 'react';
import { Search, FileText, Calendar, User, Building2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (page: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'page' | 'user' | 'booking' | 'organization';
  description: string;
  icon: any;
  action: () => void;
}

export function SearchDialog({ open, onOpenChange, onNavigate }: SearchDialogProps) {
  const [query, setQuery] = useState('');

  const allResults: SearchResult[] = [
    {
      id: '1',
      title: 'Dashboard',
      type: 'page',
      description: 'View dashboard overview',
      icon: FileText,
      action: () => {
        onNavigate('dashboard');
        onOpenChange(false);
      },
    },
    {
      id: '2',
      title: 'Analytics',
      type: 'page',
      description: 'View detailed analytics',
      icon: FileText,
      action: () => {
        onNavigate('analytics');
        onOpenChange(false);
      },
    },
    {
      id: '3',
      title: 'Verifications',
      type: 'page',
      description: 'Manage verifications',
      icon: FileText,
      action: () => {
        onNavigate('verifications');
        onOpenChange(false);
      },
    },
    {
      id: '4',
      title: 'Bookings',
      type: 'page',
      description: 'View all bookings',
      icon: Calendar,
      action: () => {
        onNavigate('bookings');
        onOpenChange(false);
      },
    },
    {
      id: '5',
      title: 'Activity Logs',
      type: 'page',
      description: 'View activity history',
      icon: FileText,
      action: () => {
        onNavigate('activity');
        onOpenChange(false);
      },
    },
    {
      id: '6',
      title: 'Priya Sharma',
      type: 'user',
      description: 'Pending verification - Mumbai',
      icon: User,
      action: () => {
        onNavigate('verifications');
        onOpenChange(false);
      },
    },
    {
      id: '7',
      title: 'Care Plus Foundation',
      type: 'organization',
      description: 'Pending verification - Bangalore',
      icon: Building2,
      action: () => {
        onNavigate('verifications');
        onOpenChange(false);
      },
    },
    {
      id: '8',
      title: 'BK001',
      type: 'booking',
      description: 'Meera Patel - Confirmed',
      icon: Calendar,
      action: () => {
        onNavigate('bookings');
        onOpenChange(false);
      },
    },
  ];

  const filteredResults = query
    ? allResults.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
      )
    : allResults;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Dashboard</DialogTitle>
          <DialogDescription>
            Search for pages, users, bookings, and more
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>

        <ScrollArea className="max-h-96">
          <div className="space-y-2">
            {filteredResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No results found
              </div>
            ) : (
              filteredResults.map((result) => {
                const Icon = result.icon;
                return (
                  <button
                    key={result.id}
                    onClick={result.action}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground truncate">{result.title}</p>
                      <p className="text-muted-foreground truncate">{result.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground capitalize px-2 py-1 bg-muted rounded">
                      {result.type}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
