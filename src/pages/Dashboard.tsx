
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Download, ArrowRight, FileText, CreditCard, Users, Settings, User, PieChart, BarChart4 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SalaryCard from '@/components/SalaryCard';
import SalaryChart from '@/components/SalaryChart';
import EmployeeProfile from '@/components/EmployeeProfile';
import { downloadSalarySlip, emailSalarySlip, downloadBankAdvice } from '@/utils/pdfGenerator';
import { toast } from 'sonner';

// Sample data for the dashboard
const mockSalaryDetails = {
  employeeName: "John Doe",
  employeeId: "EMP-2023-001",
  month: "June",
  year: 2023,
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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sample data for the salary breakdown chart
  const salaryBreakdown = [
    { name: 'Basic Salary', value: 3500, color: '#3b82f6' },
    { name: 'House Rent', value: 800, color: '#10b981' },
    { name: 'COLA', value: 400, color: '#6366f1' },
    { name: 'Utilities', value: 300, color: '#f59e0b' },
  ];
  
  const totalSalary = salaryBreakdown.reduce((sum, item) => sum + item.value, 0);
  
  // Recent salary payments
  const recentPayments = [
    { month: "June", year: 2023, amount: 5000, isPaid: true, paymentDate: "June 28, 2023" },
    { month: "May", year: 2023, amount: 5000, isPaid: true, paymentDate: "May 29, 2023" },
    { month: "April", year: 2023, amount: 4800, isPaid: true, paymentDate: "April 28, 2023" },
    { month: "March", year: 2023, amount: 4800, isPaid: true, paymentDate: "March 29, 2023" },
  ];
  
  // Handle downloading of salary slip
  const handleDownloadSalarySlip = async () => {
    await downloadSalarySlip(mockSalaryDetails);
  };
  
  // Handle emailing of salary slip
  const handleEmailSalarySlip = async () => {
    await emailSalarySlip(mockSalaryDetails, "john.doe@example.com");
  };
  
  // Handle downloading of bank advice
  const handleDownloadBankAdvice = async () => {
    const employees = [mockSalaryDetails];
    await downloadBankAdvice(employees, "June", 2023);
  };
  
  const handleAdminAction = () => {
    toast.info("This feature requires administrator access");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-medium">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your payroll and employee benefits</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" onClick={handleAdminAction}>
              <Settings className="h-4 w-4 mr-2" />
              Admin Settings
            </Button>
            <Button onClick={handleAdminAction}>
              <Download className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="salary">Salary</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base">Current Salary</CardTitle>
                    <CardDescription>June 2023</CardDescription>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">${totalSalary.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Next payment: June 30, 2023
                  </p>
                  <Button variant="ghost" size="sm" className="mt-4 h-8 w-full" asChild>
                    <Link to="/salary-slip">
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base">Salary Slips</CardTitle>
                    <CardDescription>All payment records</CardDescription>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">12</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last 12 months available
                  </p>
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="h-8 flex-1" onClick={handleDownloadSalarySlip}>
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 flex-1" onClick={handleEmailSalarySlip}>
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base">Bank Advice</CardTitle>
                    <CardDescription>For financial department</CardDescription>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart4 className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">HSBC Bank</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Account: XXXX-XXXX-1234
                  </p>
                  <Button variant="ghost" size="sm" className="mt-4 h-8 w-full" onClick={handleDownloadBankAdvice}>
                    Generate Advice
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SalaryChart 
                  data={salaryBreakdown} 
                  total={totalSalary} 
                  currency="$" 
                />
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest payroll events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { 
                        title: "Salary Processed", 
                        description: "June 2023 salary has been processed", 
                        date: "June 28, 2023",
                        icon: <CreditCard className="h-4 w-4 text-primary" /> 
                      },
                      { 
                        title: "Tax Deduction", 
                        description: "Monthly tax deducted from salary", 
                        date: "June 28, 2023",
                        icon: <FileText className="h-4 w-4 text-primary" /> 
                      },
                      { 
                        title: "Benefits Update", 
                        description: "COLA adjustment for Q2 2023", 
                        date: "June 15, 2023",
                        icon: <PieChart className="h-4 w-4 text-primary" /> 
                      },
                      { 
                        title: "Profile Updated", 
                        description: "Contact information changed", 
                        date: "June 10, 2023",
                        icon: <User className="h-4 w-4 text-primary" /> 
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 mt-0.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            {item.icon}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Salary Tab */}
          <TabsContent value="salary" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Payment</CardTitle>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardDescription>Your next salary payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-2xl font-medium">${totalSalary.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-1">Scheduled for June 30, 2023</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-foreground font-medium">Pending</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Bank:</span>
                      <span className="text-foreground font-medium">HSBC Bank</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Account:</span>
                      <span className="text-foreground font-medium">XXXX-XXXX-1234</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={handleDownloadSalarySlip}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Slip
                  </Button>
                </CardContent>
              </Card>
              
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits Breakdown</CardTitle>
                    <CardDescription>Your salary components for June 2023</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Basic Salary", value: mockSalaryDetails.basic, percentage: 70 },
                        { name: "House Rent Allowance", value: mockSalaryDetails.houseRent, percentage: 16 },
                        { name: "Cost of Living Adjustment", value: mockSalaryDetails.cola, percentage: 8 },
                        { name: "Utilities Allowance", value: mockSalaryDetails.utilities, percentage: 6 },
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">{item.name}</span>
                            <span className="text-sm font-medium">${item.value.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                        <span className="font-medium">Total Salary</span>
                        <span className="font-bold">${totalSalary.toLocaleString()}</span>
                      </div>
                      
                      <div className="pt-2 pb-2 space-y-2 border-t border-border">
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-muted-foreground">Tax Deduction</span>
                          <span className="text-sm font-medium text-destructive">-${mockSalaryDetails.taxDeduction?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Net Pay</span>
                          <span className="font-bold">${mockSalaryDetails.netPay?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Your recent salary payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recentPayments.map((payment, index) => (
                    <SalaryCard 
                      key={index}
                      {...payment}
                      onClick={() => toast.success(`Viewing details for ${payment.month} ${payment.year}`)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <EmployeeProfile 
                  name="John Doe"
                  position="Senior Developer"
                  department="Engineering"
                  email="john.doe@example.com"
                  phone="+1 (555) 123-4567"
                  employeeId="EMP-2023-001"
                  joinDate="January 15, 2020"
                  imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                />
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Employment Details</CardTitle>
                    <CardDescription>Your current employment information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { label: "Employee ID", value: "EMP-2023-001" },
                          { label: "Department", value: "Engineering" },
                          { label: "Position", value: "Senior Developer" },
                          { label: "Reporting To", value: "Jane Smith" },
                          { label: "Join Date", value: "January 15, 2020" },
                          { label: "Contract Type", value: "Full Time" },
                          { label: "Work Location", value: "San Francisco, CA" },
                          { label: "Work Schedule", value: "Monday - Friday, 9AM - 6PM" }
                        ].map((item, index) => (
                          <div key={index}>
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                            <p className="text-sm font-medium mt-1">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <h3 className="text-sm font-medium text-foreground mb-4">Bank Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            { label: "Bank Name", value: "HSBC Bank" },
                            { label: "Account Holder", value: "John Doe" },
                            { label: "Account Number", value: "XXXX-XXXX-1234" },
                            { label: "Routing Number", value: "XXXX-XXXX" }
                          ].map((item, index) => (
                            <div key={index}>
                              <p className="text-sm text-muted-foreground">{item.label}</p>
                              <p className="text-sm font-medium mt-1">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Your colleagues in the Engineering department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Jane Smith", position: "Engineering Director", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" },
                        { name: "Robert Johnson", position: "Senior Developer", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" },
                        { name: "Emily Chen", position: "Full Stack Developer", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" },
                        { name: "Michael Brown", position: "DevOps Engineer", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" }
                      ].map((member, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={member.imageUrl} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.position}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
