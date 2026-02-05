import React, { useEffect, useState, useRef } from 'react';
import './home.css';

function Home() {
  const [showCard, setShowCard] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const sectionRef = useRef(null);

  const images = [
    "src/assets/pose1.png",
    "src/assets/pose2.png", 
    "src/assets/pose3.png"
  ];

  // Estatísticas para animar
  const stats = [
    { number: 4, label: "Anos de Experiência", suffix: "+" },
    { number: 200, label: "Clientes Atendidos", suffix: "+" },
    { number: 100, label: "Transformações", suffix: "%" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setShowCard(true);
          setTimeout(() => setShowStats(true), 800);
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Componente para animar números
  const AnimatedNumber = ({ target, suffix = "", duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!showStats) return;
      
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [showStats, target, duration]);

    return <>{count}{suffix}</>;
  };

  return (
    <section className="home-section" ref={sectionRef}>
      <div className="home-container">
        
        {/* Lado Esquerdo: Carrossel */}
        <div className="photo-wrapper">
          {images.map((img, index) => (
            <img 
              key={index}
              src={img} 
              className={`home-photo ${index === currentImage ? 'active' : ''}`}
              alt="Igor Arcanjo"
            />
          ))}
          
        </div>

        {/* Lado Direito: Card Fixo */}
        <div className={`about-card ${showCard ? 'show' : ''}`}>
          <h2 className="about-card-title">SOBRE MIM</h2>
          <div className="about-card-content">
            <h3 className="about-card-subtitle">Performance & Resultados</h3>
            <p className="about-card-text">
              Olá! Meu nome é Igor Rodrigues. Sou formado em Administração e Educação Física, unindo gestão estratégica e conhecimento técnico para o seu treino.
            </p>
            <p className="about-card-text">
              Minha missão é oferecer transformações internas e externas, ajudando você a conquistar seus objetivos com equilíbrio e motivação diária.
            </p>

            {/* Estatísticas Animadas */}
            <div className="stats-container">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`stat-item ${showStats ? 'show' : ''}`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  <div className="stat-number">
                    <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Home;