import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, Eye, Search } from 'lucide-react';
import { Card } from '../components/ui/card';
// Tabs removed since we only show caregivers
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Skeleton } from '../components/ui/skeleton';
import { toast } from 'sonner';
import { verificationAPI, VerificationItem } from '../services/api';

export function Verifications() {
  const [verifications, setVerifications] = useState<VerificationItem[]>([]);
  const [filteredVerifications, setFilteredVerifications] = useState<VerificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  // Only caregivers view
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<VerificationItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadVerifications();
  }, []);

  useEffect(() => {
    filterVerifications();
  }, [searchQuery, verifications]);

  const loadVerifications = async () => {
    setLoading(true);
    try {
      const data = await verificationAPI.getAll('caregiver');
      setVerifications(data);
      setFilteredVerifications(data);
    } catch (error) {
      toast.error('Failed to load verifications');
    } finally {
      setLoading(false);
    }
  };

  const filterVerifications = () => {
    if (!searchQuery) {
      setFilteredVerifications(verifications);
      return;
    }

    const filtered = verifications.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVerifications(filtered);
  };

  // Approve/Reject removed (view-only)

  const handleViewDetails = (item: VerificationItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive',
    };

    return (
      <Badge variant={variants[status] || 'default'} className={status === 'approved' ? 'bg-accent text-accent-foreground' : ''}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-2">Caregiver Verifications</h1>
        <p className="text-muted-foreground">
          Review caregiver applications from the database.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search by name, email, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Caregivers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-4 md:p-6">
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredVerifications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No caregiver verifications found.
            </div>
          ) : (
            <div className="rounded-md border border-border overflow-x-auto">
              <Table className="min-w-[640px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">ID</TableHead>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Email</TableHead>
                    <TableHead className="whitespace-nowrap">City</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Date</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVerifications.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(item)}
                          >
                            <Eye size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verification Details</DialogTitle>
            <DialogDescription>
              Review the details and approve or reject this verification.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">ID</p>
                  <p className="text-foreground">{selectedItem.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  {getStatusBadge(selectedItem.status)}
                </div>
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="text-foreground">{selectedItem.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="text-foreground">{selectedItem.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="text-foreground">{selectedItem.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">City</p>
                  <p className="text-foreground">{selectedItem.city}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="text-foreground capitalize">{selectedItem.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created At</p>
                  <p className="text-foreground">{new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              {/* Actions removed */}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
