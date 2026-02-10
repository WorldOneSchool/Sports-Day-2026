import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import "../pages/Countdown.css";

const CountdownUnit = ({ value, label }) => {
  const [animatedValue, setAnimatedValue] = useState(value);

  useEffect(() => {
    if (animatedValue !== value) {
      const diff = value - animatedValue;
      const step = diff > 0 ? 1 : -1;
      const timer = setInterval(() => {
        setAnimatedValue(prev => {
          const newVal = prev + step;
          if ((step > 0 && newVal >= value) || (step < 0 && newVal <= value)) {
            clearInterval(timer);
            return value;
          }
          return newVal;
        });
      }, 30);
      return () => clearInterval(timer);
    }
  }, [value]);

  return (
    <div className="countdown-unit">
      <div className="countdown-box">
        <motion.div
          className="countdown-value"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
        >
          {String(animatedValue).padStart(2, "0")}
        </motion.div>
      </div>
      <div className="countdown-label">{label}</div>
    </div>
  );
};

CountdownUnit.displayName = "CountdownUnit";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventDay, setIsEventDay] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    // Sports Fest 2026 is on Feb 13, 2026 at 12:00 PM
    const eventDate = new Date(2026, 1, 13, 12, 0, 0).getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference <= 0) {
      setIsEventDay(true);
      setShowSurprise(true);
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsEventDay(false);
    }
  }, []);

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const sportEmojis = ["⚽", "🏀", "🎾", "🏐", "🏒", "🏑", "🏏", "🥌"];

  return (
    <div className="countdown-page-wrapper">
      <div className="countdown-container">
        {!isEventDay ? (
          <motion.div
            className="countdown-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="countdown-title"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Sports Fest 2026 on 13th February 
            </motion.h1>

            <motion.p
              className="countdown-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The ultimate celebration of sports, teamwork, and excellence
            </motion.p>

            <div className="countdown-timer">
              <CountdownUnit value={timeLeft.days} label="DAYS" />
              <motion.span
                className="countdown-separator"
                animate={{ opacity: [0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                :
              </motion.span>
              <CountdownUnit value={timeLeft.hours} label="HOURS" />
              <motion.span
                className="countdown-separator"
                animate={{ opacity: [0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                :
              </motion.span>
              <CountdownUnit value={timeLeft.minutes} label="MINUTES" />
              <motion.span
                className="countdown-separator"
                animate={{ opacity: [0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                :
              </motion.span>
              <CountdownUnit value={timeLeft.seconds} label="SECONDS" />
            </div>

            <motion.div
              className="countdown-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p>⚡ Get ready for an unforgettable experience ⚡</p>
            </motion.div>

            {/* Floating sport badges */}
            <div className="floating-badges">
              {["⚽", "🏀", "🎾", "🏐", "🏆"].map((emoji, i) => (
                <motion.div
                  key={`badge-${i}`}
                  className="sport-badge"
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="surprise-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Optimized confetti */}
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="confetti"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  opacity: 1,
                  rotate: Math.random() * 360,
                }}
                animate={{
                  y: window.innerHeight + 10,
                  opacity: 0,
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 2.5 + Math.random() * 0.8,
                  ease: "easeIn",
                  delay: Math.random() * 0.4,
                }}
              />
            ))}

            {/* Celebration content */}
            <motion.div
              className="celebration-content"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <motion.h1
                className="surprise-title"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                🎉 IT'S HERE! 🎉
              </motion.h1>

              <motion.div
                className="surprise-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h2>⚽ Sports Fest 2026 is LIVE! 🏆</h2>
                <p>Let the games begin! 🥇</p>
              </motion.div>

              {/* Pulse ring */}
              <motion.div
                className="pulse-ring"
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />

              {/* Floating emojis */}
              {sportEmojis.slice(0, 5).map((emoji, i) => (
                <motion.div
                  key={i}
                  className="floating-emoji"
                  style={{ "--emoji-index": i }}
                  animate={{
                    y: [0, -25, 0],
                  }}
                  transition={{
                    duration: 3.5 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}