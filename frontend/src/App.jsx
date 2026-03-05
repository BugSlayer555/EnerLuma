import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "./components/ui/Loader";
import Cursor from "./components/ui/Cursor";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import Ticker from "./components/sections/Ticker";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Manifesto from "./components/sections/Manifesto";
import HowItWorks from "./components/sections/HowItWorks";
import Contact from "./components/sections/Contact";

import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import AuthCallback from "./components/auth/AuthCallback";
import Dashboard from "./dashboard/Dashboard";
import DashboardLayout from "./dashboard/DashboardLayout";

function LandingPage() {
  const [ready, setReady] = useState(false);

  const onDone = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!ready && <Loader key="loader" onDone={onDone} />}
      </AnimatePresence>

      {ready && (
        <motion.div
          key="site"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Cursor />
          <Navbar />

          <main>
            <Hero />
            <Ticker />
            <About />
            <Services />
            <Manifesto />
            <HowItWorks />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard/*" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  );
}