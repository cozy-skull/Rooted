import React, { useState } from 'react'
import { C, ls, lsSet } from './constants'
import { Sheet, sBtn, sBtnP, sBtnS, sInp, sLbl, sBtwn, sRow, sCard, sH } from './components'

export function MemorialGarden({ onClose }) {
  const [departed, setDeparted] = useState(() => ls('rr_memorial', []))
  const [showObit, setShowObit] = useState(null)

  function generateObit(plant) {
    const causes = [
      'overwatered exactly once too many times',
      'underestimated in its light requirements',
      'loved a little too hard',
      'victim of a spider mite invasion',
      'moved to a window that did not agree',
      'forgotten during a very busy week',
      'casualty of root rot',
      'never recovered from the repotting incident',
    ]
    const cause = plant.causeOfDeath || causes[Math.floor(Math.random() * causes.length)]
    return cause
  }

  if (departed.length === 0) {
    return (
      <Sheet>
        <div style={sBtwn}>
          <div style={sH(17)}>🪦 Memorial Garden</div>
          <button style={sBtnS} onClick={onClose}>✕</button>
        </div>
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
          <div style={{ fontSize: 16, color: C.text, fontWeight: 600, marginBottom: 8 }}>No plants here yet.</div>
          <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>
            When a plant doesn't make it, you can move it here instead of deleting it.
            <br /><br />
            Their story lives on.
          </div>
        </div>
      </Sheet>
    )
  }

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(17)}>🪦 Memorial Garden</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4, marginBottom: 20, fontStyle: 'italic' }}>
        The ones we've loved and lost. Their stories live on here.
      </div>

      {departed.map(plant => {
        const obit = generateObit(plant)
        const years = plant.acquiredDate
          ? (() => {
              const start = new Date(plant.acquiredDate).getFullYear()
              const end = new Date(plant.departedDate || Date.now()).getFullYear()
              return start === end ? String(start) : `${start}–${end}`
            })()
          : null

        return (
          <div key={plant.id} style={{ ...sCard(), borderColor: '#2a2020', background: '#130f0f', cursor: 'pointer' }} onClick={() => setShowObit(showObit === plant.id ? null : plant.id)}>
            <div style={sRow}>
              <div style={{ fontSize: 36, flexShrink: 0 }}>{plant.emoji || '🪴'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: '#c8a870' }}>
                  {plant.nickname || plant.name}
                  {years && <span style={{ fontSize: 12, color: '#5a4a30', fontWeight: 400, fontStyle: 'italic', marginLeft: 8 }}>{years}</span>}
                </div>
                {plant.species && <div style={{ fontSize: 12, color: '#5a4a30', marginTop: 2 }}>{plant.species}</div>}
                <div style={{ fontSize: 12, color: '#8a5a3a', marginTop: 4, fontStyle: 'italic' }}>
                  "{plant.nickname || plant.name} was {obit}."
                </div>
              </div>
              <span style={{ color: '#3a2a20', fontSize: 14 }}>{showObit === plant.id ? '▲' : '▼'}</span>
            </div>

            {showObit === plant.id && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: `0.5px solid #2a1a1a` }}>
                {plant.photo && <img src={plant.photo} alt="" style={{ width: '100%', borderRadius: 10, marginBottom: 12, maxHeight: 180, objectFit: 'cover', opacity: 0.7 }} />}
                {plant.rescueStory && (
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, color: '#5a4a30', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Their story</div>
                    <div style={{ fontSize: 13, color: '#7a6050', lineHeight: 1.6, fontStyle: 'italic' }}>{plant.rescueStory}</div>
                  </div>
                )}
                {plant.causeOfDeath && (
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, color: '#5a4a30', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Cause of death</div>
                    <div style={{ fontSize: 13, color: '#7a6050', lineHeight: 1.6 }}>{plant.causeOfDeath}</div>
                  </div>
                )}
                {(plant.journal || []).length > 0 && (
                  <div style={{ fontSize: 12, color: '#5a4a30' }}>📖 {plant.journal.length} journal {plant.journal.length === 1 ? 'entry' : 'entries'} preserved</div>
                )}
                <div style={{ fontSize: 11, color: '#3a2a20', marginTop: 10, fontStyle: 'italic', textAlign: 'center' }}>
                  🕯️ Forever in the garden
                </div>
              </div>
            )}
          </div>
        )
      })}
    </Sheet>
  )
}

// Helper to move a plant to memorial garden
export function moveToMemorial(plant) {
  const memorial = ls('rr_memorial', [])
  const departed = {
    ...plant,
    departedDate: new Date().toISOString(),
    causeOfDeath: plant.recovery?.diagnosis?.likely_cause || null,
  }
  lsSet('rr_memorial', [departed, ...memorial])
}
