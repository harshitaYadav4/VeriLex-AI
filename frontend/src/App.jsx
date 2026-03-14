import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Feature from "./pages/Feature";
import PricingPage from "./pages/Pricing";
import Changelog from "./pages/Changelog";
import Demo from "./pages/Demo";

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
