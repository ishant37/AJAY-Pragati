import React, { useState, useMemo, useCallback } from 'react';

// --- MOCK DATA GENERATION UTILITIES ---
const BENEFICIARY_NAMES = [
    "Rajesh Kumar", "Sunita Devi", "Praveen M.", "Laxmi Bai", "Gopal Singh", "Meena Kumari", 
    "Sanjay Yadav", "Rekha Sharma", "Vikas Gupta", "Kavita Sahu", "Mohan Lal", "Priya Varma"
];

const ALL_STATES_AND_UTS = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "A & N Islands (UT)", 
    "Chandigarh (UT)", "Daman & Diu (UT)", "Delhi (UT)", "Jammu & Kashmir (UT)", "Ladakh (UT)", 
    "Lakshadweep (UT)", "Puducherry (UT)"
];

const generateBeneficiaries = (prefix, count, sectorId) => {
    return new Array(count).fill(0).map((_, i) => {
        const name = BENEFICIARY_NAMES[Math.floor(Math.random() * BENEFICIARY_NAMES.length)];
        const fundDisbursed = i % 2 === 0;
        const statusMap = {
            income: fundDisbursed ? 'Loan Disbursed, Business Active' : 'Loan Sanctioned, Funds Pending',
            skill: fundDisbursed ? 'Certified & Placed' : 'Training Ongoing, Stipend Pending',
            infra: fundDisbursed ? 'Facility Operational' : 'Construction In Progress',
        };
        const status = statusMap[sectorId];

        const outcome = {};
        if (sectorId === 'income') {
            outcome.type = 'Business'; outcome.status = fundDisbursed ? 'Active' : 'Scaling';
            outcome.income_inc = fundDisbursed ? (40 + i * 2) : 20;
            outcome.desc = fundDisbursed ? `Established a successful tailoring unit; verified monthly income increased by ${outcome.income_inc}% YTD.` : 'Initial inventory purchased; business planning underway (Monitoring Cycle 1).';
        } else if (sectorId === 'skill') {
            outcome.type = 'Trained'; outcome.placement = fundDisbursed ? 'Secured' : 'Searching';
            outcome.job_ready = fundDisbursed ? 85 : 65;
            outcome.desc = fundDisbursed ? `Completed CNC Operator course and secured placement at local firm. Salary verification due next month.` : 'Completed 400 hours of vocational training; actively interviewing (Job Readiness: 65%).';
        } else { // infra
            outcome.type = 'Center'; outcome.status = fundDisbursed ? 'Operational' : 'Phase 2 Pending';
            outcome.families_served = 300 + i * 50;
            outcome.util_rate = fundDisbursed ? 85 : 60;
            outcome.desc = fundDisbursed ? `Community center is fully utilized for evening classes and health camps.` : 'Hostel construction is at lintel level; geo-tag verification complete. Expected completion Q3.';
        }

        return {
            id: `${prefix}${i + 1}`,
            name: name + (i > 5 ? ' G.' : ' J.'),
            fund: { t: fundDisbursed ? 9.5 : 4.0, a: 10.0 },
            outcome,
            status: status,
        };
    });
};

