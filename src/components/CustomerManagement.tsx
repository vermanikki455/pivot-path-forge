import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Customer {
  id: string;
  name: string;
  type: 'Internal' | 'External';
  billingFrequency: number;
  status: 'Active' | 'Inactive';
}

const CustomerManagement: React.FC = () => {
  const { toast } = useToast();
  
  const [customers] = useState<Customer[]>([
    { id: 'C2201', name: 'Jaleel Distribution L.L.C. / DIP -Dubai', type: 'Internal', billingFrequency: 30, status: 'Active' },
    { id: '2005070', name: 'Silver Corner Trading / Dubai', type: 'External', billingFrequency: 14, status: 'Active' },
    { id: 'C2105', name: 'Admiral Distribution Center', type: 'Internal', billingFrequency: 30, status: 'Active' },
    { id: '3001', name: 'Eastern Trading Company', type: 'External', billingFrequency: 7, status: 'Active' },
    { id: 'C2301', name: 'Al Madina Foods LLC', type: 'Internal', billingFrequency: 30, status: 'Inactive' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || customer.type.toLowerCase() === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddCustomer = () => {
    toast({
      title: "Add Customer",
      description: "Customer management form would open here",
    });
  };

  const handleEditCustomer = (customer: Customer) => {
    toast({
      title: "Edit Customer",
      description: `Editing ${customer.name}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Customer Management</h2>
          <p className="text-muted-foreground">Manage internal and external customer billing information</p>
        </div>
        <Button onClick={handleAddCustomer} className="bg-gradient-primary shadow-medium hover:shadow-soft">
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="internal">Internal</SelectItem>
                <SelectItem value="external">External</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Customer List ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground">Customer ID: {customer.id}</p>
                    </div>
                    <Badge 
                      variant={customer.type === 'Internal' ? 'default' : 'secondary'}
                      className={customer.type === 'Internal' ? 'bg-primary' : 'bg-accent'}
                    >
                      {customer.type}
                    </Badge>
                    <Badge 
                      variant={customer.status === 'Active' ? 'default' : 'destructive'}
                      className={customer.status === 'Active' ? 'bg-success' : ''}
                    >
                      {customer.status}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Billing Frequency: Every {customer.billingFrequency} days
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditCustomer(customer)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">{customers.filter(c => c.status === 'Active').length}</div>
            <div className="text-sm text-muted-foreground">Active Customers</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-accent">{customers.filter(c => c.type === 'Internal').length}</div>
            <div className="text-sm text-muted-foreground">Internal Customers</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-info">{customers.filter(c => c.type === 'External').length}</div>
            <div className="text-sm text-muted-foreground">External Customers</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerManagement;