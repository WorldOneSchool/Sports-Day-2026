import React, { useState } from "react";
import PageContainer from "../components/PageContainer";
import ScrollReveal from "../components/ScrollReveal";
import ProfileModal from "../components/ProfileModal";
import FlipbookModal from "../components/FlipbookModal";
import aboutImg from "../assets/about.png";
import "./About.css";

export default function About() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedFlipbook, setSelectedFlipbook] = useState(null);

  // helper to load images placed in src/assets/people/
  const peopleImgs = require.context("../assets/people", false, /\.(png|jpe?g|svg)$/);
  const getImg = (name) => {
    try {
      return peopleImgs(`./${name}`);
    } catch (e) {
      return null; // image missing — falls back to empty src
    }
  };

  const profiles = [
    { title: "Chairman", name: "Dr.Lavu Rathaiah Garu", img: "dr-lavu.jpg" },
    { title: "Vice-Chairperson", name: "Mrs.L.Rani Rudrama Dev", img: "mrs-rani.jpg" },
    { title: "Executive Director", name: "Dr.A.Sandeep Kranthi kiran", img: "dr-sandeep.jpg" },
    { title: "Principal", name: "Smt.S.Vandana", img: "smt-vandana.jpg" },
    { title: "Vice-Principal", name: "Ms.Ramya ", img: "ms-ramya.jpg" },
  ];

  const pdfs = [
    {
      name: "School Magazine — Issue 1 (Flipbook preview)",
      url: "https://heyzine.com/flip-book/f73db49303.html"
    },
    {
      name: "School Magazine — Issue 2 (Flipbook preview)",
      url: "https://heyzine.com/flip-book/f73db49303.html"
    }
  ];

  return (
    <PageContainer>
      <div className="about-page">
        <div className="page-bg" aria-hidden="true">
          <img src={aboutImg} alt="" />
        </div>

        <section className="content-page">
          <header>
            <ScrollReveal>
              <h2>About Our School</h2>
            </ScrollReveal>
          </header>

          {/* Management team grid with images */}
          <section className="team-section">
            <ScrollReveal>
              <h3>Our management team</h3>
            </ScrollReveal>

            <div className="team-grid">
              {profiles.map((p, i) => (
                <ScrollReveal key={p.title} delay={i * 0.06}>
                  <article className="team-card">
                    <div className="card-media">
                      <img src={getImg(p.img) || ""} alt={p.name} />
                      <div className="card-overlay" aria-hidden="true" />
                    </div>

                    <div className="card-body">
                      <div className="card-name">{p.name}</div>
                      <div className="card-role">{p.title}</div>
                      <button
                        className="btn-bio"
                        onClick={() =>
                          setSelectedProfile({
                            ...p,
                            imgSrc: getImg(p.img) || "",
                          })
                        }
                      >
                        Bio
                      </button>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </section>


          <div className="pdf-list">
            {pdfs.map((pdf, i) => (
              <ScrollReveal key={pdf.name} delay={0.12 + i * 0.06}>
                <div
                  className="pdf-placeholder"
                  role="button"
                  tabIndex={0}
                  onClick={() => pdf.url && setSelectedFlipbook(pdf)}
                  onKeyDown={(e) => {
                    if (pdf.url && (e.key === "Enter" || e.key === " ")) setSelectedFlipbook(pdf);
                  }}
                  aria-label={pdf.name + (pdf.url ? " — open preview" : "")}
                >
                  {pdf.url ? (
                    <div className="pdf-preview">
                      <iframe
                        src={pdf.url}
                        title={pdf.name}
                        className="pdf-thumb"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        loading="lazy"
                        aria-hidden="true"
                      />
                      <div className="pdf-play-overlay" aria-hidden="true">
                        <span className="pdf-play-icon">▶</span>
                      </div>
                    </div>
                  ) : null}

                  <div className="pdf-text">{pdf.name}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <ProfileModal
          open={!!selectedProfile}
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />

        <FlipbookModal
          open={!!selectedFlipbook}
          pdf={selectedFlipbook}
          onClose={() => setSelectedFlipbook(null)}
        />
      </div>
    </PageContainer>
  );
}