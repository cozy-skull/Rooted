import React, { useState } from 'react'
import splashFull from './assets/splash_full.jpg'
import skullLogo from './assets/skull.jpg'
import cozySkullWordmark from './assets/cozy_skull_wordmark.jpg'
import { C } from './constants'
import { sBtnP, sBtnS, sH } from './components'

// ── About Rooted ──────────────────────────────────────────────────────────────
export function AboutRooted({ onClose, onCourtTap, courtTaps, showCourt }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#080604',
      zIndex: 9000, overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Close button */}
      <button
        style={{ ...sBtnS, position: 'fixed', top: 20, right: 20, zIndex: 10 }}
        onClick={onClose}
      >✕ Close</button>

      {/* Full splash logo — fills the top */}
      <div style={{
        width: '100%', maxWidth: 480,
        display: 'flex', justifyContent: 'center',
        paddingTop: 20,
      }}>
        <img
          src={splashFull}
          alt="Rooted"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Content below logo */}
      <div style={{
        width: '100%', maxWidth: 400,
        padding: '0 1.5rem 3rem',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 13, color: '#8a7d5a',
          lineHeight: 1.9, marginBottom: 24,
        }}>
          Most plant apps help you remember to water.
          <br /><br />
          Rooted helps you care for what you're growing.
          Track your collection, document progress,
          solve problems, and build a living record of your plants.
          <br /><br />
          Plant care without perfectionism.
        </div>

        <div style={{
          width: 40, height: 1,
          background: '#3a3018',
          margin: '0 auto 24px',
        }} />

        <div style={{
          fontSize: 11, color: '#6b5a38',
          letterSpacing: '2px', textTransform: 'uppercase',
          marginBottom: 6,
        }}>Held. Tended. Not abandoned.</div>

        <div style={{
          fontSize: 12, color: '#c8922a',
          fontStyle: 'italic', marginBottom: 32,
        }}>Built by Cozy Skull</div>

        {/* Social links */}
        <div style={{
          display: 'flex', gap: 10,
          justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: 40,
        }}>
          {[
            { label: '🌿 Website', url: 'https://cozyskull.com' },
            { label: '📸 Instagram', url: 'https://instagram.com/cozyskull' },
            { label: '📺 YouTube', url: 'https://youtube.com/@cozyskull' },
            { label: '🛍️ Etsy', url: 'https://etsy.com/shop/cozyskull' },
          ].map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: '9px 16px', borderRadius: 12,
                border: '1px solid #3a3018',
                background: 'transparent', color: '#a89a6a',
                fontSize: 13, cursor: 'pointer',
                textDecoration: 'none', display: 'inline-block',
              }}
            >{link.label}</a>
          ))}
        </div>

        {/* Easter egg — Plant Court */}
        <button
          onClick={onCourtTap}
          style={{
            background: 'none', border: 'none',
            cursor: 'pointer', fontSize: 11,
            color: '#3a3520', padding: '4px',
          }}
        >Rooted 1.0</button>
        {courtTaps > 0 && courtTaps < 5 && (
          <div style={{ fontSize: 10, color: '#4a4228', marginTop: 4 }}>
            {5 - courtTaps} more...
          </div>
        )}
      </div>
    </div>
  )
}

// ── About Cozy Skull ──────────────────────────────────────────────────────────
export function AboutCozySkull({ onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#000000',
      zIndex: 9000, overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
    }}>
      <button
        style={{ ...sBtnS, position: 'fixed', top: 20, right: 20, zIndex: 10, borderColor: '#333', color: '#888' }}
        onClick={onClose}
      >✕ Close</button>

      {/* Skull logo — centered with breathing room */}
      <div style={{
        width: '100%', maxWidth: 360,
        padding: '60px 2rem 0',
        display: 'flex', justifyContent: 'center',
      }}>
        <img
          src={skullLogo}
          alt="Cozy Skull"
          style={{
            width: 220, height: 220,
            objectFit: 'contain',
            filter: 'brightness(0.95)',
          }}
        />
      </div>

      {/* Wordmark — exact font from brand assets */}
      <div style={{
        width: '100%', maxWidth: 380,
        padding: '0 2rem',
        display: 'flex', justifyContent: 'center',
      }}>
        <img
          src={cozySkullWordmark}
          alt="Cozy Skull"
          style={{
            width: '100%', height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Tagline */}
      <div style={{ textAlign: 'center', padding: '12px 2rem 0' }}>
        <div style={{
          fontSize: 11, color: '#444',
          letterSpacing: '3px', textTransform: 'uppercase',
          marginBottom: 32,
        }}>A dark botanical corner of the internet</div>
      </div>

      {/* Content */}
      <div style={{
        width: '100%', maxWidth: 380,
        padding: '0 1.5rem 3rem',
        textAlign: 'center',
      }}>
        <div style={{
          width: 40, height: 1,
          background: '#222', margin: '0 auto 28px',
        }} />

        <div style={{
          fontSize: 14, color: '#777',
          lineHeight: 1.9, marginBottom: 28,
        }}>
          Cozy Skull is a creative brand built around plants,
          intentional living, and a little darkness.
          <br /><br />
          Weird about plants. Intentional about life.
          <br /><br />
          Rooted is our first app — built for plant people
          who actually give a damn about what they're growing.
        </div>

        <div style={{
          fontSize: 12, color: '#444',
          fontStyle: 'italic', marginBottom: 32,
          lineHeight: 1.7,
        }}>
          "A dark botanical corner of the internet."
        </div>

        {/* Social links — monochrome style */}
        <div style={{
          display: 'flex', gap: 10,
          justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: 40,
        }}>
          {[
            { label: '🌿 Website', url: 'https://cozyskull.com' },
            { label: '📸 Instagram', url: 'https://instagram.com/cozyskull' },
            { label: '📺 YouTube', url: 'https://youtube.com/@cozyskull' },
            { label: '🛍️ Etsy', url: 'https://etsy.com/shop/cozyskull' },
          ].map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: '9px 16px', borderRadius: 12,
                border: '1px solid #222',
                background: 'transparent', color: '#555',
                fontSize: 13, cursor: 'pointer',
                textDecoration: 'none', display: 'inline-block',
              }}
            >{link.label}</a>
          ))}
        </div>

        <div style={{ fontSize: 11, color: '#333' }}>
          © Cozy Skull · All rights reserved
        </div>
      </div>
    </div>
  )
}
