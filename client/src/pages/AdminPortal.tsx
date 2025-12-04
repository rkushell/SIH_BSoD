import React, { useState, useEffect } from 'react';
import { useAuth } from "@/lib/AuthProvider";
import {
    LayoutDashboard,
    Scale,
    Clock,
    Users,
    Tractor,
    Download,
    Settings,
    Fingerprint,
    LogOut,
    Loader2,
    TrendingUp,
    Percent,
    ChevronDown,
    ChevronUp,
    Shield,
    Search, // Added for search functionality
    Play, // Added for allocation button
    FileText, // Added for meeting results button
    Check, // For round success
    X, // For round failure
} from 'lucide-react';

// --- START: Mock Components for Single-File Execution ---

const Header = ({ showNav }) => (
    <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-800">PM Internship Scheme</div>
        </div>
    </header>
);

const LogoutButton = () => {
    const [loading, setLoading] = useState(false);
    const { logout } = useAuth();

    const handleLogout = () => {
        setLoading(true);
        logout();
    };

    return (
        <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-red-600 text-white hover:bg-red-700 h-10 py-2 px-4 shadow-lg"
            disabled={loading}
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging Out
                </>
            ) : (
                <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </>
            )}
        </button>
    );
};

const TabContentWrapper = ({ children, isActive }) => {
    if (!isActive) return null;
    return (
        <div className={`transition-opacity duration-300 opacity-100 animate-fadeIn`}>
            {children}
        </div>
    );
};

// --------------------------------------------------------------------------------
// --- DASHBOARD COMPONENTS ---
// --------------------------------------------------------------------------------

const StatCard = ({ title, value, change, color, icon: Icon }) => (
    <div className={`p-5 rounded-xl shadow-lg ${color} flex flex-col justify-between h-full`}>
        <div className="flex justify-between items-center text-gray-800">
            <p className="text-sm font-medium opacity-80">{title}</p>
            <Icon className="h-5 w-5 opacity-50" />
        </div>
        <h3 className="text-3xl font-bold mt-1 mb-2 text-gray-900">{value}</h3>
        <p className="text-xs opacity-70 text-gray-600">{change}</p>
    </div>
);

const CategoryMiniTable = () => {
    const data = [
        { category: 'GEN', eligible: 5200, placed: 3100, rate: 59.6, delta: 0.5 },
        { category: 'OBC', eligible: 3100, placed: 1750, rate: 56.5, delta: -1.2 },
        { category: 'SC', eligible: 1900, placed: 1100, rate: 57.9, delta: 2.1 },
        { category: 'ST', eligible: 950, placed: 550, rate: 57.9, delta: 0.0 },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Placement Rate by Category</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Category', 'Eligible', 'Placed', 'Rate (%)', 'Delta vs Last Round'].map(header => (
                                <th key={header} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item) => (
                            <tr key={item.category} className="hover:bg-indigo-50/50 transition-colors">
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.eligible.toLocaleString()}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.placed.toLocaleString()}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold flex items-center">
                                    {item.rate.toFixed(1)}%
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <span className={`inline-flex items-center text-xs font-medium p-1 rounded-full ${item.delta > 0 ? 'text-green-700 bg-green-100' : item.delta < 0 ? 'text-red-700 bg-red-100' : 'text-gray-700 bg-gray-100'}`}>
                                        {item.delta > 0 ? <ChevronUp className="h-3 w-3 mr-1" /> : item.delta < 0 ? <ChevronDown className="h-3 w-3 mr-1" /> : null}
                                        {Math.abs(item.delta).toFixed(1)}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-gray-400 mt-4">CI: The 95% Confidence Interval for the overall Placement Rate is [57.8%, 58.6%].</p>
        </div>
    );
};


