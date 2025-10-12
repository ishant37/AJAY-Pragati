// src/components/reports/DynamicDataTable.jsx
import React from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { ChevronDown, ChevronUp, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, Download, Upload, Eye } from 'lucide-react';

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
    <input
        value={globalFilter || ""}
        onChange={e => setGlobalFilter(e.target.value || undefined)}
        placeholder={`Search records...`}
        className="text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
    />
);

const DynamicDataTable = ({ data }) => {
    const columns = React.useMemo(() => [
        { Header: 'S.No.', accessor: (row, i) => i + 1 },
        { Header: 'Proposal Year', accessor: 'proposalYear' },
        {
            Header: 'State',
            accessor: 'state',
            Cell: ({ row }) => (
                <a href={row.original.state_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    {row.original.state}
                </a>
            )
        },
        { Header: 'District', accessor: 'district' },
        { Header: 'Projects Submitted', accessor: 'projectsSubmitted' },
        { Header: 'Notional Allocation (₹ Lakh)', accessor: 'notionalAllocation', Cell: ({ value }) => value.toLocaleString('en-IN') },
        { Header: 'Sanctioned Projects', accessor: 'sanctionedProjects' },
        { Header: 'Sanctioned Amount (₹ Lakh)', accessor: 'sanctionedAmount', Cell: ({ value }) => value.toLocaleString('en-IN') },
        {
            Header: 'Actions',
            Cell: () => (
                <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">
                    <Eye size={18} />
                </button>
            )
        },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
        setGlobalFilter,
    } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
                <div className="flex items-center space-x-2">
                    <button className="btn-secondary text-sm flex items-center gap-1"><Upload size={14}/> Import</button>
                    <button className="btn-primary text-sm flex items-center gap-1"><Download size={14}/> Export</button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? <ChevronDown size={14} className="inline ml-1" /> : <ChevronUp size={14} className="inline ml-1" />) : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="py-3 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="flex gap-x-2 items-center">
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                            Page <span className="font-medium">{pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
                        </span>
                        <select
                            value={pageSize}
                            onChange={e => setPageSize(Number(e.target.value))}
                             className="text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="pagination-btn rounded-l-md"><ChevronsLeft size={16}/></button>
                            <button onClick={() => previousPage()} disabled={!canPreviousPage} className="pagination-btn"><ChevronLeft size={16}/></button>
                            <button onClick={() => nextPage()} disabled={!canNextPage} className="pagination-btn"><ChevronRight size={16}/></button>
                            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="pagination-btn rounded-r-md"><ChevronsRight size={16}/></button>
                        </nav>
                    </div>
                </div>
            </div>
             <style>{`
                .pagination-btn {
                    @apply relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700;
                }
                .pagination-btn:disabled {
                    @apply opacity-50 cursor-not-allowed;
                }
            `}</style>
        </div>
    );
};

export default DynamicDataTable;


// // src/components/reports/DynamicDataTable.jsx
// import React, { useState, useRef } from 'react';
// import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
// import { ChevronDown, ChevronUp, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, Download, Upload, Eye } from 'lucide-react';
// import ReportGeneratorModal from './ReportGeneratorModal';
// import { exportToCsv, exportToPdf } from '../../utils/exportUtils';

// // Global search filter component
// const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
//     <input
//         value={globalFilter || ""}
//         onChange={e => setGlobalFilter(e.target.value || undefined)}
//         placeholder={`Search records...`}
//         className="text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 transition"
//     />
// );

// const DynamicDataTable = ({ data, columns, filters, chartContainerRef }) => {
//     const [isExportModalOpen, setIsExportModalOpen] = useState(false);
//     const fileInputRef = useRef(null);

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         prepareRow,
//         page,
//         canPreviousPage,
//         canNextPage,
//         pageOptions,
//         pageCount,
//         gotoPage,
//         nextPage,
//         previousPage,
//         setPageSize,
//         state: { pageIndex, pageSize, globalFilter },
//         setGlobalFilter,
//     } = useTable({ columns, data, initialState: { pageSize: 10 } }, useGlobalFilter, useSortBy, usePagination);

//     // --- HANDLER FUNCTIONS for Import/Export ---

//     const handleGenerateReport = (options) => {
//         if (options.format === 'csv') {
//             exportToCsv(data, columns);
//         } else if (options.format === 'pdf') {
//             exportToPdf(data, columns, filters, options.includeCharts, chartContainerRef);
//         }
//     };
    
//     const handleImportClick = () => {
//         // Programmatically click the hidden file input
//         fileInputRef.current.click();
//     };

//     const handleFileImport = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             // In a real application, you would parse the CSV/Excel file here
//             // using a library like 'xlsx' and update the application state.
//             alert(`File "${file.name}" selected for import. Processing logic would be implemented here to update the data.`);
//         }
//     };

//     // --- RENDER LOGIC ---

//     return (
//         <>
//             <ReportGeneratorModal
//                 isOpen={isExportModalOpen}
//                 onClose={() => setIsExportModalOpen(false)}
//                 onGenerate={handleGenerateReport}
//                 filters={filters}
//             />
//             <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//                 <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
//                     <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
//                     <div className="flex items-center space-x-2">
//                         {/* Hidden file input for import */}
//                         <input
//                             type="file"
//                             ref={fileInputRef}
//                             onChange={handleFileImport}
//                             className="hidden"
//                             accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
//                         />
//                         <button onClick={handleImportClick} className="btn-secondary text-sm flex items-center gap-1"><Upload size={14}/> Import</button>
//                         <button onClick={() => setIsExportModalOpen(true)} className="btn-primary text-sm flex items-center gap-1"><Download size={14}/> Export</button>
//                     </div>
//                 </div>

//                 <div className="overflow-x-auto">
//                      <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-50 dark:bg-gray-700">
//                         {headerGroups.map(headerGroup => (
//                             <tr {...headerGroup.getHeaderGroupProps()}>
//                                 {headerGroup.headers.map(column => (
//                                     <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none">
//                                         <div className="flex items-center">
//                                             {column.render('Header')}
//                                             <span className="ml-2">
//                                                 {column.isSorted ? (column.isSortedDesc ? <ChevronDown size={14} /> : <ChevronUp size={14} />) : <div style={{width: '14px'}}></div>}
//                                             </span>
//                                         </div>
//                                     </th>
//                                 ))}
//                             </tr>
//                         ))}
//                     </thead>
//                     <tbody {...getTableBodyProps()} className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                         {page.map(row => {
//                             prepareRow(row);
//                             return (
//                                 <tr {...row.getRowProps()} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
//                                     {row.cells.map(cell => (
//                                         <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">{cell.render('Cell')}</td>
//                                     ))}
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//                 </div>

//                 {/* Pagination Controls */}
//                 <div className="py-3 flex items-center justify-between flex-wrap gap-2">
//                     <div className="flex gap-x-2 items-center">
//                         <span className="text-sm text-gray-700 dark:text-gray-200">
//                             Page <span className="font-medium">{pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
//                         </span>
//                         <select
//                             value={pageSize}
//                             onChange={e => setPageSize(Number(e.target.value))}
//                              className="text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
//                         >
//                             {[5, 10, 20, 30].map(pageSize => (
//                                 <option key={pageSize} value={pageSize}>
//                                     Show {pageSize}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div>
//                         <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                             <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="pagination-btn rounded-l-md"><ChevronsLeft size={16}/></button>
//                             <button onClick={() => previousPage()} disabled={!canPreviousPage} className="pagination-btn"><ChevronLeft size={16}/></button>
//                             <button onClick={() => nextPage()} disabled={!canNextPage} className="pagination-btn"><ChevronRight size={16}/></button>
//                             <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="pagination-btn rounded-r-md"><ChevronsRight size={16}/></button>
//                         </nav>
//                     </div>
//                 </div>

//                  {/* Reusable Styles */}
//                  <style>{`
//                     .btn-primary { @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors shadow; }
//                     .btn-secondary { @apply bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white; }
//                     .pagination-btn { @apply relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700; }
//                     .pagination-btn:disabled { @apply opacity-50 cursor-not-allowed; }
//                 `}</style>
//             </div>
//         </>
//     );
// };

// export default DynamicDataTable;


