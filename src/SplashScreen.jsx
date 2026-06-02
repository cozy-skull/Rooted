import React, { useEffect, useState } from 'react'
import splashImg from './assets/splash.png'

// duration: ms to show splash before calling onDone
export default function SplashScreen({ duration = 1000, onDone }) {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const fadeStart = duration - 500
    const fadeTimer = setTimeout(() => setOpacity(0), fadeStart)
    const doneTimer = setTimeout(onDone, duration)
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [duration, onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#080604', zIndex: 10000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.5s ease',
      opacity,
    }}>
      {/* Shimmer stars */}
      <div className="shimmer" style={{ position: 'absolute', top: '12%', left: '18%', fontSize: 10, color: '#c8922a' }}>✦</div>
      <div className="shimmer" style={{ position: 'absolute', top: '20%', right: '16%', fontSize: 8, color: '#c8922a', animationDelay: '0.7s' }}>✦</div>
      <div className="shimmer" style={{ position: 'absolute', bottom: '22%', left: '10%', fontSize: 12, color: '#c8922a', animationDelay: '1.2s' }}>✦</div>
      <div className="shimmer" style={{ position: 'absolute', bottom: '28%', right: '12%', fontSize: 7, color: '#c8922a', animationDelay: '0.4s' }}>✦</div>

      <div className="bob" style={{ width: '80vw', maxWidth: 320, textAlign: 'center' }}>
        <img
          src={splashImg}
          alt="Rooted"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </div>
  )
}