const generateMockData = () => {
    const data = [
        { id: 'income', sector: 'Income Generation (Entrepreneurship Support)', color: 'border-green-600', projects: [] },
        { id: 'skill', sector: 'Skill Development (Training & Employability)', color: 'border-blue-600', projects: [] },
        { id: 'infra', sector: 'Infrastructure Support (Community Assets)', color: 'border-yellow-600', projects: [] },
    ];

    ALL_STATES_AND_UTS.forEach(state => {
        const isHighDensity = ['Uttar Pradesh', 'Maharashtra', 'Bihar', 'Tamil Nadu', 'Rajasthan'].includes(state);
        const baseCount = isHighDensity ? 15 : 5;
        const districtCount = isHighDensity ? 2 : 1;

        // INCOME
        const incomeProject = { state, allocation: isHighDensity ? 150.0 : 15.0, districts: [] };
        for (let i = 0; i < districtCount; i++) {
            incomeProject.districts.push({ district: `${state} Dist ${i + 1}`, beneficiaries: generateBeneficiaries('I' + state.slice(0, 2), baseCount, 'income') });
        }
        data[0].projects.push(incomeProject);

        // SKILL
        const skillProject = { state, allocation: isHighDensity ? 120.0 : 10.0, districts: [] };
        for (let i = 0; i < districtCount; i++) {
            skillProject.districts.push({ district: `${state} Dist ${i + 1}`, beneficiaries: generateBeneficiaries('S' + state.slice(0, 2), baseCount, 'skill') });
        }
        data[1].projects.push(skillProject);

        // INFRA
        const infraProject = { state, allocation: isHighDensity ? 80.0 : 25.0, districts: [] };
        for (let i = 0; i < districtCount; i++) {
            infraProject.districts.push({ district: `${state} Dist ${i + 1}`, beneficiaries: generateBeneficiaries('R' + state.slice(0, 2), baseCount > 5 ? 5 : 2, 'infra') });
        }
        data[2].projects.push(infraProject);
    });

    data.forEach(sector => sector.projects.sort((a, b) => a.state.localeCompare(b.state)));
    return data;
};

const GIA_MOCK_DATA = generateMockData();

// --- UTILITY FUNCTIONS ---

const getImpactColor = (score) => {
  if (score >= 85) return 'text-white bg-green-600';
  if (score >= 60) return 'text-yellow-900 bg-yellow-400';
  return 'text-white bg-red-500';
};

const getFundProgress = (transferred, allotted) => {
    return allotted > 0 ? ((transferred / allotted) * 100).toFixed(0) : 0;
}

const calculateAggregates = (beneficiaries, sectorId) => {
  const result = { 
    total_bens: beneficiaries.length, funded_bens: 0, pending_bens: 0, 
    total_asset_value: 0, total_funded: 0, 
    avg_job_readiness: 0, avg_income_inc: 0, total_assets: 0
  };
  
  let totalIncomeInc = 0;
  let activeBusinessCount = 0;
  let totalJobReadiness = 0;
  let skilledCount = 0;

  beneficiaries.forEach(b => {
    result.total_asset_value += b.fund.a;
    result.total_funded += b.fund.t;

    const isFunded = b.fund.t > (b.fund.a * 0.5);
    if (isFunded) {
        result.funded_bens += 1;
    } else {
        result.pending_bens += 1;
    }

    if (sectorId === 'income') {
      if (b.outcome.type === 'Business' && isFunded) {
        activeBusinessCount += 1; 
        totalIncomeInc += b.outcome.income_inc || 0;
      }
    } else if (sectorId === 'skill') {
      if (b.outcome.type === 'Trained') {
        skilledCount += 1; 
        totalJobReadiness += b.outcome.job_ready || 0;
      }
    } else if (sectorId === 'infra') {
      if (b.outcome.type === 'Center' || b.outcome.type === 'Hostel' || b.outcome.type === 'Library') {
        result.total_assets += 1;
      }
    }
  });

  // FINAL METRICS CALCULATION
  if (sectorId === 'income') {
    result.avg_income_inc = activeBusinessCount > 0 ? (totalIncomeInc / activeBusinessCount).toFixed(0) : 0;
  } else if (sectorId === 'skill') {
    result.avg_job_readiness = skilledCount > 0 ? (totalJobReadiness / skilledCount).toFixed(0) : 0;
  }
  
  return result;
};

// --- RENDER COMPONENT: QUANTIFIED METRICS CARD (Main Dashboard Stats) ---

