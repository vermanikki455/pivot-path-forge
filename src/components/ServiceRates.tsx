import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServiceRate {
  id: string;
  customerId: string;
  customerName: string;
  serviceType: string;
  chargeType: string;
  rate: number;
  currency: string;
  unit: string;
}

const ServiceRates: React.FC = () => {
  const { toast } = useToast();
  
  const [rates] = useState<ServiceRate[]>([
    { id: '1', customerId: 'C2201', customerName: 'Jaleel Distribution L.L.C.', serviceType: 'Fixed Charge', chargeType: 'Inventory Management', rate: 5000.00, currency: 'AED', unit: 'MON' },
    { id: '2', customerId: 'C2201', customerName: 'Jaleel Distribution L.L.C.', serviceType: 'Storage', chargeType: 'Ambient', rate: 2.00, currency: 'AED', unit: 'M3' },
    { id: '3', customerId: 'C2201', customerName: 'Jaleel Distribution L.L.C.', serviceType: 'Storage', chargeType: 'Freezer', rate: 3.00, currency: 'AED', unit: 'M3' },
    { id: '4', customerId: 'C2201', customerName: 'Jaleel Distribution L.L.C.', serviceType: 'Storage', chargeType: 'Dry', rate: 4.00, currency: 'AED', unit: 'M3' },
    { id: '5', customerId: 'C2201', customerName: 'Jaleel Distribution L.L.C.', serviceType: 'Inbound Handling', chargeType: 'Inbound Loose', rate: 20.00, currency: 'AED', unit: 'PAL' },
    { id: '6', customerId: 'C2201', customerName: 'Jaleel Distribution L.L.C.', serviceType: 'Inbound Handling', chargeType: 'Inbound Pallet', rate: 13.00, currency: 'AED', unit: 'PAL' },
    { id: '7', customerId: 'C2201', customerName: 'Jaleel Distribution L.L.C.', serviceType: 'Outbound Handling', chargeType: 'Outbound Each', rate: 0.16, currency: 'AED', unit: 'EA' },
    { id: '8', customerId: 'C2201', customerName: 'Jaleel Distribution L.L.C.', serviceType: 'Return Handling', chargeType: 'Return Each', rate: 0.39, currency: 'AED', unit: 'EA' },
    { id: '9', customerId: 'C2201', customerName: 'Jaleel Distribution L.L.C.', serviceType: 'Scrap Handling', chargeType: 'Scrap Normal', rate: 300.00, currency: 'AED', unit: 'TON' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState<string>('all');

  const serviceTypes = [...new Set(rates.map(rate => rate.serviceType))];

  const filteredRates = rates.filter(rate => {
    const matchesSearch = rate.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rate.chargeType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = filterService === 'all' || rate.serviceType === filterService;
    return matchesSearch && matchesService;
  });

  const getServiceColor = (serviceType: string) => {
    const colors = {
      'Fixed Charge': 'bg-primary',
      'Storage': 'bg-success',
      'Inbound Handling': 'bg-info',
      'Outbound Handling': 'bg-warning',
      'Return Handling': 'bg-destructive',
      'Scrap Handling': 'bg-accent',
      'Labelling (VAS)': 'bg-secondary'
    };
    return colors[serviceType as keyof typeof colors] || 'bg-muted';
  };

  const handleAddRate = () => {
    toast({
      title: "Add Service Rate",
      description: "Service rate form would open here",
    });
  };

  const handleCopyRates = () => {
    toast({
      title: "Copy Rates",
      description: "Rate copying functionality would be implemented here",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Service Rate Cards</h2>
          <p className="text-muted-foreground">Manage billing rates for warehouse services</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleCopyRates}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Rates
          </Button>
          <Button onClick={handleAddRate} className="bg-gradient-primary shadow-medium hover:shadow-soft">
            <Plus className="mr-2 h-4 w-4" />
            Add Rate
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rates by customer or charge type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterService} onValueChange={setFilterService}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {serviceTypes.map(service => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rate Cards */}
      <div className="space-y-4">
        {filteredRates.map((rate) => (
          <Card key={rate.id} className="shadow-soft hover:shadow-medium transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge className={getServiceColor(rate.serviceType)}>
                      {rate.serviceType}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Customer: {rate.customerName}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {rate.chargeType}
                  </h3>
                  
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <span>Rate: <span className="font-semibold text-foreground">{rate.currency} {rate.rate.toFixed(2)}</span></span>
                    <span>Unit: <span className="font-semibold text-foreground">{rate.unit}</span></span>
                    <span>Customer ID: <span className="font-semibold text-foreground">{rate.customerId}</span></span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right mr-4">
                    <div className="text-2xl font-bold text-primary">
                      {rate.currency} {rate.rate.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per {rate.unit}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Rate Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {serviceTypes.map(service => (
              <div key={service} className="text-center p-4 rounded-lg bg-secondary/50">
                <div className="text-lg font-bold text-foreground">
                  {rates.filter(r => r.serviceType === service).length}
                </div>
                <div className="text-sm text-muted-foreground">{service}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceRates;