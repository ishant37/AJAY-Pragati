import React, { useState } from 'react';
import { Search, User, Building2, CheckCircle, MessageSquare, RefreshCw, Eye } from 'lucide-react';
import OverviewCard from '../components/OverviewCard';
import { cn } from '../utils/cn';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const overviewData = [
    {
      title: 'Total Beneficiaries',
      value: '45,678',
      icon: User,
      color: '#0B57A4',
      subtitle: '+12% from last month',
    },
    {
      title: 'Pending Verifications',
      value: '1,234',
      icon: MessageSquare,
      color: '#F59E0B',
      subtitle: 'Requires action',
    },
    {
      title: 'Funds Disbursed',
      value: '₹124.5 Cr',
      icon: Building2,
      color: '#2E7D32',
      subtitle: 'Current fiscal year',
    },
    {
      title: 'Grievances Resolved',
      value: '98.5%',
      icon: CheckCircle,
      color: '#1976D2',
      subtitle: '2,456 of 2,493',
    },
  ];

  const recentActivities = [
    {
      id: 'BEN-2024-001',
      name: 'Rajesh Kumar',
      district: 'Delhi',
      status: 'Approved',
      amount: '₹50,000',
      date: '2024-10-08',
      type: 'Education',
    },
    {
      id: 'BEN-2024-002',
      name: 'Priya Sharma',
      district: 'Mumbai',
      status: 'Pending',
      amount: '₹75,000',
      date: '2024-10-09',
      type: 'Skill Development',
    },
    {
      id: 'BEN-2024-003',
      name: 'Amit Patel',
      district: 'Ahmedabad',
      status: 'Approved',
      amount: '₹60,000',
      date: '2024-10-10',
      type: 'Healthcare',
    },
    {
      id: 'BEN-2024-004',
      name: 'Sunita Devi',
      district: 'Patna',
      status: 'Under Review',
      amount: '₹45,000',
      date: '2024-10-10',
      type: 'Business',
    },
    {
      id: 'BEN-2024-005',
      name: 'Rahul Singh',
      district: 'Lucknow',
      status: 'Approved',
      amount: '₹55,000',
      date: '2024-10-11',
      type: 'Education',
    },
    {
      id: 'BEN-2024-006',
      name: 'Kavita Rani',
      district: 'Jaipur',
      status: 'Rejected',
      amount: '₹40,000',
      date: '2024-10-11',
      type: 'Housing',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const filteredActivities = recentActivities.filter((activity) => {
    const matchesSearch =
      activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.district.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor beneficiary registrations, verifications, and fund disbursements
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewData.map((data, index) => (
            <OverviewCard key={index} {...data} />
          ))}
        </div>

        {/* Recent Activities Section */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <button
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all hover:rotate-180 duration-500"
              aria-label="refresh"
            >
              <RefreshCw size={24} />
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID, or district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Activity Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Beneficiary ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredActivities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {activity.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {activity.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {activity.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {activity.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400">
                      {activity.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {activity.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        getStatusColor(activity.status)
                      )}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        className="p-1 text-primary hover:bg-primary/10 rounded transition-colors"
                        aria-label="view details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No activities found matching your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
