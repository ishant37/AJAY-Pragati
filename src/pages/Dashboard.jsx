import React, { useState } from 'react';
import {
  Search,
  User,
  Building2,
  CheckCircle,
  MessageSquare,
  RefreshCw,
  Eye,
  FileDown,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { cn } from '../utils/cn';
// Assuming '../components/OverviewCard' is available as per your original Dashboard file
// import OverviewCard from '../components/OverviewCard';

// Placeholder for the external OverviewCard component for completeness
const OverviewCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <div className="card p-5 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{subtitle}</p>
    </div>
    <div
      className="p-3 rounded-full"
      style={{ backgroundColor: color, opacity: 0.1 }}
    >
      <Icon size={24} style={{ color }} />
    </div>
  </div>
);


// --- Chart Data & Tooltip (from Analysis.jsx) ---
const districtData = [
  { district: 'Delhi', beneficiaries: 4200 },
  { district: 'Mumbai', beneficiaries: 5800 },
  { district: 'Kolkata', beneficiaries: 3900 },
  { district: 'Chennai', beneficiaries: 4500 },
  { district: 'Bangalore', beneficiaries: 5200 },
  { district: 'Hyderabad', beneficiaries: 4800 },
  { district: 'Ahmedabad', beneficiaries: 3600 },
  { district: 'Pune', beneficiaries: 4100 },
];

const genderData = [
  { name: 'Male', value: 52, count: 23752 },
  { name: 'Female', value: 46, count: 21012 },
  { name: 'Other', value: 2, count: 914 },
];

const disbursalTrend = [
  { month: 'Apr', amount: 15.2 },
  { month: 'May', amount: 18.5 },
  { month: 'Jun', amount: 22.8 },
  { month: 'Jul', amount: 19.3 },
  { month: 'Aug', amount: 24.6 },
  { month: 'Sep', amount: 28.4 },
  { month: 'Oct', amount: 31.2 },
];

const categoryData = [
  { category: 'Education', value: 35, color: '#0B57A4' },
  { category: 'Healthcare', value: 25, color: '#2E7D32' },
  { category: 'Skill Development', value: 20, color: '#ff9800' },
  { category: 'Business', value: 12, color: '#1976D2' },
  { category: 'Housing', value: 8, color: '#F59E0B' },
];

const COLORS = ['#0B57A4', '#2E7D32', '#ff9800'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="card p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
        <p className="font-semibold text-sm mb-1 text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color || entry.stroke }}>
            {entry.name}: {entry.value}
            {entry.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
// --- End Chart Data & Tooltip ---


const Dashboard = () => {
  // State from Analysis.jsx
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  // State from Dashboard.jsx
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Data from Dashboard.jsx
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

  // Helper functions from Dashboard.jsx
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
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Comprehensive Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Real-time monitoring and analytical insights for fund disbursement
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="btn-secondary flex items-center gap-2"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={18} />
              Refresh
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <FileDown size={18} />
              Export Report
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewData.map((data, index) => (
            <OverviewCard key={index} {...data} />
          ))}
        </div>

        {/* --- Analytical Charts Section --- */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Analytical Insights
          </h2>
          <div className="card p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Range
                </label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="input-field"
                >
                  <option value="1month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                  <option value="all">All Time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  District
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Districts</option>
                  {districtData.map((item) => (
                    <option key={item.district} value={item.district}>
                      {item.district}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Bar Chart - Beneficiaries by District */}
            <div className="lg:col-span-8 card p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Beneficiaries by District
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={districtData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
                  <XAxis
                    dataKey="district"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar
                    dataKey="beneficiaries"
                    fill="#0B57A4"
                    radius={[8, 8, 0, 0]}
                    name="Beneficiaries"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart - Gender Distribution */}
            <div className="lg:col-span-4 card p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Gender Distribution
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {genderData.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Line Chart - Fund Disbursal Trend */}
            <div className="lg:col-span-8 card p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Fund Disbursal Trend (in Crores)
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={disbursalTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#2E7D32"
                    strokeWidth={3}
                    dot={{ r: 6, fill: '#2E7D32' }}
                    activeDot={{ r: 8 }}
                    name="Amount (₹ Cr)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="lg:col-span-4 card p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Fund Category Distribution
              </h3>
              <div className="space-y-4">
                {categoryData.map((item, index) => (
                  <div key={item.category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.category}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.value}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-primary rounded-xl text-white">
                <p className="text-sm mb-1 opacity-90">Total Allocation</p>
                <p className="text-2xl font-bold">₹124.5 Crores</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Recent Activities Section --- */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <button
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all hover:rotate-180 duration-500"
              onClick={() => window.location.reload()} // Using refresh for activity section too
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