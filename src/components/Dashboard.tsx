import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calculator, FileText, TrendingUp, Building, Package } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Active Customers',
      value: '24',
      change: '+2 this month',
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Monthly Revenue',
      value: 'AED 245,670',
      change: '+12.5% from last month',
      icon: TrendingUp,
      color: 'text-success',
    },
    {
      title: 'Storage Utilization',
      value: '87.3%',
      change: '+3.2% this week',
      icon: Package,
      color: 'text-info',
    },
    {
      title: 'Billing Runs',
      value: '156',
      change: '18 this week',
      icon: FileText,
      color: 'text-warning',
    },
  ];

  const recentActivity = [
    { customer: 'Jaleel Distribution L.L.C.', amount: 'AED 15,240', status: 'Completed', time: '2 hours ago' },
    { customer: 'Silver Corner Trading', amount: 'AED 8,450', status: 'Processing', time: '5 hours ago' },
    { customer: 'Admiral Distribution', amount: 'AED 22,130', status: 'Completed', time: '1 day ago' },
    { customer: 'Eastern Trading Co.', amount: 'AED 11,670', status: 'Completed', time: '2 days ago' },
  ];

  const storageBreakdown = [
    { type: 'Ambient', utilization: 85, color: 'bg-primary' },
    { type: 'Dry Storage', utilization: 92, color: 'bg-success' },
    { type: 'Chiller', utilization: 78, color: 'bg-info' },
    { type: 'Freezer', utilization: 65, color: 'bg-warning' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your warehouse billing operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Billing Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Recent Billing Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium text-foreground">{activity.customer}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{activity.amount}</p>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      activity.status === 'Completed' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Storage Utilization */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-primary" />
              <span>Storage Utilization</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storageBreakdown.map((storage) => (
                <div key={storage.type} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{storage.type}</span>
                    <span className="text-muted-foreground">{storage.utilization}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`${storage.color} h-2 rounded-full transition-all`}
                      style={{ width: `${storage.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;