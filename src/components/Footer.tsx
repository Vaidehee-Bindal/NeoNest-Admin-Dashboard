import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-muted-foreground text-center sm:text-left">
            © 2025 NeoNest. All rights reserved.
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            Made with <Heart size={16} className="text-secondary fill-secondary" /> for mothers and caregivers
          </p>
        </div>
      </div>
    </footer>
  );
}
