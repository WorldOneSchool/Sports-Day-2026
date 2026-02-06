import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import "../App.css";
import "./Navbar.css";
import logo from "../assets/logos/School-logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/why-sports-day", label: "Why We Celebrate Sports Day" },
  { to: "/wall-of-fame", label: "Hall of Fame" },
  { to: "/whats-new", label: "What's New" },
  { to: "/behind-the-scenes", label: "Behind the Scenes" },
  { to: "/about", label: "About Our School" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleRouteChange = () => setOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -8 },
    show: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.28, ease: "easeInOut" } },
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`site-nav premium-navbar ${scrolled ? "scrolled" : ""}`}
      initial="hidden"
      animate="show"
      variants={navVariants}
      aria-label="Main navigation"
    >
      <div className="nav-inner premium-nav-inner">
        <div className="brand premium-brand">
          <img src={logo} alt="World One School logo" className="logo premium-logo" />
          <span className="brand-text premium-brand-text">World One School</span>
        </div>

        <ul className="nav-links premium-nav-links">
          {navLinks.map((link) => (
            <li key={link.to} className="premium-nav-item">
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => (isActive ? "nav-link active premium-nav-link" : "nav-link premium-nav-link")}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="hamburger premium-hamburger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
        >
          <svg width="24" height="16" viewBox="0 0 24 16" aria-hidden="true">
            <rect width="24" height="2" y="0" rx="1"></rect>
            <rect width="24" height="2" y="7" rx="1"></rect>
            <rect width="24" height="2" y="14" rx="1"></rect>
          </svg>
        </button>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={navLinks} />
    </motion.nav>
  );
}