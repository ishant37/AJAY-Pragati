import React, { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Chart from "chart.js/auto";

// --- Utility: PM-AJAY Sample Data Generation ---
const generatePMAJAYStats = (name, type) => {
    // Base multipliers for dynamic, realistic sample numbers
    const isDistrict = type === 'District';
    const varianceFactor = name.length * 0.1;

    // Define base numbers (State vs. District scale)
    const baseIdentified = isDistrict ? 50 : 2500;
    const baseFunds = isDistrict ? 8.5 : 450; // In Crore (Cr)
    const baseHouseholds = isDistrict ? 1500 : 80000;
    const baseSanctioned = isDistrict ? 5.2 : 300; // In Crore (Cr)

    const villagesIdentified = Math.round(baseIdentified * (1 + varianceFactor));
    const villagesSaturated = Math.round(villagesIdentified * 0.70 * (1 + varianceFactor * 0.2));
    const householdsCovered = Math.round(baseHouseholds * (1 + varianceFactor * 0.3));

    return {
        // SCHEME INFO
        villagesIdentified: villagesIdentified,
        householdsCovered: householdsCovered,
        stateRank: isDistrict ? 'N/A' : Math.ceil(Math.random() * 15),

        // IMPLEMENTATION STATUS
        villagesSaturated: villagesSaturated,
        saturationRate: ((villagesSaturated / villagesIdentified) * 100).toFixed(1),
        infraProjectsCompleted: Math.round(villagesIdentified * 4 * (1 + varianceFactor * 0.1)),
        livelihoodProjects: Math.round(villagesIdentified * 10 * (1 + varianceFactor * 0.1)),
        
        // FINANCIALS
        fundsSanctioned: (baseSanctioned * (1 + varianceFactor * 0.1)).toFixed(2),
        fundsReleased: (baseFunds * (1 + varianceFactor * 0.2)).toFixed(2),
        utilizationRate: ((baseFunds * (1 + varianceFactor * 0.2) / baseSanctioned * (1 + varianceFactor * 0.1)) * 100 * 0.9).toFixed(1),
    };
};


const GEOJSON_URLS = {
    "Madhya Pradesh":
        "https://raw.githubusercontent.com/udit-001/india-maps-data/refs/heads/main/geojson/states/madhya-pradesh.geojson",
    Odisha:
        "https://raw.githubusercontent.com/udit-001/india-maps-data/refs/heads/main/geojson/states/odisha.geojson",
    Telangana:
        "https://raw.githubusercontent.com/gggodhwani/telangana_boundaries/refs/heads/master/districts.json",
    Tripura:
        "https://raw.githubusercontent.com/datta07/INDIAN-SHAPEFILES/master/STATES/TRIPURA/TRIPURA_DISTRICTS.geojson",
};

// --- GeoJSON Property Mapping for District Names ---
const DISTRICT_NAME_PROPERTIES = {
    "Madhya Pradesh": "district",
    "Odisha": "district",
    "Telangana": "DISTRICT",
    "Tripura": "ADM2_EN",
};

// --- Hardcoded Data for Tripura and Balaghat Plots (REMOVED: PLOT DATA) ---
const TRIPURA_DISTRICT_NAMES = [
    "Dhalai", "Gomati", "Khowai", "North Tripura",
    "Sepahijala", "South Tripura", "Unakoti", "West Tripura",
];

// --- Leaflet Styling ---
const STATE_COLOR_STYLE = {
    color: "#00782a",
    weight: 1,
    opacity: 0.8,
    fillColor: "#a3c7a7",
    fillOpacity: 0.3,
};

const HIGHLIGHTED_DISTRICT_STYLE = {
    color: "red",
    weight: 3,
    opacity: 1,
    fillColor: "#ff7800",
    fillOpacity: 0.5,
};

// --- PLOT STYLING REMOVED ---


const CadastrialMap = () => {
    const [selectedState, setSelectedState] = useState("Madhya Pradesh");
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedPlot, setSelectedPlot] = useState(null); 
    // const [stats, setStats] = useState(null); // FRA stats removed
    const [pmAjayStats, setPmAjayStats] = useState(null); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const geojsonLayerRef = useRef(null);
    const geojsonFeaturesRef = useRef([]);
    // const plotLayerRef = useRef(null); // Plot reference removed
    
    // --- Utility: Get District Name (remains the same) ---
    const getDistrictName = useCallback((feature, stateName, index = -1) => {
        if (stateName === "Tripura") {
            return TRIPURA_DISTRICT_NAMES[index] || "Unknown District (Tripura)";
        }
        const properties = feature.properties;
        const specificKey = DISTRICT_NAME_PROPERTIES[stateName];
        if (properties && properties[specificKey]) {
            return properties[specificKey];
        }
        return properties.D_N || properties.ADM2_EN || properties.name || properties.NAME_2 || "Unknown District";
    }, []);

    // --- Data Loading Effect (Updated to only load PM-AJAY stats) ---
    useEffect(() => {
        const type = selectedDistrict ? 'District' : 'State';
        const name = selectedDistrict ? selectedDistrict.name : selectedState;

        setPmAjayStats(generatePMAJAYStats(name, type));

    }, [selectedState, selectedDistrict, districts.length]);
    
    
    // --- Plot Rendering Effect (REMOVED) ---
    useEffect(() => {
        // Previous BALAGHAT_PLOTS rendering logic is removed
    }, [selectedDistrict, selectedState]);


    // --- Event Handlers (remains the same) ---

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedDistrict(null);
        setSelectedPlot(null);
    };

    const handleDistrictSelect = (event) => {
        const districtName = event.target.value;
        setSelectedPlot(null); 

        if (geojsonLayerRef.current) {
            geojsonLayerRef.current.eachLayer(l => l.setStyle(STATE_COLOR_STYLE));
        }

        if (districtName === "") {
            setSelectedDistrict(null);
            if(mapInstanceRef.current && geojsonLayerRef.current) {
                mapInstanceRef.current.fitBounds(geojsonLayerRef.current.getBounds());
            }
        } else {
            const featureIndex = geojsonFeaturesRef.current.findIndex(f => {
                const index = geojsonFeaturesRef.current.indexOf(f);
                return getDistrictName(f, selectedState, index) === districtName;
            });

            const feature = geojsonFeaturesRef.current[featureIndex];
            let targetLayer = null;
            if (feature) {
                geojsonLayerRef.current.eachLayer((l) => {
                    if (l.feature === feature) targetLayer = l;
                });
            }

            if (feature && targetLayer) {
                targetLayer.setStyle(HIGHLIGHTED_DISTRICT_STYLE);
                setSelectedDistrict({ name: districtName, feature: feature, layer: targetLayer });
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.fitBounds(targetLayer.getBounds().pad(0.1));
                }
            }
        }
    };

    const handleMapClick = (feature, layer) => {
        const index = geojsonFeaturesRef.current.indexOf(feature);
        const districtName = getDistrictName(feature, selectedState, index);

        if (geojsonLayerRef.current) {
            geojsonLayerRef.current.eachLayer(l => l.setStyle(STATE_COLOR_STYLE));
        }

        layer.setStyle(HIGHLIGHTED_DISTRICT_STYLE);
        setSelectedDistrict({ name: districtName, feature, layer });
        setSelectedPlot(null); 
        setIsSidebarOpen(true); 

        if (mapInstanceRef.current) {
            mapInstanceRef.current.fitBounds(layer.getBounds().pad(0.1));
        }
    };


    // --- Map Initialization and GeoJSON Loading (Fixed) ---
    useEffect(() => {
        const initializeMap = () => {
            if (!mapRef.current) return;

            if (!mapInstanceRef.current) {
                const map = L.map(mapRef.current, {
                    zoomControl: true,
                    scrollWheelZoom: true,
                    doubleClickZoom: true,
                    boxZoom: true
                }).setView([22.0, 79.0], 5);
                
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "&copy; OpenStreetMap contributors",
                    maxZoom: 18
                }).addTo(map);
                mapInstanceRef.current = map;
            } else {
                 mapInstanceRef.current.invalidateSize();
            }

            const map = mapInstanceRef.current;

            if (geojsonLayerRef.current) {
                map.removeLayer(geojsonLayerRef.current);
            }
            
            setSelectedDistrict(null);
            setSelectedPlot(null);

            fetch(GEOJSON_URLS[selectedState])
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Failed to load GeoJSON for ${selectedState}: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((geojson) => {
                    geojsonFeaturesRef.current = geojson.features;
                    const uniqueDistrictNames = (selectedState === "Tripura")
                        ? TRIPURA_DISTRICT_NAMES
                        : [...new Set(geojson.features.map((f, i) => getDistrictName(f, selectedState, i)))]
                            .filter(name => name !== "Unknown District")
                            .sort();
                    
                    setDistricts(uniqueDistrictNames);

                    const gLayer = L.geoJSON(geojson, {
                        style: STATE_COLOR_STYLE,
                        onEachFeature: (feature, layer) => {
                            layer.on("click", (e) => {
                                L.DomEvent.stopPropagation(e);
                                handleMapClick(feature, layer);
                            });
                            const index = geojsonFeaturesRef.current.indexOf(feature);
                            const districtName = getDistrictName(feature, selectedState, index);
                            layer.bindTooltip(`District: ${districtName}`, { sticky: true });
                        },
                    }).addTo(map);

                    geojsonLayerRef.current = gLayer;
                    map.fitBounds(gLayer.getBounds());
                })
                .catch((err) => console.error("Error initializing map or loading GeoJSON:", err));
        };

        const timeoutId = setTimeout(initializeMap, 100); 

        return () => clearTimeout(timeoutId);

    }, [selectedState, getDistrictName]);
    
    // Resize observer to invalidate map size when the container dimensions change
    useEffect(() => {
        const map = mapInstanceRef.current;
        const mapElement = mapRef.current;
        if (!map || !mapElement) return;

        const observer = new ResizeObserver(() => {
            map.invalidateSize();
        });

        observer.observe(mapElement);

        return () => observer.unobserve(mapElement);
    }, []);


    const getSidebarContent = () => {
        const name = selectedDistrict ? selectedDistrict.name : selectedState;
        const type = selectedDistrict ? 'District' : 'State';

        // NOTE: Plot details view logic remains for future potential use, 
        // but no plots are currently being rendered.
        if (selectedPlot) {
            return <PlotDetailView plotData={selectedPlot} />;
        }
        if (pmAjayStats) {
            return <StateDistrictView pmAjayStats={pmAjayStats} name={name} type={type} />;
        }
        return <SidebarPlaceholder message="Select a state and a district or click on the map area to begin analysis." />;
    };

    return (
        <div className="map-container">
            <div ref={mapRef} id="map" />
            {/* Sidebar is now positioned on the right */}
            <div id="sidebar" className={isSidebarOpen ? "visible" : ""}>
                <div className="sidebar-header">
                    <div className="sidebar-title-container">
                        {/* Title adjusted for PM-AJAY focus */}
                        <h3>{selectedPlot ? '📋 Plot Details' : (selectedDistrict ? '🏡 PM-AJAY District Status' : '🏛️ PM-AJAY State Overview')}</h3>
                        <button onClick={() => setIsSidebarOpen(false)} className="close-btn">×</button>
                    </div>

                    <div className="filter-group">
                        <label>Select State:</label>
                        <select value={selectedState} onChange={handleStateChange}>
                            {Object.keys(GEOJSON_URLS).map((stateName) => (
                                <option key={stateName} value={stateName}>{stateName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Select District (Optional):</label>
                        <select
                            value={selectedDistrict ? selectedDistrict.name : ""}
                            onChange={handleDistrictSelect}
                            disabled={districts.length === 0}
                        >
                            <option value="">-- View State Summary --</option>
                            {districts.map((districtName) => (
                                <option key={districtName} value={districtName}>{districtName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="sidebar-content">
                    {getSidebarContent()}
                </div>
            </div>

            <style>{`
                /* --- CSS Variables for Easy Theming (Kept for consistency) --- */
                :root {
                    --bg-sidebar: #f8f9fa;
                    --bg-card: #ffffff;
                    --border-color: #dee2e6;
                    --shadow-color: rgba(0, 0, 0, 0.08);
                    --text-primary: #212529;
                    --text-secondary: #6c757d;
                    --primary-color: #007bff;
                    --success-color: #28a745;
                    --warning-color: #ffc107;
                    --info-color: #17a2b8;
                    --pmajay-color: #8b5cf6; /* Tailwind Purple-500 */
                    --font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }
                
                /* --- Main Layout --- */
                .map-container {
                    height: 100vh; 
                    width: 100%;
                    position: relative;
                    font-family: var(--font-family);
                    overflow: hidden; 
                    display: flex;
                }
                #map {
                    height: 100%;
                    flex-grow: 1; 
                }

                /* Sidebar Positioning (RIGHT SIDE) */
                #sidebar {
                    position: absolute;
                    top: 10px;
                    right: 10px; /* Aligned to the right */
                    left: auto; /* Ensure it stays right */
                    width: 380px; 
                    height: calc(100% - 20px);
                    background: var(--bg-sidebar);
                    box-shadow: -4px 0 20px rgba(0,0,0,0.15); 
                    z-index: 1000;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    transform: translateX(calc(100% + 20px)); 
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                #sidebar.visible {
                    transform: translateX(0);
                }
                
                /* --- Media Query for Mobile Responsiveness --- */
                @media (max-width: 768px) {
                    #sidebar {
                        width: 90%;
                        left: 5%;
                        right: 5%;
                        height: 90%;
                        bottom: 5%;
                        top: auto;
                        box-shadow: 0 0 20px rgba(0,0,0,0.2);
                        transform: translateY(calc(100% + 20px));
                    }
                    #sidebar.visible {
                        transform: translateY(0);
                    }
                }

                /* --- Sidebar Header & Filters (rest of styles remain) --- */
                .sidebar-header {
                    padding: 20px;
                    border-bottom: 1px solid var(--border-color);
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(8px);
                    z-index: 10;
                }
                .sidebar-title-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .sidebar-title-container h3 {
                    margin: 0;
                    color: var(--text-primary);
                    font-size: 1.3rem;
                    font-weight: 600;
                }
                .close-btn {
                    cursor: pointer;
                    font-size: 28px;
                    font-weight: 400;
                    color: var(--text-secondary);
                    background: none;
                    border: none;
                    padding: 0;
                    line-height: 1;
                    transition: color 0.2s, transform 0.2s;
                }
                .close-btn:hover {
                    color: #dc3545;
                    transform: rotate(90deg);
                }
                .filter-group {
                    margin-bottom: 16px;
                }
                .filter-group:last-child {
                    margin-bottom: 0;
                }
                .filter-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
                .filter-group select {
                    width: 100%;
                    padding: 10px 12px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                    font-size: 1rem;
                    background-color: var(--bg-card);
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .filter-group select:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
                }
                .filter-group select:disabled {
                    background-color: #e9ecef;
                    cursor: not-allowed;
                }

                /* --- Sidebar Content Area --- */
                .sidebar-content {
                    padding: 20px;
                    overflow-y: auto;
                    flex-grow: 1; 
                }
                .sidebar-content::-webkit-scrollbar { width: 6px; }
                .sidebar-content::-webkit-scrollbar-track { background: #f1f1f1; }
                .sidebar-content::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
                .sidebar-content::-webkit-scrollbar-thumb:hover { background: #aaa; }

                /* --- General Card Styling (Adjusted for PMAJAY section) --- */
                .info-card {
                    background: var(--bg-card);
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 16px;
                    border: 1px solid var(--border-color);
                    box-shadow: 0 2px 8px var(--shadow-color);
                }
                .pmajay-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                }
                .pmajay-stat-item {
                    background-color: #f3e8ff; /* Light purple background */
                    border-left: 4px solid var(--pmajay-color);
                    border-radius: 8px;
                    padding: 12px;
                }
                .pmajay-stat-item .stat-number {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: var(--pmajay-color);
                    margin: 0 0 4px 0;
                }
                .pmajay-stat-item .stat-label {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    margin: 0;
                    line-height: 1.2;
                }

                /* --- Existing styles remain for other sections (omitted for brevity) --- */
                .analysis-header { margin-bottom: 24px; text-align: center; }
                .analysis-header h4 { font-size: 1.4rem; font-weight: 600; color: var(--text-primary); margin: 0 0 4px 0; }
                .analysis-header p { font-size: 1rem; color: var(--text-secondary); margin: 0; }
                .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
                .stat-item { background-color: #f8f9fa; border-radius: 10px; padding: 16px; text-align: center; }
                .stat-item .stat-number { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin: 0 0 4px 0; }
                .stat-item .stat-label { font-size: 0.85rem; color: var(--text-secondary); margin: 0; }
                .claim-card { margin-bottom: 16px; }
                .claim-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
                .claim-type { font-weight: 600; color: var(--text-primary); }
                .claim-stats { display: flex; justify-content: space-around; margin-bottom: 12px; }
                .claim-stat .claim-number { font-size: 1.2rem; font-weight: 600; }
                .claim-stat .claim-label { font-size: 0.8rem; color: var(--text-secondary); }
                .claim-stat.granted .claim-number { color: var(--success-color); }
                .progress-bar { background: #e9ecef; border-radius: 10px; height: 6px; overflow: hidden; }
                .progress-fill { background: var(--success-color); height: 100%; border-radius: 10px; }

                .plot-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
                .plot-title { color: var(--text-primary); font-size: 1.3rem; font-weight: 600; margin: 0; }
                .plot-id-badge { background: var(--primary-color); color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.9rem; font-weight: 500; }
                .plot-info-grid { display: grid; gap: 12px; }
                .plot-info-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f1f1; }
                .plot-info-item:last-child { border-bottom: none; }
                .plot-info-item strong { color: var(--text-secondary); font-weight: 500; }
                .plot-info-item span { color: var(--text-primary); font-weight: 500; text-align: right; }

                .placeholder { text-align: center; color: var(--text-secondary); font-size: 1rem; padding: 40px 20px; border: 2px dashed var(--border-color); border-radius: 12px; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; }
                .placeholder .icon { font-size: 2.5rem; margin-bottom: 12px; }

            `}</style>
        </div>
    );
};


// ================================================================== //
// ======= SIDEBAR COMPONENTS (Data Views - Updated to include PM-AJAY) ========================== //
// ================================================================== //

const StateDistrictView = ({ pmAjayStats, name, type }) => {
    // Chart, FRA stats, and related elements are removed.

    const { 
        villagesIdentified,
        householdsCovered,
        stateRank,
        villagesSaturated,
        saturationRate,
        infraProjectsCompleted,
        livelihoodProjects,
        fundsSanctioned,
        fundsReleased,
        utilizationRate,
    } = pmAjayStats;


    return (
        <div>
            <div className="analysis-header">
                <h4>{name}</h4>
                <p>{type}-level PM-AJAY Implementation Status</p>
            </div>

            {/* PM-AJAY Overview Section */}
            <div className="info-card" style={{ borderColor: 'var(--pmajay-color)' }}>
                <h5 style={{ color: 'var(--pmajay-color)', marginBottom: '16px', fontWeight: 600 }}>🚀 Scheme Overview</h5>
                
                <div className="pmajay-grid">
                    <div className="pmajay-stat-item">
                        <div className="stat-number">{villagesIdentified.toLocaleString()}</div>
                        <div className="stat-label">Villages Identified</div>
                    </div>
                    <div className="pmajay-stat-item">
                        <div className="stat-number">{householdsCovered.toLocaleString()}</div>
                        <div className="stat-label">Households Targeted</div>
                    </div>
                    {type === 'State' && (
                        <div className="pmajay-stat-item" style={{ gridColumn: 'span 2' }}>
                            <div className="stat-number">Rank {stateRank}</div>
                            <div className="stat-label">National Performance Rank</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Implementation Status Section */}
            <div className="info-card">
                <h5>✅ Implementation Status</h5>
                <div className="pmajay-grid mt-3">
                    <div className="pmajay-stat-item" style={{ borderLeft: '4px solid #10b981' }}>
                        <div className="stat-number">{villagesSaturated.toLocaleString()}</div>
                        <div className="stat-label">Villages Saturated</div>
                    </div>
                    <div className="pmajay-stat-item" style={{ borderLeft: '4px solid #10b981' }}>
                        <div className="stat-number">{saturationRate}%</div>
                        <div className="stat-label">Saturation Rate</div>
                    </div>
                    <div className="pmajay-stat-item">
                        <div className="stat-number">{infraProjectsCompleted.toLocaleString()}</div>
                        <div className="stat-label">Infrastructure Works</div>
                    </div>
                    <div className="pmajay-stat-item">
                        <div className="stat-number">{livelihoodProjects.toLocaleString()}</div>
                        <div className="stat-label">Livelihood Projects</div>
                    </div>
                </div>
            </div>

            {/* Financial Status Section */}
            <div className="info-card">
                <h5>💰 Financial Status</h5>
                <div className="pmajay-grid mt-3">
                    <div className="pmajay-stat-item" style={{ borderLeft: '4px solid #f97316' }}>
                        <div className="stat-number">₹{fundsSanctioned} Cr</div>
                        <div className="stat-label">Funds Sanctioned</div>
                    </div>
                    <div className="pmajay-stat-item" style={{ borderLeft: '4px solid #f97316' }}>
                        <div className="stat-number">₹{fundsReleased} Cr</div>
                        <div className="stat-label">Funds Released</div>
                    </div>
                    <div className="pmajay-stat-item" style={{ gridColumn: 'span 2', borderLeft: '4px solid #3b82f6' }}>
                        <div className="stat-number">{utilizationRate}%</div>
                        <div className="stat-label">Fund Utilization Rate</div>
                    </div>
                </div>
            </div>
            
            {/* Chart placeholder removed */}
        </div>
    );
};

const PlotDetailView = ({ plotData }) => {
    return (
        <div className="info-card">
            <div className="plot-header">
                <h4 className="plot-title">Plot Information</h4>
                <div className="plot-id-badge">{plotData.plot_id}</div>
            </div>
            <div className="plot-info-grid">
                <div className="plot-info-item"><strong>Village:</strong> <span>{plotData.village_nam}</span></div>
                <div className="plot-info-item"><strong>Tenant:</strong> <span>{plotData.tenant_name}</span></div>
                <div className="plot-info-item"><strong>Khasra No:</strong> <span>{plotData.kha_no}</span></div>
                <div className="plot-info-item"><strong>Land Area:</strong> <span>{plotData.Land_Area}</span></div>
                <div className="plot-info-item"><strong>Land Type:</strong> <span>{plotData.Land_type}</span></div>
                <div className="plot-info-item"><strong>Rent/Cess:</strong> <span>{plotData.Rent_Cess}</span></div>
                <div className="plot-info-item"><strong>Last Updated:</strong> <span>{plotData.Last_Published_Date}</span></div>
            </div>
        </div>
    );
};

const SidebarPlaceholder = ({ message }) => {
    return (
        <div className="placeholder">
            <div className="icon">📊</div>
            {message}
        </div>
    );
};

export default CadastrialMap;
