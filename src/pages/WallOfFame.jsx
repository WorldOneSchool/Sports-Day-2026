import React from "react";
import PageContainer from "../components/PageContainer";
import sportsBg from "../assets/sports.png";
import ScrollReveal from "../components/ScrollReveal";
import wallOfFame from "../data/wallOfFame";
import "./WallOfFame.css"; // added

export default function WallOfFame() {
  return (
    <PageContainer>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${sportsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          filter: "blur(8px)",
        }}
      />

      <section className="content-page wall-of-fame"> {/* added 'wall-of-fame' */}
        <header>
          <ScrollReveal>
            <h2 style ={{ color: "#000" }}>Hall of Fame</h2>
          </ScrollReveal>
        </header>


        <div className="grid">
          {wallOfFame.map((entry, idx) => (
            <ScrollReveal key={entry.name} delay={idx * 0.06}>
              <article className="card">
                <div className="card-body">
                  <strong className="card-name">{entry.name}</strong>
                  <div className="card-achievement">{entry.achievement}</div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}