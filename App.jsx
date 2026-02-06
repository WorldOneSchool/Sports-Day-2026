/* Single-file React app (JSX compiled with Babel in browser).
   No build step required. */

const { useState, useEffect, useRef } = React;

/* Utility: Intersection observer hook for reveal on scroll */
function useReveal(refSelector, options = {}) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(refSelector));
    if (!nodes.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12, ...options });
    nodes.forEach(n => obs.observe(n));
    return () => obs.disconnect();
  }, [refSelector, JSON.stringify(options)]);
}

/* Nav with scrollspy */
function Nav({ sections }) {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const onScroll = () => {
      const offsets = sections.map(s => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Infinity };
        return { id: s.id, top: Math.abs(el.getBoundingClientRect().top - 80) };
      });
      offsets.sort((a,b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="brand">World One School</div>
        <nav className="nav-links">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''}>
              {s.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* Hero */
function Hero() {
  return (
    <section className="hero" id="home" aria-label="Home">
      <div className="hero-content">
        <h1 className="h-title">Welcome to World One School's<br/>Sports Fest 2026</h1>
        <div className="subtitle">[Subtitle Placeholder - No Content Provided]</div>
      </div>
    </section>
  );
}

/* Why Sports Day section */
function Why() {
  return (
    <section id="why" className="container">
      <h2 className="section-title">Why We Celebrate Sports Day</h2>
      <span className="underline" />
      <div className="info">
        <div className="item reveal">
          <h3>Physical Fitness</h3>
          <p>Sports Day promotes physical fitness and encourages students to maintain an active lifestyle. Regular participation in sports activities helps build strength, endurance, and overall physical health.</p>
        </div>

        <div className="item reveal">
          <h3>Discipline</h3>
          <p>Through sports, students learn the importance of discipline, time management, and commitment. Training schedules and team practices instill a sense of responsibility and dedication.</p>
        </div>

        <div className="item reveal">
          <h3>Teamwork & Confidence</h3>
          <p>Competitions and team events build cooperation skills, empathy, and self-belief in students — helping them grow beyond the classroom in both social and emotional intelligence.</p>
        </div>
      </div>
    </section>
  );
}

/* Wall of Fame grid */
function Wall() {
  // sample placeholder data
  const entries = new Array(6).fill(0).map((_,i) => ({
    name: 'Student Name',
    title: 'Achievement Title',
    id: i+1
  }));

  return (
    <section id="wall" className="container">
      <h2 className="section-title">Wall of Fame</h2>
      <span className="underline" />
      <p style={{textAlign:'center', color:'var(--muted)'}}>Sample / Placeholder Data</p>

      <div className="grid" style={{marginTop:30}}>
        {entries.map(e => (
          <article className="card reveal" key={e.id}>
            <div className="photo">
              {/* svg placeholder */}
              <svg width="160" height="160" viewBox="0 0 200 200" role="img" aria-label="photo placeholder">
                <rect width="100%" height="100%" fill="#0b0b0b" rx="8" />
                <text x="50%" y="50%" fill="#1e2b2a" fontSize="12" fontFamily="Roboto" textAnchor="middle" dy="4">Photo Placeholder</text>
              </svg>
            </div>
            <h4>{e.name}</h4>
            <p>{e.title}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* What's New stub */
function WhatsNew(){
  return (
    <section id="new" className="container">
      <h2 className="section-title">What's New</h2>
      <span className="underline" />
      <div className="grid">
        <article className="card reveal">
          <div style={{padding:22}}>
            <h4 style={{color:'var(--white)'}}>New Sports Facility</h4>
            <p>We have updated the athletics track and introduced a new all-weather court for multi-sport training sessions.</p>
          </div>
        </article>

        <article className="card reveal">
          <div style={{padding:22}}>
            <h4 style={{color:'var(--white)'}}>Coaching Workshops</h4>
            <p>Specialized coaching clinics were organized to enhance skills and sportsmanship among students across all age groups.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

/* Behind the Scenes - sample gallery */
function Behind(){
  return (
    <section id="behind" className="container">
      <h2 className="section-title">Behind the Scenes</h2>
      <span className="underline" />
      <p style={{textAlign:'center', color:'var(--muted)'}}>Moments and preparations leading to the big day</p>
      <div className="grid">
        {[1,2,3].map(n => (
          <article className="card reveal" key={n}>
            <div className="photo" style={{height:180}}>
              <svg width="140" height="120" viewBox="0 0 200 120"><rect width="100%" height="100%" rx="8" fill="#0b0b0b"/><text x="50%" y="50%" fill="#213332" textAnchor="middle" dy="4">Photo</text></svg>
            </div>
            <h4>Prep {n}</h4>

            
            <p>Short note about what was happening during setup and rehearsals.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* About page: overview + leadership + magazines */
function About(){
  const leaders = [
    {role:'Principal'}, {role:'Vice Principal'}, {role:'Chairman'}, {role:'Executive Director'}
  ];
  const mags = [
    {year:'2025-2026'}, {year:'2024-2025'}, {year:'2023-2024'}
  ];
  return (
    <section id="about" className="container">
      <h2 className="section-title">About Our School</h2>
      <span className="underline" />
      <div className="subtitle" style={{background:'transparent', border:'1px solid rgba(0,193,167,0.06)', width:'100%', padding:28}}>
        [School Overview - Information Not Provided]
      </div>

      <h3 style={{color:'var(--white)', textAlign:'center', marginTop:36}}>School Leadership</h3>
      <div className="lead-grid">
        {leaders.map((l,i) => (
          <div className="lead reveal" key={i}>
            <div className="avatar">Photo</div>
            <h4 style={{color:'var(--white)', margin:'12px 0 4px', fontFamily:'Orbitron'}}> {l.role} </h4>
            <div style={{fontSize:13, color:'var(--muted)'}}>[Name Not Provided]</div>
          </div>
        ))}
      </div>

      <h3 style={{color:'var(--white)', textAlign:'center', marginTop:40}}>School Magazine</h3>
      <div className="grid" style={{marginTop:18}}>
        {mags.map((m,i) => (
          <article className="card mag-card reveal" key={i}>
            <div className="center">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 2h6l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" fill="#0b0b0b" />
                <path d="M13 2v5a1 1 0 0 0 1 1h5" stroke={getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#00c1a7'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="8" y="13" width="8" height="2" rx="1" fill="#00c1a7" opacity="0.08"/>
                <text x="12" y="68" textAnchor="middle" fill="#0e2221" fontSize="12">PDF Placeholder</text>
              </svg>
            </div>
            <div style={{padding:'12px 8px 18px'}}>
              <h4 style={{color:'var(--white)', margin:0}}>School Magazine {m.year}</h4>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* Root App */
function App(){
  const sections = [
    {id:'home', title:'Home'},
    {id:'why', title:'Why Sports Day'},
    {id:'wall', title:'Wall of Fame'},
    {id:'new', title:"What's New"},
    {id:'behind', title:'Behind the Scenes'},
    {id:'about', title:'About Our School'}
  ];

  // reveal hook for '.reveal' elements
  useReveal('.reveal');

  // slight entrance animation for nav brand
  useEffect(() => {
    document.querySelectorAll('.reveal').forEach((el,i) => {
      el.style.transitionDelay = `${i*60}ms`;
    });
  }, []);

  return (
    <>
      <Nav sections={sections} />
      <main>
        <Hero />
        <Why />
        <Wall />
        <WhatsNew />
        <Behind />
        <About />
      </main>
      <div className="footer-spacer" />
    </>
  );
}

/* Render */
ReactDOM.createRoot(document.getElementById('root')).render(<App />);