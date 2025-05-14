import { Route, Switch, useLocation, useRoute } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function App() {
  // Get the base path from import.meta.env.BASE_URL
  const base = import.meta.env.BASE_URL || '/akhilnadhpc/';
  const [location] = useLocation();
  const [isRootMatch] = useRoute(base === '/' ? '/' : base);
  
  // Debug point: Log routing information
  useEffect(() => {
    console.log("Current location:", location);
    console.log("Base path:", base);
    console.log("Is root path match:", isRootMatch);
    console.log("Full URL:", window.location.href);
    console.log("Environment:", import.meta.env.MODE);
    
    // Check if assets are loading correctly
    const checkAssetLoading = () => {
      const allLinks = document.querySelectorAll('link');
      const allScripts = document.querySelectorAll('script');
      
      console.log("CSS links status:");
      allLinks.forEach(link => {
        if (link.rel === 'stylesheet') {
          console.log(`${link.href}: ${link.sheet ? 'Loaded' : 'Failed'}`);
        }
      });
      
      console.log("Script status:");
      allScripts.forEach(script => {
        if (script.src) {
          console.log(`${script.src}: ${script.readyState || 'Unknown'}`);
        }
      });
    };
    
    // Run the check after a short delay to allow resources to load
    setTimeout(checkAssetLoading, 2000);
    
    // Run another check after a longer delay
    setTimeout(checkAssetLoading, 5000);
  }, [location, base, isRootMatch]);
  
  // If we're at the base path but not matching the root route, redirect to home
  useEffect(() => {
    if (location === base && !isRootMatch) {
      window.location.href = base;
    }
  }, [location, base, isRootMatch]);
  
  return (
    <TooltipProvider>
      <Toaster />
      <Switch base={base}>
        <Route path="/" component={Home} />
        <Route path="/index.html" component={Home} />
        <Route path={base} component={Home} />
        <Route component={NotFound} />
      </Switch>
    </TooltipProvider>
  );
}

export default App;




