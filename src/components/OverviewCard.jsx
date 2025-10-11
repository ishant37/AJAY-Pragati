import React from 'react';

const OverviewCard = ({ title, value, icon: Icon, color, subtitle }) => {
  return (
    <div className="card p-6 relative overflow-hidden border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            {title}
          </p>
          <h3 
            className="text-3xl sm:text-4xl font-bold"
            style={{ color }}
          >
            {value}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {subtitle}
            </p>
          )}
        </div>
        <div 
          className="rounded-xl p-3 flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-10 h-10" style={{ color }} />
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
