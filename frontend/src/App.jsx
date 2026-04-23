import { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "./components/ui/Loader";
import Cursor from "./components/ui/Cursor";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import LandingPage from "./pages/LandingPage";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AuthCallback from "./pages/auth/AuthCallback";

// Import new pages
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<><Cursor /><Navbar /><AboutPage /><Footer /></>} />
        <Route path="/services" element={<><Cursor /><Navbar /><ServicesPage /><Footer /></>} />
        <Route path="/how-it-works" element={<><Cursor /><Navbar /><HowItWorksPage /><Footer /></>} />
        <Route path="/contact" element={<><Cursor /><Navbar /><ContactPage /><Footer /></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}