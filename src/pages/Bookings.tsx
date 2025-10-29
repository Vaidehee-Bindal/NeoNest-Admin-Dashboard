import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Filter } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Skeleton } from '../components/ui/skeleton';
import { toast } from 'sonner';
import { bookingAPI, Booking } from '../services/api';

export function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [statusFilter, bookings]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingAPI.getAll();
      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    if (statusFilter === 'all') {
      setFilteredBookings(bookings);
      return;
    }

    const filtered = bookings.filter((booking) => booking.status === statusFilter);
    setFilteredBookings(filtered);
  };

  const handleStatusChange = async (id: string, newStatus: Booking['status']) => {
    try {
      await bookingAPI.updateStatus(id, newStatus);
      toast.success('Booking status updated');
      loadBookings();
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };

  const handleForward = async (id: string) => {
    try {
      await bookingAPI.forward(id, 'NEW_CAREGIVER_ID');
      toast.success('Booking forwarded to another caregiver');
      loadBookings();
    } catch (error) {
      toast.error('Failed to forward booking');
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: 'default' | 'secondary' | 'destructive'; className: string }> = {
      pending: { variant: 'secondary', className: 'bg-[#FED7E2] text-[#831843]' },
      confirmed: { variant: 'default', className: 'bg-[#A6DCEF] text-[#0C4A6E]' },
      'in-progress': { variant: 'default', className: 'bg-[#C8E6C9] text-[#1B5E20]' },
      completed: { variant: 'default', className: 'bg-[#D1C4E9] text-[#4A148C]' },
      cancelled: { variant: 'destructive', className: '' },
    };

    const { className } = config[status] || { variant: 'default', className: '' };

    return (
      <Badge className={className}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
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
        <h1 className="mb-2">Booking Management</h1>
        <p className="text-muted-foreground">
          Manage and monitor all bookings across the platform.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4"
      >
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-muted-foreground" />
          <span className="text-muted-foreground whitespace-nowrap">Filter by status:</span>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Bookings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bookings</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Table */}
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
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No bookings found.
            </div>
          ) : (
            <div className="rounded-md border border-border overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Booking ID</TableHead>
                    <TableHead className="whitespace-nowrap">Caregiver</TableHead>
                    <TableHead className="whitespace-nowrap">City</TableHead>
                    <TableHead className="whitespace-nowrap">Services</TableHead>
                    <TableHead className="whitespace-nowrap">Date Range</TableHead>
                    <TableHead className="whitespace-nowrap">Time</TableHead>
                    <TableHead className="whitespace-nowrap">Duration</TableHead>
                    <TableHead className="whitespace-nowrap">Frequency</TableHead>
                    <TableHead className="whitespace-nowrap">Amount</TableHead>
                    <TableHead className="whitespace-nowrap">Payment</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{booking.selectedCaregiver}</TableCell>
                      <TableCell>{booking.city}</TableCell>
                      <TableCell>{Array.isArray(booking.services) ? booking.services.join(', ') : ''}</TableCell>
                      <TableCell>
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{booking.startTime}</TableCell>
                      <TableCell>{booking.duration}</TableCell>
                      <TableCell>{booking.frequency}</TableCell>
                      <TableCell>
                        {Intl.NumberFormat(undefined, { style: 'currency', currency: 'INR' }).format(booking.amount || 0)}
                      </TableCell>
                      <TableCell>
                        {booking.paymentStatus} {booking.paymentMethod ? `(${booking.paymentMethod})` : ''}
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          {booking.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                className="text-primary hover:bg-primary/10"
                              >
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleForward(booking.id)}
                                className="text-secondary"
                              >
                                <ArrowRight size={16} />
                              </Button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <Select
                              value={booking.status}
                              onValueChange={(value) => handleStatusChange(booking.id, value as Booking['status'])}
                            >
                              <SelectTrigger className="w-36 h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                          {booking.status === 'in-progress' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(booking.id, 'completed')}
                              className="text-accent hover:bg-accent/10"
                            >
                              Mark Complete
                            </Button>
                          )}
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
    </div>
  );
}
