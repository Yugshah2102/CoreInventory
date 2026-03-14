import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/ims/Login";
import Dashboard from "./pages/ims/Dashboard";
import Products from "./pages/ims/Products";
import Receipts from "./pages/ims/Receipts";
import Deliveries from "./pages/ims/Deliveries";
import Transfers from "./pages/ims/Transfers";
import Adjustments from "./pages/ims/Adjustments";
import History from "./pages/ims/History";
import WarehousesPage from "./pages/ims/Warehouses";
import Profile from "./pages/ims/Profile";
import AppShell from "./components/ims/AppShell";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(15,15,15,0.95)',
            color: '#fff',
            border: '1px solid rgba(0,255,255,0.2)',
            backdropFilter: 'blur(20px)',
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/operations/receipts" element={<Receipts />} />
            <Route path="/operations/deliveries" element={<Deliveries />} />
            <Route path="/operations/transfers" element={<Transfers />} />
            <Route path="/operations/adjustments" element={<Adjustments />} />
            <Route path="/operations/history" element={<History />} />
            <Route path="/warehouses" element={<WarehousesPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
