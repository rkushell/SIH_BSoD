import React, { useState, useRef } from 'react';
import { Eye, EyeOff, Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react';

// --- Reusable UI Components (inlined for single-file mandate) ---

const Button = React.forwardRef(({ className = '', variant = 'default', children, ...props }, ref) => {
  let baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 shadow-md";
  let variantClasses = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };
  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

const Input = React.forwardRef(({ className = '', type = 'text', ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm ${className}`}
      {...props}
    />
  );
});


// --- Default Mock Aadhaar Database (Internal Registry) ---
// This data is stored internally in the code and used for all verification checks.
const AADHAAR_DATA = [
    { id: '111122223333', name: 'Aarav Sharma', dob: '2001-05-15', registered: 'Yes' },
    { id: '111122223334', name: 'Diya Patel', dob: '2002-08-20', registered: 'Yes' },
    { id: '111122223335', name: 'Rohan Gupta', dob: '2003-01-10', registered: 'Yes' },
    { id: '111122223336', name: 'Priya Verma', dob: '1998-11-25', registered: 'Yes' },
    { id: '111122223337', name: 'Karan Singh', dob: '1995-04-03', registered: 'Yes' },
    // A few more mock entries for robustness
    { id: '111122223340', name: 'Sara Khan', dob: '1999-10-10', registered: 'Yes' },
    { id: '111122223350', name: 'Amit Desai', dob: '1990-01-01', registered: 'Yes' },
    { id: '111122223354', name: 'Myra Bose', dob: '2001-07-01', registered: 'No' }, // Failure Case 1: Found but not registered
    { id: '111122223360', name: 'Shruti Hegde', dob: '2001-06-12', registered: 'No' }, // Failure Case 2: Found but not registered
    { id: '999988887777', name: 'Nitya Varma', dob: '2003-03-18', registered: 'No' },  // Failure Case 3: Unique ID (Registered No)
    { id: '123412341234', name: 'Test User', dob: '2000-01-01', registered: 'Yes' },
];

// Map for quick lookup by Aadhaar ID
const FALLBACK_AADHAAR_MAP = AADHAAR_DATA.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {});

// --- Mock QR Code Scanner Logic ---
// This function performs the verification against the internal registry.
const dynamicMockScanQRCode = (file, expectedId, registryMap) => new Promise(resolve => {
    // Simulate API delay
    setTimeout(() => {
        if (!file) return resolve({ success: false, message: "No file uploaded." });

        // SIMULATION: Extract ID from file name (e.g., "qr_111122223333.png")
        const fileName = file.name.toLowerCase();
        let scannedId = null;

        const match = fileName.match(/\d{12}/);
        if (match) {
            scannedId = match[0];
        }

        if (!scannedId) {
             return resolve({ success: false, message: "QR code could not be read or is invalid (Simulated QR failure)." });
        }

        if (scannedId !== expectedId) {
            return resolve({ 
                success: false, 
                message: `QR content (${scannedId}) does not match entered Aadhaar ID (${expectedId}).` 
            });
        }

        // QR content matches entered ID, now check internal database status
        const record = registryMap[scannedId];

        if (!record) {
             return resolve({ 
                success: false, 
                message: `Aadhaar ID ${scannedId} not found in the registry.` 
            });
        }
        
        if (record.registered && record.registered.toLowerCase() === 'yes') {
            return resolve({ 
                success: true, 
                message: "Aadhaar verified successfully. Registration status: Yes.", 
                data: record
            });
        } else {
             return resolve({ 
                success: false, 
                message: `Aadhaar ID ${scannedId} found, but registration status is 'No'. KYC failed.` 
            });
        }

    }, 1500); // 1.5 second loading time
});

// --- EKycSection Component ---
// This component handles the Aadhaar input and verification process.
function EKycSection({ onNext, onBack, onComplete, onDataUpdate, formData, mockVerifier, isFirstStep }) {
    const [aadharNumber, setAadharNumber] = useState(formData.aadharNumber || "");
    const [showAadhar, setShowAadhar] = useState(false);
    const [aadharFile, setAadharFile] = useState(null);
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState({ state: 'initial', message: '' }); // 'initial', 'loading', 'success', 'error'
    const fileInputRef = useRef(null);
    
    // Validation check
    const isValidAadhaarFormat = aadharNumber.length === 12 && /^\d+$/.test(aadharNumber);
    const canProceed = isValidAadhaarFormat && consent && status.state === 'success';

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAadharFile(e.target.files[0]);
            setStatus({ state: 'initial', message: `File selected: ${e.target.files[0].name}. Click Verify.` });
        }
    };

    const handleVerify = async () => {
        if (!isValidAadhaarFormat) {
            return setStatus({ state: 'error', message: 'Please enter a valid 12-digit Aadhaar number first.' });
        }
        if (!aadharFile) {
            return setStatus({ state: 'error', message: 'Please upload the QR code image for verification.' });
        }

        setStatus({ state: 'loading', message: 'Verifying QR Code content against internal registry...' });
        
        // Use the mockVerifier function passed from the parent (App)
        const result = await mockVerifier(aadharFile, aadharNumber);

        if (result.success) {
            setStatus({ state: 'success', message: result.message });
            onDataUpdate({ 
                aadharNumber: aadharNumber, 
                kycData: result.data 
            });
        } else {
            setStatus({ state: 'error', message: result.message });
        }
    };

    const handleProceed = () => {
        if (canProceed) {
            onComplete(1); // Mark this step complete (now Step 1)
            onNext();
        }
    };

    const handleAadharChange = (e) => {
        setAadharNumber(e.target.value.replace(/\D/g, '').slice(0, 12));
        setStatus({ state: 'initial', message: '' }); // Reset status on Aadhaar number change
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Step 1: Aadhaar E-KYC Verification</h2>

            {/* Aadhaar Input */}
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Aadhaar Number (12 Digits)</label>
                <div className="relative">
                    <Input
                        value={aadharNumber}
                        onChange={handleAadharChange}
                        placeholder="Enter 12-digit Aadhaar Number"
                        type={showAadhar ? 'text' : 'password'}
                        maxLength={12}
                    />
                    <button
                        type="button"
                        onClick={() => setShowAadhar(!showAadhar)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                        {showAadhar ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {!isValidAadhaarFormat && aadharNumber.length > 0 && (
                    <p className="text-xs text-red-500 mt-1">Aadhaar must be exactly 12 digits.</p>
                )}
            </div>

            {/* QR Code Upload */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Aadhaar QR Code Image (.png or .jpg)</label>
                <div 
                    className="flex items-center justify-center w-full"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 transition duration-300">
                        <Upload size={24} className="text-indigo-500 mb-2" />
                        <p className="mb-1 text-sm text-gray-500">
                            {aadharFile ? aadharFile.name : "Click to upload, or drag and drop"}
                        </p>
                        <p className="text-xs text-gray-400">PNG or JPG (Max 5MB)</p>
                    </div>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* Verification Button */}
            <Button
                onClick={handleVerify}
                disabled={!isValidAadhaarFormat || !aadharFile || status.state === 'loading'}
                className="w-full"
            >
                {status.state === 'loading' ? (
                    <><Loader2 size={20} className="mr-2 animate-spin" /> Verifying...</>
                ) : (
                    'Verify Aadhaar QR Code'
                )}
            </Button>

            {/* Status and Consent */}
            {status.state !== 'initial' && (
                <div className={`p-4 rounded-lg flex items-center space-x-3 
                    ${status.state === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {status.state === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    <p className="text-sm font-medium">{status.message}</p>
                </div>
            )}

            {/* Consent Checkbox */}
            <div className="flex items-start">
                <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
                    I authorize the use of my Aadhaar number and QR code for KYC verification.
                </label>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                {/* Back button removed as this is now Step 1 */}
                <Button
                    onClick={handleProceed}
                    disabled={!canProceed}
                    className="w-full"
                >
                    Proceed to Step 2
                </Button>
            </div>
        </div>
    );
}

// --- Mock Step 2 (Document Uploads) ---
const MockSection = ({ title, content, onNext, onBack, onComplete, stepId, isLastStep }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Step {stepId}: {title}</h2>
            <p className="text-gray-600">{content}</p>
            <div className="flex gap-3 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={onBack} className="flex-1">
                    Back
                </Button>
                <Button onClick={() => { onComplete(stepId); onNext(); }} className="flex-1">
                    {isLastStep ? 'Complete Application' : `Proceed to Step ${stepId + 1}`}
                </Button>
            </div>
        </div>
    );
};

// --- Main Application Component ---
const App = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [completedSteps, setCompletedSteps] = useState({});
    
    // The registry map is fixed to the internal mock data as per user request.
    const activeAadhaarMap = FALLBACK_AADHAAR_MAP;
    
    // Create the mock verifier function using the internal map
    const mockVerifier = (file, expectedId) => dynamicMockScanQRCode(file, expectedId, activeAadhaarMap);


    // Updated steps array
    const steps = [
        { id: 1, title: 'Aadhaar E-KYC', content: 'Verify your identity using Aadhaar number and QR code.' },
        { id: 2, title: 'Document Uploads', content: 'Upload required secondary documents like PAN card or address proof.' },
    ];

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    const handleComplete = (stepId) => setCompletedSteps(prev => ({ ...prev, [stepId]: true }));
    const handleDataUpdate = (data) => setFormData(prev => ({ ...prev, ...data }));
    
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <EKycSection 
                        onNext={handleNext} 
                        onBack={handleBack} 
                        onComplete={handleComplete} 
                        onDataUpdate={handleDataUpdate}
                        formData={formData}
                        mockVerifier={mockVerifier}
                        isFirstStep={true} // Indicate it's the first step
                    />
                );
            case 2:
                return (
                    <MockSection
                        title={steps[currentStep - 1].title}
                        content={steps[currentStep - 1].content}
                        onNext={handleNext}
                        onBack={handleBack}
                        onComplete={handleComplete}
                        stepId={currentStep}
                        isLastStep={true} // Indicate it's the final step
                    />
                );
            default:
                // This case should not be reached with only 2 steps
                return (
                    <div className="p-4 bg-red-100 text-red-800 rounded">
                        Error: Invalid step index.
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 sm:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-indigo-700">E-KYC Application</h1>
                    <p className="text-sm text-gray-500">2-Step Verification Process</p>
                </header>

                {/* Progress Tracker */}
                <div className="flex justify-between items-center mb-10 relative">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            {/* This divider logic works for 2 steps */}
                            {index > 0 && (
                                <div className={`absolute h-0.5 top-3 left-[calc(50%+4px)] right-8 -translate-x-1/2 -mt-px bg-gray-300 w-[calc(100%-64px)]`}>
                                    <div className={`h-full transition-all duration-500 ${completedSteps[step.id - 1] ? 'bg-indigo-600' : 'bg-gray-300'}`} style={{ width: completedSteps[step.id - 1] || currentStep > step.id ? '100%' : '0%' }}></div>
                                </div>
                            )}
                            <div 
                                className={`flex flex-col items-center z-10 transition-all duration-300 cursor-pointer ${currentStep === step.id ? 'text-indigo-600' : 'text-gray-400'}`}
                                onClick={() => currentStep > step.id ? setCurrentStep(step.id) : null}
                            >
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${currentStep === step.id ? 'bg-indigo-600 text-white border-indigo-600' : completedSteps[step.id] ? 'bg-green-500 text-white border-green-500' : 'bg-white border-gray-300 text-gray-500'}`}>
                                    {completedSteps[step.id] ? <CheckCircle size={16} /> : step.id}
                                </div>
                                <span className="text-xs mt-1 text-center hidden sm:block">{step.title}</span>
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                {/* Form Content */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    {renderStepContent()}
                </div>
            </div>
        </div>
    );
};

export default App;