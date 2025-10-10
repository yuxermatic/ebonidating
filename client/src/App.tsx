import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Header } from "@/components/Header";
import Home from "@/pages/Home";
import Browse from "@/pages/Browse";
import Events from "@/pages/Events";
import Membership from "@/pages/Membership";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import CreateProfile from "@/pages/CreateProfile";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/browse" component={Browse} />
      <Route path="/events" component={Events} />
      <Route path="/membership" component={Membership} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/create-profile" component={CreateProfile} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Router />
              </main>
            </div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;