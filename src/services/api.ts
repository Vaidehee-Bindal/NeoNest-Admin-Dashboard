// Mock API service for NeoNest Admin Dashboard
// In production, replace these with real API calls

export interface DashboardStats {
  totalUsers: number;
  totalOrganizations: number;
  totalCaregivers: number;
  totalBookings: number;
  pendingVerifications: number;
}

export interface MonthlyBooking {
  month: string;
  bookings: number;
}

export interface VerificationItem {
  id: string;
  name: string;
  email: string;
  city: string;
  status: 'pending' | 'approved' | 'rejected';
  phone: string;
  type: 'woman' | 'organization' | 'caregiver';
  createdAt: string;
}

export interface Booking {
  id: string;
  motherId: string;
  motherName: string;
  organizationId: string;
  organizationName: string;
  caregiverId: string;
  caregiverName: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  date: string;
  serviceType: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockStats: DashboardStats = {
  totalUsers: 1247,
  totalOrganizations: 89,
  totalCaregivers: 342,
  totalBookings: 2156,
  pendingVerifications: 23,
};

const mockMonthlyBookings: MonthlyBooking[] = [
  { month: 'Jan', bookings: 145 },
  { month: 'Feb', bookings: 178 },
  { month: 'Mar', bookings: 203 },
  { month: 'Apr', bookings: 189 },
  { month: 'May', bookings: 234 },
  { month: 'Jun', bookings: 267 },
  { month: 'Jul', bookings: 298 },
  { month: 'Aug', bookings: 312 },
  { month: 'Sep', bookings: 289 },
  { month: 'Oct', bookings: 341 },
];

const mockVerifications: VerificationItem[] = [
  {
    id: 'W001',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    city: 'Mumbai',
    status: 'pending',
    phone: '+91 98765 43210',
    type: 'woman',
    createdAt: '2025-10-25',
  },
  {
    id: 'W002',
    name: 'Anita Desai',
    email: 'anita.desai@example.com',
    city: 'Delhi',
    status: 'pending',
    phone: '+91 98765 43211',
    type: 'woman',
    createdAt: '2025-10-24',
  },
  {
    id: 'O001',
    name: 'Care Plus Foundation',
    email: 'info@careplus.org',
    city: 'Bangalore',
    status: 'pending',
    phone: '+91 98765 43212',
    type: 'organization',
    createdAt: '2025-10-23',
  },
  {
    id: 'C001',
    name: 'Lakshmi Nair',
    email: 'lakshmi.nair@example.com',
    city: 'Chennai',
    status: 'approved',
    phone: '+91 98765 43213',
    type: 'caregiver',
    createdAt: '2025-10-22',
  },
  {
    id: 'C002',
    name: 'Sunita Rao',
    email: 'sunita.rao@example.com',
    city: 'Pune',
    status: 'pending',
    phone: '+91 98765 43214',
    type: 'caregiver',
    createdAt: '2025-10-21',
  },
];

const mockBookings: Booking[] = [
  {
    id: 'BK001',
    motherId: 'M001',
    motherName: 'Meera Patel',
    organizationId: 'O001',
    organizationName: 'Care Plus Foundation',
    caregiverId: 'C001',
    caregiverName: 'Lakshmi Nair',
    status: 'confirmed',
    date: '2025-10-28',
    serviceType: 'Neonatal Care',
  },
  {
    id: 'BK002',
    motherId: 'M002',
    motherName: 'Riya Kumar',
    organizationId: 'O002',
    organizationName: 'Mother Care Services',
    caregiverId: 'C002',
    caregiverName: 'Sunita Rao',
    status: 'pending',
    date: '2025-10-29',
    serviceType: 'Postnatal Support',
  },
  {
    id: 'BK003',
    motherId: 'M003',
    motherName: 'Kavya Singh',
    organizationId: 'O001',
    organizationName: 'Care Plus Foundation',
    caregiverId: 'C003',
    caregiverName: 'Asha Reddy',
    status: 'in-progress',
    date: '2025-10-27',
    serviceType: 'Full-time Care',
  },
  {
    id: 'BK004',
    motherId: 'M004',
    motherName: 'Deepa Menon',
    organizationId: 'O003',
    organizationName: 'New Life Care',
    caregiverId: 'C004',
    caregiverName: 'Radha Iyer',
    status: 'completed',
    date: '2025-10-20',
    serviceType: 'Day Care',
  },
  {
    id: 'BK005',
    motherId: 'M005',
    motherName: 'Sneha Gupta',
    organizationId: 'O002',
    organizationName: 'Mother Care Services',
    caregiverId: 'C005',
    caregiverName: 'Geeta Mishra',
    status: 'cancelled',
    date: '2025-10-15',
    serviceType: 'Neonatal Care',
  },
];

// Auth token storage
const TOKEN_KEY = 'neonest_admin_token';

export const authAPI = {
  async login(email: string, password: string): Promise<{ token: string; admin: any }> {
    await delay(800);
    
    // Mock validation
    if (email === 'admin@neonest.in' && password === 'admin123') {
      const token = 'mock_jwt_token_' + Date.now();
      const admin = {
        id: 'ADM001',
        name: 'Admin User',
        email: email,
        role: 'super_admin',
      };
      
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem('neonest_admin', JSON.stringify(admin));
      
      return { token, admin };
    }
    
    throw new Error('Invalid credentials');
  },
  
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('neonest_admin');
  },
  
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
  
  getAdmin(): any {
    const adminStr = localStorage.getItem('neonest_admin');
    return adminStr ? JSON.parse(adminStr) : null;
  },
};

export const dashboardAPI = {
  async getStats(): Promise<DashboardStats> {
    await delay(500);
    return mockStats;
  },
  
  async getMonthlyBookings(): Promise<MonthlyBooking[]> {
    await delay(500);
    return mockMonthlyBookings;
  },
};

export const verificationAPI = {
  async getAll(type?: 'woman' | 'organization' | 'caregiver'): Promise<VerificationItem[]> {
    await delay(600);
    if (type) {
      return mockVerifications.filter(v => v.type === type);
    }
    return mockVerifications;
  },
  
  async approve(id: string): Promise<void> {
    await delay(400);
    const item = mockVerifications.find(v => v.id === id);
    if (item) {
      item.status = 'approved';
    }
  },
  
  async reject(id: string): Promise<void> {
    await delay(400);
    const item = mockVerifications.find(v => v.id === id);
    if (item) {
      item.status = 'rejected';
    }
  },
};

export const bookingAPI = {
  async getAll(): Promise<Booking[]> {
    await delay(600);
    return mockBookings;
  },
  
  async updateStatus(id: string, status: Booking['status']): Promise<void> {
    await delay(400);
    const booking = mockBookings.find(b => b.id === id);
    if (booking) {
      booking.status = status;
    }
  },
  
  async forward(id: string, newCaregiverId: string): Promise<void> {
    await delay(400);
    // Mock forwarding logic
    console.log(`Forwarding booking ${id} to caregiver ${newCaregiverId}`);
  },
};
