import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Play, Download, FileText, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BillingFormData {
  customerId: string;
  customerName: string;
  customerType: 'Internal' | 'External';
  billingFrequency: number;
  startDate: string;
  endDate: string;
}

const BillingRun: React.FC = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<BillingFormData>({
    customerId: '',
    customerName: '',
    customerType: 'Internal',
    billingFrequency: 30,
    startDate: '',
    endDate: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [billingResults, setBillingResults] = useState<any>(null);

  const customers = [
    { id: 'C2201', name: 'Jaleel Distribution L.L.C. / DIP -Dubai', type: 'Internal', frequency: 30 },
    { id: '2005070', name: 'Silver Corner Trading / Dubai', type: 'External', frequency: 14 },
    { id: 'C2105', name: 'Admiral Distribution Center', type: 'Internal', frequency: 30 },
  ];

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setFormData(prev => ({
        ...prev,
        customerId: customer.id,
        customerName: customer.name,
        customerType: customer.type as 'Internal' | 'External',
        billingFrequency: customer.frequency,
      }));
      
      // Auto-calculate end date when start date is set
      if (formData.startDate) {
        calculateEndDate(formData.startDate, customer.frequency);
      }
    }
  };

  const handleStartDateChange = (date: string) => {
    setFormData(prev => ({ ...prev, startDate: date }));
    if (formData.billingFrequency) {
      calculateEndDate(date, formData.billingFrequency);
    }
  };

  const calculateEndDate = (startDate: string, frequency: number) => {
    const start = new Date(startDate);
    const end = new Date(start);
    
    // Special logic: if frequency is 30 and start date is beginning of month,
    // set end date to last day of month
    if (frequency === 30 && start.getDate() === 1) {
      end.setMonth(end.getMonth() + 1, 0); // Last day of current month
    } else {
      end.setDate(end.getDate() + frequency);
    }
    
    setFormData(prev => ({ ...prev, endDate: end.toISOString().split('T')[0] }));
  };

  const handleGenerateBilling = async () => {
    if (!formData.customerId || !formData.startDate) {
      toast({
        title: "Validation Error",
        description: "Please select a customer and enter a start date to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate billing generation
    setTimeout(() => {
      const mockResults = {
        customer: formData.customerName,
        period: `${formData.startDate} to ${formData.endDate}`,
        storageSummary: {
          ambient: { volume: 156.78, charge: 313.57 },
          dry: { volume: 89.45, charge: 357.80 },
          chiller: { volume: 45.23, charge: 135.69 },
          freezer: { volume: 12.34, charge: 37.02 },
        },
        activitySummary: {
          inboundHandling: 2450.00,
          outboundHandling: 1876.50,
          returnHandling: 345.75,
          scrapHandling: 150.00,
        },
        totalAmount: 5691.33,
      };
      
      setBillingResults(mockResults);
      setIsGenerating(false);
      
      toast({
        title: "Billing Generated Successfully",
        description: `Total billing amount: AED ${mockResults.totalAmount.toFixed(2)}`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Billing Run Execution</h2>
        <p className="text-muted-foreground">Generate billing reports for customers</p>
      </div>

      {/* Billing Form */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-primary" />
            <span>Crosswell Logistics - Warehouse Billing</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Customer</label>
                <Select value={formData.customerId} onValueChange={handleCustomerChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.id} - {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input 
                  value={formData.customerName} 
                  disabled 
                  className="bg-muted"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Type</label>
                <div className="flex items-center space-x-2">
                  <Input value={formData.customerType} disabled className="bg-muted flex-1" />
                  <Badge className={formData.customerType === 'Internal' ? 'bg-primary' : 'bg-accent'}>
                    {formData.customerType}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Frequency</label>
                <div className="flex items-center space-x-2">
                  <Input 
                    value={`${formData.billingFrequency} Days`} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">End Date</label>
                <Input 
                  value={formData.endDate} 
                  disabled 
                  className="bg-muted"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleGenerateBilling}
              disabled={isGenerating}
              className="bg-gradient-primary shadow-medium hover:shadow-soft px-8 py-3 text-lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Generate Billing
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {billingResults && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Storage Summary */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Storage Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(billingResults.storageSummary).map(([type, data]: [string, any]) => (
                  <div key={type} className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                    <div>
                      <div className="font-medium text-foreground capitalize">{type}</div>
                      <div className="text-sm text-muted-foreground">{data.volume} M³</div>
                    </div>
                    <div className="text-lg font-bold text-success">
                      AED {data.charge.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(billingResults.activitySummary).map(([activity, amount]: [string, any]) => (
                  <div key={activity} className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-foreground">
                      {activity.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="text-lg font-bold text-primary">
                      AED {amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Total & Actions */}
          <Card className="lg:col-span-2 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Total Billing Amount</h3>
                  <p className="text-muted-foreground">
                    Period: {billingResults.period} • Customer: {billingResults.customer}
                  </p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-3xl font-bold text-success">
                    AED {billingResults.totalAmount.toFixed(2)}
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      View Report
                    </Button>
                    <Button className="bg-gradient-accent">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BillingRun;