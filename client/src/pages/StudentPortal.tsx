import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/lib/AuthProvider";
import { AuthGate } from "@/components/AuthGate";
import RegistrationWithAadhar from "@/components/RegistrationWithAadhar";
import { ApplicationTracker } from "@/components/ApplicationTracker";
import EligibilityChecker from "@/components/EligibilityChecker";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Heart,
  ClipboardList,
  MessageSquare,
  Send,
  Filter,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

/* --- small safe session helpers --- */
function safeGet(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch { }
}
function safeRemove(key: string) {
  try {
    sessionStorage.removeItem(key);
  } catch { }
}

/* --- SAMPLE_INTERNSHIPS: 8 items with requested fields --- */
const SAMPLE_INTERNSHIPS = [
  {
    internshipId: "INT-001",
    companyId: "CMP-1001",
    title: "Product Management Intern",
    description: "Work with product teams to define roadmaps, write PRDs, and coordinate with engineering and design.",
    requiredSkills: ["product", "communication", "research"],
    gpaRequirement: 7.0,
    sector: "Technology",
    location: "Delhi NCR",
    capacity: 3,
    duration: "3 months",
    stipend: "15,000/month",
  },
  {
    internshipId: "INT-002",
    companyId: "CMP-1002",
    title: "Frontend Developer Intern",
    description: "Build responsive user interfaces using React and collaborate with UX designers.",
    requiredSkills: ["react", "html", "css", "javascript"],
    gpaRequirement: 6.5,
    sector: "Software",
    location: "Remote",
    capacity: 4,
    duration: "6 months",
    stipend: "20,000/month",
  },
  {
    internshipId: "INT-003",
    companyId: "CMP-1003",
    title: "Data Analyst Intern",
    description: "Analyze large datasets, write SQL queries and build dashboards for insights.",
    requiredSkills: ["sql", "python", "excel"],
    gpaRequirement: 6.0,
    sector: "Data & Analytics",
    location: "Bangalore",
    capacity: 2,
    duration: "3 months",
    stipend: "18,000/month",
  },
  {
    internshipId: "INT-004",
    companyId: "CMP-1004",
    title: "Embedded Systems Intern",
    description: "Design and prototype embedded systems using microcontrollers and sensors.",
    requiredSkills: ["c", "embedded", "electronics"],
    gpaRequirement: 7.5,
    sector: "Hardware",
    location: "Pune",
    capacity: 2,
    duration: "4 months",
    stipend: "12,000/month",
  },
  {
    internshipId: "INT-005",
    companyId: "CMP-1005",
    title: "Marketing & Growth Intern",
    description: "Support growth experiments, run marketing campaigns and track metrics.",
    requiredSkills: ["analytics", "marketing", "copywriting"],
    gpaRequirement: 5.5,
    sector: "Marketing",
    location: "Mumbai",
    capacity: 5,
    duration: "3 months",
    stipend: "10,000/month",
  },
  {
    internshipId: "INT-006",
    companyId: "CMP-1006",
    title: "Machine Learning Intern",
    description: "Work on model training, evaluation and deployment for real-world datasets.",
    requiredSkills: ["python", "ml", "tensorflow"],
    gpaRequirement: 8.0,
    sector: "AI/ML",
    location: "Hyderabad",
    capacity: 2,
    duration: "6 months",
    stipend: "25,000/month",
  },
  {
    internshipId: "INT-007",
    companyId: "CMP-1007",
    title: "UX Research Intern",
    description: "Conduct user interviews, usability tests and synthesize findings for product teams.",
    requiredSkills: ["research", "empathy", "communication"],
    gpaRequirement: 6.0,
    sector: "Design",
    location: "Chennai",
    capacity: 2,
    duration: "3 months",
    stipend: "11,000/month",
  },
  {
    internshipId: "INT-008",
    companyId: "CMP-1008",
    title: "DevOps Intern",
    description: "Assist in CI/CD pipeline setup, monitoring and cloud infrastructure automation.",
    requiredSkills: ["linux", "docker", "aws"],
    gpaRequirement: 7.0,
    sector: "Cloud",
    location: "Bengaluru",
    capacity: 3,
    duration: "4 months",
    stipend: "16,000/month",
  },
];

