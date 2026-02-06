import React, { useRef, useState, useEffect } from "react";
import "./WhatsNew.css";

/**
 * whats-new.js — mobile background repaint fix + existing crystal UI
 *
 * Mobile fix:
 * - On mobile, temporarily set document.body.style.backgroundAttachment = 'scroll'
 *   and related background properties while this component is mounted to avoid
 *   the black gap that appears on some mobile browsers when using fixed/large backgrounds.
 *
 * Everything else (desktop UI, GLB/Sketchfab logic, modal) is unchanged.
 */

export default function WhatsNew() {
  const viewerRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const localDefault = encodeURI("/football x running track.glb");

  const stadiums = [
    { icon: "🏟️", name: "Athletic Track+Football Field", desc: "Olympic-sized track with professional specifications", modelSrc: "https://sketchfab.com/models/48ad64060bb447b2bdab56f39ea2edb0/embed" },
    { icon: "🏀", name: "Basketball Court", desc: "Professional-grade court with indoor climate control", modelSrc: "https://sketchfab.com/models/4fa7536d9cee4f658265632c8c235f5e/embed" },
    { icon: "🎾", name: "Tennis Court", desc: "6 world-class courts with synthetic surface", modelSrc: "https://sketchfab.com/models/78b31d29707f4720b4be6b80cb3f61b5/embed" },
    { icon: "🏐", name: "Padel Court", desc: "Modern padel courts with premium glass walls", modelSrc: "https://sketchfab.com/models/4f379e05661a46dd960424728016ebeb/embed" },
    { icon: "🏐", name: "Volleyball Court", desc: "Multi-sport volleyball facility with spectator seating", modelSrc: "https://sketchfab.com/models/a140d54dc14c4963b1418fbde314aac7/embed" },
    { icon: "🏸", name: "Pickleball", desc: "Dedicated courts for recreational & competitive play", modelSrc: "https://sketchfab.com/models/7c3159ca797d4608af53fd42d056035d/embed" },
    { icon: "⚽", name: "Futsal Court", desc: "Multi-purpose futsal facility with sprung flooring", modelSrc: "https://sketchfab.com/models/2ec1e68039d2409b80617e718513492e/embed" },
    { icon: "🏃", name: "Long jump track", desc: "Professional long jump runway with sandpit", modelSrc: "https://sketchfab.com/models/aaa8c191171b48d087c6a7bf26af13f1/embed" }
  ];

  const [currentModel, setCurrentModel] = useState({
    src: localDefault,
    originalSrc: localDefault,
    type: "glb"
  });

  const [showModal, setShowModal] = useState(false);

  function inferType(url) {
    if (!url) return "glb";
    if (url.includes("sketchfab.com/models") || url.includes("sketchfab.com/3d-models")) return "sketchfab";
    if (url.match(/\.glb(\?|$)/i) || url.match(/\.gltf(\?|$)/i)) return "glb";
    return "glb";
  }

  function buildSketchfabEmbed(url) {
    if (!url) return "";
    try {
      const u = new URL(url);
      if (u.pathname.includes("/embed")) return url;
      const modelsMatch = u.pathname.match(/\/models\/([^/]+)/);
      if (modelsMatch) {
        const modelIdOrSlug = modelsMatch[1];
        const lastToken = modelIdOrSlug.split("-").pop();
        return `https://sketchfab.com/models/${lastToken}/embed`;
      }
      const threeMatch = u.pathname.match(/\/3d-models\/([^/]+)/);
      if (threeMatch) {
        const slug = threeMatch[1];
        const lastToken = slug.split("-").pop();
        return `https://sketchfab.com/models/${lastToken}/embed`;
      }
    } catch (e) {
      if (url.includes("sketchfab.com/models") && !url.includes("/embed")) {
        return url.replace(/(\/models\/[^/]+)\/?$/, "$1/embed");
      }
      if (url.includes("sketchfab.com/3d-models") && !url.includes("/embed")) {
        const last = url.split("/").pop().split("-").pop();
        return `https://sketchfab.com/models/${last}/embed`;
      }
    }
    return url;
  }

  function handleStadiumClick(stadium) {
    const original = stadium.modelSrc ? stadium.modelSrc : localDefault;
    const type = inferType(original);
    const finalSrc = type === "sketchfab" ? buildSketchfabEmbed(original) : original;
    setCurrentModel({ src: finalSrc, originalSrc: original, type });
    setShowModal(true);
  }

  // Prevent background scroll while modal open
  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  // Restore on escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setShowModal(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // MOBILE: Fix for background painting bug (black gap on scroll)
  useEffect(() => {
    // Only apply on mobile-size viewports
    const mobileQuery = window.matchMedia("(max-width: 900px)");
    if (!mobileQuery.matches) return;

    // Save previous inline styles so we can restore them
    const prev = {
      attachment: document.body.style.backgroundAttachment || "",
      size: document.body.style.backgroundSize || "",
      repeat: document.body.style.backgroundRepeat || "",
      position: document.body.style.backgroundPosition || ""
    };

    // Apply safer mobile-friendly background settings while this page is active
    // This avoids the black gap issue on mobile when large backgrounds use fixed/complex attachments.
    document.body.style.backgroundAttachment = "scroll";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    // keep the existing position if present; otherwise set a sensible default
    document.body.style.backgroundPosition = document.body.style.backgroundPosition || "center top";

    return () => {
      // restore previous values exactly
      document.body.style.backgroundAttachment = prev.attachment;
      document.body.style.backgroundSize = prev.size;
      document.body.style.backgroundRepeat = prev.repeat;
      document.body.style.backgroundPosition = prev.position;
    };
  }, []); // run once on mount

  function toggleRotate() {
    const el = viewerRef.current;
    if (!el) return;
    if (autoRotate) {
      el.removeAttribute("auto-rotate");
      setAutoRotate(false);
    } else {
      el.setAttribute("auto-rotate", "");
      setAutoRotate(true);
    }
  }

  function resetView() {
    const el = viewerRef.current;
    if (!el) return;
    try {
      el.setAttribute("camera-orbit", "0deg 75deg 2.5m");
      el.setAttribute("camera-target", "0m 0m 0m");
      el.reveal?.();
    } catch (e) {
      const src = el.getAttribute("src");
      el.removeAttribute("src");
      setTimeout(() => el.setAttribute("src", src), 20);
    }
  }

  return (
    <section className="whats-new-crystal">
      <div className="crystal-header">
        <h1 className="crystal-title">THE ARENA</h1>
        <p className="crystal-sub">Explore the new sports stadiums — tap any card to preview the 3D model</p>
      </div>

      <div className="crystal-grid">
        {stadiums.map((s, idx) => {
          const original = s.modelSrc ? s.modelSrc : localDefault;
          const selected = currentModel.originalSrc === original;
          return (
            <button
              key={idx}
              className={`crystal-card ${selected ? "active" : ""}`}
              onClick={() => handleStadiumClick(s)}
              aria-pressed={selected}
            >
              <div className="card-left">
                <div className="card-icon">{s.icon}</div>
                <div className="card-text">
                  <div className="card-title">{s.name}</div>
                  <div className="card-desc">{s.desc}</div>
                </div>
              </div>

              <div className="card-right">
                <div className="view-chip">View 3D</div>
              </div>
            </button>
          );
        })}
      </div>

      {showModal && (
        <div className="crystal-modal-backdrop" role="dialog" aria-modal="true" onMouseDown={() => setShowModal(false)}>
          <div className="crystal-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="crystal-modal-header" style={{ paddingTop: "env(safe-area-inset-top, 12px)" }}>
              <button className="crystal-close" onClick={() => setShowModal(false)} aria-label="Close">✕</button>
              <div className="crystal-controls">
                {currentModel.type === "glb" && (
                  <>
                    <button className={`control-btn ${autoRotate ? "active" : ""}`} onClick={toggleRotate}>
                      {autoRotate ? "Stop Rotation" : "Auto Rotate"}
                    </button>
                    <button className="control-btn" onClick={resetView}>Reset View</button>
                  </>
                )}
              </div>
            </div>

            <div className="crystal-model-frame">
              {currentModel.type === "glb" && (
                <model-viewer
                  ref={viewerRef}
                  key={currentModel.src}
                  src={currentModel.src}
                  alt={currentModel.originalSrc}
                  camera-controls
                  auto-rotate={autoRotate ? "" : undefined}
                  exposure="1"
                  style={{ width: "100%", height: "100%", display: "block", background: "#000" }}
                />
              )}
              {currentModel.type === "sketchfab" && (
                <iframe
                  title="Sketchfab Embed"
                  key={currentModel.src}
                  src={currentModel.src}
                  frameBorder="0"
                  allowFullScreen
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}