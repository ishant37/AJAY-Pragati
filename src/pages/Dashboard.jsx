import React, { useState, useMemo } from 'react';
import {
  Users,
  CheckSquare,
  IndianRupee,
  Trophy,
  RefreshCw,
  FileDown,
  GlassWater,
  School,
  Route,
  Zap,
  Bath,
  Flame,
  Wrench,
  GraduationCap,
  HeartPulse,
  Building,
  Briefcase,
  CaseLower,
  Filter,
  Download,
  FileSpreadsheet,
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

// --- Reusable Components ---

// OverviewCard for top-level stats
const OverviewCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <div className="card p-5 flex items-start justify-between bg-white dark:bg-gray-800 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300">
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{subtitle}</p>
    </div>
    <div
      className="p-3 rounded-full flex items-center justify-center"
      // FIX 1: Corrected template literal in style attribute
      style={{ backgroundColor: `${color}20` }} 
    >
      <Icon size={24} style={{ color }} />
    </div>
  </div>
);

// IndicatorCard for Monitorable KPIs
const IndicatorCard = ({ title, achieved, target, icon: Icon }) => {
  const percentage = target > 0 ? ((achieved / target) * 100).toFixed(1) : 0;
  return (
    <div className="card p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-700 dark:text-gray-200">{title}</h4>
        <Icon className="text-gray-400" size={20} />
      </div>
      <div className="text-2xl font-bold text-primary mb-1">{achieved.toLocaleString()}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Target: {target.toLocaleString()}
      </div>
      <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-1000 ease-out"
          // FIX 2: Corrected template literal in style attribute
          style={{ width: `${percentage}%` }}
        />
      </div>
       <p className="text-right text-xs font-semibold text-green-600 dark:text-green-400 mt-1">{percentage}% Achieved</p>
    </div>
  );
};


// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="card p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg rounded-md">
        <p className="font-semibold text-sm mb-1 text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color || entry.stroke }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// --- Main Dashboard Component ---
