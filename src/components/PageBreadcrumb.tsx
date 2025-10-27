import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

interface PageBreadcrumbProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const pageLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  verifications: 'Verifications',
  bookings: 'Bookings',
  activity: 'Activity Logs',
  settings: 'Settings',
};

export function PageBreadcrumb({ currentPage, onNavigate }: PageBreadcrumbProps) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-1 cursor-pointer hover:text-primary"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {currentPage !== 'dashboard' && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight size={14} />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{pageLabels[currentPage] || currentPage}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
