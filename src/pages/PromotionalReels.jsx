import React, { useEffect } from "react";
import PageContainer from "../components/PageContainer";
import ScrollReveal from "../components/ScrollReveal";
import behindImg from "../assets/behind.png";
import "./PromotionalReels.css";

export default function PromotionalReels() {
  const reels = [
    {
      id: 1,
      permalink: "https://www.instagram.com/p/DUZ8pwMAHE3/",
      title: "Sports Fest 2026 Teaser",
    },
    {
      id: 2,
      permalink: "https://www.instagram.com/p/DUZ8pwMAHE3/",
      title: "Behind the Scenes Prep",
    },
    {
      id: 3,
      permalink: "https://www.instagram.com/p/DUZ8pwMAHE3/",
      title: "Athletes in Action",
    },
  ];

  useEffect(() => {
    const scriptSrc = "https://www.instagram.com/embed.js";
    const runProcess = () => {
      try {
        if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === "function") {
          window.instgrm.Embeds.process();
        }
      } catch (e) {
        // ignore
      }
    };

    const existing = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existing) {
      runProcess();
      return;
    }

    const s = document.createElement("script");
    s.src = scriptSrc;
    s.async = true;
    s.onload = runProcess;
    document.body.appendChild(s);
  }, []);

  return (
    <PageContainer>
      <div className="promotional-reels-page">
        <div className="page-bg" aria-hidden="true">
          <img src={behindImg} alt="" />
        </div>

        <section className="content-page">
          <header>
            <ScrollReveal>
              <h2>Promotional Reels</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="page-subtitle">
                Discover the excitement of Sports Fest 2026 through our curated promotional videos. 
                World One School brings you the ultimate celebration of sportsmanship, teamwork, and school spirit!
              </p>
            </ScrollReveal>
          </header>

          <section className="reels-section">
            <ScrollReveal>
              <h3>Featured Reels</h3>
            </ScrollReveal>

            <div className="reels-grid">
              {reels.map((reel, i) => (
                <ScrollReveal key={reel.id} delay={i * 0.1}>
                  <article className="reel-card">
                    <div className="reel-media">
                      <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={reel.permalink}
                        data-instgrm-version="14"
                        style={{ margin: "0" }}
                      >
                        <a href={reel.permalink}>{reel.title}</a>
                      </blockquote>
                    </div>
                    <div className="reel-body">
                      <h4>{reel.title}</h4>
                      <p>Experience the thrill of Sports Fest 2026 at World One School.</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </section>


        </section>
      </div>
    </PageContainer>
  );
}
