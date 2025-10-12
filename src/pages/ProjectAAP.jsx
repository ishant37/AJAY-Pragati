import React, { useState, useMemo, useCallback } from 'react';
import { Briefcase, CheckCircle, Clock, XCircle, DollarSign, BarChart2, UserCheck, ChevronLeft, Send, Repeat, TrendingUp, FileText, History, FileBadge, Code } from 'lucide-react';

// --- Utility and Initial Data ---

// Define the hierarchy and user color codes
const ROLES = {
  DM: { id: 'DM', name: 'District Maker', color: 'bg-green-600' },
  SM: { id: 'SM', name: 'State Maker', color: 'bg-purple-600' }, 
  DA: { id: 'DA', name: 'District Approver', color: 'bg-yellow-600' },
  SA: { id: 'SA', name: 'State Approver', color: 'bg-blue-600' },
  CU: { id: 'CU', name: 'Central User (PACC)', color: 'bg-red-600' }, // CU is the final approver
};

// Define the sequential approval workflow based on the final discussion
const STATUS_FLOW = {
  Draft: 'Submitted', // DM submits
  Submitted: 'Dist Approved', // DA approves
  'Dist Approved': 'State Approved', // SA approves
  'State Approved': 'Awaiting Central Sanction', // SM submits AAP
  'Awaiting Central Sanction': 'Central Sanctioned', // CU/PACC approves AAP
  'Central Sanctioned': 'Closed', // Final Audit Closure
  Returned: 'Draft', 
};

// Mock initial data
const initialProjects = [
  {
    id: 'PRJ001',
    title: 'SC Women Skill Center - Jaipur',
    component: 'GIA (Skill Dev)',
    district: 'Jaipur',
    state: 'Rajasthan',
    budget: 5000000,
    status: 'State Approved', // Ready for SM to include in AAP
    UC_status: 'Pending',
    fund_released: 0,
    created_by: 'DM',
    audit_history: [{ timestamp: '01/01/2025 10:00 AM', action: 'Project Created and Submitted by DM' }, { timestamp: '02/01/2025 11:30 AM', action: 'Approved by DA' }, { timestamp: '05/01/2025 02:00 PM', action: 'Approved by SA' }],
  },
  {
    id: 'PRJ002',
    title: 'Cluster Livelihood Support - Pali',
    component: 'GIA (Livelihood)',
    district: 'Pali',
    state: 'Rajasthan',
    budget: 7500000,
    status: 'Submitted', // Pending DA
    UC_status: 'Pending',
    fund_released: 0,
    created_by: 'DM',
    audit_history: [{ timestamp: '01/02/2025 09:00 AM', action: 'Project Created and Submitted by DM' }],
  },
  {
    id: 'PRJ003',
    title: 'State MIS Enhancement Project',
    component: 'Admin/GIA (Infrastructure)',
    district: 'State-Wide/Consolidated',
    state: 'Rajasthan',
    budget: 25000000,
    status: 'Dist Approved', // Pending SA
    UC_status: 'NA',
    fund_released: 0,
    created_by: 'SM', // Created by State Maker
    audit_history: [{ timestamp: '10/03/2025 09:00 AM', action: 'Project Created and Submitted by SM' }],
  },
];

const initialPlans = [
  {
    id: 'AAP2025-TN',
    state: 'Tamil Nadu',
    status: 'Central Sanctioned',
    budget_total: 80000000,
    project_count: 15,
    submitted_by: 'SM',
    sanction_date: '10/01/2025',
    audit_history: [{ timestamp: '10/01/2025 04:00 PM', action: 'AAP Submitted by SM' }, { timestamp: '11/01/2025 09:00 AM', action: 'Central Sanctioned (PACC Approved)' }],
    sanction_id: 'SNC-001/2025', // Added Sanction ID for clarity
  },
];


// Function to determine the next allowed status based on the current role
const getNextStatus = (project, roleId) => {
  // Logic for Makers resubmitting 'Returned' projects
  if (roleId === 'DM' && project.status === 'Returned' && project.created_by === 'DM') return 'Submitted';
  if (roleId === 'SM' && project.status === 'Returned' && project.created_by === 'SM') return 'Dist Approved';
  
  // Logic for Approvers based on current status
  return {
    Submitted: 'Dist Approved', // DA
    'Dist Approved': 'State Approved', // SA
  }[project.status];
};

// --- Common Components ---

