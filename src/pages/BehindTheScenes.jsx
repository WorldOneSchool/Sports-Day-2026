import React from "react";
import PageContainer from "../components/PageContainer";
import ScrollReveal from "../components/ScrollReveal";
import behindImg from "../assets/behind.png";
import photo1 from "../assets/Behind/GOPR3944.jpg";
import photo2 from "../assets/Behind/GOPR3945.jpg";
import photo3 from "../assets/Behind/GOPR3985.jpg";
import photo4 from "../assets/Behind/GOPR3986.jpg";
import photo5 from "../assets/Behind/GOPR3988.jpg";
import photo6 from "../assets/Behind/GOPR3989.jpg";
import photo7 from "../assets/Behind/GOPR3992.jpg";
import photo8 from "../assets/Behind/GOPR3994.jpg";
import photo9 from "../assets/Behind/GOPR3995.jpg";
import photo10 from "../assets/Behind/GOPR3998.jpg";
import photo11 from "../assets/Behind/GOPR4000.jpg";
import photo12 from "../assets/Behind/GOPR4003.jpg";

export default function BehindTheScenes() {
  const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12];

  return (
    <PageContainer>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${behindImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />

      <section className="behind-scenes-page">
        <ScrollReveal>
          <header className="behind-scenes-header" >
            <h1 style={{ color: "#fff" }}>Behind the Scenes</h1>
          </header>
        </ScrollReveal>
      </section>
      <div style={{ color: "var(--text)", fontSize: "1.05rem", lineHeight: "1.8", letterSpacing: "-0.01em", fontWeight: 700, margin: 0, padding: 0 }}>
        <p style={{ margin: 0, padding: 0 }}>The success of our Sports Day was the result of careful planning and dedicated effort carried out behind the scenes by the school. To ensure a high standard of performance, the school hired professional trainers who worked closely with students to improve discipline, coordination, and confidence.</p>
        <br />
        <p style={{ margin: 0, padding: 0 }}>Our Physical Training teachers played a key role by designing well-structured formations that added precision and visual appeal to every performance. The school also provided all necessary props in advance, allowing students to practice effectively and perform without difficulty on the final day.</p>
        <br />
        <p style={{ margin: 0, padding: 0 }}>Regular practice sessions were conducted daily from 8:00 a.m. to 10:30 a.m., reflecting the strong commitment shown by both students and teachers. In addition, students selected as finalists received extra practice sessions to prepare for the Vignan Tournament, helping them represent the school with skill and confidence.</p>
        <br />
        <p style={{ margin: 0, padding: 0 }}>As the school proudly stated, “Sports Day is not just about performance on the field, but about the dedication, discipline, and teamwork developed through continuous practice and guided training.”</p>
      </div>
        <ScrollReveal delay={0.2}>
          <div className="video-grid" style={{ marginTop: "40px" }}>
            {photos.map((photo, i) => (
              <div key={i} className="video-card">
                <div className="video-thumbnail">
                  <img 
                    src={photo} 
                    alt={`Behind the scenes photo ${i + 1}`} 
                    style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "8px", display: "block" }} 
                  />
                </div>
                <div className="video-info">
                  <h4>Photo {i + 1}</h4>
                  <p>Behind the scenes moment</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
    </PageContainer>
  );
}
