// src/hooks/useReportData.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import { getReportData, getFilterOptions } from '../api/mockApi';

export const useReportData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        state: 'All',
        financialYear: 'All',
        district: 'All',
    });
    const [filterOptions, setFilterOptions] = useState({
        states: [],
        financialYears: [],
        districts: {},
    });

    // Fetch initial options for filters
    useEffect(() => {
        getFilterOptions().then(options => {
            setFilterOptions(options);
        });
    }, []);
    
    // Fetch data whenever filters change
    useEffect(() => {
        setLoading(true);
        getReportData(filters).then(filteredData => {
            setData(filteredData);
            setLoading(false);
        });
    }, [filters]);

    const handleFilterChange = useCallback((filterName, value) => {
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters, [filterName]: value };
            // Reset district if state changes
            if (filterName === 'state' && value !== prevFilters.state) {
                newFilters.district = 'All';
            }
            return newFilters;
        });
    }, []);

    const availableDistricts = useMemo(() => {
        return filterOptions.districts[filters.state] || ['All'];
    }, [filters.state, filterOptions.districts]);

    return {
        data,
        loading,
        filters,
        handleFilterChange,
        filterOptions,
        availableDistricts,
    };
};
