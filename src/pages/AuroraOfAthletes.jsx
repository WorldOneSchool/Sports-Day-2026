import React from "react";
import PageContainer from "../components/PageContainer";
import ScrollReveal from "../components/ScrollReveal";
import "./AuroraOfAthletes.css";

export default function AuroraOfAthletes() {
  return (
    <PageContainer>
      <div className="aurora-bg" aria-hidden="true" />

      <div className="aurora-orbs" aria-hidden="true">
        <span className="orb o1" />
        <span className="orb o2" />
        <span className="orb o3" />
        <span className="orb o4" />
      </div>

      <article className="content-page aurora-content">
        <header>
          <ScrollReveal>
            <h2>Aurora of Athletes</h2>
          </ScrollReveal>
        </header>

        <section>
          <ScrollReveal delay={0.06}>
            <p>
              "Aurora of Athletes" celebrates the dazzling spirit of our sports
              community — a luminous festival where every competitor shines like
              a star. We created this theme to capture movement, light, and the
              electric energy of competition: fast, colorful, and full of
              momentum.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <p>
              This day honors the athlete in everyone: the sprinter who chases
              the wind, the team player who moves as one, the quiet contender
              who trains in the long evenings. Through playful challenges and
              shared triumphs, we build resilience, courage, and a sense of
              belonging that lasts beyond the finish line.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.22}>
            <p>
              Design-wise, the Aurora theme blends sweeping gradients, soft
              glows, and kinetic shapes to create a feeling of motion and
              celebration. Animated orbs and ribbons echo the arc of a throw,
              the curve of a sprint, and the flash of victory. Let this page
              remind us that sport is art in motion — wild, joyous, and
              beautifully human.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.30}>
            <p>
              Join us beneath the aurora: cheer loudly, play fairly, and carry
              the light of today into every tomorrow.
            </p>
          </ScrollReveal>
        </section>
      </article>
    </PageContainer>
  );
}
