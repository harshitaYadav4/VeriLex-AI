import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Feature from "./pages/Feature";
import PricingPage from "./pages/Pricing";
import Changelog from "./pages/Changelog";
import Demo from "./pages/Demo";
import Auth from "./pages/Auth";
import ApiDocs from "./pages/ApiDocs";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import TestApi from "./pages/TestApi";
import Payments from "./pages/Payments";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isDemo = location.pathname === "/demo";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {!isDemo && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/features" element={<PageWrapper><Feature /></PageWrapper>} />
          <Route path="/pricing" element={<PageWrapper><PricingPage /></PageWrapper>} />
          <Route path="/changelog" element={<PageWrapper><Changelog /></PageWrapper>} />
          <Route path="/demo" element={<PageWrapper><Demo /></PageWrapper>} />
          <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Auth initialMode="login" /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><Auth initialMode="signup" /></PageWrapper>} />
          <Route path="/api-docs" element={<PageWrapper><ApiDocs /></PageWrapper>} />
          <Route path="/docs" element={<PageWrapper><ApiDocs /></PageWrapper>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageWrapper><Dashboard /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route path="/test-api" element={<PageWrapper><TestApi /></PageWrapper>} />
          <Route path="/payments" element={<ProtectedRoute><PageWrapper><Payments /></PageWrapper></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
      {!isDemo && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
