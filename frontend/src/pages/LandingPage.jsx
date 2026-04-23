import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "../components/ui/Loader";
import Cursor from "../components/ui/Cursor";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/landing/sections/Hero";
import Ticker from "../components/landing/sections/Ticker";
import About from "../components/landing/sections/About";
import Services from "../components/landing/sections/Services";
import Manifesto from "../components/landing/sections/Manifesto";
import HowItWorks from "../components/landing/sections/HowItWorks";
import Contact from "../components/landing/sections/Contact";

export default function LandingPage() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const ready = loaderDone && videoReady;

  const onLoaderDone = useCallback(() => setLoaderDone(true), []);
  const onVideoReady = useCallback(() => setVideoReady(true), []);

  // Fallback: if video doesn't load within 8s, proceed anyway
  useEffect(() => {
    const timeout = setTimeout(() => setVideoReady(true), 8000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!ready && <Loader key="loader" onDone={onLoaderDone} videoReady={videoReady} />}
      </AnimatePresence>

      {/* Always render content so the video preloads behind the loader */}
      <motion.div
        key="site"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: ready ? "auto" : "none" }}
      >
        <Cursor />
        <Navbar />

        <main>
          <Hero onVideoReady={onVideoReady} />
          <Ticker />
          <About />
          <Services />
          <Manifesto />
          <HowItWorks />
          <Contact />
        </main>

        <Footer />
      </motion.div>
    </>
  );
}
