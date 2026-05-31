import React, { useState, useEffect } from 'react'
import splashLogo from './assets/splash.png'
import iconLogo from './assets/icon.png'
import { C, SPACE_NAMES } from './constants'

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('splash')
  const [selected, setSelected] = useState('')
  const [custom, setCustom] = useState('')
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setPhase('pick'), 3000)
    return () => clearTimeout(t)
  }, [])

  function finish() {
    const name = custom.trim() || selected
    if (!name) return
    setFading(true)
    setTimeout(() => onComplete(name), 500)
  }

  if (phase === 'splash') {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: '#080604', zIndex: 10000,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 0.6s', opacity: fading ? 0 : 1,
      }}>
        {/* Stars */}
        <div className="shimmer" style={{ position: 'absolute', top: '15%', left: '20%', fontSize: 10, color: '#c8922a' }}>✦</div>
        <div className="shimmer" style={{ position: 'absolute', top: '25%', right: '18%', fontSize: 8, color: '#c8922a', animationDelay: '0.7s' }}>✦</div>
        <div className="shimmer" style={{ position: 'absolute', bottom: '25%', left: '12%', fontSize: 12, color: '#c8922a', animationDelay: '1.2s' }}>✦</div>
        <div className="shimmer" style={{ position: 'absolute', bottom: '30%', right: '10%', fontSize: 7, color: '#c8922a', animationDelay: '0.4s' }}>✦</div>
        <div className="shimmer" style={{ position: 'absolute', top: '40%', right: '25%', fontSize: 9, color: '#c8922a', animationDelay: '1.8s' }}>✦</div>

        <div className="bob" style={{ textAlign: 'center' }}>
          <img
            src={splashLogo}
            alt="Rooted"
            style={{ width: 300, height: 'auto', maxWidth: '82vw' }}
          />
        </div>
        <div className="fade-up" style={{
          fontSize: 11, color: '#8a7d5a',
          letterSpacing: '3px', textTransform: 'uppercase', marginTop: 16,
        }}>
          A home for your plants
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#080604', zIndex: 10000,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.5s', opacity: fading ? 0 : 1,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      padding: '1.5rem',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img
            src={iconLogo}
            alt="Rooted"
            style={{ width: 68, height: 68, borderRadius: 16, marginBottom: 14 }}
          />
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 24, fontWeight: 700, color: C.text,
          }}>Name your space</div>
          <div style={{ fontSize: 14, color: C.textMuted, marginTop: 8, lineHeight: 1.6 }}>
            What do you want to call your plant collection?
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          {SPACE_NAMES.map(name => {
            const active = selected === name && !custom
            return (
              <button
                key={name}
                onClick={() => { setSelected(name); setCustom('') }}
                style={{
                  padding: '12px 10px', borderRadius: 14, cursor: 'pointer',
                  border: `1.5px solid ${active ? C.accent : C.border}`,
                  background: active ? C.bgSubtle : C.bgCard,
                  color: active ? C.accent : C.textMuted,
                  fontSize: 14, fontWeight: active ? 700 : 400, textAlign: 'center',
                  transition: 'all 0.15s',
                }}
              >{name}</button>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', fontSize: 11, color: C.textFaint, marginBottom: 10 }}>
          — or name it yourself —
        </div>

        <input
          style={{
            width: '100%', padding: '12px 16px', borderRadius: 14,
            border: `1.5px solid ${custom ? C.accent : C.border}`,
            background: C.bgInput, color: C.text, fontSize: 15,
            boxSizing: 'border-box', marginBottom: 16, outline: 'none',
          }}
          placeholder="The Lair, Death Garden, The Crypt..."
          value={custom}
          onChange={e => { setCustom(e.target.value); if (e.target.value) setSelected('') }}
          onKeyDown={e => { if (e.key === 'Enter') finish() }}
        />

        <button
          onClick={finish}
          disabled={!selected && !custom.trim()}
          style={{
            width: '100%', padding: '14px', borderRadius: 14, border: 'none',
            background: (selected || custom.trim()) ? C.accent : '#1e1c14',
            color: (selected || custom.trim()) ? C.accentText : C.textFaint,
            fontSize: 16, fontWeight: 700, cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Enter {custom.trim() || selected || 'your space'} →
        </button>

        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: C.textFaint }}>
          You can rename this anytime in the Potting Shed
        </div>
      </div>
    </div>
  )
}
