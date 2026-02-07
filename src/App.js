

// src/App.js
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Countdown from "./pages/Countdown";
import WhySportsDay from "./pages/WhySportsDay";
import WallOfFame from "./pages/WallOfFame";
import WhatsNew from "./pages/WhatsNew";
import BehindTheScenes from "./pages/BehindTheScenes";
import About from "./pages/About";
import "./App.css";

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/countdown" element={<Countdown />} />
          <Route path="/why-sports-day" element={<WhySportsDay />} />
          <Route path="/wall-of-fame" element={<WallOfFame />} />
          <Route path="/whats-new" element={<WhatsNew />} />
          <Route path="/behind-the-scenes" element={<BehindTheScenes />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}