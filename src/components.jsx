import React, { useEffect, useRef } from 'react'
import { C } from './constants'

export function Ring({ pct, size = 50, stroke = 3, color, bg }) {
  const r = size / 2 - stroke
  const circ = 2 * Math.PI * r
  const off = circ * (1 - pct)
  return (
    <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bg || C.border} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s' }} />
    </svg>
  )
}

export function Confetti({ active, onDone }) {
  const ref = useRef()
  useEffect(() => {
    if (!active) return
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    c.width = window.innerWidth
    c.height = window.innerHeight
    const cols = ['#7ec850','#c8922a','#e8dfc8','#9a7ab8','#c94f4f','#5b9fd4']
    const ps = Array.from({ length: 80 }, () => ({
      x: Math.random() * c.width, y: -10,
      vx: (Math.random() - 0.5) * 6, vy: Math.random() * 4 + 2,
      color: cols[Math.floor(Math.random() * cols.length)],
      size: Math.random() * 9 + 3,
      angle: Math.random() * 360, spin: (Math.random() - 0.5) * 8,
    }))
    let fr
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      let alive = false
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.angle += p.spin
        if (p.y < c.height + 20) alive = true
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle * Math.PI / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size)
        ctx.restore()
      })
      if (alive) fr = requestAnimationFrame(draw)
      else if (onDone) onDone()
    }
    draw()
    return () => cancelAnimationFrame(fr)
  }, [active])
  if (!active) return null
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }} />
}

export function Modal({ children, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 8000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: C.bgCard, borderRadius: 20, padding: '1.5rem', width: '100%', maxWidth: 420, border: `1px solid ${C.border}`, maxHeight: '90vh', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  )
}

export function Sheet({ children }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 8000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: C.bgCard, borderRadius: '22px 22px 0 0', padding: '1.5rem', width: '100%', maxWidth: 680, maxHeight: '90vh', overflowY: 'auto', border: `1px solid ${C.border}` }}>
        {children}
      </div>
    </div>
  )
}

export function EmojiPick({ current, onPick }) {
  const emojis = ['🌿','🪴','🌵','🌴','🌸','🌺','🍃','🌾','🎋','🪷','🌻','🌹','🌱','🍀','🌳','🪻','💐','🌼','🫧']
  return (
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
      {emojis.map(em => (
        <button key={em} onClick={() => onPick(em)} style={{
          fontSize: 20, padding: '4px 6px', borderRadius: 8, cursor: 'pointer',
          border: `1.5px solid ${current === em ? C.accent : C.border}`,
          background: current === em ? C.bgSubtle : 'transparent',
        }}>{em}</button>
      ))}
    </div>
  )
}

// Style helpers used across components
export const sBtn = { padding: '7px 14px', borderRadius: 10, border: `1px solid #4a4228`, background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#e8dfc8', fontFamily: 'inherit', fontWeight: 500 }
export const sBtnP = { padding: '9px 20px', borderRadius: 10, border: 'none', background: '#7ec850', color: '#0d1a07', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }
export const sBtnS = { padding: '5px 11px', borderRadius: 8, border: `1px solid #4a4228`, background: 'transparent', cursor: 'pointer', fontSize: 12, color: '#8a7d5a', fontFamily: 'inherit' }
export const sInp = { width: '100%', padding: '10px 13px', borderRadius: 11, border: `1px solid #4a4228`, background: '#13110d', color: '#e8dfc8', fontSize: 14, boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' }
export const sLbl = { fontSize: 10, color: '#8a7d5a', marginBottom: 5, display: 'block', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }
export const sBtwn = { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
export const sRow = { display: 'flex', alignItems: 'center', gap: 10 }

export function sCard(extra) {
  return { background: '#1a1710', border: `1px solid #2e2a1e`, borderRadius: 16, padding: '1rem', marginBottom: 10, ...extra }
}
export function sTab(active) {
  return {
    padding: '6px 15px', borderRadius: 20, fontSize: 12,
    border: `1px solid ${active ? C.accent : C.border}`,
    background: active ? C.bgSubtle : 'transparent',
    cursor: 'pointer', color: active ? C.accent : C.textMuted,
    fontWeight: active ? 700 : 400, fontFamily: 'inherit',
  }
}
export function sBdg(col) {
  return {
    fontSize: 10, padding: '3px 9px', borderRadius: 10,
    background: col + '22', color: col, fontWeight: 700,
    border: `0.5px solid ${col}44`,
    display: 'inline-flex', alignItems: 'center', gap: 3,
  }
}
export function sH(n) {
  return { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: n || 18, color: '#e8dfc8' }
}
export function sAv(photo, size = 48) {
  return {
    width: size, height: size, borderRadius: 14,
    background: photo ? 'transparent' : '#201d15',
    backgroundImage: photo ? `url(${photo})` : 'none',
    backgroundSize: 'cover', backgroundPosition: 'center',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: Math.round(size * 0.5), flexShrink: 0,
    border: `1px solid #2e2a1e`,
  }
}
