
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-10 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8 bg-primary rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-medium">P</div>
              </div>
              <span className="font-medium text-lg text-foreground">PayMaster</span>
            </div>
            <p className="text-muted-foreground text-sm mt-4 max-w-xs">
              A modern payroll system integrating seamlessly with enterprise environments for effortless employee management.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/salary-slip" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Salary Slip
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-muted-foreground text-xs text-center">
            © {currentYear} PayMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
