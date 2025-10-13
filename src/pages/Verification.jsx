import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { User, ClipboardCheck, Zap, UploadCloud, Lock, Repeat, Send, Key, TrendingUp, ChevronLeft, Briefcase, CheckCircle, Clock, XCircle, DollarSign, BarChart2, UserCheck, FileText, History, FileBadge, Code, Bot, Database, Loader, ArrowLeft, BarChart, Users, Target, Home, Droplets, Trees, Map, Link as LinkIcon, AlertTriangle, UserMinus } from 'lucide-react';

// --- MOCK MUI COMPONENTS (Reused) ---
// These custom mocks allow the code to run in the current environment
const Dialog = ({ open, fullWidth, maxWidth, PaperProps, children, ...props }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className={`bg-white rounded-xl shadow-2xl ${maxWidth === 'xs' ? 'max-w-md' : 'max-w-lg'} w-full m-4`} {...props}>
                {children}
            </div>
        </div>
    );
};
const DialogContent = ({ className, children, ...props }) => (
    <div className={`p-6 ${className}`} {...props}>{children}</div>
);
const TextField = ({ label, value, onChange, helperText, inputProps, fullWidth, ...props }) => (
    <div className="textfield-mock-container my-3" style={{ width: fullWidth ? '100%' : 'auto' }}>
        <label className="text-sm block text-gray-700">{label}</label>
        <input 
            value={value} 
            onChange={onChange} 
            className="w-full p-2 border border-gray-300 rounded-lg"
            {...inputProps}
            {...props} 
        />
        {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    </div>
);
const Button = ({ children, onClick, disabled, className, ...props }) => (
    <button 
        onClick={onClick} 
        disabled={disabled}
        className={`w-full py-2 rounded-lg text-white font-semibold transition ${className}`}
        {...props}
    >
        {children}
    </button>
);
// -----------------------------------------------------------------

// --- UTILITY FUNCTIONS ---

const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

// --- Helper Components for Forms (Modified to accept required prop for SelectGroup) ---

const InputGroup = ({ label, name, value, onChange, placeholder, type = "text", required = false, readOnly = false, maxLength, min = null }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            readOnly={readOnly}
            required={required}
            min={min}
            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500 ${readOnly ? 'bg-gray-200' : 'bg-white'}`}
        />
    </div>
);

const SelectGroup = ({ label, name, value, onChange, options, readOnly = false, required = false }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={readOnly}
            required={required}
            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border ${readOnly ? 'bg-gray-200' : 'bg-white'} focus:ring-indigo-500 focus:border-indigo-500`}
        >
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

// --- DSS Visual Components (Minimal for brevity, relying on user's existing styles) ---

const DefaultVisual = ({ title = "Processing", icon }) => {
    const IconComponent = icon || <Bot />;
    return (
        <div className="w-full h-full bg-gray-900 rounded-lg p-6 flex flex-col items-center justify-center text-white font-mono">
            <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute w-full h-full bg-blue-500/20 rounded-full animate-ping"></div>
                <div className="relative text-blue-300">
                    {React.cloneElement(IconComponent, { className: "w-16 h-16" })}
                </div>
            </div>
            <h4 className="text-xl font-semibold text-yellow-300 mt-8 tracking-widest">
                [{title}...]
            </h4>
        </div>
    );
};

const FetchingDataVisual = ({ source = "External MIS" }) => (
    <div className="w-full h-full bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center text-gray-800 font-mono border border-gray-200">
        <Database className="w-12 h-12 text-blue-500 animate-bounce" />
        <h4 className="text-xl font-semibold text-gray-700 mt-4">Accessing State MIS/Registers</h4>
        <p className="text-gray-500 mt-2 text-center">Checking data integrity against: {source}</p>
    </div>
);

const AnalyzingMapVisual = () => {
    const [revealedAssets, setRevealedAssets] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => { setRevealedAssets(prev => (prev < 4 ? prev + 1 : prev)); }, 500); // Faster reveal
        return () => clearInterval(interval);
    }, []);
    const assets = [
        { icon: <Trees className="w-5 h-5 text-green-600" />, name: 'Poverty Indicator Match', value: 'High' },
        { icon: <Droplets className="w-5 h-5 text-blue-600" />, name: 'Local Area Deprivation', value: 'Severe' },
        { icon: <Home className="w-5 h-5 text-yellow-600" />, name: 'Digital Footprint Score', value: 'Average' },
        { icon: <Zap className="w-5 h-5 text-red-600" />, name: 'Project Hotspot Proximity', value: '3 KM' },
    ];
    return (
        <div className="w-full h-full bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center text-gray-800 font-mono border border-gray-200">
            <div className="w-full max-w-md h-64 bg-gray-200/50 rounded-lg relative overflow-hidden border-2 border-green-500/30">
                <Map className="absolute w-48 h-48 text-gray-400/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
                <div className="absolute top-0 left-0 h-full w-1 bg-green-400 shadow-[0_0_15px_3px_rgba(34,197,94,0.7)] animate-[scan_4s_linear_infinite]"></div>
            </div>
            <div className="w-full max-w-md mt-4">
                <h4 className="text-lg font-semibold text-green-700 mb-2">[Socio-Economic & Geographical Analysis...]</h4>
                <ul className="space-y-2">
                    {assets.slice(0, revealedAssets).map((asset, index) => (
                        <li key={index} className="flex items-center justify-between bg-white p-2 rounded border border-gray-200 animate-fadeIn">
                            <div className="flex items-center gap-2"> {asset.icon} <span className="text-gray-700">{asset.name}</span> </div>
                            <span className="font-semibold text-gray-800">{asset.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const CompilingReportVisual = ({ isComplete = false }) => {
    return (
        <div className="w-full h-full bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center text-gray-800 font-mono border border-gray-200 overflow-hidden">
            <div className="relative w-64 h-64">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {isComplete ? ( <CheckCircle className="w-24 h-24 text-green-500 animate-pulse" /> ) : ( <FileText className="w-24 h-24 text-blue-500 animate-pulse" /> )}
                </div>
            </div>
            <div className="mt-4 text-center">
                <h4 className="text-lg font-semibold text-gray-700"> {isComplete ? '[Verification Complete]' : '[Compiling Datapoints...]'} </h4>
                <p className="text-gray-500"> {isComplete ? 'Final recommendations are ready.' : 'Aggregating and cross-referencing verification results.'} </p>
            </div>
        </div>
    );
};

const FinalizingScreen = ({ status }) => (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
        {status === 'eligible' || status === 'provisionally_eligible' ?
            <CheckCircle className="w-16 h-16 text-green-600 mb-4" /> :
            <UserMinus className="w-16 h-16 text-red-600 mb-4" />
        }
        <h3 className={`text-3xl font-extrabold ${status === 'eligible' || status === 'provisionally_eligible' ? 'text-green-700' : 'text-red-700'} mb-2`}>
            {status === 'eligible' ? 'Eligibility Confirmed' : status === 'provisionally_eligible' ? 'Provisionally Eligible' : 'Ineligible'}
        </h3>
        <p className="text-gray-600">Finalizing audit report with complete findings.</p>
    </div>
);


// --- DSS Agent Steps (PM-AJAY Focused) ---
const agentSteps = [
    { text: '1. Verifying Candidate Identity via Aadhaar e-KYC linkage...', duration: 900, visual: <DefaultVisual title="Identity Check" icon={<UserCheck />} /> },
    { text: '2. Checking Mandatory SC Caste Status and Certificate Validity...', duration: 1500, visual: <FetchingDataVisual source="National Caste Registry/DigiLocker" /> },
    { text: '3. Validating Annual Household Income against MoSJE Poverty Guidelines (Max 2.5 Lakhs).', duration: 1800, visual: <FetchingDataVisual source="State Revenue & Poverty Records" /> },
    { text: '4. Assessing Financial Readiness (PAN, Bank, DBT Linkage via PFMS).', duration: 1400, visual: <FetchingDataVisual source="PFMS/DBT Gateway" /> },
    { text: '5. Cross-checking Age/Disability against Project-specific Constraints.', duration: 1000, visual: <DefaultVisual title="Constraint Check" icon={<AlertTriangle />} /> },
    { text: '6. Running Geo-Spatial/Socio-Economic Viability Score...', duration: 1300, visual: <AnalyzingMapVisual /> },
    { text: '7. Compiling and Finalizing Digital Eligibility Certificate...', duration: 700, visual: <CompilingReportVisual /> },
];


// --- DigiLocker Simulation Modal (Externalized for clean code) ---
const DigiLockerModal = ({ isOpen, onConnect, onClose }) => {
    const [step, setStep] = useState(0); 
    const [tempAadhar, setTempAadhar] = useState('999988881234');
    const [tempMobile, setTempMobile] = useState('9876543210');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!isOpen) { setStep(0); setMessage(''); setTempAadhar('999988881234'); setTempMobile('9876543210'); setOtp(''); }
        if (isOpen && step === 0) {
            setMessage('Connecting securely to DigiLocker services...');
            const timer = setTimeout(() => { setStep(4); setMessage('Please enter your Aadhaar and Mobile number for verification.'); }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, step]);

    const handleAadhaarSubmit = () => {
        if (tempAadhar.length !== 12 || tempMobile.length !== 10) { setMessage('Error: Please enter valid 12-digit Aadhaar and 10-digit Mobile numbers.'); return; }
        setMessage(`OTP sent to mobile linked with Aadhaar ${tempAadhar.slice(-4)} (Code: 123456).`);
        setStep(5);
    };

    const handleOtpSubmit = () => {
        if (otp === '123456') { 
            setMessage('OTP Verified. Importing data now...'); 
            setStep(6); 
            setTimeout(() => { onConnect(); onClose(); }, 1000); 
        } else { setMessage('Error: Invalid OTP. Please try again.'); } 
    };


    if (!isOpen) return null;

    return (
        <Dialog 
            open={isOpen} 
            fullWidth 
            maxWidth="xs" 
            PaperProps={{ className: 'rounded-xl shadow-2xl border-t-8 border-green-500' }}
        >
            <DialogContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <LinkIcon className="w-5 h-5 text-green-600" />
                        DigiLocker Verification
                    </h3>
                    <button onClick={onClose} className="text-2xl font-bold p-1 leading-none rounded-full hover:bg-gray-200 transition-colors">&times;</button>
                </div>

                <div className="space-y-4">
                    {message && <p className={`text-sm ${message.includes('Error') ? 'text-red-500' : 'text-blue-600'}`}>{message}</p>}
                    
                    {/* Simplified Loading/Success screens */}
                    {(step === 0 || step === 6) ? (
                        <div className="flex flex-col items-center p-4">
                            {step === 0 && <Loader className="w-8 h-8 text-green-500 animate-spin mb-3" />}
                            {step === 6 && <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />}
                            <p className="text-base font-medium text-gray-700">{message || 'Starting secure connection...'}</p>
                        </div>
                    ) : (
                        <>
                            {/* Step 4: Aadhaar/Mobile Entry */}
                            {step === 4 && (
                                <>
                                    <TextField fullWidth label="Aadhaar Number (UID)" value={tempAadhar} onChange={(e) => setTempAadhar(e.target.value)} helperText="Enter 12-digit Aadhaar to proceed with OTP verification." inputProps={{ maxLength: 12, type: 'number' }} />
                                    <TextField fullWidth label="Linked Mobile Number" value={tempMobile} onChange={(e) => setTempMobile(e.target.value)} inputProps={{ maxLength: 10, type: 'tel' }} />
                                    <Button onClick={handleAadhaarSubmit} className="bg-blue-600 hover:bg-blue-700">Get OTP</Button>
                                </>
                            )}

                            {/* Step 5: OTP Verification */}
                            {step === 5 && (
                                <>
                                    <TextField fullWidth label="Enter OTP (Simulated: 123456)" value={otp} onChange={(e) => setOtp(e.target.value)} helperText="Check your registered mobile number for the 6-digit OTP." inputProps={{ maxLength: 6, type: 'number' }} />
                                    <Button onClick={handleOtpSubmit} className="bg-green-600 hover:bg-green-700">Verify & Import Data</Button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};


// --- MAIN COMPONENT: AI/DigiLocker Verification Page ---

const VerificationPage = ({ setCurrentView }) => {
    // 1. INITIAL STATE: Added PM-AJAY specific fields
    const [candidateData, setCandidateData] = useState({
        name: '', aadhar: '', mobile: '', dob: '', address: '',
        disabilityCert: '', pan: '', bankAccount: '', gender: '',
        casteCategory: '', // NEW: SC/ST/OBC/General
        annualIncome: '', // NEW: For poverty line check
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [eligibilityStatus, setEligibilityStatus] = useState(null);
    const [eligibilityDetails, setEligibilityDetails] = useState('');
    const [message, setMessage] = useState(null);

    const [isRunning, setIsRunning] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isFinalizing, setIsFinalizing] = useState(false);
    const [isDigiLockerModalOpen, setIsDigiLockerModalOpen] = useState(false);
    const [hasImportedData, setHasImportedData] = useState(false);
    
    const logContainerRef = useRef(null);

    const isFormLocked = hasImportedData || isRunning || isFinalizing;

    const handleChange = (e) => setCandidateData({ ...candidateData, [e.target.name]: e.target.value });
    
    const handleOtpSend = () => { 
        if (!candidateData.mobile || candidateData.mobile.length !== 10) {
            setMessage({ type: 'error', text: 'Please enter a valid 10-digit mobile number first.' });
            return;
        }
        setOtpSent(true); 
        setMessage({ type: 'info', text: 'OTP sent to mobile number. Please check your phone (Code: 123456).' }); 
    };
    const handleOtpVerification = (otp) => { 
        if (otp === '123456') { 
            setOtpVerified(true); 
            if (!hasImportedData) setHasImportedData(true); 
            setMessage({ type: 'success', text: 'Mobile number verified successfully! Form is now locked.' }); 
        } else { setMessage({ type: 'error', text: 'Invalid OTP. Please try again.' }); } 
    };
    
    const handleDigiLockerImport = () => {
        if (!isFormLocked) {
             setIsDigiLockerModalOpen(true);
        } else {
             setMessage({ type: 'error', text: 'Verification already completed or in progress. Please reset to continue.' });
        }
    };

    // 4. DIGILOCKER CONNECT: Fills form and locks it with realistic data
    const handleDigiLockerConnect = useCallback(() => {
        setCandidateData(prev => ({
            ...prev,
            name: 'Sunita Devi',
            aadhar: '9999 8888 1234',
            mobile: '9876543210',
            dob: '1990-05-15',
            address: 'H.No 145, Ward 3, Sanganer, Jaipur, RJ',
            disabilityCert: 'DCERT-RJ-192837',
            pan: 'ABCDE1234F',
            bankAccount: '123456789012',
            gender: 'Female',
            casteCategory: 'SC', // MANDATORY FIELD IMPORTED
            annualIncome: '180000', // MANDATORY FIELD IMPORTED (1.8 Lakh)
        }));
        setHasImportedData(true);
        setOtpVerified(true);    
        setMessage({ type: 'success', text: 'DigiLocker data imported successfully! Form is locked for verification.' });
    }, []);


    // 5. UPDATED ELIGIBILITY CHECK LOGIC (PM-AJAY GIA RULES)
    const checkEligibility = useCallback(() => {
        const age = calculateAge(candidateData.dob);
        const income = parseInt(candidateData.annualIncome);
        let status = 'eligible';
        let details = 'All primary criteria met. Candidate is eligible for the Income Generation Component.';

        // Rule 1: Caste Constraint (Non-SC/ST is ineligible for PM-AJAY GIA)
        if (candidateData.casteCategory !== 'SC') {
            status = 'ineligible';
            details = 'Candidate is **Ineligible**. **Reason:** PM-AJAY GIA (Grant-in-Aid) is exclusively for the socio-economic empowerment of the **Scheduled Caste (SC)** community. Category check failed.';
        }
        
        // Rule 2: Income Constraint (Must be within target low income < 2.5L/yr)
        else if (income > 250000 || income < 50000 || isNaN(income)) {
            status = 'ineligible';
            details = `Candidate is **Ineligible**. **Reason:** Annual Income (₹${income.toLocaleString()}) falls outside the target low-income group (max ₹2.5 Lakh/year) for GIA livelihood projects.`;
        }

        // Rule 3: Age/Disability Constraint (Example of a component constraint failure)
        else if (candidateData.disabilityCert && age > 45) {
            status = 'ineligible';
            details = 'Candidate is **Ineligible**. **Reason:** Age limit (45 years) exceeded for the specialized **Skill Development** course targeting youth with disabilities.';
        }
        
        // Rule 4: DBT Readiness (Provisional Eligibility if crucial financial links are missing)
        else if (!candidateData.bankAccount || !candidateData.pan) {
            status = 'provisionally_eligible';
            details = 'Candidate is **Provisionally Eligible**. **Condition:** Fund disbursement requires mandatory verification of **PAN/Bank Account Linkage** via PFMS. Action required by candidate.';
        }

        setEligibilityStatus(status);
        setEligibilityDetails(details);
        setIsFinalizing(false);
    }, [candidateData]);

    const runAgenticCheck = () => {
        if (!otpVerified || candidateData.casteCategory === '' || candidateData.annualIncome === '') {
            setMessage({ type: 'error', text: 'Please ensure Mobile is verified and all mandatory fields (Caste, Income) are filled.' });
            return;
        }
        setEligibilityStatus(null);
        setIsRunning(true);
        setCurrentStepIndex(0);
    };

    // --- DSS AGENT RUNNER LOGIC ---
    useEffect(() => {
        if (isRunning && currentStepIndex < agentSteps.length) {
            const currentStep = agentSteps[currentStepIndex];
            const timer = setTimeout(() => {
                setCurrentStepIndex(prev => prev + 1);
            }, currentStep.duration);
            return () => clearTimeout(timer);
        } else if (isRunning && currentStepIndex >= agentSteps.length) {
            setIsRunning(false);
            setIsFinalizing(true);
            setTimeout(checkEligibility, 1000); // Wait for visual finalization
        }
    }, [isRunning, currentStepIndex, checkEligibility]);

    // Scroll log to bottom
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [currentStepIndex]);

    const eligibilityColor = useMemo(() => {
        if (eligibilityStatus === 'eligible') return 'bg-emerald-100 border-emerald-500 text-emerald-800';
        if (eligibilityStatus === 'provisionally_eligible') return 'bg-yellow-100 border-yellow-500 text-yellow-800';
        if (eligibilityStatus === 'ineligible') return 'bg-red-100 border-red-500 text-red-800';
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }, [eligibilityStatus]);

    const candidateAge = calculateAge(candidateData.dob);

    return (
        <div className="p-6 bg-white shadow-xl rounded-xl">
            {/* 5. DigiLocker Modal */}
            <DigiLockerModal 
                isOpen={isDigiLockerModalOpen}
                onClose={() => setIsDigiLockerModalOpen(false)}
                onConnect={handleDigiLockerConnect}
            />

            {/* Header/Back Button */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-3xl font-extrabold text-gray-900 flex items-center space-x-3">
                    <UserCheck className="text-purple-600" />
                    <span>PM-AJAY GIA Eligibility Check (MoSJE)</span>
                </h2>
                <button
                    onClick={() => console.log('Back button pressed')} // Placeholder
                    className="py-2 px-4 text-sm font-medium rounded-xl text-gray-700 bg-gray-200 hover:bg-gray-300 flex items-center space-x-1 transition"
                >
                    <ChevronLeft size={16} /> <span>Back to Tracker</span>
                </button>
            </div>

            {/* Message/Alert Area */}
            {message && (
                <div className={`p-3 mb-4 rounded-md text-sm ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800' : message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    {message.text}
                </div>
            )}

            {/* DIGILOCKER IMPORT & OTP (Visible if not running) */}
            {!isRunning && !isFinalizing && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-start">
                        {/* DigiLocker Button */}
                        <button 
                            onClick={handleDigiLockerImport} 
                            className="md:col-span-2 w-full py-3 px-4 border-2 border-green-500 shadow-md text-lg font-bold rounded-xl text-green-800 bg-green-50 hover:bg-green-100 flex items-center justify-center space-x-2 transition"
                            disabled={isFormLocked}
                        >
                            <LinkIcon className="w-6 h-6"/>
                            <span>Import Data from DigiLocker (Caste, Income, Identity)</span>
                        </button>

                        <div className="md:col-span-1 border p-3 rounded-lg shadow-inner bg-yellow-50">
                            <p className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
                                <Lock size={16} className="text-yellow-600" />
                                <span>Mobile Verification (Manual)</span>
                            </p>
                            {otpVerified ? (
                                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center space-x-1"><CheckCircle size={14} /> Verified!</p>
                            ) : (
                                <div className="mt-2 flex space-x-2">
                                    <input type="text" maxLength="6" placeholder="Enter OTP" className="w-2/3 text-sm p-2 border rounded-lg" onChange={(e) => { if (otpSent) handleOtpVerification(e.target.value); }} disabled={!otpSent} />
                                    <button onClick={handleOtpSend} className={`w-1/3 py-2 text-xs font-medium rounded-lg text-white ${otpSent ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={otpSent}>
                                        {otpSent ? 'Resend' : 'Send OTP'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* --- OR Separator --- */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-500 font-semibold text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                </>
            )}

            {/* AI RUNNER VIEW (Visible when running/finalizing) */}
            {(isRunning || isFinalizing) && (
                <div className="bg-gray-100 p-6 rounded-xl mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Panel: Log */}
                        <div className="lg:col-span-1 bg-gray-800 text-white rounded-lg p-4 font-mono text-sm h-96 overflow-y-auto" ref={logContainerRef}>
                            <p className="text-yellow-300 mb-4">$ agent-pmajaay-dsa --execute --candidate={candidateData.name.split(' ')[0]}</p>
                            {agentSteps.map((step, index) => (
                                <div key={index} className="flex items-start gap-3 mb-2">
                                    {index < currentStepIndex ? (
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                                    ) : (
                                        <div className={`w-4 h-4 flex-shrink-0 mt-1 ${index === currentStepIndex ? 'animate-pulse' : ''}`}> &gt; </div>
                                    )}
                                    <span className={index === currentStepIndex ? 'text-yellow-300' : index < currentStepIndex ? 'text-gray-400' : 'text-gray-600'}>
                                        {step.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Right Panel: Visual */}
                        <div className="lg:col-span-2 h-96 rounded-lg">
                            {isFinalizing ? (
                                <FinalizingScreen status={eligibilityStatus} />
                            ) : (
                                currentStepIndex < agentSteps.length && agentSteps[currentStepIndex].visual
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* CANDIDATE DETAILS INPUT (Always Visible) */}
            <div className="p-6 border rounded-xl bg-gray-50 shadow-inner mb-8">
                <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center space-x-2">
                    <User size={20} /> <span>Candidate Information (Self-Declaration/Imported)</span>
                    {isFormLocked && <span className="ml-2 px-2 py-0.5 text-xs font-bold rounded-full bg-green-100 text-green-700">LOCKED</span>}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Row 1: Identity & Contact */}
                    <InputGroup label="Full Name" name="name" value={candidateData.name} onChange={handleChange} placeholder="As per Aadhaar" required={true} readOnly={isFormLocked} />
                    <InputGroup label="Aadhaar No." name="aadhar" value={candidateData.aadhar} onChange={handleChange} placeholder="UID" readOnly={isFormLocked} />
                    <InputGroup label="Date of Birth" name="dob" value={candidateData.dob} onChange={handleChange} type="date" required={true} readOnly={isFormLocked} />
                    <InputGroup label="Mobile No." name="mobile" value={candidateData.mobile} onChange={handleChange} placeholder="10 digits" maxLength="10" required={true} readOnly={isFormLocked} />
                    
                    {/* Row 2: PM-AJAY Critical Fields */}
                    <SelectGroup label="Caste Category" name="casteCategory" value={candidateData.casteCategory} onChange={handleChange} options={['', 'SC', 'ST', 'OBC', 'General']} readOnly={isFormLocked} required={true} />
                    <InputGroup label="Annual Household Income (₹)" name="annualIncome" value={candidateData.annualIncome} onChange={handleChange} type="number" placeholder="Max ₹2,50,000" readOnly={isFormLocked} required={true} />
                    <InputGroup label="Disability Cert No." name="disabilityCert" value={candidateData.disabilityCert} onChange={handleChange} placeholder="If applicable (for special projects)" readOnly={isFormLocked} />
                    <InputGroup label="Age (Calculated)" name="ageDisplay" value={candidateAge} placeholder="Calculated" readOnly={true} />
                    
                    {/* Row 3: DBT & Project Readiness Fields */}
                    <InputGroup label="PAN Card No." name="pan" value={candidateData.pan} onChange={handleChange} placeholder="DBT Linkage" readOnly={isFormLocked} />
                    <InputGroup label="Bank Account No." name="bankAccount" value={candidateData.bankAccount} onChange={handleChange} placeholder="For Direct Benefit Transfer" readOnly={isFormLocked} />
                    {/* Empty Slots for better layout */}
                    <div /> 
                    <div /> 
                </div>
                <div className="mt-4 md:col-span-4">
                    <label className="block text-sm font-semibold text-gray-700">Residential Address (for BPL/Panchayat Check)</label>
                    <textarea name="address" value={candidateData.address} onChange={handleChange} rows="2" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500" placeholder="Complete residential address" readOnly={isFormLocked} />
                </div>
            </div>

            {/* AI AGENT AND ELIGIBILITY ACTION/RESULTS */}
            <div className="p-6 border rounded-xl shadow-lg bg-indigo-50 border-indigo-300">
                <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center space-x-2">
                    <Zap size={20} /> <span>Digital Screening Agent (DSA) Status</span>
                </h3>

                {/* Show Button if data is ready but not run */}
                {!isRunning && !isFinalizing && eligibilityStatus === null && (
                    <button
                        onClick={runAgenticCheck}
                        disabled={!otpVerified || candidateData.casteCategory === '' || candidateData.annualIncome === ''}
                        className={`w-full py-3 px-4 shadow-lg text-lg font-bold rounded-xl text-white 
                            ${(!otpVerified || candidateData.casteCategory === '' || candidateData.annualIncome === '') ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'} 
                            flex items-center justify-center space-x-2 transition`}
                    >
                        <ClipboardCheck size={20} />
                        <span>Run PM-AJAY Eligibility Audit</span>
                    </button>
                )}

                {/* Show Results if check has run */}
                {eligibilityStatus && !isRunning && !isFinalizing && (
                    <div className={`mt-4 p-4 rounded-lg border-l-4 font-semibold ${eligibilityColor}`}>
                        <p className="text-base flex items-center space-x-2">
                            {eligibilityStatus === 'ineligible' ? <UserMinus size={16} /> : <TrendingUp size={16} />}
                            <span>**Final Eligibility Status:** {eligibilityStatus.toUpperCase().replace('_', ' ')}</span>
                        </p>
                        <p className="text-sm mt-2 font-normal" dangerouslySetInnerHTML={{ __html: eligibilityDetails.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                        <button
                            onClick={() => { setEligibilityStatus(null); setMessage(null); setHasImportedData(false); setOtpVerified(false); }}
                            className="mt-3 text-xs font-bold text-gray-600 hover:text-indigo-600 underline"
                        >
                            Reset and Rerun Verification
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerificationPage;
