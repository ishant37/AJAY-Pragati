// src/pages/Reports.jsx
import React from 'react';
import { useReportData } from '../hooks/useReportData';
import FilterBar from '../components/reports/FilterBar';
import DynamicDataTable from '../components/reports/DynamicDataTable';
// Placeholders for other components to be built
// import ChartContainer from '../components/reports/ChartContainer';
// import ComparativeAnalytics from '../components/reports/ComparativeAnalytics';
import { FileText } from 'lucide-react';

const Reports = () => {
    const {
        data,
        loading,
        filters,
        handleFilterChange,
        filterOptions,
        availableDistricts
    } = useReportData();

    return (
        <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                        <FileText size={28} className="mr-3 text-primary" />
                        Reports & Analytics Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Analyze project proposals and fund allocation data with dynamic filters and visualizations.
                    </p>
                </div>

                <FilterBar
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                    filterOptions={filterOptions}
                    availableDistricts={availableDistricts}
                />

                {loading ? (
                    <div className="text-center py-10">Loading data...</div>
                ) : (
                    <div className="space-y-6">
                        {/* Placeholder for Chart Section */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
                            <h3 className="font-semibold">Interactive Chart Section (Coming Soon)</h3>
                        </div>

                        {/* Placeholder for Comparative Analytics Section */}
                         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
                            <h3 className="font-semibold">Comparative Analytics (Coming Soon)</h3>
                        </div>

                        <DynamicDataTable data={data} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