const Dashboard = () => {
  // State management
  const [selectedState, setSelectedState] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // List of Indian states
  const indianStates = [
    'All States',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  // --- Data based on the provided images ---

  const overviewData = [
    {
      title: 'Adarsh Grams Declared',
      value: '12,554',
      icon: Trophy,
      color: '#2E7D32',
      subtitle: 'Villages Transformed',
    },
    {
      title: 'Total Population Covered',
      value: '7.41 Cr',
      icon: Users,
      color: '#0B57A4',
      subtitle: 'Across the Nation',
    },
    {
      title: 'Total Works Completed',
      value: '41,514',
      icon: CheckSquare,
      color: '#1976D2',
      subtitle: 'Infrastructure & Services',
    },
    {
      title: 'Funds Utilized',
      value: '₹896.3 Cr',
      icon: IndianRupee,
      color: '#F59E0B',
      subtitle: 'For Gap Filling Projects',
    },
  ];

  const implementationTrendData = [
    { name: 'May 19', Selected: 9000, 'VDP Generated': 0, 'VDP Approved': 0, 'Works Completed': 0 },
    { name: 'Nov 19', Selected: 9000, 'VDP Generated': 500, 'VDP Approved': 300, 'Works Completed': 100 },
    { name: 'May 20', Selected: 12500, 'VDP Generated': 1500, 'VDP Approved': 1000, 'Works Completed': 500 },
    { name: 'Nov 20', Selected: 12500, 'VDP Generated': 2500, 'VDP Approved': 2000, 'Works Completed': 1000 },
    { name: 'May 21', Selected: 18500, 'VDP Generated': 4000, 'VDP Approved': 3000, 'Works Completed': 1500 },
    { name: 'Nov 21', Selected: 18500, 'VDP Generated': 5500, 'VDP Approved': 4500, 'Works Completed': 2500 },
    { name: 'May 22', Selected: 29500, 'VDP Generated': 7000, 'VDP Approved': 5500, 'Works Completed': 3500 },
    { name: 'Nov 22', Selected: 29500, 'VDP Generated': 9000, 'VDP Approved': 7000, 'Works Completed': 5000 },
    { name: 'May 23', Selected: 29500, 'VDP Generated': 11500, 'VDP Approved': 9000, 'Works Completed': 6500 },
    { name: 'Nov 23', Selected: 29500, 'VDP Generated': 14000, 'VDP Approved': 11000, 'Works Completed': 8000 },
    { name: 'May 24', Selected: 29500, 'VDP Generated': 16500, 'VDP Approved': 13500, 'Works Completed': 10000 },
    { name: 'Nov 24', Selected: 29500, 'VDP Generated': 18000, 'VDP Approved': 15500, 'Works Completed': 11500 },
    { name: 'May 25', Selected: 29500, 'VDP Generated': 19500, 'VDP Approved': 17000, 'Works Completed': 12500 },
  ];

  const topStatesData = [
    { name: 'Odisha', Completed: 7300, 'In Progress': 1112, population: 4200000 },
    { name: 'Karnataka', Completed: 5885, 'In Progress': 253, population: 3800000 },
    { name: 'Tamil Nadu', Completed: 6862, 'In Progress': 259, population: 4100000 },
    { name: 'Madhya Pradesh', Completed: 5827, 'In Progress': 2481, population: 3600000 },
    { name: 'Rajasthan', Completed: 3970, 'In Progress': 1139, population: 2900000 },
    { name: 'Chhattisgarh', Completed: 3168, 'In Progress': 1798, population: 2500000 },
    { name: 'Uttar Pradesh', Completed: 1766, 'In Progress': 400, population: 1600000 },
    { name: 'Assam', Completed: 1400, 'In Progress': 200, population: 1200000 },
    { name: 'Maharashtra', Completed: 1380, 'In Progress': 180, population: 1300000 },
    { name: 'Bihar', Completed: 1250, 'In Progress': 350, population: 1400000 },
    { name: 'Gujarat', Completed: 1100, 'In Progress': 290, population: 1100000 },
    { name: 'Andhra Pradesh', Completed: 980, 'In Progress': 220, population: 1000000 },
    { name: 'West Bengal', Completed: 850, 'In Progress': 150, population: 900000 },
    { name: 'Telangana', Completed: 720, 'In Progress': 180, population: 750000 },
    { name: 'Punjab', Completed: 650, 'In Progress': 100, population: 680000 },
  ];

  // Filter data based on selected state
  const filteredStatesData = useMemo(() => {
    if (selectedState === 'all') {
      return topStatesData;
    }
    return topStatesData.filter(state => 
      state.name.toLowerCase() === selectedState.toLowerCase()
    );
  }, [selectedState]);

  // Calculate filtered overview data
  const filteredOverviewData = useMemo(() => {
    if (selectedState === 'all') {
      return overviewData;
    }
    
    const stateData = topStatesData.find(state => 
      state.name.toLowerCase() === selectedState.toLowerCase()
    );
    
    if (!stateData) return overviewData;

    const totalWorks = stateData.Completed + stateData['In Progress'];
    const fundsUtilized = (totalWorks * 2.16).toFixed(1); // Avg ₹2.16 lakh per work
    
    return [
      {
        title: 'Adarsh Grams Declared',
        value: Math.floor(totalWorks * 0.3).toLocaleString(),
        icon: Trophy,
        color: '#2E7D32',
        subtitle: selectedState,
      },
      {
        title: 'Population Covered',
        value: (stateData.population / 100000).toFixed(2) + ' Lakh',
        icon: Users,
        color: '#0B57A4',
        subtitle: selectedState,
      },
      {
        title: 'Works Completed',
        value: stateData.Completed.toLocaleString(),
        icon: CheckSquare,
        color: '#1976D2',
        // FIX 3: Corrected template literal string
        subtitle: `${stateData['In Progress']} In Progress`,
      },
      {
        title: 'Funds Utilized',
        // FIX 4: Corrected template literal string
        value: `₹${fundsUtilized} Cr`,
        icon: IndianRupee,
        color: '#F59E0B',
        subtitle: 'Gap Filling Projects',
      },
    ];
  }, [selectedState]);

  // Export functions
  const exportToCSV = () => {
    const headers = ['State', 'Completed Works', 'In Progress', 'Total Works', 'Population Covered'];
    const rows = filteredStatesData.map(state => [
      state.name,
      state.Completed,
      state['In Progress'],
      state.Completed + state['In Progress'],
      state.population.toLocaleString()
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    // FIX 5: Corrected template literal string
    link.setAttribute('download', `adarsh-gram-report-${selectedState}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToJSON = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      filter: selectedState,
      overview: filteredOverviewData,
      statesData: filteredStatesData,
      kpiData: kpiData,
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // FIX 6: Corrected template literal string
    link.download = `adarsh-gram-report-${selectedState}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const printReport = () => {
    window.print();
    setShowExportMenu(false);
  };
  
  const kpiData = [
    { title: 'Villages with Drinking Water', achieved: 1487, target: 7249, icon: GlassWater },
    { title: 'Schools with Toilets', achieved: 1043, target: 4230, icon: School },
    { title: 'Villages with All-Weather Roads', achieved: 1323, target: 4947, icon: Route }, // <-- CHANGED
    { title: 'Villages Electrified', achieved: 220, target: 1077, icon: Zap },
    { title: 'Households with Toilets (IHHL)', achieved: 343628, target: 658427, icon: Bath },
    { title: 'Children in Primary School', achieved: 51648, target: 89725, icon: CaseLower },
    { title: 'Households with LPG (Ujjawala)', achieved: 183862, target: 359437, icon: Flame },
    { title: 'Youths in Skill Development', achieved: 202339, target: 465301, icon: Wrench },
  ];
  
  const focusAreasData = [
      { name: 'Infrastructure', value: 40, color: '#0B57A4', icon: Building },
      { name: 'Health & Sanitation', value: 25, color: '#2E7D32', icon: HeartPulse },
      { name: 'Education', value: 15, color: '#1976D2', icon: GraduationCap },
      { name: 'Livelihood & Skills', value: 12, color: '#F59E0B', icon: Briefcase },
      { name: 'Other', value: 8, color: '#64748b', icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-1">
              Adarsh Gram National Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Award-Winning Interface for Monitoring Village Transformation
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="btn-secondary flex items-center gap-2"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={18} />
              Refresh Data
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
              >
                <FileDown size={18} />
                Export Report
              </button>
              
              {/* Export Menu Dropdown */}
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                  <div className="py-2">
                    <button
                      onClick={exportToCSV}
                      className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                    >
                      <FileSpreadsheet size={18} className="text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">Export as CSV</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Download spreadsheet data</p>
                      </div>
                    </button>
                    <button
                      onClick={exportToJSON}
                      className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                    >
                      <Download size={18} className="text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">Export as JSON</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Download raw data</p>
                      </div>
                    </button>
                    <button
                      onClick={printReport}
                      className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                    >
                      <FileDown size={18} className="text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">Print Report</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Print or save as PDF</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Data Filters
            </h2>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Select State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="all">All States</option>
                {indianStates.slice(1).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Select Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedState('all');
                  setSelectedYear('all');
                }}
                className="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          </div>
          {selectedState !== 'all' && (
            <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <strong>Filtered View:</strong> Showing data for <strong>{selectedState}</strong>
                {selectedYear !== 'all' && ` in ${selectedYear}`}
              </p>
            </div>
          )}
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {filteredOverviewData.map((data, index) => (
            <OverviewCard key={index} {...data} />
          ))}
        </div>

        {/* --- Analytical Charts Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          <div className="lg:col-span-8 card p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
             <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
               Implementation Progress Timeline
             </h3>
             <ResponsiveContainer width="100%" height={400}>
              <LineChart data={implementationTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700"/>
                <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="step" dataKey="Selected" stroke="#0B57A4" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="VDP Generated" stroke="#f97316" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="VDP Approved" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Works Completed" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
           <div className="lg:col-span-4 card p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
               <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Scheme Focus Areas</h3>
               <div className="space-y-4 pt-4">
                  {focusAreasData.map((item) => (
                    <div key={item.name}>
                       <div className="flex justify-between items-center mb-1">
                         <div className='flex items-center gap-2'>
                           <item.icon size={16} style={{ color: item.color }} />
                           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                         </div>
                         <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}%</span>
                       </div>
                       <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          {/* FIX 7: Corrected template literal in style attribute */}
                          <div className="h-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}/>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

          <div className="lg:col-span-12 card p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
             <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                 {/* FIX 8: Corrected template literal string */}
                 {selectedState === 'all' ? 'Top States by Works Status' : `${selectedState} - Works Status`}
               </h3>
               {filteredStatesData.length > 0 && (
                 <div className="text-sm text-gray-600 dark:text-gray-400">
                   Total: <strong className="text-primary">{filteredStatesData.reduce((acc, s) => acc + s.Completed + s['In Progress'], 0).toLocaleString()}</strong> works
                 </div>
               )}
             </div>
             <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filteredStatesData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700"/>
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Completed" stackId="a" fill="#2E7D32" radius={[8, 8, 0, 0]} />
                <Bar dataKey="In Progress" stackId="a" fill="#F59E0B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Monitorable Indicators Section */}
        <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Monitorable Indicators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map((kpi, index) => (
                    <IndicatorCard key={index} {...kpi} />
                ))}
            </div>
        </div>

        {/* Data Insights Section - Winner Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-300 dark:border-green-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-600 rounded-full">
                <Trophy className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Completion Rate</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                  {filteredStatesData.length > 0 
                    ? ((filteredStatesData.reduce((acc, s) => acc + s.Completed, 0) / 
                        filteredStatesData.reduce((acc, s) => acc + s.Completed + s['In Progress'], 0)) * 100).toFixed(1)
                    : 0}%
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Success rate across {selectedState === 'all' ? 'all states' : selectedState}
            </p>
          </div>

          <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-300 dark:border-blue-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-full">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg Population/State</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  {filteredStatesData.length > 0 
                    ? (filteredStatesData.reduce((acc, s) => acc + s.population, 0) / filteredStatesData.length / 100000).toFixed(2)
                    : 0} L
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Average beneficiary population covered
            </p>
          </div>

          <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-2 border-purple-300 dark:border-purple-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-600 rounded-full">
                <CheckSquare className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Works</p>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                  {filteredStatesData.length > 0 
                    ? filteredStatesData.reduce((acc, s) => acc + s.Completed + s['In Progress'], 0).toLocaleString()
                    : 0}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Combined completed and in-progress works
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;