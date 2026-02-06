import React from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import "../App.css";
import "../mobile-overrides.css";

export default function MobileMenu({ open, onClose, links = [] }) {
  const shouldReduceMotion = useReducedMotion();

  const panelVariants = {
    hidden: { opacity: 0, x: 12 },
    show: { opacity: 1, x: 0, transition: { duration: shouldReduceMotion ? 0 : 0.28, ease: "easeInOut" } },
    exit: { opacity: 0, x: 12, transition: { duration: shouldReduceMotion ? 0 : 0.22, ease: "easeInOut" } },
  };

  if (!open) return null;

  return createPortal(
    <>
      <div className="mobile-backdrop" onClick={onClose} aria-hidden="true" />

      <motion.aside
        className="mobile-menu"
        initial="hidden"
        animate="show"
        exit="exit"
        variants={panelVariants}
        role="dialog"
        aria-modal="true"
      >
        <button className="mobile-close" onClick={onClose} aria-label="Close menu">
          Close
        </button>

        <nav className="mobile-nav">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                  onClick={onClose}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>
    </>,
    document.body
  );
}