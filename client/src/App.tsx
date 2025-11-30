import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import StudentPortal from "@/pages/StudentPortal";
import CompanyPortal from "@/pages/CompanyPortal";
import AdminPortal from "@/pages/AdminPortal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/student" component={StudentPortal} />
      <Route path="/company" component={CompanyPortal} />
      <Route path="/admin" component={AdminPortal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
