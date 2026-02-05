import React, { useEffect, useState } from 'react';
import './igor.css';

function Igor() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    // Rola para a próxima seção 
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Efeito de fade out e escala enquanto o usuário rola
  const textOpacity = Math.max(0, 1 - (scrollPosition / 500));
  const textScale = Math.max(0.8, 1 - (scrollPosition / 1000));

  return (
    <div className="container hero-fixed" style={{ opacity: textOpacity, transform: `scale(${textScale})` }}>
      <svg width="100%" height="200" viewBox="0 0 1200 200"> 
        <text 
          x="50%" 
          y="50%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          className="texto-escrito"
        >
          IGOR ARCANJO
        </text>
      </svg>

      <div className="subtitulo">
        Personal Trainer
      </div>

      <div className="scroll-indicator" onClick={scrollToContent}>
        <div className="scroll-indicator-text">Role para baixo</div>
      </div>
    </div>
  );
}

export default Igor;