const QuantifiedMetricsCard = ({ metrics, sectorId, title, subTitle }) => {
  const isIncome = sectorId === 'income';
  const isSkill = sectorId === 'skill';
  
  let mainLabel, secondLabel, mainValue, secondValue;
  if (isIncome) {
    mainLabel = 'Active Businesses Funded'; secondLabel = 'Avg. Income Increase';
    mainValue = metrics.funded_bens; secondValue = `${metrics.avg_income_inc}%`;
  } else if (isSkill) {
    mainLabel = 'Certified Beneficiaries'; secondLabel = 'Avg. Job Readiness Score';
    mainValue = metrics.funded_bens; secondValue = `${metrics.avg_job_readiness}%`;
  } else {
    mainLabel = 'Assets Delivered/Operational'; secondLabel = 'Total Beneficiaries Funded';
    mainValue = metrics.total_assets; secondValue = metrics.funded_bens;
  }
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">{subTitle}</p>
        <div className="grid grid-cols-2 gap-3 text-center border-b pb-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
                <p className="text-xs font-semibold text-indigo-700">{mainLabel}</p>
                <p className="text-xl font-extrabold text-indigo-600 mt-1">{mainValue.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
                <p className="text-xs font-semibold text-purple-700">{secondLabel}</p>
                <p className="text-xl font-extrabold text-purple-600 mt-1">{secondValue}</p>
            </div>
        </div>
        <div className="pt-2 grid grid-cols-3 text-xs font-semibold text-gray-700">
            <span className="text-gray-700">TOTAL APPLICANTS: {metrics.total_bens}</span>
            <span className="text-green-600">FULLY FUNDED: {metrics.funded_bens}</span>
            <span className="text-red-600">FUNDS PENDING: {metrics.pending_bens}</span>
        </div>
    </div>
  );
};


// --- RENDER COMPONENT: LIST ITEM STATS (For Levels 1, 2, 3) ---

const RenderListStats = ({ metrics, sectorId }) => {
    const isIncome = sectorId === 'income';
    const isSkill = sectorId === 'skill';
    
    let keyMetricLabel, keyMetricValue;
    if (isIncome) {
        keyMetricLabel = 'Avg Income Increase';
        keyMetricValue = `${metrics.avg_income_inc}%`;
    } else if (isSkill) {
        keyMetricLabel = 'Avg Job Readiness';
        keyMetricValue = `${metrics.avg_job_readiness}%`;
    } else {
        keyMetricLabel = 'Assets Created';
        keyMetricValue = metrics.total_assets;
    }

    return (
        <div className="grid grid-cols-4 text-xs mt-2 font-semibold gap-1 p-2 bg-gray-50 rounded-md">
            <span className="text-gray-600">Total Applicants: {metrics.total_bens}</span>
            <span className="text-green-600">Fully Funded: {metrics.funded_bens}</span>
            <span className="text-red-600">Funds Pending: {metrics.pending_bens}</span>
            <span className={`inline-flex items-center px-1 py-0.5 rounded-full text-xs font-bold ${getImpactColor(metrics.avg_job_readiness || metrics.avg_income_inc || 70)}`}>
                {keyMetricLabel}: {keyMetricValue}
            </span>
        </div>
    );
};


// --- RENDER COMPONENT: LEVEL 5 DETAIL CARD (Ultimate Transparency) ---