const StatusBadge = ({ status }) => {
  let color = 'bg-gray-200 text-gray-800';
  let icon = <Clock size={12} />;

  if (status.includes('Sanctioned') || status.includes('Approved') || status.includes('Closed')) {
    color = 'bg-emerald-500 text-white';
    icon = <CheckCircle size={12} />;
  } else if (status.includes('Pending') || status.includes('Awaiting')) {
    color = 'bg-yellow-500 text-white';
    icon = <Clock size={12} />;
  } else if (status.includes('Rejected') || status.includes('Returned')) {
    color = 'bg-red-500 text-white';
    icon = <XCircle size={12} />;
  } else if (status.includes('Submitted')) {
    color = 'bg-indigo-500 text-white';
    icon = <Send size={12} />;
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${color} space-x-1`}>
      {icon}
      <span>{status}</span>
    </span>
  );
};

const formatCurrency = (amount) => `₹ ${amount.toLocaleString('en-IN')}`;

// Component to render the history log
const AuditHistory = ({ history }) => (
    <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-300">
      <h4 className="text-sm font-bold text-gray-700 flex items-center space-x-1 mb-2">
        <History size={14} /> <span>Project History Log</span>
      </h4>
      <ul className="space-y-1">
        {history.slice().reverse().map((item, index) => ( // Reverse to show latest first
          <li key={index} className="text-xs text-gray-600 border-l-2 border-indigo-400 pl-2">
            <span className="font-semibold">{item.timestamp.split(',')[0]}:</span> {item.action} {item.remarks && item.remarks !== 'N/A' && `(Remarks: ${item.remarks})`}
          </li>
        ))}
      </ul>
    </div>
);

// --- Feature Components ---

const ProjectCreationForm = ({ currentRole, projects, setProjects, setCurrentView }) => {
  const isMaker = currentRole.id === 'DM' || currentRole.id === 'SM';
  
  const initialDistrict = currentRole.id === 'DM' ? 'Jaipur' : (currentRole.id === 'SM' ? 'State-Wide/Consolidated' : 'N/A');

  const [formData, setFormData] = useState({
    title: '',
    component: 'GIA (Skill Dev)',
    district: initialDistrict,
    state: 'Rajasthan',
    budget: '',
    description: '',
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    if (!isMaker) {
        setMessage({ type: 'error', text: `Error: Only the Maker roles can initiate a new project.` });
        return;
    }
    if (!formData.title || !formData.budget || parseInt(formData.budget) < 1000) {
        setMessage({ type: 'error', text: 'Error: Please ensure the title and a valid budget are entered.' });
        return;
    }

    // Workflow based on role
    const initialStatus = currentRole.id === 'DM' ? 'Submitted' : 'Dist Approved'; 
    const nextApprover = currentRole.id === 'DM' ? 'DA' : 'SA';

    const newProject = {
      id: 'PRJ' + (projects.length + 101),
      ...formData,
      budget: parseInt(formData.budget),
      status: initialStatus, 
      UC_status: 'Pending',
      fund_released: 0,
      created_by: currentRole.id,
      audit_history: [{ 
          timestamp: new Date().toLocaleString(), 
          action: `Project Created and Submitted by ${currentRole.id} for ${nextApprover} Appraisal` 
      }],
    };

    setProjects([...projects, newProject]);
    setMessage({ type: 'success', text: `Project "${newProject.title}" submitted successfully for ${ROLES[nextApprover].name} review.` });
    
    // Redirect Maker to the Dashboard for status tracking
    setTimeout(() => setCurrentView('dashboard'), 2000);
  };

  if (!isMaker) {
    return <p className="text-red-600 font-semibold p-4 bg-red-100 rounded-lg">Access Denied: Only Maker roles ({ROLES.DM.name} or {ROLES.SM.name}) are authorized to create proposals.</p>;
  }

  return (
    // 💡 HIGHLIGHT CHANGE: Changed bg-white to bg-indigo-50 and added stronger shadow
    <div className="p-6 bg-indigo-50 shadow-2xl rounded-xl border-t-4 border-indigo-600">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center space-x-3">
        <Briefcase className="text-indigo-600" />
        <span>New Project Proposal (GIA/Hostel)</span>
      </h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded-md text-sm ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <p className="text-gray-500 text-sm">
          As a **{currentRole.name}**, this proposal will be sent directly to the **{currentRole.id === 'DM' ? ROLES.DA.name : ROLES.SA.name}** for review.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Skill Training for 50 SC Women"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Component Type</label>
            <select
              name="component"
              value={formData.component}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>GIA (Skill Dev)</option>
              <option>GIA (Livelihood)</option>
              <option>GIA (Infrastructure)</option>
              <option>Hostel</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Budget (₹)</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              min="1000"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 5000000"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">{currentRole.id === 'SM' ? 'Scope (State-Wide)' : 'District (Maker Location)'}</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border bg-gray-100"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border bg-gray-100"
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Detailed Description (Justification & Beneficiaries)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe the need, target group (SC youth/women, BPL families), and expected outcomes."
          />
        </div>

        <button
          type="submit"
          className="w-full justify-center py-3 px-4 border border-transparent shadow-lg text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center space-x-2"
        >
          <Send size={20} />
          <span>Submit Project to Approval Queue</span>
        </button>
      </form>
    </div>
  );
};

// --- NEW COMPONENT: Annual Plan Submission ---

const AnnualPlanSubmission = ({ currentRole, projects, setProjects, annualPlans, setAnnualPlans, setCurrentView }) => {
    const isStateMaker = currentRole.id === 'SM';
    const stateName = 'Rajasthan'; // Mock current state

    // Selects projects that are State Approved but NOT yet included in an AAP
    const projectsToInclude = useMemo(() => {
        return projects.filter(p => 
            p.state === stateName && p.status === 'State Approved'
        );
    }, [projects, stateName]);
    
    const totalBudget = projectsToInclude.reduce((sum, p) => sum + p.budget, 0);

    const handleAapSubmit = () => {
        if (projectsToInclude.length === 0) {
            alert('No projects are currently "State Approved" and eligible for the AAP.');
            return;
        }

        const newAapId = `AAP${new Date().getFullYear()}-${stateName}-${annualPlans.length + 1}`;
        const newAap = {
            id: newAapId,
            state: stateName,
            status: 'Pending Central Sanction',
            budget_total: totalBudget,
            project_count: projectsToInclude.length,
            submitted_by: currentRole.id,
            audit_history: [{ timestamp: new Date().toLocaleString(), action: 'Annual Action Plan Submitted to Central Ministry' }],
        };

        // 1. Update the state of the individual projects status to AWAITING CENTRAL SANCTION
        setProjects(prevProjects =>
            prevProjects.map(p =>
                p.status === 'State Approved' && p.state === stateName
                    ? { ...p, status: 'Awaiting Central Sanction', audit_history: [...p.audit_history, { timestamp: new Date().toLocaleString(), action: `Included in AAP (${newAapId}) and submitted to CU by ${currentRole.name}` }] }
                    : p
            )
        );

        // 2. Add the new AAP to the central list
        setAnnualPlans([...annualPlans, newAap]);

        alert(`Annual Action Plan for ${stateName} submitted to Central User (PACC) for ₹${totalBudget.toLocaleString('en-IN')}.`);
        setCurrentView('dashboard');
    };

    if (!isStateMaker) {
        return <p className="text-red-600 font-semibold p-4 bg-red-100 rounded-lg">Access Denied: Only the State Maker ({ROLES.SM.name}) can submit the Annual Action Plan.</p>;
    }

    return (
        <div className="p-6 bg-white shadow-xl rounded-xl">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center space-x-3">
                <FileText className="text-purple-600" />
                <span>Annual Action Plan (AAP) Submission</span>
            </h2>

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
                <p className="font-semibold text-blue-800">State: {stateName}</p>
                <p className="text-sm text-blue-700 mt-1">Projects ready for consolidation (Status: State Approved): **{projectsToInclude.length}**</p>
                <p className="text-lg font-bold text-blue-800">Total Budget in Draft AAP: **{formatCurrency(totalBudget)}**</p>
            </div>

            {projectsToInclude.length > 0 ? (
                <>
                    <p className="text-gray-600 mb-4">The following **{projectsToInclude.length}** State-Approved projects will be bundled into the AAP and submitted to the Central PACC for final sanction and fund allocation.</p>
                    <button
                        onClick={handleAapSubmit}
                        className="w-full py-3 px-4 shadow-lg text-lg font-bold rounded-xl text-white bg-purple-600 hover:bg-purple-700 flex items-center justify-center space-x-2"
                    >
                        <Send size={20} />
                        <span>Submit AAP to Central Ministry</span>
                    </button>
                    
                    {/* List of Projects in the Bundle */}
                    <div className="mt-6 border-t pt-4">
                        <h4 className="font-semibold text-gray-700 mb-3">Project Details in Draft AAP:</h4>
                        <ul className="space-y-2">
                            {projectsToInclude.map(p => (
                                <li key={p.id} className="text-sm text-gray-600 flex justify-between border-b pb-1">
                                    <span>{p.title} ({p.id})</span>
                                    <span className="font-medium text-teal-600">{formatCurrency(p.budget)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <p className="text-red-500 text-lg p-4 border border-dashed rounded-lg">No projects are currently ready for AAP submission in {stateName}. They must first be State Approved.</p>
            )}
        </div>
    );
};

const ApprovalQueue = ({ currentRole, projects, setProjects, annualPlans, setAnnualPlans }) => {
  const isApprover = ['DA', 'SA', 'CU'].includes(currentRole.id);

  const approvalRequiredStatus = useMemo(() => {
    switch (currentRole.id) {
      case 'DA': return 'Submitted';
      case 'SA': return 'Dist Approved';
      case 'CU': return 'Pending Central Sanction'; 
      default: return null;
    }
  }, [currentRole.id]);

  // Projects in queue for DA and SA (Individual Project Approval)
  const projectsInQueue = useMemo(() => {
    return projects.filter(p => 
      p.status === approvalRequiredStatus || 
      (currentRole.id === p.created_by && p.status === 'Returned')
    );
  }, [projects, approvalRequiredStatus, currentRole.id]);
  
  // AAPs in queue for CU (Consolidated Plan Approval)
  const plansInQueue = useMemo(() => {
      if (currentRole.id === 'CU') {
          return annualPlans.filter(p => p.status === 'Pending Central Sanction');
      }
      return [];
  }, [annualPlans, currentRole.id]);


  const handleAction = useCallback((projectId, action, remarks = '') => {
    setProjects(prevProjects =>
      prevProjects.map(p => {
        if (p.id === projectId) {
          // Determine the next status based on action and role
          let nextStatus = p.status;
          let newHistoryAction = '';

          if (action === 'approve') {
            nextStatus = getNextStatus(p, currentRole.id);
            newHistoryAction = `Approved by ${currentRole.name}`;
          } else if (action === 'return' || action === 'reject') {
            nextStatus = action === 'return' ? 'Returned' : 'Rejected';
            newHistoryAction = `${action.charAt(0).toUpperCase() + action.slice(1)} by ${currentRole.name}`;
          } else if (action === 'resubmit' && p.status === 'Returned') {
             nextStatus = p.created_by === 'DM' ? 'Submitted' : 'Dist Approved';
             newHistoryAction = `Resubmitted by ${currentRole.name} after correction`;
          }
          
          if (nextStatus !== p.status) {
            const newHistory = { timestamp: new Date().toLocaleString(), action: newHistoryAction, remarks: remarks || 'N/A' };
            return { ...p, status: nextStatus, audit_history: [...p.audit_history, newHistory] };
          }
        }
        return p;
      })
    );
  }, [setProjects, currentRole.id, currentRole.name]);
  
  // CU action: Sanction AAP
  const handleCentralSanction = useCallback((planId, planBudget, projectCount) => {
    if (currentRole.id !== 'CU') return;
    
    const stateOfPlan = annualPlans.find(p => p.id === planId)?.state;
    const newSanctionId = `SNC-${Math.floor(Math.random() * 9000) + 1000}/${new Date().getFullYear().toString().slice(-2)}`;

    setAnnualPlans(prevPlans =>
        prevPlans.map(p => {
            if (p.id === planId) {
                const newHistory = { timestamp: new Date().toLocaleString(), action: `Central Sanctioned (PACC Approved) with ID ${newSanctionId}`, remarks: 'Final AAP approved for funding release.' };
                return { ...p, status: 'Central Sanctioned', audit_history: [...p.audit_history, newHistory], sanction_date: new Date().toLocaleDateString(), sanction_id: newSanctionId };
            }
            return p;
        })
    );

    // Update individual projects included in this AAP to 'Central Sanctioned'
    setProjects(prevProjects =>
        prevProjects.map(p => {
            if (p.status === 'Awaiting Central Sanction' && p.state === stateOfPlan) { 
                const releaseAmount = p.budget; 
                const newHistory = { timestamp: new Date().toLocaleString(), action: `Central Fund Sanctioned (via AAP ${planId}). Fund Released via PFMS.` };
                return { ...p, status: 'Central Sanctioned', fund_released: releaseAmount, audit_history: [...p.audit_history, newHistory] };
            }
            return p;
        })
    );

    alert(`AAP ${planId} sanctioned by PACC! Funds of ${formatCurrency(planBudget)} released via PFMS for ${projectCount} projects.`);

  }, [setAnnualPlans, setProjects, currentRole.id, annualPlans]);


  const getActionButtons = (project) => {
    // Maker Resubmission
    if ((currentRole.id === 'DM' || currentRole.id === 'SM') && project.status === 'Returned' && project.created_by === currentRole.id) {
        return (
            <button
                onClick={() => handleAction(project.id, 'resubmit', `Resubmitted for approval after reviewing remarks.`)}
                className="py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 flex items-center space-x-1"
            >
                <Repeat size={16} />
                <span>Resubmit to {project.created_by === 'DM' ? 'DA' : 'SA'}</span>
            </button>
        );
    }

    // Approvers (DA, SA) actions
    if (project.status === approvalRequiredStatus && currentRole.id !== 'CU') {
        return (
            <div className="space-x-2 flex">
                <button
                    onClick={() => handleAction(project.id, 'approve')}
                    className="py-2 px-4 text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 flex items-center space-x-1"
                >
                    <CheckCircle size={16} />
                    <span>Approve</span>
                </button>
                
                <button
                    onClick={() => handleAction(project.id, 'return', `Insufficient data for beneficiary verification. Please resubmit.`)}
                    className="py-2 px-4 text-sm font-medium rounded-md text-gray-700 bg-yellow-300 hover:bg-yellow-400 flex items-center space-x-1"
                >
                    <ChevronLeft size={16} />
                    <span>Return for Correction</span>
                </button>
            </div>
        );
    }
    return null;
  };

  
  // Render Logic
  const renderQueue = () => {
    if (currentRole.id === 'CU') {
        return (
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-red-800 flex items-center space-x-2 border-b pb-2">
                    <DollarSign size={20} />
                    <span>Annual Action Plan (AAP) Sanction Queue</span>
                </h3>
                {plansInQueue.length === 0 ? (
                    <p className="text-gray-500 p-4 border border-dashed rounded-lg">No AAPs awaiting Central Sanction.</p>
                ) : (
                    plansInQueue.map(plan => (
                        <div key={plan.id} className="p-4 border border-red-300 rounded-lg bg-red-50 shadow-md transition hover:shadow-lg">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <p className="text-lg font-bold text-red-800">{plan.id} - {plan.state}</p>
                                    <p className="text-sm text-gray-600">Total Projects: {plan.project_count} | Budget: <span className="font-semibold text-red-700">{formatCurrency(plan.budget_total)}</span></p>
                                </div>
                                <div className="mt-3 md:mt-0">
                                    <button
                                        onClick={() => handleCentralSanction(plan.id, plan.budget_total, plan.project_count)}
                                        className="py-2 px-4 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 flex items-center space-x-1 shadow-md"
                                    >
                                        <CheckCircle size={16} />
                                        <span>PACC Sanction & Release Funds</span>
                                    </button>
                                </div>
                            </div>
                            <AuditHistory history={plan.audit_history} />
                        </div>
                    ))
                )}
            </div>
        );
    } else {
        return (
            <div className="space-y-4">
                {projectsInQueue.length === 0 ? (
                    <p className="text-gray-500 p-4 border border-dashed rounded-lg">No projects currently require your action.</p>
                ) : (
                    projectsInQueue.map(project => (
                        <div key={project.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-md">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <p className="text-lg font-bold text-gray-900">{project.title} <StatusBadge status={project.status} /></p>
                                    <p className="text-sm text-gray-600 font-medium">{project.component} | Created by: {ROLES[project.created_by].name} | Region: {project.district}</p>
                                    <p className="text-sm text-gray-600">Budget: <span className="font-semibold text-indigo-700">{formatCurrency(project.budget)}</span></p>
                                    {project.status === 'Returned' && <p className="text-xs text-red-500 mt-1 font-semibold">**ACTION REQUIRED:** {project.audit_history.slice(-1)[0]?.remarks}</p>}
                                </div>
                                <div className="mt-3 md:mt-0">
                                    {getActionButtons(project)}
                                </div>
                            </div>
                            <AuditHistory history={project.audit_history} />
                        </div>
                    ))
                )}
            </div>
        );
    }
  };


  return (
    <div className="p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center space-x-3">
        <UserCheck className="text-indigo-600" />
        <span>{currentRole.name} Queue ({currentRole.id === 'CU' ? plansInQueue.length : projectsInQueue.length})</span>
      </h2>
      
      <p className="text-sm text-gray-500 mb-6">
        {currentRole.id !== 'CU' 
            ? `Action required for projects pending ${currentRole.id === 'DA' ? 'District Appraisal' : 'State Review'}.`
            : 'Central User (PACC) reviews consolidated Annual Action Plans (AAPs) submitted by State Makers.'
        }
      </p>
      
      {renderQueue()}
    </div>
  );
};

// --- UC Submission Modal Component ---
const UcSubmissionModal = ({ isOpen, onClose, onSubmit }) => {
    const [remarks, setRemarks] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (remarks.length < 20) {
            setMessage('Please provide a minimum of 20 characters detailing the utilization outcome for audit purposes.');
            return;
        }
        onSubmit(remarks);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 space-y-4">
                <h3 className="text-xl font-bold text-red-700 flex items-center space-x-2">
                    <FileBadge size={24} /> <span>Submit Final Utilization Certificate (UC)</span>
                </h3>
                <p className="text-sm text-gray-600">
                    As the **District Maker**, you certify that all sanctioned funds were utilized correctly. Provide mandatory qualitative remarks for the Central Audit (PACC).
                </p>
                <textarea
                    rows="4"
                    value={remarks}
                    onChange={(e) => { setRemarks(e.target.value); setMessage(''); }}
                    placeholder="Enter detailed audit/utilization remarks here (e.g., '100% of funds utilized for asset procurement and beneficiary training. No unspent balance remains.')"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
                {message && <p className="text-sm text-red-500 font-medium">{message}</p>}
                
                <div className="flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center space-x-1">
                        <Send size={16} /> <span>Certify & Submit Final UC</span>
                    </button>
                </div>
            </div>
        </div>
    );
};


const MISDashboard = ({ projects, setProjects, currentRole, annualPlans }) => {
  const [view, setView] = useState('tracking'); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  
  // Filter projects based on the current role's scope
  const viewableProjects = useMemo(() => {
    if (currentRole.id === 'CU') return projects; // Central sees all
    if (['SA', 'SM'].includes(currentRole.id)) return projects.filter(p => p.state === 'Rajasthan' || p.state === 'Delhi');
    if (['DM', 'DA'].includes(currentRole.id)) return projects.filter(p => p.district === 'Jaipur' || p.district === 'Pali' || p.state === 'Rajasthan'); // Makers/Approvers see their State projects
    return projects;
  }, [projects, currentRole.id]);

  const totalBudget = useMemo(() => viewableProjects.reduce((sum, p) => sum + p.budget, 0), [viewableProjects]);
  const totalReleased = useMemo(() => viewableProjects.reduce((sum, p) => sum + p.fund_released, 0), [viewableProjects]);

  const handleUpdateUC = (projectId, newUCStatus) => {
    if (currentRole.id !== 'DM') {
      alert('Action Denied: Only the District Maker can update Utilization Certificates.');
      return;
    }

    if (newUCStatus === 'UC Final Submitted') {
        setSelectedProjectId(projectId);
        setModalOpen(true);
        return;
    }
    
    // Handle partial UC submission without remarks modal
    setProjects(prevProjects =>
      prevProjects.map(p => {
        if (p.id === projectId && p.status === 'Central Sanctioned') {
            const newHistory = { timestamp: new Date().toLocaleString(), action: `UC Status updated to ${newUCStatus} by DM`, remarks: 'Partial submission' };
            return { ...p, UC_status: newUCStatus, audit_history: [...p.audit_history, newHistory] };
        }
        return p;
      })
    );
  };
  
  // Final submission handler from the modal
  const handleModalSubmit = (remarks) => {
      const projectId = selectedProjectId;
      if (!projectId) return;

      setProjects(prevProjects =>
        prevProjects.map(p => {
          if (p.id === projectId && p.status === 'Central Sanctioned') {
              const newHistory = { timestamp: new Date().toLocaleString(), action: `UC Final Submitted to CU/PACC Audit`, remarks: remarks };
              return { ...p, UC_status: 'UC Final Submitted', audit_history: [...p.audit_history, newHistory] };
          }
          return p;
        })
      );
      setSelectedProjectId(null);
  };


  const handleApproveUC = (projectId) => {
    if (currentRole.id !== 'CU') {
      alert('Action Denied: Only the Central User (PACC decision) can approve the final audit report and close the project.');
      return;
    }
    setProjects(prevProjects =>
      prevProjects.map(p => {
        if (p.id === projectId && p.UC_status === 'UC Final Submitted') {
            const lastRemarks = p.audit_history.findLast(h => h.action.includes('UC Final Submitted'))?.remarks; // Using findLast, or slice(-1) if not available
            const newHistory = { timestamp: new Date().toLocaleString(), action: 'Audit Approved, Project Closed by CU/PACC.', remarks: `Closed after verifying UC/Audit Remarks: ${lastRemarks}` };
            return { ...p, status: 'Closed', UC_status: 'Audit Approved', audit_history: [...p.audit_history, newHistory] };
        }
        return p;
      })
    );
  };

  const SummaryCard = ({ title, value, color, icon: Icon }) => (
    <div className={`p-5 rounded-xl shadow-lg ${color} flex items-center justify-between`}>
      <div>
        <p className="text-sm font-medium text-white opacity-90">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
      <Icon size={32} className="text-white opacity-70" />
    </div>
  );

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl">
      <UcSubmissionModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          onSubmit={handleModalSubmit}
      />
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center space-x-3">
        <BarChart2 className="text-indigo-600" />
        <span>PM-AJAY Project Tracking & Audit Overview</span>
      </h2>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Total Sanctioned AAP Budget"
          value={formatCurrency(totalBudget)}
          color="bg-indigo-600"
          icon={DollarSign}
        />
        <SummaryCard
          title="Total Funds Disbursed (PFMS)"
          value={formatCurrency(totalReleased)}
          color="bg-teal-600"
          icon={Send}
        />
        <SummaryCard
          title="Financial Utilization Rate"
          value={totalBudget > 0 ? `${((totalReleased / totalBudget) * 100).toFixed(1)}%` : '0%'}
          color="bg-purple-600"
          icon={TrendingUp}
        />
      </div>

      {/* TABS */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          onClick={() => setView('tracking')}
          className={`py-2 px-4 text-sm font-medium ${
            view === 'tracking' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-indigo-500'
          }`}
        >
          {currentRole.id === 'CU' ? 'All Projects' : 'My Region Projects'}
        </button>
        <button
          onClick={() => setView('aap')}
          className={`py-2 px-4 text-sm font-medium ${
            view === 'aap' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 hover:text-purple-500'
          }`}
        >
          Annual Action Plan Status
        </button>
        <button
          onClick={() => setView('audit')}
          className={`py-2 px-4 text-sm font-medium ${
            view === 'audit' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          UC Status & Audit Reconciliation
        </button>
      </div>

      {/* MAIN DATA TABLE VIEW */}
      {view === 'tracking' && (
        <div className="overflow-x-auto border rounded-lg shadow-inner">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Project / Component</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Region / Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Budget / Released</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Last Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {viewableProjects.map(project => (
                <tr key={project.id} className={project.status === 'Closed' ? 'bg-emerald-50 bg-opacity-50' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-900">{project.title}</p>
                    <p className="text-xs text-indigo-600 font-medium">{project.component}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-xs text-gray-600">
                      {project.district}, {project.state}
                    </p>
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-semibold">{formatCurrency(project.budget)}</span>
                    <br />
                    <span className="text-xs text-teal-600">{project.status === 'Central Sanctioned' ? formatCurrency(project.fund_released) : 'Awaiting Sanction'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <p className="text-xs font-bold text-gray-700">{project.audit_history.slice(-1)[0]?.action}</p>
                    <p className="text-xs text-gray-400">{project.audit_history.slice(-1)[0]?.timestamp}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* AAP STATUS VIEW */}
      {view === 'aap' && (
        <div className="overflow-x-auto border rounded-lg shadow-inner">
           <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">AAP ID / Sanction ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">State / Budget</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Submitted By / Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {annualPlans.map(plan => (
                <tr key={plan.id} className={plan.status === 'Central Sanctioned' ? 'bg-emerald-50 bg-opacity-50' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-900">{plan.id}</p>
                    <p className="text-xs text-red-600 font-medium flex items-center space-x-1">
                        {plan.sanction_id ? <FileBadge size={14} /> : null}
                        <span className='font-bold'>{plan.sanction_id || 'Awaiting Sanction ID'}</span>
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-semibold">{plan.state} ({plan.project_count} Proj)</span>
                    <br />
                    <span className="text-xs text-teal-600">{formatCurrency(plan.budget_total)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <p className="text-xs font-medium">SM ({plan.submitted_by})</p>
                    <p className="text-xs text-gray-400">{plan.audit_history.find(h => h.action.includes('Sanctioned'))?.timestamp || plan.audit_history.slice(-1)[0]?.timestamp}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={plan.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      {/* AUDIT VIEW */}
      {view === 'audit' && (
        <div className="mt-8 p-6 border border-gray-300 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">UC Status & Audit Reconciliation</h3>
          <p className="text-sm text-gray-600">
            This section focuses on the **Utilization Certificate (UC)** submission and final audit clearance, critical for ensuring financial accountability and releasing future funds.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc ml-5">
            <li className='font-medium'>Projects requiring final Central Audit approval: **{viewableProjects.filter(p => p.UC_status === 'UC Final Submitted' && p.status !== 'Closed').length}** (Awaiting CU action).</li>
          </ul>

            <div className="overflow-x-auto border rounded-lg shadow-inner mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-red-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Project / Last Audit Remarks</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Funds Released</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">UC Status</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {viewableProjects.filter(p => p.status === 'Central Sanctioned' || p.status === 'Closed').map(project => (
                        <tr key={project.id} className={project.status === 'Closed' ? 'bg-emerald-50 bg-opacity-50' : 'hover:bg-gray-50'}>
                            <td className="px-6 py-4">
                                <p className="text-sm font-semibold text-gray-900">{project.title}</p>
                                <p className="text-xs text-gray-500 mt-1 italic">
                                    Last Remarks: {project.audit_history.findLast(h => h.action.includes('UC Final Submitted'))?.remarks || 'N/A'}
                                </p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-600 font-semibold">
                                {formatCurrency(project.fund_released)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <p className={`text-xs font-bold ${project.UC_status.includes('Submitted') ? 'text-blue-600' : project.UC_status === 'Audit Approved' ? 'text-emerald-700' : 'text-yellow-700'}`}>{project.UC_status}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                {/* Action for Maker: Submit UC */}
                                {currentRole.id === 'DM' && project.status === 'Central Sanctioned' && (
                                <select
                                    onChange={(e) => handleUpdateUC(project.id, e.target.value)}
                                    value={project.UC_status}
                                    className="text-xs border rounded-md p-1 bg-white shadow-sm"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="UC Submitted">Submit Partial UC</option>
                                    <option value="UC Final Submitted">Submit Final UC</option>
                                </select>
                                )}
                                {/* Action for Central User: Final Audit/Closure */}
                                {currentRole.id === 'CU' && project.UC_status === 'UC Final Submitted' && project.status !== 'Closed' && (
                                <button
                                    onClick={() => handleApproveUC(project.id)}
                                    className="text-xs text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md shadow-md"
                                >
                                    Approve Audit & Close
                                </button>
                                )}
                                {currentRole.id === 'CU' && project.status === 'Closed' && (
                                    <span className="text-xs text-emerald-600 font-semibold">Fully Audited</span>
                                )}
                                {currentRole.id === 'CU' && project.status === 'Central Sanctioned' && project.UC_status !== 'UC Final Submitted' && (
                                    <span className="text-xs text-gray-400">Waiting for Final UC</span>
                                )}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
};


// --- Main App Component ---

const App = () => {
  const [currentRole, setCurrentRole] = useState(ROLES.DM); 
  const [projects, setProjects] = useState(initialProjects);
  const [annualPlans, setAnnualPlans] = useState(initialPlans); 
  
  // 💡 HIGHLIGHT CHANGE: Set initial view based on role
  const initialView = ['DM', 'SM'].includes(ROLES.DM.id) ? 'create' : 'dashboard';
  const [currentView, setCurrentView] = useState(initialView);

  const currentRoleObj = ROLES[currentRole.id];
  const isMaker = currentRoleObj.id === 'DM' || currentRoleObj.id === 'SM';


  const renderContent = () => {
    switch (currentView) {
      case 'create':
        return <ProjectCreationForm currentRole={currentRoleObj} projects={projects} setProjects={setProjects} setCurrentView={setCurrentView} />;
      case 'approval':
        return <ApprovalQueue currentRole={currentRoleObj} projects={projects} setProjects={setProjects} annualPlans={annualPlans} setAnnualPlans={setAnnualPlans} />;
      case 'aap_submission':
        return <AnnualPlanSubmission currentRole={currentRoleObj} projects={projects} setProjects={setProjects} annualPlans={annualPlans} setAnnualPlans={setAnnualPlans} setCurrentView={setCurrentView} />;
      case 'dashboard':
      default:
        return <MISDashboard projects={projects} setProjects={setProjects} currentRole={currentRoleObj} annualPlans={annualPlans} />;
    }
  };
  
  // 💡 HIGHLIGHT CHANGE: Function to determine the new view when switching roles
  const handleRoleChange = (roleId) => {
    const newRole = ROLES[roleId];
    setCurrentRole(newRole);
    // Set view to 'create' if the new role is a Maker, otherwise 'dashboard'
    if (newRole.id === 'DM' || newRole.id === 'SM') {
      setCurrentView('create');
    } else {
      setCurrentView('dashboard');
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER & ROLE SELECTION */}
        <header className="bg-white p-6 shadow-xl rounded-xl flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-extrabold text-indigo-700">PM-AJAY MIS Portal Simulation</h1>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Switch User Role:</label>
            <select
              value={currentRole.id}
              onChange={(e) => handleRoleChange(e.target.value)}
              className={`p-2 rounded-xl border-2 border-gray-300 shadow-lg font-bold transition focus:ring-indigo-500 focus:border-indigo-500 ${currentRoleObj.color} text-white`}
            >
              {Object.values(ROLES).map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* NAVIGATION TABS */}
        <nav className="bg-white p-4 shadow-lg rounded-xl flex space-x-2 sm:space-x-4 overflow-x-auto">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`py-2 px-3 sm:px-6 rounded-xl font-bold transition ${
              currentView === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
            } flex items-center space-x-1`}
          >
            <BarChart2 size={18} />
            <span>Tracking & Funds</span>
          </button>
          <button
            onClick={() => setCurrentView('approval')}
            className={`py-2 px-3 sm:px-6 rounded-xl font-bold transition ${
              currentView === 'approval'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
            } flex items-center space-x-1`}
          >
            <CheckCircle size={18} />
            <span>Approval Queue</span>
          </button>
          {isMaker && (
            <button
              onClick={() => setCurrentView('create')}
              // 💡 HIGHLIGHT CHANGE: Added border and stronger shadow for the New Project button
              className={`py-2 px-3 sm:px-6 rounded-xl font-bold transition ${
                currentView === 'create'
                  ? 'bg-indigo-600 text-white shadow-lg border-2 border-yellow-300' // Current view
                  : 'text-white bg-indigo-500 hover:bg-indigo-600 shadow-xl border-2 border-yellow-300 animate-pulse' // Highlight for Maker
              } flex items-center space-x-1`}
            >
              <Briefcase size={18} />
              <span>New Project</span>
            </button>
          )}
          {currentRole.id === 'SM' && (
            <button
              onClick={() => setCurrentView('aap_submission')}
              className={`py-2 px-3 sm:px-6 rounded-xl font-bold transition ${
                currentView === 'aap_submission'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
              } flex items-center space-x-1`}
            >
              <FileText size={18} />
              <span>Submit Annual Plan</span>
            </button>
          )}
        </nav>

        {/* MAIN CONTENT AREA */}
        <main>{renderContent()}</main>
      </div>
    </div>
  );
};

export default App;