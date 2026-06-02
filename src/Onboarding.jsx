import React, { useState, useRef } from 'react'
import splashImg from './assets/splash.png'
import { C, SPACE_NAMES } from './constants'

// ── Ornament divider (matches the welcome screen design) ─────────────────────
function Ornament({ color = '#c8922a', style = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', ...style }}>
      <div style={{ height: 1, width: 40, background: color, opacity: 0.4 }} />
      <span style={{ color, fontSize: 10, opacity: 0.8 }}>✦ ✦</span>
      <div style={{ height: 1, width: 40, background: color, opacity: 0.4 }} />
    </div>
  )
}

// ── Feature slides data ───────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: '🌿',
    title: 'Your Plants, Tracked.',
    body: 'Know exactly what your plants need and when. Water schedules, mood tracking, pest alerts, and AI diagnosis — all in one dark corner of the internet.',
    accent: '#7ec850',
  },
  {
    icon: '🏥',
    title: 'Recovery Mode',
    body: "When one's being dramatic, we don't give up. Photo diagnosis, treatment plans, weekly check-ins, and a full recovery timeline until they're thriving again.",
    accent: '#c8922a',
  },
  {
    icon: '🌑',
    title: 'Rooted in Ritual',
    body: "Watering zones, propagation lab, growth journal, memorial garden. Because plant care isn't a chore — it's a practice.",
    accent: '#7ec850',
  },
]

// ── Welcome Screen ────────────────────────────────────────────────────────────
function WelcomeScreen({ onNext }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#080604', zIndex: 10000,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'space-between', overflowY: 'auto',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      {/* Top illustration — splash image fills upper portion */}
      <div style={{ width: '100%', maxWidth: 480, flex: '0 0 auto' }}>
        <img
          src={splashImg}
          alt="Rooted"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Bottom content */}
      <div style={{
        width: '100%', maxWidth: 400, padding: '0 28px 48px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
        flex: '1 1 auto', justifyContent: 'flex-end',
      }}>
        <Ornament style={{ marginBottom: 20 }} />

        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 26, fontWeight: 700, color: '#e8dfc8',
          textAlign: 'center', marginBottom: 14, lineHeight: 1.2,
        }}>
          Welcome to ROOTED.
        </div>

        <Ornament style={{ marginBottom: 16 }} />

        <div style={{
          fontSize: 15, color: '#a09070', textAlign: 'center',
          lineHeight: 1.8, marginBottom: 28, maxWidth: 300,
        }}>
          For the plants you're keeping alive,{' '}
          the ones you're figuring out,{' '}
          and the ones being dramatic{' '}
          for no reason.
        </div>

        <Ornament style={{ marginBottom: 28 }} />

        {/* LET'S GROW button — matches design exactly */}
        <button
          onClick={onNext}
          style={{
            width: '100%', maxWidth: 320,
            padding: '18px 24px',
            borderRadius: 14, border: '1px solid #3d5a2a',
            background: '#2a3d1a',
            color: '#c8b87a',
            fontSize: 13, fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 12,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#354e20'}
          onMouseLeave={e => e.currentTarget.style.background = '#2a3d1a'}
        >
          LET'S GROW <span style={{ fontSize: 16 }}>→</span>
        </button>

        {/* Bottom botanical ornament */}
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 6, opacity: 0.5 }}>
          <span style={{ fontSize: 12, color: '#4a6a2a' }}>🌿</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div style={{ width: 20, height: 1, background: '#c8922a', opacity: 0.4 }} />
            <span style={{ color: '#c8922a', fontSize: 8 }}>✦</span>
            <div style={{ width: 20, height: 1, background: '#c8922a', opacity: 0.4 }} />
          </div>
          <span style={{ fontSize: 12, color: '#4a6a2a' }}>🌿</span>
        </div>
      </div>
    </div>
  )
}

