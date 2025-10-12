// src/components/reports/FilterBar.jsx
import React from 'react';
import { Filter } from 'lucide-react';

const FilterBar = ({ filters, handleFilterChange, filterOptions, availableDistricts }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                <Filter size={20} className="mr-2 text-primary" />
                Report Filters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* State Dropdown */}
                <div>
                    <label htmlFor="state-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                    <select
                        id="state-filter"
                        value={filters.state}
                        onChange={(e) => handleFilterChange('state', e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {filterOptions.states.map(state => <option key={state}>{state}</option>)}
                    </select>
                </div>

                {/* Financial Year Dropdown */}
                <div>
                    <label htmlFor="fy-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Financial Year</label>
                    <select
                        id="fy-filter"
                        value={filters.financialYear}
                        onChange={(e) => handleFilterChange('financialYear', e.target.value)}
                         className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {filterOptions.financialYears.map(year => <option key={year}>{year}</option>)}
                    </select>
                </div>

                {/* District Dropdown */}
                <div>
                    <label htmlFor="district-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">District</label>
                    <select
                        id="district-filter"
                        value={filters.district}
                        onChange={(e) => handleFilterChange('district', e.target.value)}
                        disabled={filters.state === 'All'}
                         className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:bg-gray-200 dark:disabled:bg-gray-600"
                    >
                        {availableDistricts.map(district => <option key={district}>{district}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
