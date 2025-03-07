
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Printer, Mail, ChevronLeft, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { downloadSalarySlip, emailSalarySlip } from '@/utils/pdfGenerator';
import { toast } from 'sonner';

const SalarySlip = () => {
  const [selectedMonth, setSelectedMonth] = useState("June");
  const [selectedYear, setSelectedYear] = useState("2023");
  
  // Sample data for the salary slip
  const salaryDetails = {
    employeeName: "John Doe",
    employeeId: "EMP-2023-001",
    month: selectedMonth,
    year: parseInt(selectedYear),
    basic: 3500,
    houseRent: 800,
    cola: 400,
    utilities: 300,
    total: 5000,
    bankName: "HSBC Bank",
    accountNumber: "XXXX-XXXX-1234",
    department: "Engineering",
    position: "Senior Developer",
    taxDeduction: 500,
    netPay: 4500
  };
  
  // Handle downloading of salary slip
  const handleDownloadSalarySlip = async () => {
    await downloadSalarySlip(salaryDetails);
  };
  
  // Handle emailing of salary slip
  const handleEmailSalarySlip = async () => {
    await emailSalarySlip(salaryDetails, "john.doe@example.com");
  };
  
  // Handle printing of salary slip
  const handlePrintSalarySlip = () => {
    window.print();
    toast.success("Print dialog opened");
  };
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = ["2023", "2022", "2021", "2020"];
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-32 px-6 max-w-4xl mx-auto w-full">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <Button variant="ghost" asChild className="-ml-4 mb-2">
              <Link to="/dashboard">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-medium">Salary Slip</h1>
            <p className="text-muted-foreground mt-1">View and download your salary details</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <div className="flex items-center space-x-2">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div id="salary-slip" className="salary-slip-container">
          <Card className="animate-scale-in">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center space-x-2">
                  <div className="relative w-10 h-10 bg-primary rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary" />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-medium">P</div>
                  </div>
                  <div>
                    <CardTitle>PayMaster Inc.</CardTitle>
                    <CardDescription>Official Salary Slip</CardDescription>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{selectedMonth} {selectedYear}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Employee</p>
                  <p className="text-base font-medium">{salaryDetails.employeeName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p className="text-base font-medium">{salaryDetails.employeeId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="text-base font-medium">{salaryDetails.department}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Position</p>
                  <p className="text-base font-medium">{salaryDetails.position}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Bank</p>
                  <p className="text-base font-medium">{salaryDetails.bankName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Account Number</p>
                  <p className="text-base font-medium">{salaryDetails.accountNumber}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">Salary Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Basic Salary</div>
                    <div className="text-sm font-medium">${salaryDetails.basic.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">House Rent Allowance</div>
                    <div className="text-sm font-medium">${salaryDetails.houseRent.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Cost of Living Adjustment</div>
                    <div className="text-sm font-medium">${salaryDetails.cola.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Utilities Allowance</div>
                    <div className="text-sm font-medium">${salaryDetails.utilities.toLocaleString()}</div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center pt-1">
                    <div className="text-sm font-medium">Total Earnings</div>
                    <div className="text-sm font-bold">${salaryDetails.total.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Deductions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Income Tax</div>
                    <div className="text-sm font-medium">${salaryDetails.taxDeduction?.toLocaleString()}</div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center pt-1">
                    <div className="text-sm font-medium">Total Deductions</div>
                    <div className="text-sm font-bold">${salaryDetails.taxDeduction?.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="text-base font-medium">Net Pay</div>
                  <div className="text-lg font-bold">${salaryDetails.netPay?.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="pt-2 text-xs text-muted-foreground">
                <p>This is a computer-generated document and does not require a signature.</p>
                <p>For any questions regarding your salary slip, please contact HR at hr@paymaster.com</p>
              </div>
            </CardContent>
            
            <CardFooter className="bg-muted/30 border-t border-border flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Generated on {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={handlePrintSalarySlip}>
                  <Printer className="h-4 w-4 mr-1" />
                  Print
                </Button>
                <Button size="sm" variant="outline" onClick={handleEmailSalarySlip}>
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
                <Button size="sm" onClick={handleDownloadSalarySlip}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SalarySlip;