const AdminDashboard = ({ isAllocating, startAllocation, generateResults }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Overview Dashboard</h2>

        {/* KPI Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
                title="Total Applicants"
                value="11,150"
                change="Current Round"
                color="bg-blue-500/10 text-blue-700"
                icon={Users}
            />
            <StatCard
                title="Total Placed"
                value="6,500"
                change="Seats filled so far"
                color="bg-green-500/10 text-green-700"
                icon={TrendingUp}
            />
            <StatCard
                title="Placement Rate"
                value="58.3%"
                change="Target: 60.0%"
                color="bg-purple-500/10 text-purple-700"
                icon={Percent}
            />
        </div>

        {/* Operational Controls */}
        <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Allocation Controls</h3>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={startAllocation}
                    disabled={isAllocating}
                    className="flex items-center justify-center w-full sm:w-1/2 p-3 rounded-xl text-white font-semibold transition-all shadow-md 
                           bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.01]"
                >
                    {isAllocating ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Allocation In Progress...
                        </>
                    ) : (
                        <>
                            <Play className="mr-2 h-5 w-5" />
                            Start Model Allocation
                        </>
                    )}
                </button>
                <button
                    onClick={generateResults}
                    disabled={isAllocating}
                    className="flex items-center justify-center w-full sm:w-1/2 p-3 rounded-xl text-indigo-800 font-semibold transition-all shadow-md 
                           bg-yellow-300 hover:bg-yellow-400 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transform hover:scale-[1.01]"
                >
                    <FileText className="mr-2 h-5 w-5" />
                    Generate Meeting Results PDF
                </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 italic">
                Note: Running the allocation is an operational step. Generating results creates the final audit report.
            </p>
        </div>

        {/* Mini-Table Section */}
        <CategoryMiniTable />

        <div className="h-48 flex items-center justify-center text-gray-500 border border-dashed rounded-xl mt-6 bg-white shadow-inner">
            Simulation Visualization Placeholder: Comparative placement rates (Model vs. Previous Year).
        </div>
    </div>
);

// --------------------------------------------------------------------------------
// --- NEW TAB COMPONENTS ---
// --------------------------------------------------------------------------------

const FairnessMetricsPanel = () => (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-xl border">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
            <Scale className="h-6 w-6 text-indigo-500" /> Fairness & Model Health
        </h2>
        <p className="text-gray-600">This section provides tools to audit the allocation model's performance on protected groups (Fairness) and its predictive quality (Model Health).</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg h-64 flex flex-col justify-center items-center bg-gray-50">
                <h3 className="font-semibold mb-2">Placement Rates by Group</h3>
                <p className="text-sm text-gray-500">[Chart Placeholder: Bar chart showing GEN, OBC, SC, ST rates]</p>
                <p className="text-sm mt-2 text-indigo-600">Disparate Impact Ratio (OBC/GEN): 0.947</p>
            </div>
            <div className="p-4 border rounded-lg h-64 flex flex-col justify-center items-center bg-gray-50">
                <h3 className="font-semibold mb-2">Calibration Plot</h3>
                <p className="text-sm text-gray-500">[Chart Placeholder: Predicted vs. Actual Outcomes Plot]</p>
                <p className="text-xs mt-2">Model Health: Excellent calibration across all probability buckets.</p>
            </div>
            <div className="p-4 border rounded-lg h-64 flex flex-col justify-center items-center bg-gray-50 md:col-span-2">
                <h3 className="font-semibold mb-2">Score Distribution & Threshold</h3>
                <p className="text-sm text-gray-500">[Chart Placeholder: Histogram of predicted scores with allocation threshold line]</p>
            </div>
        </div>
    </div>
);