// ── Features Carousel ─────────────────────────────────────────────────────────
function FeaturesScreen({ onNext }) {
  const [slide, setSlide] = useState(0)
  const touchStart = useRef(null)

  function handleTouchStart(e) { touchStart.current = e.touches[0].clientX }
  function handleTouchEnd(e) {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0 && slide < FEATURES.length - 1) setSlide(s => s + 1)
      if (diff < 0 && slide > 0) setSlide(s => s - 1)
    }
    touchStart.current = null
  }

  const f = FEATURES[slide]
  const isLast = slide === FEATURES.length - 1

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: '#080604', zIndex: 10000,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '40px 28px',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        userSelect: 'none',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        width: '100%', maxWidth: 360,
      }}>
        {/* Icon */}
        <div style={{
          fontSize: 72, marginBottom: 28,
          filter: 'drop-shadow(0 0 24px ' + f.accent + '44)',
          transition: 'all 0.3s',
        }}>
          {f.icon}
        </div>

        {/* Ornament */}
        <Ornament color={f.accent} style={{ marginBottom: 20 }} />

        {/* Title */}
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 28, fontWeight: 700, color: '#e8dfc8',
          textAlign: 'center', marginBottom: 16, lineHeight: 1.2,
        }}>
          {f.title}
        </div>

        {/* Body */}
        <div style={{
          fontSize: 15, color: '#a09070', textAlign: 'center',
          lineHeight: 1.8, maxWidth: 300,
        }}>
          {f.body}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {FEATURES.map((_, i) => (
          <div
            key={i}
            onClick={() => setSlide(i)}
            style={{
              width: i === slide ? 24 : 8, height: 8,
              borderRadius: 4, cursor: 'pointer',
              background: i === slide ? f.accent : '#2a2820',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div style={{ width: '100%', maxWidth: 320, display: 'flex', gap: 10 }}>
        {slide > 0 && (
          <button
            onClick={() => setSlide(s => s - 1)}
            style={{
              flex: 1, padding: '14px', borderRadius: 14,
              border: '1px solid #2a2820', background: 'transparent',
              color: '#8a7d5a', fontSize: 14, cursor: 'pointer',
            }}
          >← Back</button>
        )}
        <button
          onClick={() => isLast ? onNext() : setSlide(s => s + 1)}
          style={{
            flex: 2, padding: '14px', borderRadius: 14,
            border: `1px solid ${f.accent}44`,
            background: isLast ? f.accent : '#1a1e12',
            color: isLast ? '#0d0c09' : f.accent,
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.2s',
            letterSpacing: isLast ? '1px' : 0,
          }}
        >
          {isLast ? 'GET STARTED →' : 'Next →'}
        </button>
      </div>

      {/* Swipe hint */}
      <div style={{ marginTop: 16, fontSize: 11, color: '#3a3628', letterSpacing: '1px' }}>
        swipe to explore
      </div>
    </div>
  )
}

// ── Create Account / Sign In ──────────────────────────────────────────────────
function AccountScreen({ onComplete, onSkip }) {
  const [mode, setMode] = useState('create') // 'create' | 'signin'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameSpace, setNameSpace] = useState('')
  const [customSpace, setCustomSpace] = useState('')
  const [step, setStep] = useState('account') // 'account' | 'space'
  const [error, setError] = useState('')

  function handleAccountNext() {
    if (!email.trim()) { setError('Email is required'); return }
    if (!password.trim() || password.length < 6) { setError('Password must be at least 6 characters'); return }
    setError('')
    setStep('space')
  }

  function handleFinish() {
    const space = customSpace.trim() || nameSpace
    if (!space) { setError('Pick a name for your space'); return }
    onComplete({
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      space,
    })
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: 12,
    border: `1.5px solid #2a2820`, background: '#0f0e0b',
    color: '#e8dfc8', fontSize: 15, boxSizing: 'border-box',
    outline: 'none', fontFamily: "'DM Sans', system-ui, sans-serif",
    marginBottom: 12,
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#080604', zIndex: 10000,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '28px',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      overflowY: 'auto',
    }}>
      <div style={{ width: '100%', maxWidth: 380 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🌿</div>
          <Ornament style={{ marginBottom: 16 }} />
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 24, fontWeight: 700, color: '#e8dfc8', marginBottom: 8,
          }}>
            {step === 'account'
              ? (mode === 'create' ? 'Create your account' : 'Welcome back')
              : 'Name your space'}
          </div>
          <div style={{ fontSize: 13, color: '#8a7d5a', lineHeight: 1.6 }}>
            {step === 'account'
              ? 'Your plants travel with you across devices.'
              : 'What do you want to call your plant collection?'}
          </div>
        </div>

        {step === 'account' && (
          <>
            {/* Mode toggle */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: '#0f0e0b', borderRadius: 12, padding: 4, border: '1px solid #2a2820' }}>
              {['create', 'signin'].map(m => (
                <button key={m} onClick={() => { setMode(m); setError('') }} style={{
                  flex: 1, padding: '10px', borderRadius: 9, border: 'none',
                  background: mode === m ? '#1e1c14' : 'transparent',
                  color: mode === m ? '#c8922a' : '#8a7d5a',
                  fontSize: 13, fontWeight: mode === m ? 700 : 400, cursor: 'pointer',
                  transition: 'all 0.15s',
                }}>
                  {m === 'create' ? 'Create Account' : 'Sign In'}
                </button>
              ))}
            </div>

            {mode === 'create' && (
              <input style={inputStyle} placeholder="Name (optional)" value={name} onChange={e => setName(e.target.value)} />
            )}
            <input style={inputStyle} placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

            {error && <div style={{ color: '#c94f4f', fontSize: 12, marginBottom: 10, textAlign: 'center' }}>{error}</div>}

            <button onClick={handleAccountNext} style={{
              width: '100%', padding: '15px', borderRadius: 12, border: 'none',
              background: '#2a3d1a', color: '#c8b87a',
              fontSize: 14, fontWeight: 700, letterSpacing: '2px',
              textTransform: 'uppercase', cursor: 'pointer', marginBottom: 12,
            }}>
              {mode === 'create' ? 'CONTINUE →' : 'SIGN IN →'}
            </button>

            <button onClick={onSkip} style={{
              width: '100%', padding: '13px', borderRadius: 12,
              border: '1px solid #2a2820', background: 'transparent',
              color: '#5a5040', fontSize: 13, cursor: 'pointer',
            }}>
              Skip for now
            </button>

            <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: '#3a3628', lineHeight: 1.6 }}>
              Your data stays on this device until you create an account.{'\n'}
              Cloud sync coming soon.
            </div>
          </>
        )}

        {step === 'space' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {SPACE_NAMES.map(n => {
                const active = nameSpace === n && !customSpace
                return (
                  <button key={n} onClick={() => { setNameSpace(n); setCustomSpace('') }} style={{
                    padding: '12px 10px', borderRadius: 12, cursor: 'pointer',
                    border: `1.5px solid ${active ? '#7ec850' : '#2a2820'}`,
                    background: active ? '#1a2614' : '#0f0e0b',
                    color: active ? '#7ec850' : '#8a7d5a',
                    fontSize: 13, fontWeight: active ? 700 : 400,
                    transition: 'all 0.15s',
                  }}>{n}</button>
                )
              })}
            </div>

            <div style={{ textAlign: 'center', fontSize: 11, color: '#3a3628', marginBottom: 10 }}>
              — or name it yourself —
            </div>

            <input
              style={{ ...inputStyle, borderColor: customSpace ? '#7ec850' : '#2a2820' }}
              placeholder="The Lair, Death Garden, The Crypt..."
              value={customSpace}
              onChange={e => { setCustomSpace(e.target.value); if (e.target.value) setNameSpace('') }}
            />

            {error && <div style={{ color: '#c94f4f', fontSize: 12, marginBottom: 10, textAlign: 'center' }}>{error}</div>}

            <button onClick={handleFinish} disabled={!nameSpace && !customSpace.trim()} style={{
              width: '100%', padding: '15px', borderRadius: 12, border: 'none',
              background: (nameSpace || customSpace.trim()) ? '#2a3d1a' : '#1a1814',
              color: (nameSpace || customSpace.trim()) ? '#c8b87a' : '#3a3628',
              fontSize: 14, fontWeight: 700, letterSpacing: '2px',
              textTransform: 'uppercase', cursor: 'pointer', marginBottom: 12,
            }}>
              ENTER {(customSpace.trim() || nameSpace || 'YOUR SPACE').toUpperCase()} →
            </button>

            <button onClick={() => setStep('account')} style={{
              width: '100%', padding: '13px', borderRadius: 12,
              border: '1px solid #2a2820', background: 'transparent',
              color: '#5a5040', fontSize: 13, cursor: 'pointer',
            }}>
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ── Main Onboarding orchestrator ──────────────────────────────────────────────
export default function Onboarding({ onComplete }) {
  const [screen, setScreen] = useState('welcome') // welcome | features | account

  function handleAccountComplete({ name, email, space }) {
    // Stub: store locally for now, real auth later
    onComplete({ name, email, space })
  }

  function handleSkip() {
    // Go straight to space naming via a minimal prompt
    setScreen('skip')
  }

  if (screen === 'welcome') return <WelcomeScreen onNext={() => setScreen('features')} />
  if (screen === 'features') return <FeaturesScreen onNext={() => setScreen('account')} />
  if (screen === 'account') return <AccountScreen onComplete={handleAccountComplete} onSkip={handleSkip} />

  // Skip flow — just pick a space name
  if (screen === 'skip') return <AccountSkip onComplete={space => onComplete({ name: null, email: null, space })} />
}

// ── Skip flow — just pick a space name, no account ───────────────────────────
function AccountSkip({ onComplete }) {
  const [selected, setSelected] = useState('')
  const [custom, setCustom] = useState('')

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: 12,
    border: `1.5px solid ${custom ? '#7ec850' : '#2a2820'}`,
    background: '#0f0e0b', color: '#e8dfc8', fontSize: 15,
    boxSizing: 'border-box', outline: 'none',
    fontFamily: "'DM Sans', system-ui, sans-serif", marginBottom: 16,
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#080604', zIndex: 10000,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '28px',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🌿</div>
          <Ornament style={{ marginBottom: 16 }} />
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 24, fontWeight: 700, color: '#e8dfc8', marginBottom: 8,
          }}>Name your space</div>
          <div style={{ fontSize: 13, color: '#8a7d5a' }}>
            What do you want to call your plant collection?
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          {SPACE_NAMES.map(n => {
            const active = selected === n && !custom
            return (
              <button key={n} onClick={() => { setSelected(n); setCustom('') }} style={{
                padding: '12px 10px', borderRadius: 12, cursor: 'pointer',
                border: `1.5px solid ${active ? '#7ec850' : '#2a2820'}`,
                background: active ? '#1a2614' : '#0f0e0b',
                color: active ? '#7ec850' : '#8a7d5a',
                fontSize: 13, fontWeight: active ? 700 : 400,
                transition: 'all 0.15s',
              }}>{n}</button>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', fontSize: 11, color: '#3a3628', marginBottom: 10 }}>
          — or name it yourself —
        </div>

        <input
          style={inputStyle}
          placeholder="The Lair, Death Garden, The Crypt..."
          value={custom}
          onChange={e => { setCustom(e.target.value); if (e.target.value) setSelected('') }}
        />

        <button
          onClick={() => { const s = custom.trim() || selected; if (s) onComplete(s) }}
          disabled={!selected && !custom.trim()}
          style={{
            width: '100%', padding: '15px', borderRadius: 12, border: 'none',
            background: (selected || custom.trim()) ? '#2a3d1a' : '#1a1814',
            color: (selected || custom.trim()) ? '#c8b87a' : '#3a3628',
            fontSize: 14, fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', cursor: 'pointer',
          }}
        >
          ENTER {(custom.trim() || selected || 'YOUR SPACE').toUpperCase()} →
        </button>

        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 11, color: '#3a3628' }}>
          You can create an account anytime in the Potting Shed
        </div>
      </div>
    </div>
  )
}
