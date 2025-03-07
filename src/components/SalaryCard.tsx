
import { useState } from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SalaryCardProps {
  month: string;
  year: number;
  amount: number;
  currency?: string;
  isPaid: boolean;
  paymentDate?: string;
  onClick?: () => void;
}

const SalaryCard = ({
  month,
  year,
  amount,
  currency = '$',
  isPaid,
  paymentDate,
  onClick
}: SalaryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success('Salary slip downloaded successfully');
  };
  
  const handleEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success('Salary slip sent to your email');
  };
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 cursor-pointer",
        isHovered && "shadow-lg transform -translate-y-1",
        isPaid ? "border-border" : "border-muted"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-medium">{month}</CardTitle>
            <CardDescription>{year}</CardDescription>
          </div>
          <div 
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              isPaid 
                ? "bg-green-50 text-green-700" 
                : "bg-orange-50 text-orange-700"
            )}
          >
            {isPaid ? 'Paid' : 'Pending'}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="text-3xl font-medium tracking-tight">
            {currency}{amount.toLocaleString()}
          </div>
          {paymentDate && (
            <p className="text-xs text-muted-foreground">
              Payment Date: {paymentDate}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className={cn(
        "bg-muted/50 border-t border-border pt-3 pb-3 px-6 flex justify-between",
        isHovered && "bg-muted"
      )}>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleDownload}
            className="h-8 px-2"
          >
            <Download className="h-4 w-4 mr-1" />
            <span className="text-xs">PDF</span>
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleEmail}
            className="h-8 px-2"
          >
            <Mail className="h-4 w-4 mr-1" />
            <span className="text-xs">Email</span>
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "h-8 px-2 transition-all",
            isHovered ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
          )}
        >
          <span className="text-xs">Details</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SalaryCard;
