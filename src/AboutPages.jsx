import React from 'react'
import rootedLockup from './assets/rooted_lockup.png'
import cozySkullLogo from './assets/cozy_skull_logo.png'
import { sBtnS, sBtnP } from './components'

// ── About Rooted ──────────────────────────────────────────────────────────────
// All about the APP — what it is, what it does, why it exists
export function AboutRooted({ onClose, onCourtTap, courtTaps }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#080604',
      zIndex: 9000, overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
    }}>
      <button
        style={{ ...sBtnS, position: 'fixed', top: 20, right: 20, zIndex: 10 }}
        onClick={onClose}
      >✕ Close</button>

      {/* Rooted lockup logo — full width at top */}
      <div style={{ width: '100%', maxWidth: 500 }}>
        <img
          src={rootedLockup}
          alt="Rooted"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* App description */}
      <div style={{
        width: '100%', maxWidth: 400,
        padding: '8px 1.5rem 3rem',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 11, color: '#6b5a38',
          letterSpacing: '3px', textTransform: 'uppercase',
          marginBottom: 20,
        }}>A home for your plants</div>

        <div style={{
          fontSize: 14, color: '#8a7d5a',
          lineHeight: 1.9, marginBottom: 24,
        }}>
          Most plant apps help you remember to water.
          <br /><br />
          Rooted helps you care for what you're growing.
          <br /><br />
          Track your collection, document your progress,
          diagnose problems, and build a living record
          of every plant in your life.
        </div>

        {/* Feature highlights */}
        <div style={{ textAlign: 'left', marginBottom: 28 }}>
          {[
            ['🌿', 'Greenhouse', 'Your daily plant dashboard with smart reminders'],
            ['🪴', 'Collection', 'Track every plant with mood, care schedules, and photos'],
            ['🖤', 'Memory Vault', 'Document rescue stories, milestones, and gifted plants'],
            ['🚑', 'Plant ER', 'AI-powered diagnosis and care guides'],
            ['✂️', 'Propagation Lab', 'Track cuttings and trade with the community'],
            ['☕', 'Dirt & Tea', 'Community posts, swaps, and plant talk'],
          ].map(([icon, label, desc]) => (
            <div key={label} style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              padding: '10px 0',
              borderBottom: '0.5px solid #1e1a12',
            }}>
              <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#e8dfc8', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, color: '#6b5a38', lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          fontSize: 12, color: '#c8922a',
          fontStyle: 'italic', marginBottom: 6,
        }}>Built by Cozy Skull</div>
        <div style={{
          fontSize: 11, color: '#4a3a20',
          letterSpacing: '1.5px', marginBottom: 32,
        }}>Held. Tended. Not abandoned.</div>

        {/* Version easter egg */}
        <button
          onClick={onCourtTap}
          style={{
            background: 'none', border: 'none',
            cursor: 'pointer', fontSize: 11,
            color: '#2a2015', padding: '4px',
          }}
        >Rooted 1.0</button>
        {courtTaps > 0 && courtTaps < 5 && (
          <div style={{ fontSize: 10, color: '#3a2a10', marginTop: 4 }}>
            {5 - courtTaps} more...
          </div>
        )}
      </div>
    </div>
  )
}

// ── About Cozy Skull ──────────────────────────────────────────────────────────
// All about the BRAND — who we are, what we make, where to find us
export function AboutCozySkull({ onClose }) {
  const links = [
    {
      icon: '📸',
      label: 'Instagram',
      sub: '@cozy.skull',
      url: 'https://www.instagram.com/cozy.skull?igsh=ZXYzbnRtZHkyd3hj',
      desc: 'Daily plant content, behind the scenes, and dark botanical vibes',
    },
    {
      icon: '🎵',
      label: 'TikTok',
      sub: '@cozy.skull',
      url: 'https://www.tiktok.com/@cozy.skull?_r=1&_t=ZT-96qptdnyleH',
      desc: 'Short plant content, tips, and chaotic botanical energy',
    },
    {
      icon: '📘',
      label: 'Facebook',
      sub: 'Cozy Skull',
      url: 'https://www.facebook.com/share/1BX83GkV7o/',
      desc: 'Community, updates, and everything Cozy Skull',
    },
    {
      icon: '📺',
      label: 'YouTube',
      sub: '@cozyskull',
      url: 'https://youtube.com/@cozyskull?si=4isUDlzZKWej1CBr',
      desc: 'Plant care videos, tutorials, and the occasional feral content',
    },
    {
      icon: '🛍️',
      label: 'Etsy Shop',
      sub: 'cozyskullco.etsy.com',
      url: 'https://cozyskullco.etsy.com',
      desc: 'Prints, stickers, and dark botanical goods for your space',
    },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0a0806',
      zIndex: 9000, overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
    }}>
      <button
        style={{ ...sBtnS, position: 'fixed', top: 20, right: 20, zIndex: 10 }}
        onClick={onClose}
      >✕ Close</button>

      {/* Cozy Skull logo — inverted so white on dark bg */}
      <div style={{
        width: '100%', maxWidth: 360,
        padding: '48px 2rem 0',
        display: 'flex', justifyContent: 'center',
      }}>
        <img
          src={cozySkullLogo}
          alt="Cozy Skull"
          style={{ width: '100%', height: 'auto', display: 'block', filter: 'invert(1)' }}
        />
      </div>

      {/* Tagline */}
      <div style={{
        fontSize: 11, color: '#5a4a30',
        letterSpacing: '3px', textTransform: 'uppercase',
        marginTop: 10, marginBottom: 24,
        textAlign: 'center',
      }}>Weird about plants. Intentional about life.</div>

      {/* Brand brief */}
      <div style={{
        width: '100%', maxWidth: 380,
        padding: '0 1.5rem',
        textAlign: 'center', marginBottom: 28,
      }}>
        <div style={{
          fontSize: 14, color: '#7a6a48',
          lineHeight: 1.85,
        }}>
          Cozy Skull is a dark botanical brand built around
          plants, intentional living, and a sassy feral energy.
          <br /><br />
          We make content, goods, and tools — including Rooted —
          for plant people who actually give a damn.
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: 40, height: 1, background: '#2a2010', marginBottom: 24 }} />

      {/* Links — each one a full card */}
      <div style={{
        width: '100%', maxWidth: 380,
        padding: '0 1.5rem 3rem',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{
          fontSize: 10, color: '#4a3a20',
          letterSpacing: '2px', textTransform: 'uppercase',
          marginBottom: 4, textAlign: 'center',
        }}>Find us everywhere</div>

        {links.map(link => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 14,
              background: '#131008',
              border: '1px solid #2a2010',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: '#1e1810',
                border: '1px solid #3a2e18',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22,
                flexShrink: 0,
              }}>{link.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#c8a870', marginBottom: 2 }}>{link.label}</div>
                <div style={{ fontSize: 12, color: '#5a4a30', marginBottom: 3 }}>{link.sub}</div>
                <div style={{ fontSize: 11, color: '#4a3a22', lineHeight: 1.4 }}>{link.desc}</div>
              </div>
              <div style={{ color: '#3a2e18', fontSize: 18, flexShrink: 0 }}>›</div>
            </div>
          </a>
        ))}

        <div style={{
          textAlign: 'center', marginTop: 12,
          fontSize: 11, color: '#2a2010',
        }}>© Cozy Skull · All rights reserved</div>
      </div>
    </div>
  )
}
