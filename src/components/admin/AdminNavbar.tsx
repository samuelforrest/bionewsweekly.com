import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LogOut, Home, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminNavbarProps {
  onLogout?: () => void;
}

export function AdminNavbar({ onLogout }: AdminNavbarProps) {
  return (
    <nav className="border-b border-border sticky top-0 z-50 backdrop-blur-md bg-card/95">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-green-500 p-2 shadow-lg group-hover:shadow-xl transition-shadow">
                  <Shield className="h-full w-full text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-primary via-green-500 to-emerald-500 bg-clip-text text-transparent">
                  Admin Portal
                </h1>
                <p className="text-xs text-muted-foreground">BioNewsWeekly &copy; Management</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            
            <ThemeToggle />
            
            {onLogout && (
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
