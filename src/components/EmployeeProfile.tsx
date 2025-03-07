
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Mail, Phone, Building, Download } from 'lucide-react';
import { toast } from 'sonner';

interface EmployeeProfileProps {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  employeeId: string;
  joinDate: string;
  imageUrl?: string;
}

const EmployeeProfile = ({
  name,
  position,
  department,
  email,
  phone,
  employeeId,
  joinDate,
  imageUrl
}: EmployeeProfileProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDownloadDetails = () => {
    toast.success('Employee details downloaded');
  };
  
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card 
      className="overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-24 bg-gradient-to-r from-primary/80 to-primary">
        <Button
          size="sm"
          variant="secondary"
          className="absolute right-4 top-4 opacity-0 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <Edit className="h-4 w-4 mr-1" />
          <span className="text-xs">Edit</span>
        </Button>
      </div>
      
      <div className="px-6 pb-6">
        <div className="flex justify-center">
          <Avatar className="h-20 w-20 border-4 border-background -mt-10 shadow-sm">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback className="text-lg font-medium">{initials}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="mt-3 text-center">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{position}</p>
          <Badge variant="secondary" className="mt-2">
            {department}
          </Badge>
        </div>
        
        <div className="mt-6 space-y-3">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-muted-foreground">{email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-muted-foreground">{phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <Building className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-muted-foreground">Employee ID: {employeeId}</span>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Join Date: {joinDate}
            </div>
            <Button 
              size="sm"
              variant="ghost"
              onClick={handleDownloadDetails}
              className="h-8 px-2"
            >
              <Download className="h-4 w-4 mr-1" />
              <span className="text-xs">Details</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeProfile;
