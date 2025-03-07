
import { toast } from 'sonner';

export interface SalaryDetails {
  employeeName: string;
  employeeId: string;
  month: string;
  year: number;
  basic: number;
  houseRent: number;
  cola: number;
  utilities: number;
  total: number;
  bankName?: string;
  accountNumber?: string;
  department?: string;
  position?: string;
  taxDeduction?: number;
  netPay?: number;
}

/**
 * Generate a PDF salary slip for an employee
 * In a real application, this would use a library like jsPDF or react-pdf
 */
export const generateSalarySlipPDF = (details: SalaryDetails): Promise<Blob> => {
  // This is a mock function - in a real application you would generate an actual PDF
  console.log('Generating PDF for', details);
  
  // Simulate PDF generation with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, this would return the actual PDF blob
      const mockPdfBlob = new Blob(['PDF content would go here'], { type: 'application/pdf' });
      resolve(mockPdfBlob);
    }, 1500);
  });
};

/**
 * Download the generated PDF
 */
export const downloadSalarySlip = async (details: SalaryDetails): Promise<void> => {
  try {
    toast.promise(
      generateSalarySlipPDF(details).then(blob => {
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
        
        // Create a link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `salary-slip-${details.employeeName.replace(/\s+/g, '-').toLowerCase()}-${details.month.toLowerCase()}-${details.year}.pdf`;
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }),
      {
        loading: 'Generating salary slip...',
        success: 'Salary slip downloaded successfully!',
        error: 'Failed to generate salary slip',
      }
    );
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error('Failed to generate salary slip');
  }
};

/**
 * Send the salary slip via email
 */
export const emailSalarySlip = async (details: SalaryDetails, email: string): Promise<void> => {
  try {
    // Generate the PDF first
    const pdfBlob = await generateSalarySlipPDF(details);
    
    // In a real application, you would send this blob to your backend
    // which would then attach it to an email
    console.log(`Sending salary slip to ${email}`, pdfBlob);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(`Salary slip sent to ${email}`);
  } catch (error) {
    console.error('Error emailing PDF:', error);
    toast.error('Failed to email salary slip');
  }
};

/**
 * Generate salary advice for banks
 * This would typically create a formatted file for bank transfers
 */
export const generateBankAdvice = async (employees: SalaryDetails[]): Promise<Blob> => {
  // This would generate a file with all employee bank details and payment amounts
  console.log('Generating bank advice for', employees.length, 'employees');
  
  // Simulate file generation
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockFileBlob = new Blob(['Bank advice content would go here'], { 
        type: 'text/csv' 
      });
      resolve(mockFileBlob);
    }, 2000);
  });
};

/**
 * Download the bank advice file
 */
export const downloadBankAdvice = async (employees: SalaryDetails[], month: string, year: number): Promise<void> => {
  try {
    toast.promise(
      generateBankAdvice(employees).then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bank-advice-${month.toLowerCase()}-${year}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }),
      {
        loading: 'Generating bank advice file...',
        success: 'Bank advice file downloaded successfully!',
        error: 'Failed to generate bank advice file',
      }
    );
  } catch (error) {
    console.error('Error generating bank advice:', error);
    toast.error('Failed to generate bank advice file');
  }
};