const BeneficiaryDetailCard = ({ beneficiary, sectorId }) => {
    const fundProgress = getFundProgress(beneficiary.fund.t, beneficiary.fund.a);

    let primaryMetric, secondaryMetric, primaryValue, secondaryValue;
    let combinedScore;

    if (sectorId === 'income') {
        primaryMetric = 'Income Increase (YoY)'; secondaryMetric = 'Business Status';
        primaryValue = `${beneficiary.outcome.income_inc || 0}%`; secondaryValue = beneficiary.outcome.status;
        combinedScore = beneficiary.outcome.income_inc || 50;
    } else if (sectorId === 'skill') {
        primaryMetric = 'Job Readiness Score'; secondaryMetric = 'Placement Status';
        primaryValue = `${beneficiary.outcome.job_ready || 0}%`; secondaryValue = beneficiary.outcome.placement || 'N/A';
        combinedScore = beneficiary.outcome.job_ready || 50;
    } else { // infra
        primaryMetric = 'Families Served'; secondaryMetric = 'Facility Utilisation';
        primaryValue = (beneficiary.outcome.families_served || 0).toLocaleString(); secondaryValue = `${beneficiary.outcome.util_rate || 0}%`;
        combinedScore = beneficiary.outcome.util_rate || 50;
    }

    const finalScore = combinedScore; 

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl h-full border-t-4 border-indigo-500">
            <h3 className="text-2xl font-bold text-gray-800 mb-5">🎯 {beneficiary.name}'s Transparency Report</h3>
            
            <div className="grid grid-cols-4 gap-4 mb-6 text-center border-b pb-4">
                
                <div className={`col-span-1 p-3 rounded-lg ${getImpactColor(finalScore)}`}>
                    <p className="text-xs font-semibold">{primaryMetric}</p>
                    <p className="text-2xl font-extrabold mt-1">{primaryValue}</p>
                </div>
                <div className="col-span-1 p-3 bg-purple-100 rounded-lg">
                    <p className="text-xs font-semibold text-purple-700">{secondaryMetric}</p>
                    <p className="text-lg font-extrabold text-purple-600 mt-1">{secondaryValue}</p>
                </div>
                <div className="col-span-2 p-3 bg-indigo-50 rounded-lg text-left">
                    <p className="text-xs font-semibold text-indigo-700">Fund Utilization: <span className='font-extrabold text-base'>{fundProgress}%</span></p>
                    <p className="text-sm font-semibold text-indigo-600 mt-1">
                        Transferred (₹Lakhs): ₹{beneficiary.fund.t.toFixed(1)} / Allotted: ₹{beneficiary.fund.a.toFixed(1)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Current Status: {beneficiary.status}</p>
                </div>
            </div>
            
            <h4 className="font-semibold text-lg text-gray-700 mb-2 border-b pb-1">Verified Outcome Tracking</h4>
            <p className="text-gray-600 border-l-4 border-blue-400 pl-3 py-2 bg-blue-50 italic">
                <span className="font-bold text-blue-700">Detailed Status:</span> {beneficiary.outcome.desc || `Project ${beneficiary.id} is actively being monitored for socio-economic upliftment.`}
            </p>

            <button className="mt-6 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                View Geo-Tagged Completion Proof & Financial Audit 🔗
            </button>
        </div>
    );
};

