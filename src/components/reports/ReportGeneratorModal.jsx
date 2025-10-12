// src/components/reports/ReportGeneratorModal.jsx
import React, { useState } from 'react';
import { X, Download, FileText, BarChart2 } from 'lucide-react';

const ReportGeneratorModal = ({ isOpen, onClose, onGenerate, filters }) => {
    const [format, setFormat] = useState('csv');
    const [includeCharts, setIncludeCharts] = useState(true);

    if (!isOpen) return null;

    const handleGenerate = () => {
        onGenerate({ format, includeCharts });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Download size={22} /> Generate Report
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Format Selection */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Export Format</label>
                        <div className="mt-1 grid grid-cols-2 gap-2">
                            <button onClick={() => setFormat('csv')} className={`report-option-btn ${format === 'csv' ? 'active' : ''}`}>
                                <FileText size={18} /> Excel (CSV)
                            </button>
                             <button onClick={() => setFormat('pdf')} className={`report-option-btn ${format === 'pdf' ? 'active' : ''}`}>
                                <FileText size={18} /> PDF
                            </button>
                        </div>
                    </div>

                    {/* Include Charts Toggle (only for PDF) */}
                    {format === 'pdf' && (
                        <div>
                             <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Options</label>
                            <label htmlFor="includeCharts" className="mt-1 flex items-center space-x-2 cursor-pointer p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                <input
                                    id="includeCharts"
                                    type="checkbox"
                                    checked={includeCharts}
                                    onChange={(e) => setIncludeCharts(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-800 dark:text-gray-200">Include Charts & Analytics</span>
                                <BarChart2 size={16} className="text-gray-400" />
                            </label>
                        </div>
                    )}
                    
                    {/* Report Preview */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 border-t pt-4">
                        <p className="font-semibold mb-1">Report Summary:</p>
                        <p><strong>State:</strong> {filters.state}</p>
                        <p><strong>Financial Year:</strong> {filters.financialYear}</p>
                        <p><strong>District:</strong> {filters.district}</p>
                        <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button onClick={handleGenerate} className="btn-primary flex items-center gap-2">
                        <Download size={18} />
                        Generate & Download
                    </button>
                </div>
            </div>
             <style>{`
                .report-option-btn { @apply w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold border-2 rounded-md transition-all; }
                .report-option-btn.active { @apply bg-primary/10 border-primary text-primary; }
                .report-option-btn:not(.active) { @apply border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700; }
            `}</style>
        </div>
    );
};

export default ReportGeneratorModal;