const RoundLogsPanel = () => (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-xl border">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
            <Clock className="h-6 w-6 text-green-500" /> Allocation Round Logs
        </h2>
        <p className="text-gray-600">Drillable timeline of all allocation rounds run by the system.</p>

        <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {['Round ID', 'Offers Made', 'Acceptances', 'Seats Filled', 'Timestamp', 'Action'].map(header => (
                            <th key={header} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {[
                        { id: 'RND-2024-3', offers: 3200, accepts: 1950, seats: 1200, time: '2024-10-25 11:30' },
                        { id: 'RND-2024-2', offers: 4500, accepts: 2500, seats: 1500, time: '2024-09-15 09:00' },
                        { id: 'RND-2024-1', offers: 5000, accepts: 3050, seats: 2000, time: '2024-08-01 15:45' },
                    ].map((row) => (
                        <tr key={row.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.id}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.offers.toLocaleString()}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.accepts.toLocaleString()}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.seats.toLocaleString()}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.time}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <button className="text-indigo-600 hover:text-indigo-800 font-medium">View Sankey</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="h-48 flex items-center justify-center text-gray-500 border border-dashed rounded-xl mt-6 bg-gray-50">
            Sankey Diagram Placeholder: Flow for selected round (Applicants → Offered → Accepted).
        </div>
    </div>
);

const PerStudentTablePanel = () => {
    // Expanded mock data with round status
    const allStudents = [
        { id: 'A001', name: 'Rohan V.', category: 'GEN', score: 92.5, company: 'Tech Corp', placed: true, boost: false, social: { rural: 'No', gender: 'M' }, roundStatus: { 1: true, 2: false } },
        { id: 'A002', name: 'Priya K.', category: 'OBC', score: 88.1, company: 'Finance Ltd', placed: true, boost: true, social: { rural: 'Yes', gender: 'F' }, roundStatus: { 1: false, 2: true } },
        { id: 'A003', name: 'Sanjay M.', category: 'SC', score: 75.3, company: 'N/A', placed: false, boost: true, social: { rural: 'Yes', gender: 'M' }, roundStatus: { 1: false, 2: false } },
        { id: 'A004', name: 'Aisha R.', category: 'GEN', score: 95.9, company: 'Global Solutions', placed: true, boost: false, social: { rural: 'No', gender: 'F' }, roundStatus: { 1: true, 2: false } },
        { id: 'A005', name: 'Vivek G.', category: 'ST', score: 71.2, company: 'N/A', placed: false, boost: true, social: { rural: 'Yes', gender: 'M' }, roundStatus: { 1: false, 2: false } },
        { id: 'A006', name: 'Zoya H.', category: 'OBC', score: 85.5, company: 'Innovate Solutions', placed: true, boost: false, social: { rural: 'No', gender: 'F' }, roundStatus: { 1: true, 2: false } },
        { id: 'A007', name: 'Chennai P.', category: 'GEN', score: 91.0, company: 'Tech Corp', placed: true, boost: false, social: { rural: 'No', gender: 'F' }, roundStatus: { 1: true, 2: false } },
        { id: 'A008', name: 'Bhavesh N.', category: 'SC', score: 80.1, company: 'Data Systems', placed: true, boost: false, social: { rural: 'No', gender: 'M' }, roundStatus: { 1: false, 2: true } },
        { id: 'A009', name: 'Latika D.', category: 'GEN', score: 90.3, company: 'N/A', placed: false, boost: false, social: { rural: 'No', gender: 'F' }, roundStatus: { 1: false, 2: false } },
        { id: 'A010', name: 'Rahul S.', category: 'ST', score: 82.8, company: 'Green Energy', placed: true, boost: true, social: { rural: 'Yes', gender: 'M' }, roundStatus: { 1: false, 2: true } },
    ];

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = allStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 bg-white p-6 rounded-xl shadow-xl border">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <Users className="h-6 w-6 text-orange-500" /> Per-Student Table
            </h2>

            <div className="flex items-center space-x-2 border rounded-xl p-3 bg-gray-50">
                <Search className="h-5 w-5 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search by ID or Name (e.g., A002 or Priya)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 focus:outline-none placeholder-gray-500 text-gray-800"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-6">

                {/* Student Table */}
                <div className="md:w-2/3 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                {['ID', 'Name', 'Category', 'Placed?', 'R1', 'R2', 'Boost?'].map(header => (
                                    <th key={header} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStudents.map((student) => (
                                <tr
                                    key={student.id}
                                    className={`cursor-pointer hover:bg-yellow-50/50 transition-colors ${selectedStudent?.id === student.id ? 'bg-yellow-100' : ''}`}
                                    onClick={() => setSelectedStudent(student)}
                                >
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{student.id}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{student.name}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{student.category}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.placed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {student.placed ? 'YES' : 'NO'}
                                        </span>
                                    </td>
                                    {/* Round Status */}
                                    <td className="px-4 py-3 whitespace-nowrap text-center">
                                        {student.roundStatus[1] ? <Check className="h-4 w-4 text-green-600 mx-auto" /> : <X className="h-4 w-4 text-red-600 mx-auto" />}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-center">
                                        {student.roundStatus[2] ? <Check className="h-4 w-4 text-green-600 mx-auto" /> : <X className="h-4 w-4 text-red-600 mx-auto" />}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-center">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.boost ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'}`}>
                                            {student.boost ? 'Y' : 'N'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Detail Panel */}
                <div className="md:w-1/3 p-4 border rounded-xl bg-gray-50 shadow-inner">
                    <h3 className="text-lg font-semibold mb-3 border-b pb-2">Student Detail Panel</h3>
                    {selectedStudent ? (
                        <div className="space-y-3 text-sm">
                            <p><strong>ID:</strong> {selectedStudent.id}</p>
                            <p><strong>Allocated Company:</strong> <span className="font-medium text-indigo-700">{selectedStudent.company}</span></p>
                            <p><strong>Predicted Score:</strong> {selectedStudent.score.toFixed(2)}</p>
                            <div className="border-t pt-3">
                                <p className="font-semibold mb-1">Social Parameters:</p>
                                <ul className="list-disc list-inside ml-4 text-gray-600 space-y-0.5">
                                    <li>Gender: {selectedStudent.social.gender}</li>
                                    <li>Rural Flag: {selectedStudent.social.rural}</li>
                                    <li>Boost Applied: {selectedStudent.boost ? 'YES' : 'NO'}</li>
                                </ul>
                            </div>
                            <div className="border-t pt-3">
                                <p className="font-semibold mb-1">Final Allocation Round:</p>
                                <p className="text-gray-600">
                                    {selectedStudent.roundStatus[2] ? 'Round 2' : selectedStudent.roundStatus[1] ? 'Round 1' : 'Not Allocated'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">Select a student row to view detailed allocation parameters.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const ModelExplanationPanel = () => (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-xl border">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
            <Tractor className="h-6 w-6 text-blue-500" /> Model Allocation Explanation
        </h2>
        <p className="text-gray-600">Documentation and live visualization of the core matching and allocation algorithm.</p>

        <div className="p-4 border rounded-lg bg-gray-50 space-y-3">
            <h3 className="font-semibold">Algorithm Overview</h3>
            <p className="text-sm text-gray-700">The system uses a modified Gale-Shapley (Deferred Acceptance) algorithm, optimized for stable matching under fairness constraints (Reservation Policies).</p>
            <ul className="list-decimal list-inside ml-4 text-sm text-gray-600 space-y-1">
                <li>Applicant scores are pre-calculated based on academic history and predicted performance.</li>
                <li>Fairness criteria (Reservation Policies) are strictly enforced at each matching step.</li>
                <li>The matching process is run iteratively across pre-defined rounds.</li>
            </ul>
        </div>

        <div className="p-4 border rounded-lg h-48 flex items-center justify-center bg-gray-50">
            Visualizer Placeholder: Interactive flow chart of the allocation process.
        </div>
    </div>
);

const ReportsExportsPanel = () => (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-xl border">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
            <Download className="h-6 w-6 text-teal-500" /> Reports & Exports
        </h2>
        <p className="text-gray-600">Generate high-fidelity reports and download raw data sets for comprehensive auditing.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg bg-teal-50/50 shadow-sm space-y-3">
                <h3 className="text-lg font-semibold">Audit Summary PDF</h3>
                <p className="text-sm text-gray-600">Comprehensive summary document (KPIs, Fairness Charts, Narrative) for submission to oversight committees.</p>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-lg transition-colors shadow">
                    Generate & Download PDF
                </button>
            </div>
            <div className="p-6 border rounded-lg bg-gray-50 shadow-sm space-y-3">
                <h3 className="text-lg font-semibold text-indigo-700">Allotment Outputs (Raw)</h3>
                <p className="text-sm text-gray-600">Download the **full set of outputs** for the latest allocation run, including all score vectors and intermediate assignments.</p>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors shadow">
                    Export Full Allotment (CSV)
                </button>
            </div>
            <div className="p-6 border rounded-lg bg-gray-50 shadow-sm space-y-3">
                <h3 className="text-lg font-semibold text-indigo-700">Student Placement List</h3>
                <p className="text-sm text-gray-600">Export only the final list of **every student allotted** an internship, including the assigned round and company.</p>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors shadow">
                    Export Placed Students (CSV)
                </button>
            </div>
        </div>
    </div>
);

const SettingsDataSourcesPanel = () => (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-xl border">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
            <Settings className="h-6 w-6 text-purple-500" /> Settings / Data Sources
        </h2>
        <p className="text-gray-600">Review database health, system dependencies, and immutable configuration values. No model parameters are editable by the admin.</p>

        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">Model Configuration Lock Status</h3>
            <p className="text-sm text-red-600">
                <span className="font-medium">LOCKED</span>: Model parameters (weights, boosts, constraints) are fixed and managed centrally.
            </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">Data Source Health</h3>
            <p className="text-sm text-green-600">Database Connection: <span className="font-medium">Online</span> | Last Sync: <span className="font-medium">5 minutes ago</span></p>
        </div>
    </div>
);

const AuditTrailPanel = () => (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-xl border">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
            <Fingerprint className="h-6 w-6 text-red-500" /> Audit Trail
        </h2>
        <p className="text-gray-600">Immutable log of all administrative actions and system events.</p>

        <div className="h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50">
            <ul className="space-y-2 text-sm">
                <li className="p-2 border-b">
                    <span className="font-semibold text-gray-800">2024-11-01 10:15:30:</span> AdminUser-1 <span className="text-red-600 font-medium">REJECTED</span> application A003.
                </li>
                <li className="p-2 border-b">
                    <span className="font-semibold text-gray-800">2024-11-01 09:45:01:</span> System <span className="text-indigo-600 font-medium">INITIATED</span> Round RND-2024-3.
                </li>
                <li className="p-2 border-b">
                    <span className="font-semibold text-gray-800">2024-10-31 16:20:11:</span> SuperAdmin-A <span className="text-orange-600 font-medium">MODIFIED</span> fairness boost weighting (0.8 - 0.9).
                </li>
                <li className="p-2">
                    <span className="font-semibold text-gray-800">2024-10-31 16:19:55:</span> SuperAdmin-A <span className="text-green-600 font-medium">APPROVED</span> access request for User-101.
                </li>
                {/* ... more logs */}
            </ul>
        </div>
    </div>
);


// --------------------------------------------------------------------------------
// --- MAIN APP COMPONENT ---
// --------------------------------------------------------------------------------

const tabData = [
    { value: "dashboard", icon: LayoutDashboard, label: "Dashboard", testId: "tab-admin-dashboard", component: (props) => <AdminDashboard {...props} /> },
    { value: "fairness", icon: Scale, label: "Fairness & Metrics", testId: "tab-fairness", component: () => <FairnessMetricsPanel /> },
    { value: "roundlogs", icon: Clock, label: "Round Logs", testId: "tab-round-logs", component: () => <RoundLogsPanel /> },
    { value: "perstudent", icon: Users, label: "Per-Student Table", testId: "tab-per-student", component: () => <PerStudentTablePanel /> },
    { value: "explanation", icon: Tractor, label: "Model Explanation", testId: "tab-explanation", component: () => <ModelExplanationPanel /> },
    { value: "reports", icon: Download, label: "Exports & Reports", testId: "tab-reports", component: () => <ReportsExportsPanel /> },
    { value: "settings", icon: Settings, label: "Settings / Data", testId: "tab-admin-settings", component: () => <SettingsDataSourcesPanel /> },
    { value: "audit", icon: Fingerprint, label: "Audit Trail", testId: "tab-audit", component: () => <AuditTrailPanel /> },
];

export default function App() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isAllocating, setIsAllocating] = useState(false);

    const startAllocation = () => {
        setIsAllocating(true);
        console.log("Starting Model Allocation...");
        // Mock 5 second allocation process
        setTimeout(() => {
            setIsAllocating(false);
            console.log("Model Allocation Complete. New results available.");
        }, 5000);
    };

    const generateResults = () => {
        console.log("Generating Final Meeting Results PDF...");
        // Mock PDF generation process
        alert("Final Allocation Results PDF Generation Initiated. Check Reports & Exports.");
    };

    const gridColumns = 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8';

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header showNav={false} />
            <div className="container mx-auto px-4 py-8 max-w-8xl">

                {/* Portal Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 bg-white p-6 rounded-xl shadow-md border">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-indigo-600/10">
                            <Shield className="h-7 w-7 text-indigo-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Government Admin Portal</h1>
                            <p className="text-sm md:text-base text-gray-500">Central oversight dashboard for Allocation & Auditing</p>
                        </div>
                    </div>

                    {/* Logout button */}
                    <div className="mt-4 sm:mt-0">
                        <LogoutButton />
                    </div>
                </div>

                {/* Tabs Component (8 Tabs) */}
                <div className="space-y-6">
                    {/* TabsList */}
                    <div className="flex justify-start overflow-x-auto border-b border-gray-200">
                        <div className={`grid ${gridColumns} w-full bg-white p-2 rounded-xl shadow-lg border`}>
                            {tabData.map(({ value, icon: Icon, label, testId }) => (
                                <button
                                    key={value}
                                    onClick={() => setActiveTab(value)}
                                    data-testid={testId}
                                    className={`
                    flex items-center justify-center gap-2 py-2 px-1 sm:px-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap
                    ${activeTab === value
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'
                                        }
                  `}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="hidden sm:inline">{label}</span>
                                    <span className="sm:hidden">{label.split(' ')[0]}</span> {/* Mobile short label */}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TabsContent */}
                    <div className="mt-4">
                        {tabData.map(({ value, component }) => (
                            <TabContentWrapper key={value} isActive={activeTab === value}>
                                {/* Inject props only for Dashboard */}
                                {value === 'dashboard'
                                    ? component({ isAllocating, startAllocation, generateResults })
                                    : component()}
                            </TabContentWrapper>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}