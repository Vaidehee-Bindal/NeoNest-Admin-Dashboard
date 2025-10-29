// API service for NeoNest Admin Dashboard
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
  selectedCaregiver: string;
  city: string;
  services: string[];
  startDate: string;
  endDate: string;
  startTime: string;
  duration: string;
  frequency: string;
  serviceAddress: string;
  specialInstructions: string;
  babyAge: string;
  urgency: string;
  specialNeeds: string;
  amount: number;
  paymentStatus: string;
  paymentMethod: string;
  transactionId: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes: string;
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

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<any> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const authAPI = {
  async login(email: string, password: string): Promise<{ token: string; admin: any }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await handleResponse<{ success: boolean; token: string; admin: any }>(response);
      
      if (data.success && data.token && data.admin) {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem('neonest_admin', JSON.stringify(data.admin));
        return { token: data.token, admin: data.admin };
      }
      
      throw new Error(data.message || 'Invalid response from server');
    } catch (error: any) {
      throw new Error(error.message || 'Failed to login');
    }
  },
  
  async verify(): Promise<{ admin: any } | null> {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        return null;
      }

      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const data = await handleResponse<{ admin: any }>(response);
      
      if (data.success && data.admin) {
        localStorage.setItem('neonest_admin', JSON.stringify(data.admin));
        return { admin: data.admin };
      }
      
      return null;
    } catch (error) {
      // Token is invalid, clear storage
      authAPI.logout();
      return null;
    }
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
    // TODO: Replace with real API call when dashboard endpoints are ready
    // For now, using mock data
    await delay(500);
    return mockStats;
  },
  
  async getMonthlyBookings(): Promise<MonthlyBooking[]> {
    // TODO: Replace with real API call when dashboard endpoints are ready
    // For now, using mock data
    await delay(500);
    return mockMonthlyBookings;
  },
};

export const verificationAPI = {
  async getAll(type?: 'woman' | 'organization' | 'caregiver'): Promise<VerificationItem[]> {
    if (type === 'caregiver') {
      const response = await fetch(`${API_BASE_URL}/verifications/caregivers`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      const data = await handleResponse<{ success: boolean; caregivers: any[] }>(response);
      if (data.success && Array.isArray(data.caregivers)) {
        // Map to unified fields expected by UI
        return data.caregivers.map((c, index) => ({
          id: String(index + 1),
          name: `${c.fname ?? c.name ?? ''}${c.lname ? ` ${c.lname}` : ''}`.trim(),
          email: c.email,
          city: c.selectedCity ?? c.city,
          status: c.status,
          phone: c.phone,
          type: 'caregiver',
          createdAt: c.createdAt,
        }));
      }
      return [];
    }
    // Fallback to mock for other types until backend endpoints exist
    await delay(600);
    if (type) return mockVerifications.filter(v => v.type === type);
    return mockVerifications;
  },
  
  async approve(id: string): Promise<void> {
    // TODO: Replace with real API call when verification endpoints are ready
    await delay(400);
    const item = mockVerifications.find(v => v.id === id);
    if (item) {
      item.status = 'approved';
    }
  },
  
  async reject(id: string): Promise<void> {
    // TODO: Replace with real API call when verification endpoints are ready
    await delay(400);
    const item = mockVerifications.find(v => v.id === id);
    if (item) {
      item.status = 'rejected';
    }
  },
};

export const bookingAPI = {
  async getAll(): Promise<Booking[]> {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const data = await handleResponse<{ success: boolean; bookings: any[] }>(response);
    if (data.success && Array.isArray(data.bookings)) {
      return data.bookings.map((b) => ({
        id: b.id || b._id,
        selectedCaregiver: b.selectedCaregiver,
        city: b.city,
        services: Array.isArray(b.services) ? b.services : [],
        startDate: typeof b.startDate === 'string' ? b.startDate : new Date(b.startDate).toISOString(),
        endDate: typeof b.endDate === 'string' ? b.endDate : new Date(b.endDate).toISOString(),
        startTime: b.startTime,
        duration: b.duration,
        frequency: b.frequency,
        serviceAddress: b.serviceAddress,
        specialInstructions: b.specialInstructions,
        babyAge: b.babyAge,
        urgency: b.urgency,
        specialNeeds: b.specialNeeds,
        amount: Number(b.amount ?? 0),
        paymentStatus: b.paymentStatus,
        paymentMethod: b.paymentMethod,
        transactionId: b.transactionId,
        status: b.status,
        notes: b.notes,
      }));
    }
    return [];
  },
  
  async updateStatus(id: string, status: Booking['status']): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    await handleResponse<{ success: boolean; booking: any }>(response);
  },
  
  async forward(id: string, newCaregiverId: string): Promise<void> {
    // TODO: Replace with real API call when booking endpoints are ready
    await delay(400);
    console.log(`Forwarding booking ${id} to caregiver ${newCaregiverId}`);
  },
};
