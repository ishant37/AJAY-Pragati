import React, { useState } from 'react';
import { RefreshCw, FileDown } from 'lucide-react';
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

const Analysis = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  // Sample data for charts
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
        <div className="card p-3 border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-sm mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Data Analysis & Insights
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive visualization of beneficiary data and fund distribution
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

        {/* Filters */}
        <div className="card p-6 mb-8">
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

        {/* Charts Grid */}
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
    </div>
  );
};

export default Analysis;
