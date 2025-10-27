import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, Eye, Search } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Skeleton } from '../components/ui/skeleton';
import { toast } from 'sonner@2.0.3';
import { verificationAPI, VerificationItem } from '../services/api';

export function Verifications() {
  const [verifications, setVerifications] = useState<VerificationItem[]>([]);
  const [filteredVerifications, setFilteredVerifications] = useState<VerificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('women');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<VerificationItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadVerifications();
  }, [activeTab]);

  useEffect(() => {
    filterVerifications();
  }, [searchQuery, verifications]);

  const loadVerifications = async () => {
    setLoading(true);
    try {
      const type = activeTab === 'women' ? 'woman' : activeTab === 'organizations' ? 'organization' : 'caregiver';
      const data = await verificationAPI.getAll(type);
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

  const handleApprove = async (id: string) => {
    try {
      await verificationAPI.approve(id);
      toast.success('Verification approved successfully');
      loadVerifications();
      setDialogOpen(false);
    } catch (error) {
      toast.error('Failed to approve verification');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await verificationAPI.reject(id);
      toast.success('Verification rejected');
      loadVerifications();
      setDialogOpen(false);
    } catch (error) {
      toast.error('Failed to reject verification');
    }
  };

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
        <h1 className="mb-2">Verification Management</h1>
        <p className="text-muted-foreground">
          Review and approve registrations for women, organizations, and caregivers.
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

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-full md:max-w-md grid-cols-3">
              <TabsTrigger value="women" className="text-xs md:text-sm">Women</TabsTrigger>
              <TabsTrigger value="organizations" className="text-xs md:text-sm">Organizations</TabsTrigger>
              <TabsTrigger value="caregivers" className="text-xs md:text-sm">Caregivers</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4 md:mt-6">
              {loading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : filteredVerifications.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No verifications found.
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
                              {item.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleApprove(item.id)}
                                    className="text-accent hover:bg-accent/10"
                                  >
                                    <CheckCircle size={16} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleReject(item.id)}
                                    className="text-destructive hover:bg-destructive/10"
                                  >
                                    <XCircle size={16} />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
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

              {selectedItem.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button
                    className="flex-1 bg-accent hover:bg-accent/90"
                    onClick={() => handleApprove(selectedItem.id)}
                  >
                    <CheckCircle size={18} className="mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleReject(selectedItem.id)}
                  >
                    <XCircle size={18} className="mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