// --- MAIN TRANSPARENCY TRACKER COMPONENT ---
const PMAJAY_GIATransparency = () => {
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  // --- DERIVED DATA ---
  const currentSectorData = GIA_MOCK_DATA.find(s => s.id === selectedSector);
  const currentStateData = currentSectorData?.projects.find(p => p.state === selectedState);
  const currentDistrictData = currentStateData?.districts.find(d => d.district === selectedDistrict);

  // Function to calculate metrics for a specific scope 
  const getScopeMetrics = useCallback((scope, type) => {
    let beneficiaries = [];
    if (type === 'sector') {
      scope.projects.forEach(p => p.districts.forEach(d => beneficiaries.push(...d.beneficiaries)));
    } else if (type === 'state') {
      scope.districts.forEach(d => beneficiaries.push(...d.beneficiaries));
    } else if (type === 'district') {
      beneficiaries = scope.beneficiaries;
    }
    return calculateAggregates(beneficiaries, scope.id || currentSectorData?.id);
  }, [currentSectorData]);

  // Reset function
  const resetSelections = (level) => {
    setSelectedBeneficiary(null);
    if (level === 'district') {
        setSelectedDistrict(null);
    } else if (level === 'state') {
        setSelectedDistrict(null);
        setSelectedState(null);
    } else if (level === 'sector') {
        setSelectedDistrict(null);
        setSelectedState(null);
        setSelectedSector(null);
    }
  };
  
  // --- JSX RENDER LOGIC: SEQUENTIAL VIEWS ---

  // LEVEL 1: SECTOR VIEW
  const renderSectorView = () => (
    <div className="space-y-4">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 border-b pb-2">1. Select Investment Sector (GIA Allocation)</h2>
        {GIA_MOCK_DATA.map((item) => {
            const metrics = getScopeMetrics(item, 'sector');
            return (
            <div
                key={item.id}
                onClick={() => setSelectedSector(item.id)}
                className={`p-4 rounded-xl border-l-4 ${item.color} bg-white shadow-md cursor-pointer transition hover:shadow-lg`}
            >
                <p className="font-semibold text-xl text-gray-800 mb-1">{item.sector}</p>
                <RenderListStats metrics={metrics} sectorId={item.id} />
            </div>
        )})}
    </div>
  );

  // LEVEL 2: STATE VIEW
  const renderStateView = () => {
    if (!currentSectorData) return null;
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4 border-b pb-2">2. Select Implementing State/UT</h2>
            <QuantifiedMetricsCard 
                metrics={getScopeMetrics(currentSectorData, 'sector')} 
                sectorId={selectedSector} 
                title={`Summary: ${currentSectorData.sector}`}
                subTitle={`Showing implementation across ${currentSectorData.projects.length} States/UTs.`}
            />

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 bg-white p-4 rounded-xl shadow-inner border">
                {currentSectorData.projects.map((proj) => {
                    const metrics = getScopeMetrics(proj, 'state');
                    return (
                        <div
                            key={proj.state}
                            onClick={() => setSelectedState(proj.state)}
                            className={`p-3 rounded-lg border-l-4 cursor-pointer transition ${selectedState === proj.state ? 'bg-purple-100 border-purple-600 font-bold' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                        >
                            <p className="text-lg">{proj.state}</p>
                            <RenderListStats metrics={metrics} sectorId={selectedSector} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
  };

  // LEVEL 3 & 4: DISTRICT & BENEFICIARY LIST VIEW
  const renderDistrictAndBeneficiaryView = () => {
    if (!currentStateData) return null;

    // Display District List until a district is selected
    if (!selectedDistrict) {
        const stateMetrics = getScopeMetrics(currentStateData, 'state');
        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-4 border-b pb-2">3. Select District for Local Metrics</h2>
                <QuantifiedMetricsCard 
                    metrics={stateMetrics} 
                    sectorId={selectedSector} 
                    title={`${selectedState} Implementation Summary`}
                    subTitle={`Total Districts: ${currentStateData.districts.length}.`}
                />

                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 bg-white p-4 rounded-xl shadow-inner border">
                    {currentStateData.districts.map((dist) => {
                        const metrics = getScopeMetrics(dist, 'district');
                        return (
                            <div
                                key={dist.district}
                                onClick={() => setSelectedDistrict(dist.district)}
                                className={`p-3 rounded-lg border-l-4 cursor-pointer transition bg-white border-gray-200 hover:bg-indigo-50`}
                            >
                                <p className="text-lg">{dist.district}</p>
                                <RenderListStats metrics={metrics} sectorId={selectedSector} />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    
    // LEVEL 4: BENEFICIARY LIST
    const districtMetrics = getScopeMetrics(currentDistrictData, 'district');
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4 border-b pb-2">4. Select Beneficiary/Project</h2>
            <QuantifiedMetricsCard 
                metrics={districtMetrics} 
                sectorId={selectedSector} 
                title={`${selectedDistrict} Local Impact`}
                subTitle={`Showing ${districtMetrics.total_bens} individual project/applicant records.`}
            />

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 bg-white p-4 rounded-xl shadow-inner border">
                <ul className="divide-y divide-gray-200">
                    {currentDistrictData.beneficiaries.map((b) => {
                        const combinedScore = b.outcome.job_ready || b.outcome.income_inc || b.outcome.util_rate || 50;
                        const fundStatusColor = b.status.includes('Disbursed') || b.status.includes('Operational') ? 'text-green-600' : 'text-orange-600';
                        return (
                            <li
                                key={b.id}
                                onClick={() => setSelectedBeneficiary(b)}
                                className={`p-3 hover:bg-gray-50 cursor-pointer transition rounded-lg ${selectedBeneficiary?.id === b.id ? 'bg-indigo-50 border-r-4 border-indigo-600 font-semibold' : ''}`}
                            >
                                <p className="text-sm text-gray-900">{b.name} <span className="text-xs text-gray-400">({b.id})</span></p>
                                <div className="flex justify-between text-xs mt-1">
                                    <span className={`font-medium ${fundStatusColor}`}>{b.status}</span>
                                    <span className={`font-bold inline-flex items-center px-1.5 py-0.5 rounded-full ${getImpactColor(combinedScore)} text-xs`}>KPI: {combinedScore}%</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
  };

  // LEVEL 5: ULTIMATE DETAIL VIEW
  const renderDetailView = () => {
    if (!selectedBeneficiary) return null;
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4 border-b pb-2">5. Ultimate Beneficiary Detail</h2>
            <BeneficiaryDetailCard beneficiary={selectedBeneficiary} sectorId={selectedSector} />
        </div>
    );
  };

  // --- RENDER CURRENT VIEW ---
  let currentView;
  if (selectedBeneficiary) {
    currentView = renderDetailView(); // Level 5
  } else if (selectedDistrict) {
    currentView = renderDistrictAndBeneficiaryView(); // Level 4
  } else if (selectedState) {
    currentView = renderDistrictAndBeneficiaryView(); // Level 3
  } else if (selectedSector) {
    currentView = renderStateView(); // Level 2
  } else {
    currentView = renderSectorView(); // Level 1 (Default)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      
      {/* HEADER & BREADCRUMBS (Sticky for navigation) */}
      <div className="max-w-4xl mx-auto mb-6 sticky top-0 bg-gray-100 z-10 pt-4 pb-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-800 border-b-4 border-purple-400 pb-2">
          PM-AJAY GIA Fund & Impact Transparency Tracker
        </h1>
        <div className="flex flex-wrap space-x-2 text-sm text-gray-500 mt-2 p-2 bg-white shadow-md rounded-lg border">
          <span className="font-medium text-purple-600">Current Trace:</span>
          
          {/* Back button logic */}
          {(selectedSector || selectedState || selectedDistrict || selectedBeneficiary) && (
            <button
              onClick={() => {
                if (selectedBeneficiary) setSelectedBeneficiary(null);
                else if (selectedDistrict) resetSelections('district');
                else if (selectedState) resetSelections('state');
                else if (selectedSector) resetSelections('sector');
              }}
              className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs hover:bg-red-200 transition font-bold"
            >
              ← BACK
            </button>
          )}

          <span className="text-gray-300">|</span>
          <span className={`cursor-pointer ${!selectedSector ? 'font-bold text-purple-800' : 'text-gray-500 hover:text-purple-600'}`} onClick={() => resetSelections('sector')}>GIA Overview</span>
          
          {selectedSector && <span className="text-gray-300">/</span>}
          {selectedSector && <span className={`cursor-pointer ${!selectedState ? 'font-bold text-purple-800' : 'text-gray-500 hover:text-purple-600'}`} onClick={() => resetSelections('state')}>{currentSectorData?.sector}</span>}
          
          {selectedState && <span className="text-gray-300">/</span>}
          {selectedState && <span className={`cursor-pointer ${!selectedDistrict ? 'font-bold text-purple-800' : 'text-gray-500 hover:text-purple-600'}`} onClick={() => resetSelections('district')}>{selectedState}</span>}

          {selectedDistrict && <span className="text-gray-300">/</span>}
          {selectedDistrict && <span className={`cursor-pointer ${!selectedBeneficiary ? 'font-bold text-purple-800' : 'text-gray-500 hover:text-purple-600'}`}>{selectedDistrict}</span>}
          
          {selectedBeneficiary && <span className="text-gray-300">/</span>}
          {selectedBeneficiary && <span className={`font-bold text-purple-800`}>{selectedBeneficiary.name}</span>}
        </div>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
        {currentView}
      </div>
    </div>
  );
};

export default PMAJAY_GIATransparency;