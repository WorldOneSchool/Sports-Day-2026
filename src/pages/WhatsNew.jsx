import React, { useRef, useState, useEffect } from "react";
import "./WhatsNew.css";

/**
 * Minimal change: stadium list entries are now buttons.
 * - Clicking a stadium button sets the model shown on the right.
 * - Keeps all text/content the same as before.
 *
 * To add your Sketchfab embed link for a sport, put the embed URL (or page URL — the helper will convert)
 * into the `modelSrc` field for that stadium below.
 *
 * Default model remains the local GLB: public/football x running track.glb
 */

export default function WhatsNew() {
  const viewerRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const localDefault = encodeURI("/football x running track.glb");

  // Stadiums (content preserved). Add a `modelSrc` field per item if you want it to load a specific model.
  const stadiums = [
    {
      icon: "🏟️",
      name: "Athletic Track+Football Field",
      desc: "Olympic-sized track with professional specifications",
      modelSrc: "https://sketchfab.com/models/48ad64060bb447b2bdab56f39ea2edb0/embed"
    },
    {
      icon: "🏀",
      name: "Basketball Court",
      desc: "Professional-grade court with indoor climate control",
      modelSrc: "https://sketchfab.com/models/4fa7536d9cee4f658265632c8c235f5e/embed"
    },
    {
      icon: "🎾",
      name: "Tennis Court",
      desc: "6 world-class courts with synthetic surface",
      modelSrc: "https://sketchfab.com/models/78b31d29707f4720b4be6b80cb3f61b5/embed"
    },
    {
      icon: "🏐",
      name: "Padel Court",
      desc: "Modern padel courts with premium glass walls",
      modelSrc: "https://sketchfab.com/models/4f379e05661a46dd960424728016ebeb/embed"
    },
        {
      icon: "🏐",
      name: "Volleyball Court",
      desc: "Multi-sport volleyball facility with spectator seating",
      modelSrc: "https://sketchfab.com/models/a140d54dc14c4963b1418fbde314aac7/embed"
    },
    {
      icon: "🏸",
      name: "Pickleball",
      desc: "Dedicated courts for recreational & competitive play",
      modelSrc: "https://sketchfab.com/models/7c3159ca797d4608af53fd42d056035d/embed"
    },
    {
      icon: "⚽",
      name: "Futsal Court",
      desc: "Multi-purpose futsal facility with sprung flooring",
      // example: put the embed url here (or the page URL; helper converts it)
      modelSrc: "https://sketchfab.com/models/2ec1e68039d2409b80617e718513492e/embed"
    },
    {
      icon: "🏃",
      name: "Long jump track",
      desc: "Professional long jump runway with sandpit",
      // example: put the embed url here (or the page URL; helper converts it)
      modelSrc: "https://sketchfab.com/models/aaa8c191171b48d087c6a7bf26af13f1/embed"
    }
  ];

  // currently displayed model (src + type)
  const [currentModel, setCurrentModel] = useState({
    src: localDefault,
    type: "glb"
  });

  // NEW: Track if fullscreen modal is open (mobile only)
  const [showFullscreen, setShowFullscreen] = useState(false);

  // NEW: Detect mobile (simple check)
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // determine model type (glb or sketchfab)
  function inferType(url) {
    if (!url) return "glb";
    if (url.includes("sketchfab.com/models") || url.includes("sketchfab.com/3d-models")) return "sketchfab";
    if (url.match(/\.glb(\?|$)/i) || url.match(/\.gltf(\?|$)/i)) return "glb";
    return "glb";
  }

  // safely build an embed url for Sketchfab page links
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
      // fallback string parsing
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

  // NEW: When stadium is clicked, open fullscreen on mobile
  function handleStadiumClick(stadium) {
    const src = stadium.modelSrc ? stadium.modelSrc : localDefault;
    const type = inferType(src);
    const finalSrc = type === "sketchfab" ? buildSketchfabEmbed(src) : src;
    setCurrentModel({ src: finalSrc, type });
    if (isMobile) setShowFullscreen(true); // open modal on mobile
  }

  // NEW: Prevent background scroll when modal open (mobile)
  useEffect(() => {
    if (showFullscreen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showFullscreen, isMobile]);

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
    <section className="whats-new-page">
      <div className="whats-new-wrapper">
        <aside className="whats-left">
          <div className="banner-section">
            <h1 className="arena-title">THE ARENA</h1>
          </div>

          <div className="info-cards-grid">
            <div className="info-card premium">
              <div className="card-icon">👥</div>
              <div className="card-content">
                <p className="card-label">Capacity</p>
                <p className="card-value">2,500 Seats</p>
              </div>
            </div>
          </div>

          <div className="stadiums-section">
            <h3 className="section-title">NEW SPORTS STADIUMS</h3>

            <div className="stadium-list">
              {stadiums.map((s, idx) => (
                <button
                  key={idx}
                  className={`stadium-item ${currentModel.src === (s.modelSrc || localDefault) ? "selected" : ""}`}
                  onClick={() => handleStadiumClick(s)}
                  aria-pressed={currentModel.src === (s.modelSrc || localDefault)}
                >
                  <div className="stadium-header">
                    <span className="stadium-icon">{s.icon}</span>
                    <span className="stadium-name">{s.name}</span>
                  </div>
                  <p className="stadium-desc">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="whats-right">
          <div className="model-showcase">
            {/* DESKTOP/NON-MOBILE: Show inline */}
            {!isMobile && (
              <div className="model-frame">
                {currentModel.type === "glb" && (
                  <model-viewer
                    ref={viewerRef}
                    key={currentModel.src}
                    src={currentModel.src}
                    alt="3D model"
                    camera-controls
                    auto-rotate={autoRotate ? "" : undefined}
                    exposure="1"
                    style={{ width: "100%", height: "100%", display: "block" }}
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
                <div className="model-overlay"></div>
                <div className="badge-360">
                  <span className="rotate-icon">↻</span> 360°
                </div>
                <div className="model-controls" style={{ zIndex: 12 }}>
                  {currentModel.type === "glb" && (
                    <>
                      <button className={`control-btn ${autoRotate ? "active" : ""}`} onClick={toggleRotate}>
                        {autoRotate ? "Stop Rotation" : "Auto Rotate"}
                      </button>
                      <button className="control-btn" onClick={resetView}>
                        Reset View
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* MOBILE: Fullscreen modal */}
            {isMobile && showFullscreen && (
              <div className="mobile-model-modal">
                <button className="close-modal-btn" onClick={() => setShowFullscreen(false)}>✕</button>
                <div className="mobile-model-frame">
                  {currentModel.type === "glb" && (
                    <model-viewer
                      ref={viewerRef}
                      key={currentModel.src}
                      src={currentModel.src}
                      alt="3D model"
                      camera-controls
                      auto-rotate={autoRotate ? "" : undefined}
                      exposure="1"
                      style={{ width: "100vw", height: "100vh", display: "block", background: "#111" }}
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
                      style={{ width: "100vw", height: "100vh", background: "#111" }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}