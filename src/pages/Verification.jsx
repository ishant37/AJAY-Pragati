import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { User, ClipboardCheck, Zap, UploadCloud, Lock, Repeat, Send, Key, TrendingUp, ChevronLeft, Briefcase, CheckCircle, Clock, XCircle, DollarSign, BarChart2, UserCheck, FileText, History, FileBadge, Code, Bot, Database, Loader, ArrowLeft, BarChart, Users, Target, Home, Droplets, Trees, Map, Link as LinkIcon } from 'lucide-react';

// --- MOCK MUI COMPONENTS (TO PREVENT CRASH IN REACT CANVAS) ---
// Note: In a real project with MUI installed, you would import these normally:
// import { Dialog, DialogContent, TextField, Button } from '@mui/material';

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


// Reusing utility function and roles from the main app
const ROLES = {
    DM: { id: 'DM', name: 'District Maker', color: 'bg-green-600' },
};

const formatCurrency = (amount) => `₹ ${amount.toLocaleString('en-IN')}`;

// --- HELPER FUNCTION: Calculate Age ---
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

// --- Helper Components for Forms ---

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

const SelectGroup = ({ label, name, value, onChange, options, readOnly = false }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={readOnly}
            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border ${readOnly ? 'bg-gray-200' : 'bg-white'} focus:ring-indigo-500 focus:border-indigo-500`}
        >
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

// --- DSS Visual Components (Integrated) ---

const DefaultVisual = ({ title = "Processing", icon }) => {
    const IconComponent = icon || <Bot />;
    return (
        <div className="w-full h-full bg-gray-900 rounded-lg p-6 flex flex-col items-center justify-center text-white font-mono">
            <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute w-full h-full bg-blue-500/20 rounded-full animate-ping"></div>
                <div className="absolute w-24 h-24 bg-blue-500/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
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

const FetchingDataVisual = ({ source = "Jal Jeevan Mission API" }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Connecting...');

    useEffect(() => {
        const timer1 = setTimeout(() => { setStatus('Fetching Datasets...'); setProgress(30); }, 200);
        const timer2 = setTimeout(() => { setStatus('Parsing Records...'); setProgress(75); }, 500);
        const timer3 = setTimeout(() => { setStatus('Data Acquired.'); setProgress(100); }, 1000);
        return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
    }, []);

    return (
        <div className="w-full h-full bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center text-gray-800 font-mono border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
                <Database className="w-12 h-12 text-blue-500" />
                <div>
                    <h4 className="text-xl font-semibold text-gray-700">Data Ingestion Module</h4>
                    <p className="text-gray-500">Source: {source}</p>
                </div>
            </div>
            <div className="w-full max-w-md h-32 flex items-end gap-2 p-2">
                {[40, 60, 30, 80, 50, 70, 90, 45].map((h, i) => (
                    <div key={i} className="w-full bg-blue-500/20 rounded-t-sm animate-pulse" style={{ height: `${progress > 0 ? h : 0}%`, transition: 'height 0.5s ease-in-out', animationDelay: `${i * 50}ms` }}></div>
                ))}
            </div>
            <div className="w-full max-w-md mt-6">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">{status}</span>
                    <span className="text-sm font-semibold text-green-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
                </div>
            </div>
        </div>
    );
};

const AnalyzingMapVisual = () => {
    const [revealedAssets, setRevealedAssets] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => { setRevealedAssets(prev => (prev < 4 ? prev + 1 : prev)); }, 500); // Faster reveal
        return () => clearInterval(interval);
    }, []);
    const assets = [
        { icon: <Trees className="w-5 h-5 text-green-600" />, name: 'Forest Cover Proximity', value: '68%' },
        { icon: <Droplets className="w-5 h-5 text-blue-600" />, name: 'Water Stress Index', value: 'High' },
        { icon: <Home className="w-5 h-5 text-yellow-600" />, name: 'Built-up Area', value: '4 Major' },
        { icon: <Zap className="w-5 h-5 text-red-600" />, name: 'Scheme Hotspots', value: '2 Identified' },
    ];
    return (
        <div className="w-full h-full bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center text-gray-800 font-mono border border-gray-200">
            <div className="w-full max-w-md h-64 bg-gray-200/50 rounded-lg relative overflow-hidden border-2 border-green-500/30">
                <Map className="absolute w-48 h-48 text-gray-400/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
                <div className="absolute top-0 left-0 h-full w-1 bg-green-400 shadow-[0_0_15px_3px_rgba(34,197,94,0.7)] animate-[scan_4s_linear_infinite]"></div>
            </div>
            <div className="w-full max-w-md mt-4">
                <h4 className="text-lg font-semibold text-green-700 mb-2">[Identifying Assets...]</h4>
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
                {!isComplete && ( <>
                    <div className="absolute w-full h-full animate-spin-slow">
                        <div className="absolute top-[10%] left-[45%] w-8 h-8 bg-green-500/20 rounded-md text-xs flex items-center justify-center text-green-800 font-bold"> IMG </div>
                    </div>
                    <div className="absolute w-full h-full animate-spin-medium">
                        <div className="absolute top-[45%] left-[10%] w-8 h-8 bg-yellow-500/20 rounded-full text-xs flex items-center justify-center text-yellow-800 font-bold"> PDF </div>
                    </div>
                    <div className="absolute w-full h-full animate-spin-fast">
                        <div className="absolute bottom-[15%] right-[20%] w-8 h-8 bg-red-500/20 rounded-sm text-xs flex items-center justify-center text-red-800 font-bold"> DOC </div>
                    </div>
                </> )}
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
        {status === 'eligible' ?
            <CheckCircle className="w-16 h-16 text-green-600 mb-4" /> :
            <XCircle className="w-16 h-16 text-red-600 mb-4" />
        }
        <h3 className={`text-3xl font-extrabold ${status === 'eligible' ? 'text-green-700' : 'text-red-700'} mb-2`}>
            {status === 'eligible' ? 'Eligibility Confirmed' : 'Ineligible'}
        </h3>
        <p className="text-gray-600">Finalizing audit report with complete findings.</p>
    </div>
);


// --- DSS Agent Steps ---
const agentSteps = [
    { text: 'Initializing Identity Verification Agent...', duration: 700, visual: <DefaultVisual title="Initializing" icon={<Bot />} /> },
    { text: 'Verifying Aadhaar-PAN-Bank Account linkage status...', duration: 1200, visual: <FetchingDataVisual source="Centralized Identity DB" /> },
    { text: 'Validating Disability Certificate number against government registry...', duration: 1000, visual: <FetchingDataVisual source="National PwD Registry" /> },
    { text: 'Cross-checking candidate eligibility against PM-AJAY Scheme rules...', duration: 900, visual: <DefaultVisual title="Rule Engine Check" icon={<Zap />} /> },
    { text: 'Analyzing socio-economic data for priority criteria...', duration: 800, visual: <AnalyzingMapVisual /> },
    { text: 'Finalizing digital eligibility certificate...', duration: 500, visual: <CompilingReportVisual /> },
];


// --- NEW COMPONENT: DigiLocker Simulation Modal (FIXED: Uses mock components) ---
const DigiLockerModal = ({ isOpen, onConnect, onClose }) => {
    const [step, setStep] = useState(0); // 0: Initializing, 4: Aadhaar Entry, 5: OTP, 6: Success
    const [tempAadhar, setTempAadhar] = useState('999988881234');
    const [tempMobile, setTempMobile] = useState('9876543210');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setStep(0);
            setMessage('');
            setTempAadhar('999988881234');
            setTempMobile('9876543210');
            setOtp('');
        }
        // Start connection simulation
        if (isOpen && step === 0) {
            setMessage('Connecting securely to DigiLocker services...');
            const timer = setTimeout(() => {
                setStep(4);
                setMessage('Please enter your Aadhaar and Mobile number for verification.');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, step]);

    const handleAadhaarSubmit = () => {
        if (tempAadhar.length !== 12 || tempMobile.length !== 10) {
            setMessage('Error: Please enter valid 12-digit Aadhaar and 10-digit Mobile numbers.');
            return;
        }
        setMessage(`OTP sent to mobile linked with Aadhaar ${tempAadhar.slice(-4)} (Code: 123456).`);
        setStep(5); // Move to OTP step
    };

    const handleOtpSubmit = () => {
        if (otp === '123456') {
            setMessage('OTP Verified. Importing data now...');
            setStep(6); // Move to import success step
            setTimeout(() => {
                onConnect();
                onClose();
            }, 1000);
        } else {
            setMessage('Error: Invalid OTP. Please try again.');
        }
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

                    {/* Step 0/3: Loading Screen */}
                    {(step === 0 || step === 3) && (
                        <div className="flex flex-col items-center p-4">
                            <Loader className="w-8 h-8 text-green-500 animate-spin mb-3" />
                            <p className="text-base font-medium text-gray-700">{message || 'Starting secure connection...'}</p>
                        </div>
                    )}
                    
                    {/* Step 4: Aadhaar/Mobile Entry */}
                    {step === 4 && (
                        <>
                            <TextField
                                fullWidth
                                label="Aadhaar Number (UID)"
                                value={tempAadhar}
                                onChange={(e) => setTempAadhar(e.target.value)}
                                helperText="Enter 12-digit Aadhaar to proceed with OTP verification."
                                inputProps={{ maxLength: 12, type: 'number' }}
                            />
                            <TextField
                                fullWidth
                                label="Linked Mobile Number"
                                value={tempMobile}
                                onChange={(e) => setTempMobile(e.target.value)}
                                inputProps={{ maxLength: 10, type: 'tel' }}
                            />
                            <Button onClick={handleAadhaarSubmit} className="bg-blue-600 hover:bg-blue-700">
                                Get OTP
                            </Button>
                        </>
                    )}

                    {/* Step 5: OTP Verification */}
                    {step === 5 && (
                        <>
                            <TextField
                                fullWidth
                                label="Enter OTP (Simulated: 123456)"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                helperText="Check your registered mobile number for the 6-digit OTP."
                                inputProps={{ maxLength: 6, type: 'number' }}
                            />
                            <Button onClick={handleOtpSubmit} className="bg-green-600 hover:bg-green-700">
                                Verify & Import Data
                            </Button>
                        </>
                    )}

                    {/* Step 6: Success */}
                    {step === 6 && (
                        <div className="text-center p-4 bg-emerald-50 rounded-lg">
                            <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                            <h4 className="text-lg font-semibold text-emerald-800">Import Complete!</h4>
                            <p className="text-sm text-emerald-700">Form fields have been filled and locked.</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

// --- MAIN COMPONENT: AI/DigiLocker Verification Page ---

const VerificationPage = ({ setCurrentView }) => {
    // 1. INITIAL STATE: Empty strings
    const [candidateData, setCandidateData] = useState({
        name: '', aadhar: '', mobile: '', dob: '', address: '',
        disabilityCert: '', pan: '', bankAccount: '', gender: '', // Gender empty initially
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [eligibilityStatus, setEligibilityStatus] = useState(null);
    const [eligibilityDetails, setEligibilityDetails] = useState('');
    const [message, setMessage] = useState('');

    const [isRunning, setIsRunning] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isFinalizing, setIsFinalizing] = useState(false);
    const [isDigiLockerModalOpen, setIsDigiLockerModalOpen] = useState(false);
    const [hasImportedData, setHasImportedData] = useState(false); // NEW State for locking form
    
    const logContainerRef = useRef(null);

    // Form is locked if data is imported OR if the AI runner is active
    const isFormLocked = hasImportedData || isRunning || isFinalizing;
    // Agent is ready to run if data is imported OR manually verified
    const hasRun = eligibilityStatus !== null || isRunning || isFinalizing;

    const handleChange = (e) => setCandidateData({ ...candidateData, [e.target.name]: e.target.value });
    
    // Manual OTP flow (still relevant if user fills form manually)
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
            // Lock the form if manual OTP is verified and no data was imported
            if (!hasImportedData) setHasImportedData(true); 
            setMessage({ type: 'success', text: 'Mobile number verified successfully! Form is now locked.' }); 
        } else { setMessage({ type: 'error', text: 'Invalid OTP. Please try again.' }); } 
    };
    
    // 2. DIGILOCKER HANDLER: Opens the modal
    const handleDigiLockerImport = () => {
        // Only allow opening if the form is NOT locked by manual verification already
        if (!isFormLocked) {
             setIsDigiLockerModalOpen(true);
        } else if (isFormLocked) {
             setMessage({ type: 'error', text: 'Verification already completed or in progress. Please reset to continue.' });
        }
    };

    // 4. DIGILOCKER CONNECT: Fills form and locks it
    const handleDigiLockerConnect = useCallback(() => {
        setCandidateData({
            name: 'Sunita Devi',
            aadhar: '9999 8888 1234', // Simulated Aadhaar
            mobile: '9876543210',
            dob: '1990-05-15',
            address: 'H.No 145, Ward 3, Sanganer, Jaipur, RJ',
            disabilityCert: 'DCERT-RJ-192837',
            pan: 'ABCDE1234F',
            bankAccount: '123456789012',
            gender: 'Female',
        });
        setHasImportedData(true); // Lock the form
        setOtpVerified(true);     // Assume DigiLocker authenticates mobile
        setMessage({ type: 'success', text: 'DigiLocker data imported successfully! Form is locked for verification.' });
    }, []);


    const checkEligibility = useCallback(() => {
        const age = calculateAge(candidateData.dob);
        let status = 'eligible';
        let details = 'Primary eligibility criteria met.';

        if (candidateData.disabilityCert === 'DCERT-RJ-192837' && age >= 30) {
            status = 'ineligible';
            details = 'Candidate is **Ineligible**. Reason: Age limit exceeded (35 years) for the targeted Skill Development Component.';
        } else if (!candidateData.bankAccount || !candidateData.pan) {
            status = 'eligible';
            details = 'Candidate is **Provisionally Eligible**. Awaiting PAN/Bank Linkage verification for final fund disbursement.';
        }

        setEligibilityStatus(status);
        setEligibilityDetails(details);
        setMessage({
            type: status === 'eligible' ? 'success' : 'warning',
            text: `AI Agent check complete! Status: ${status.toUpperCase()}`
        });
        setIsFinalizing(false);
    }, [candidateData]);

    const runAgenticCheck = () => {
        if (!otpVerified) {
            setMessage({ type: 'error', text: 'Please verify the candidate\'s mobile number first.' });
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

            checkEligibility();

            const finalTimer = setTimeout(() => {
                setIsFinalizing(false);
            }, 2500);

            return () => clearTimeout(finalTimer);
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
        if (eligibilityStatus === 'ineligible') return 'bg-red-100 border-red-500 text-red-800';
        if (eligibilityStatus === 'checking') return 'bg-yellow-100 border-yellow-500 text-yellow-800';
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
                    <span>Candidate & Scheme Eligibility Check</span>
                </h2>
                <button
                    onClick={() => setCurrentView('dashboard')}
                    className="py-2 px-4 text-sm font-medium rounded-xl text-gray-700 bg-gray-200 hover:bg-gray-300 flex items-center space-x-1 transition"
                >
                    <ChevronLeft size={16} /> <span>Back to Dashboard</span>
                </button>
            </div>

            {/* Message/Alert Area */}
            {message && (
                <div className={`p-3 mb-4 rounded-md text-sm ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800' : message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    {message.text}
                </div>
            )}

            {/* DIGILOCKER IMPORT & OTP (Visible if not running) */}
            {!isFormLocked && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-start">
                        {/* 💡 FIXED: Added LinkIcon for the DigiLocker Button */}
                        <button 
                            onClick={handleDigiLockerImport} 
                            className="md:col-span-2 w-full py-3 px-4 border-2 border-green-500 shadow-md text-lg font-bold rounded-xl text-green-800 bg-green-50 hover:bg-green-100 flex items-center justify-center space-x-2 transition"
                            disabled={hasImportedData}
                        >
                            <img 
        src="/public/DigiLocker.svg.png" 
        alt="DigiLocker"
        className="w-6 h-6"
    />
                            <span>Import Data from DigiLocker </span>
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
                            <p className="text-yellow-300 mb-4">$ agent-verify --run --candidate={candidateData.name.split(' ')[0]}</p>
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
                    <User size={20} /> <span>Candidate Information</span>
                    {isFormLocked && <span className="ml-2 px-2 py-0.5 text-xs font-bold rounded-full bg-green-100 text-green-700">LOCKED</span>}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <InputGroup label="Full Name" name="name" value={candidateData.name} onChange={handleChange} placeholder="As per Aadhaar" required={true} readOnly={isFormLocked} />
                    <InputGroup label="Aadhaar No." name="aadhar" value={candidateData.aadhar} onChange={handleChange} placeholder="Last 4 digits or full" readOnly={isFormLocked} />
                    <InputGroup label="Mobile No." name="mobile" value={candidateData.mobile} onChange={handleChange} placeholder="10 digits" maxLength="10" required={true} readOnly={isFormLocked} />
                    <InputGroup label="Date of Birth" name="dob" value={candidateData.dob} onChange={handleChange} type="date" required={true} readOnly={isFormLocked} />
                    <InputGroup label="PAN Card No." name="pan" value={candidateData.pan} onChange={handleChange} placeholder="e.g., ABCDE1234F" readOnly={isFormLocked} />
                    <SelectGroup label="Gender" name="gender" value={candidateData.gender} onChange={handleChange} options={['', 'Male', 'Female', 'Other']} readOnly={isFormLocked} />
                    <InputGroup label="Disability Cert No." name="disabilityCert" value={candidateData.disabilityCert} onChange={handleChange} placeholder="If applicable" readOnly={isFormLocked} />
                    <InputGroup label="Bank Account No." name="bankAccount" value={candidateData.bankAccount} onChange={handleChange} placeholder="For Direct Benefit Transfer" readOnly={isFormLocked} />
                    <InputGroup label="Age (Auto)" name="ageDisplay" value={candidateAge} placeholder="Calculated" readOnly={true} />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700">Residential Address</label>
                    <textarea name="address" value={candidateData.address} onChange={handleChange} rows="2" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500" placeholder="Complete residential address" readOnly={isFormLocked} />
                </div>
            </div>

            {/* AI AGENT AND ELIGIBILITY ACTION/RESULTS */}
            <div className="p-6 border rounded-xl shadow-lg bg-indigo-50 border-indigo-300">
                <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center space-x-2">
                    <Zap size={20} /> <span>AI Processing Status</span>
                </h3>

                {/* Show Button if not running */}
                {!isRunning && !isFinalizing && eligibilityStatus !== 'eligible' && eligibilityStatus !== 'ineligible' && (
                    <button
                        onClick={runAgenticCheck}
                        disabled={!otpVerified}
                        className={`w-full py-3 px-4 shadow-lg text-lg font-bold rounded-xl text-white ${!otpVerified ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'} flex items-center justify-center space-x-2 transition`}
                    >
                        <ClipboardCheck size={20} />
                        <span>Run AI Eligibility Agent</span>
                    </button>
                )}

                {/* Show Results if check has run */}
                {eligibilityStatus && !isRunning && !isFinalizing && (
                    <div className={`mt-4 p-4 rounded-lg border-l-4 font-semibold ${eligibilityColor}`}>
                        <p className="text-base flex items-center space-x-2">
                            <TrendingUp size={16} />
                            <span>**Final Eligibility Status:** {eligibilityStatus.toUpperCase()}</span>
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