/* --- FeedbackDialog Component --- */
function FeedbackDialog() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    console.log("Feedback submitted:", { rating, feedback });
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setRating(0);
      setFeedback("");
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MessageSquare className="h-4 w-4 mr-2" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send us your Feedback</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8"
          >
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-600">Feedback Successfully Submitted!</h3>
            <p className="text-sm text-muted-foreground mt-2">Thank you for your valuable feedback.</p>
          </motion.div>
        ) : (
          <div className="space-y-4 py-4">
            {/* Rating Bar */}
            <div>
              <label className="block text-sm font-medium mb-3">Rate your experience</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block text-sm font-medium mb-2">Your Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think about the Student Portal..."
                className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Submit Feedback
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

import { CheckCircle } from "lucide-react";

/* --- ProfileDetailsDialog Component --- */
function ProfileDetailsDialog() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    try {
      const raw = safeGet("studentProfile");
      if (raw) setProfile(JSON.parse(raw));
    } catch { }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Profile Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Your Profile Details</DialogTitle>
        </DialogHeader>

        {profile ? (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-base font-medium">{profile.name || "—"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-base font-medium">{profile.email || "—"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <p className="text-base font-medium">{profile.phone || "—"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                <p className="text-base font-medium">{profile.dob || "—"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Aadhar Verified</label>
                <p className="text-base font-medium">{profile.aadharVerified ? "✓ Yes" : "✗ No"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Gender</label>
                <p className="text-base font-medium">{profile.gender || "—"}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Skills</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(profile.skills) && profile.skills.length > 0 ? (
                  profile.skills.map((skill: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-muted-foreground">—</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Highest Qualification</label>
                <p className="text-base font-medium">{profile.highestQualification || "—"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">GPA/Marks</label>
                <p className="text-base font-medium">{profile.marksGPA || "—"}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Latest Education Institution</label>
              <p className="text-base font-medium">{profile.latestEducationInstitution || "—"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Family Income</label>
                <p className="text-base font-medium">{profile.familyIncome || "—"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">ITR Provided</label>
                <p className="text-base font-medium">{profile.itrProvided ? "✓ Yes" : "✗ No"}</p>
              </div>
            </div>

            {profile.certifications && profile.certifications.length > 0 && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Certifications</label>
                <div className="mt-2 space-y-1">
                  {profile.certifications.map((cert: string, idx: number) => (
                    <p key={idx} className="text-sm">• {cert}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <p>No profile information found. Please complete your registration first.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ------------------ StudentPortal main component ------------------ */
export default function StudentPortal() {
  const { isAuthenticated, user } = useAuth();
  const authed = isAuthenticated && user?.role === "student";
  const hasProfile = isStudentProfileComplete();

  const [appliedList, setAppliedList] = useState<any[]>(() => {
    try {
      const raw = safeGet("appliedInternships");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [showApplied, setShowApplied] = useState(false);

  const [prefLoc1, setPrefLoc1] = useState("");
  const [prefLoc2, setPrefLoc2] = useState("");

  const [offered, setOffered] = useState<any[]>(() => {
    try {
      const raw = safeGet("offeredInternships");
      if (raw) return JSON.parse(raw);
    } catch { }
    return [
      { ...SAMPLE_INTERNSHIPS[0], offerLetter: "Offer Letter: Congratulations! You are offered the Product Management internship.", status: "pending" },
      { ...SAMPLE_INTERNSHIPS[5], offerLetter: "Offer Letter: Congratulations! You are offered the Machine Learning internship.", status: "pending" },
    ];
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFromSearch, setSelectedFromSearch] = useState<any>(null);

  useEffect(() => {
    try {
      safeSet("offeredInternships", JSON.stringify(offered));
    } catch { }
  }, [offered]);

  useEffect(() => {
    console.log("StudentPortal mount -> authed:", authed, "hasProfile:", hasProfile);
  }, []);

  let initialStage: "eligibility" | "auth" | "profile" | "dashboard" = "dashboard";
  if (!authed) {
    initialStage = "dashboard";
  } else if (!hasProfile) {
    initialStage = "profile";
  } else {
    initialStage = "dashboard";
  }

  const [stage, setStage] = useState<"eligibility" | "auth" | "profile" | "dashboard">(initialStage);
  const [activeTab, setActiveTab] = useState<"match" | "preference" | "offered" | "tracker">("match");

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "portalAuth" || e.key === "studentProfile") {
        const nowAuthed = safeGet("portalAuth") === "student";
        if (!nowAuthed) {
          window.location.href = "/login";
          return;
        }
        setStage(isStudentProfileComplete() ? "dashboard" : "profile");
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    try {
      safeSet("appliedInternships", JSON.stringify(appliedList));
    } catch { }
  }, [appliedList]);

  function handleProfileComplete() {
    setStage("dashboard");
  }

  function leavePortal() {
    try {
      safeRemove("portalSelected");
      safeRemove("portalAuth");
    } catch { }
    window.location.replace("/");
  }

  function handleApply(internship: any) {
    const exists = appliedList.some((i) => i.internshipId === internship.internshipId);
    if (exists) {
      setShowApplied(true);
      return;
    }
    if (appliedList.length >= 6) {
      alert("You can apply to a maximum of 6 internships. Remove one from your list to add another.");
      setShowApplied(true);
      return;
    }
    const next = [...appliedList, internship];
    setAppliedList(next);
    setShowApplied(true);
    alert(`Added ${internship.title} to your preferred internships (position ${next.length}).`);
  }

  function handleRemoveApplied(id: string) {
    const next = appliedList.filter((i) => i.internshipId !== id);
    setAppliedList(next);
  }

  function moveApplied(id: string, dir: "up" | "down") {
    const idx = appliedList.findIndex((i) => i.internshipId === id);
    if (idx === -1) return;
    const copy = [...appliedList];
    const swapIdx = dir === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= copy.length) return;
    [copy[idx], copy[swapIdx]] = [copy[swapIdx], copy[idx]];
    setAppliedList(copy);
  }

  function acceptOffer(internshipId: string) {
    setOffered((prev) => prev.map((o) => o.internshipId === internshipId ? { ...o, status: "accepted" } : o));
    alert("You accepted the offer. Congratulations!");
  }

  function rejectOffer(internshipId: string) {
    setOffered((prev) => prev.map((o) => o.internshipId === internshipId ? { ...o, status: "rejected" } : o));
    alert("You rejected the offer.");
  }

  useEffect(() => {
    if (!authed) {
      window.location.href = "/login";
    }
  }, [authed]);

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setSelectedFromSearch(null);
      return;
    }

    const q = query.toLowerCase();
    const results = SAMPLE_INTERNSHIPS.filter(
      (job) =>
        job.internshipId.toLowerCase().includes(q) ||
        job.title.toLowerCase().includes(q) ||
        job.companyId.toLowerCase().includes(q)
    );
    setSearchResults(results);
  };

  const handleSelectFromSearch = (job: any) => {
    setSelectedFromSearch(job);
    setSearchQuery("");
    setSearchResults([]);
  };

  if (stage === "eligibility") {
    return (
      <div className="min-h-screen bg-background">
        <Header showNav={false} />
        <div className="container mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to Student Portal</h1>
            <p className="text-muted-foreground">Let's verify your eligibility for the PM Internship Scheme</p>
          </motion.div>
          <EligibilityChecker onComplete={() => setStage("profile")} />
        </div>
      </div>
    );
  }

  if (stage === "profile") {
    return (
      <div className="min-h-screen bg-background">
        <Header showNav={false} />
        <div className="container mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Registration</h1>
            <p className="text-muted-foreground">Please complete registration to access the Student Dashboard.</p>
          </motion.div>

          <div className="mt-4">
            <RegistrationWithAadhar onComplete={handleProfileComplete} />
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" onClick={leavePortal}>← Cancel & Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  let profile: any = null;
  try {
    const raw = safeGet("studentProfile");
    if (raw) profile = JSON.parse(raw);
  } catch { }

  const eligible = SAMPLE_INTERNSHIPS;

  function matchesPreferred(job: any) {
    if (!prefLoc1 && !prefLoc2) return true;
    const loc = (job.location || "").toLowerCase();
    const p1 = prefLoc1.trim().toLowerCase();
    const p2 = prefLoc2.trim().toLowerCase();
    if (p1 && loc.includes(p1)) return true;
    if (p2 && loc.includes(p2)) return true;
    return false;
  }

  const preferredInternships = eligible.filter(matchesPreferred);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Discover your perfect internship</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <ProfileDetailsDialog />
            <FeedbackDialog />
            <LogoutButton />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="match" className="gap-2" data-testid="tab-match">
              <Heart className="h-4 w-4" />
              Match
            </TabsTrigger>
            <TabsTrigger value="preference" className="gap-2" data-testid="tab-preference">
              <Filter className="h-4 w-4" />
              Preference
            </TabsTrigger>
            <TabsTrigger value="offered" className="gap-2" data-testid="tab-offered">
              <Send className="h-4 w-4" />
              Offered
            </TabsTrigger>
            <TabsTrigger value="tracker" className="gap-2" data-testid="tab-tracker">
              <ClipboardList className="h-4 w-4" />
              Tracker
            </TabsTrigger>
          </TabsList>

          {/* MATCH TAB */}
          <TabsContent value="match" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                AI-Powered Matching
              </div>
              <h2 className="text-xl font-semibold">Internships You Are Eligible For</h2>
              <p className="text-muted-foreground">Based on your profile — complete your profile for more accurate matches</p>
            </motion.div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6 relative">
              <div className="relative flex items-center gap-2 bg-transparent">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by ID (INT-001), Company (CMP-1001), or Role (Product Management)"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-transparent border border-muted-foreground rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-muted-foreground rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                  {searchResults.map((job) => (
                    <button
                      key={job.internshipId}
                      onClick={() => handleSelectFromSearch(job)}
                      className="w-full px-4 py-3 text-left hover:bg-muted/50 border-b last:border-b-0 transition-colors"
                    >
                      <div className="font-medium text-foreground">{job.title}</div>
                      <div className="text-sm text-muted-foreground">{job.internshipId} • {job.companyId}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected from Search Display */}
            {selectedFromSearch && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto mb-6 p-4 bg-transparent border border-primary/30 rounded-lg backdrop-blur-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{selectedFromSearch.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{selectedFromSearch.internshipId} • {selectedFromSearch.companyId}</p>
                    <p className="text-sm text-muted-foreground mt-2">{selectedFromSearch.location} • {selectedFromSearch.sector}</p>
                  </div>
                  <button
                    onClick={() => setSelectedFromSearch(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      handleApply(selectedFromSearch);
                      setSelectedFromSearch(null);
                    }}
                    disabled={appliedList.some((i) => i.internshipId === selectedFromSearch.internshipId)}
                  >
                    {appliedList.some((i) => i.internshipId === selectedFromSearch.internshipId) ? "Already Applied" : "Apply Now"}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Preference list */}
            {(true) && (
              <div className="max-w-2xl mx-auto mb-4 p-4 rounded border bg-card border-muted-foreground/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Your Preferred Internships (max 6)</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setShowApplied(false); }}>Close</Button>
                    <Button onClick={() => { alert('Submit preferences (mock)'); }} size="sm">Submit Preferences</Button>
                  </div>
                </div>

                {appliedList.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No internships selected yet. Click "Apply" on any internship to add it to your priority list.</div>
                ) : (
                  <ol className="list-decimal pl-5 space-y-2">
                    {appliedList.map((item, idx) => (
                      <li key={item.internshipId} className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{item.title} <span className="text-xs text-muted-foreground">({item.internshipId} • {item.companyId})</span></div>
                          <div className="text-sm text-muted-foreground">{item.location} • {item.sector} • GPA ≥ {item.gpaRequirement}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={() => moveApplied(item.internshipId, "up")} disabled={idx === 0}>↑</Button>
                          <Button size="sm" variant="ghost" onClick={() => moveApplied(item.internshipId, "down")} disabled={idx === appliedList.length - 1}>↓</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRemoveApplied(item.internshipId)}>Remove</Button>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}

            {!profile && (
              <div className="px-4 py-3 rounded bg-yellow-50 border border-yellow-100 text-sm text-yellow-800">
                Complete your profile (Profile Details) to get more accurate, AI-powered matches.
              </div>
            )}

            {eligible.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">No internships match your profile yet. Try updating your profile or check back later.</div>
            ) : (
              <div className="grid gap-4">
                {eligible.map((job) => (
                  <Card key={job.internshipId} className="hover-elevate">
                    <CardContent className="p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <div className="text-sm text-muted-foreground">{job.companyId} • {job.location}</div>
                        <div className="mt-3 text-sm text-muted-foreground">{job.duration} • {job.stipend}</div>
                        <p className="mt-3 text-sm text-muted-foreground max-w-2xl">{job.description || "Short description about the internship role and responsibilities."}</p>

                        <div className="mt-3 text-sm">
                          <strong>Skills:</strong> {job.requiredSkills.join(", ")} • <strong>GPA:</strong> {job.gpaRequirement} • <strong>Sector:</strong> {job.sector} • <strong>Capacity:</strong> {job.capacity}
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-3">
                        <div className="text-sm text-muted-foreground">ID: {job.internshipId}</div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleApply(job)} disabled={appliedList.some((i) => i.internshipId === job.internshipId)}>
                            {appliedList.some((i) => i.internshipId === job.internshipId) ? "Selected" : "Apply"}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => {
                            alert(`${job.title} — ${job.companyId}

${job.duration} · ${job.stipend}

Description: ${job.description || "—"}`);
                          }}>
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* PREFERENCE TAB */}
          <TabsContent value="preference" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-4">
              <h2 className="text-xl font-semibold">Set Your Preferred Locations</h2>
              <p className="text-muted-foreground">Enter up to two preferred locations. Internships matching either location will be shown below.</p>
            </motion.div>

            <div className="max-w-2xl mx-auto bg-card p-4 rounded border border-muted-foreground/50 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Preferred Location 1</label>
                  <input value={prefLoc1} onChange={(e) => setPrefLoc1(e.target.value)} placeholder="e.g. Delhi" className="w-full px-3 py-2 border border-muted-foreground rounded bg-transparent text-foreground placeholder-muted-foreground" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Preferred Location 2</label>
                  <input value={prefLoc2} onChange={(e) => setPrefLoc2(e.target.value)} placeholder="e.g. Bangalore" className="w-full px-3 py-2 border border-muted-foreground rounded bg-transparent text-foreground placeholder-muted-foreground" />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => { setPrefLoc1(""); setPrefLoc2(""); }}>Clear</Button>
                <Button onClick={() => setActiveTab("match")}>Show Matches</Button>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium">Internships matching your preferred locations</h3>
              {preferredInternships.length === 0 ? (
                <div className="p-6 text-muted-foreground">No internships found for the selected locations.</div>
              ) : (
                <div className="grid gap-4 mt-3">
                  {preferredInternships.map((job) => (
                    <Card key={job.internshipId} className="hover-elevate">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{job.title} <span className="text-xs text-muted-foreground">({job.internshipId})</span></div>
                          <div className="text-sm text-muted-foreground">{job.companyId} • {job.location} • {job.sector}</div>
                          <div className="text-sm mt-1">GPA ≥ {job.gpaRequirement} • Capacity: {job.capacity}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleApply(job)} disabled={appliedList.some((i) => i.internshipId === job.internshipId)}>
                            {appliedList.some((i) => i.internshipId === job.internshipId) ? "Selected" : "Apply"}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => alert(job.description)}>
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* OFFERED TAB */}
          <TabsContent value="offered" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-4">
              <h2 className="text-xl font-semibold">Offered Internships</h2>
              <p className="text-muted-foreground">Internships that have been offered to you. You can Accept or Reject each offer below.</p>
            </motion.div>

            {offered.length === 0 ? (
              <div className="p-6 text-muted-foreground">You have no offers at the moment.</div>
            ) : (
              <div className="grid gap-4">
                {offered.map((job) => (
                  <Card key={job.internshipId} className="hover-elevate">
                    <CardContent className="p-6 md:flex md:items-start md:justify-between gap-4">
                      <div className="md:flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <div className="text-sm text-muted-foreground">{job.companyId} • {job.location}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">ID: {job.internshipId}</div>
                        </div>

                        <p className="mt-3 text-sm text-muted-foreground">{job.description}</p>

                        <div className="mt-3 text-sm">
                          <strong>Skills:</strong> {job.requiredSkills.join(", ")} • <strong>GPA:</strong> {job.gpaRequirement} • <strong>Sector:</strong> {job.sector} • <strong>Capacity:</strong> {job.capacity}
                        </div>

                        <div className="mt-4 bg-muted/30 p-3 rounded">
                          <strong>Offer Letter</strong>
                          <div className="mt-2 text-sm">{job.offerLetter}</div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-3 mt-4 md:mt-0">
                        <div className="text-sm text-muted-foreground">Status: <span className={`font-medium ${job.status === 'accepted' ? 'text-green-600' : job.status === 'rejected' ? 'text-red-600' : 'text-muted-foreground'}`}>{job.status}</span></div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => acceptOffer(job.internshipId)} disabled={job.status === 'accepted'}>Accept</Button>
                          <Button size="sm" variant="destructive" onClick={() => rejectOffer(job.internshipId)} disabled={job.status === 'rejected'}>Reject</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TRACKER TAB */}
          <TabsContent value="tracker">
            <ApplicationTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function isStudentProfileComplete(): boolean {
  try {
    const raw = safeGet("studentProfile");
    if (!raw) return false;
    const p = JSON.parse(raw);

    const hasName = !!p?.name;
    const hasAadhar = p?.aadharVerified === true;
    const hasSkills = Array.isArray(p?.skills) && p.skills.length > 0;
    const hasQualification = !!p?.highestQualification;
    const marks = p?.marksGPA;
    const hasMarks = typeof marks === "number" && !isNaN(marks) && marks >= 0 && marks <= 10;
    const hasInstitution = !!p?.latestEducationInstitution;

    return hasName && hasAadhar && hasSkills && hasQualification && hasMarks && hasInstitution;
  } catch {
    return false;
  }
}