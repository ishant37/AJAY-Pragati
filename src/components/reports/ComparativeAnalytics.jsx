// src/components/reports/ComparativeAnalytics.jsx
import React, { useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, BarChart, Users } from 'lucide-react';

const StatCard = ({ title, value, change, changeType }) => {
    const isPositive = changeType === 'positive';
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            {change && (
                 <p className={`flex items-center text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <ArrowUpRight size={16} className="mr-1"/> : <ArrowDownRight size={16} className="mr-1"/>}
                    {change}
                </p>
            )}
        </div>
    )
};

const ComparativeAnalytics = ({ data, filters }) => {
    const analytics = useMemo(() => {
        if (!data || data.length === 0) {
            return { totalSanctioned: 0, avgProjects: 0, projectsPerCrore: 0, lastYearComparison: null };
        }

        const totalSanctioned = data.reduce((sum, item) => sum + item.sanctionedAmount, 0);
        const totalProjects = data.reduce((sum, item) => sum + item.projectsSubmitted, 0);
        const avgProjects = data.length > 0 ? (totalProjects / data.length).toFixed(1) : 0;
        const projectsPerCrore = totalSanctioned > 0 ? (totalProjects / (totalSanctioned / 100)).toFixed(2) : 0;

        // Note: A real implementation would fetch previous period's data for comparison.
        // Here we simulate it.
        const lastYearComparison = Math.random() > 0.5 ? 
            `+${(Math.random() * 20).toFixed(1)}% vs LY` :
            `-${(Math.random() * 15).toFixed(1)}% vs LY`;

        return { totalSanctioned, avgProjects, projectsPerCrore, lastYearComparison };
    }, [data]);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Comparative Analytics</h3>
            <div className="flex flex-col md:flex-row gap-4">
                <StatCard 
                    title="Total Sanctioned Amount"
                    value={`₹${analytics.totalSanctioned.toLocaleString('en-IN')} L`}
                    change={analytics.lastYearComparison}
                    changeType={analytics.lastYearComparison?.startsWith('+') ? 'positive' : 'negative'}
                />
                 <StatCard 
                    title="Avg. Projects / Entry"
                    value={analytics.avgProjects}
                    changeType="neutral"
                />
                 <StatCard 
                    title="Projects per ₹1 Cr Sanctioned"
                    value={analytics.projectsPerCrore}
                    changeType="neutral"
                />
            </div>
        </div>
    );
};

export default ComparativeAnalytics;
