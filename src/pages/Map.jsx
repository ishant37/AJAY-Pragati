import React, { useState } from 'react';
import { MapPin, TrendingUp, Mountain } from 'lucide-react';
import { cn } from '../utils/cn';

// Import the different map components
import CadastrialMap from '../components/Maps/CadastrialMap.jsx';


// Configuration for map types
const mapOptions = [
  { id: 'cadastrial', label: 'Cadastrial Map', icon: MapPin, component: CadastrialMap },
];

const Map = () => {
  const [activeMap, setActiveMap] = useState('cadastrial');

  const handleMapChange = (mapId) => {
    setActiveMap(mapId);
  };
  
  // Find the component to render based on the active state
  const ActiveMapComponent = mapOptions.find(map => map.id === activeMap)?.component;

  return (
    <div className="relative h-screen w-full">
      {/* Map Switcher Control at the top-center */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[1000]">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-full shadow-xl border border-gray-200 dark:border-gray-700 flex items-center p-1">
          {mapOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => handleMapChange(option.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300",
                  activeMap === option.id
                    ? "bg-primary text-white shadow-lg shadow-primary/50"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
                aria-label={option.label}
                title={option.label}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render the active map component */}
      <div className="h-full w-full">
        {ActiveMapComponent && <ActiveMapComponent />}
      </div>
    </div>
  );
};

export default Map;

