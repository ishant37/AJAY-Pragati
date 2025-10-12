// src/components/reports/ChartContainer.jsx
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { BarChart2, LineChart as LineChartIcon, PieChart as PieChartIcon, AreaChart as AreaChartIcon } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md">
                <p className="font-semibold text-sm mb-1 text-gray-900 dark:text-white">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm" style={{ color: entry.color || entry.fill }}>
                        {entry.name}: {entry.value.toLocaleString('en-IN')} {entry.dataKey.includes('Amount') || entry.dataKey.includes('Allocation') ? ' (₹ Lakh)' : ''}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const COLORS = ['#0B57A4', '#2E7D32', '#F59E0B', '#1976D2', '#d946ef', '#ef4444'];

const ChartContainer = ({ data }) => {
    const [chartType, setChartType] = useState('bar');
    const [analysisType, setAnalysisType] = useState('state-allocation');

    const chartData = useMemo(() => {
        if (!data || data.length === 0) return [];
        
        switch (analysisType) {
            case 'state-allocation': {
                const groupedData = data.reduce((acc, item) => {
                    if (!acc[item.state]) {
                        acc[item.state] = { name: item.state, "Notional Allocation": 0, "Sanctioned Amount": 0 };
                    }
                    acc[item.state]["Notional Allocation"] += item.notionalAllocation;
                    acc[item.state]["Sanctioned Amount"] += item.sanctionedAmount;
                    return acc;
                }, {});
                return Object.values(groupedData);
            }
            case 'intervention-wise': {
                 const groupedData = data.reduce((acc, item) => {
                    Object.keys(item.interventionWise).forEach(key => {
                        if (!acc[key]) {
                            acc[key] = { name: key, value: 0 };
                        }
                        acc[key].value += item.interventionWise[key];
                    });
                    return acc;
                }, {});
                return Object.values(groupedData);
            }
             case 'year-wise': {
                const groupedData = data.reduce((acc, item) => {
                    const year = item.proposalYear;
                    if (!acc[year]) {
                        acc[year] = { name: String(year), "Projects Submitted": 0, "Sanctioned Projects": 0 };
                    }
                    acc[year]["Projects Submitted"] += item.projectsSubmitted;
                    acc[year]["Sanctioned Projects"] += item.sanctionedProjects;
                    return acc;
                }, {});
                return Object.values(groupedData).sort((a,b) => a.name - b.name);
            }
            default:
                return [];
        }
    }, [data, analysisType]);

    const renderChart = () => {
        if (chartType === 'pie') {
             return (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            );
        }

        const ChartComponent = {
            bar: BarChart,
            line: LineChart,
            area: AreaChart
        }[chartType];

        const ChartElement = {
            bar: Bar,
            line: Line,
            area: Area
        }[chartType];

        const dataKeys = chartData.length > 0 ? Object.keys(chartData[0]).filter(k => k !== 'name') : [];

        return (
            <ResponsiveContainer width="100%" height={300}>
                <ChartComponent data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => new Intl.NumberFormat('en-IN', { notation: 'compact' }).format(value)} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {dataKeys.map((key, index) => (
                        <ChartElement key={key} type="monotone" dataKey={key} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
                    ))}
                </ChartComponent>
            </ResponsiveContainer>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Interactive Charts</h3>
                <div className="flex items-center gap-4">
                    <select value={analysisType} onChange={e => setAnalysisType(e.target.value)}  className="chart-select">
                        <option value="state-allocation">State-wise Allocation</option>
                        <option value="intervention-wise">Intervention-wise Projects</option>
                        <option value="year-wise">Year-wise Comparison</option>
                    </select>
                     <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md p-1">
                        <button onClick={() => setChartType('bar')} className={`chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}><BarChart2 size={16}/></button>
                        <button onClick={() => setChartType('line')} className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}><LineChartIcon size={16}/></button>
                         <button onClick={() => setChartType('area')} className={`chart-type-btn ${chartType === 'area' ? 'active' : ''}`}><AreaChartIcon size={16}/></button>
                        {analysisType === 'intervention-wise' && <button onClick={() => setChartType('pie')} className={`chart-type-btn ${chartType === 'pie' ? 'active' : ''}`}><PieChartIcon size={16}/></button>}
                    </div>
                </div>
            </div>
            {data.length > 0 ? renderChart() : <div className="text-center py-10 text-gray-500">No data available for visualization.</div>}
            <style>{`
                .chart-select { @apply text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500; }
                .chart-type-btn { @apply p-1.5 rounded-md text-gray-500 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600; }
                .chart-type-btn.active { @apply bg-white dark:bg-gray-900 text-primary shadow; }
            `}</style>
        </div>
    );
};

export default ChartContainer;
