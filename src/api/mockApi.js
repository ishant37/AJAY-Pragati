// src/api/mockApi.js
import { initialReportData, filterOptions } from '../data/reportsData';

// Simulates a network request to fetch report data
export const getReportData = (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = [...initialReportData];
      
      if (filters.state && filters.state !== 'All') {
        data = data.filter(item => item.state === filters.state);
      }
      if (filters.financialYear && filters.financialYear !== 'All') {
        // Assuming proposal year relates to the start of the FY
        const year = parseInt(filters.financialYear.split('-')[0], 10);
        data = data.filter(item => item.proposalYear === year);
      }
      if (filters.district && filters.district !== 'All') {
        data = data.filter(item => item.district === filters.district);
      }

      resolve(data);
    }, 500); // Simulate 500ms network delay
  });
};

// Simulates fetching filter options
export const getFilterOptions = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(filterOptions);
        }, 100);
    });
};
