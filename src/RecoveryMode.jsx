import React, { useState, useRef } from 'react'
import { C, PESTS, daysAgo } from './constants'
import { Sheet, Modal, sBtn, sBtnP, sBtnS, sInp, sLbl, sBtwn, sRow, sCard, sH, sBdg } from './components'

const SEVERITY = {
  mild:     { color: '#c8922a', bg: '#c8922a22', label: 'Mild',     icon: '⚠️' },
  moderate: { color: '#d4634a', bg: '#d4634a22', label: 'Moderate', icon: '🔶' },
  urgent:   { color: '#c94f4f', bg: '#c94f4f22', label: 'Urgent',   icon: '🚨' },
}

// ── AI Photo Diagnosis ────────────────────────────────────────────────────────
export function PhotoDiagnosis({ plant, onResult, onClose }) {
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [context, setContext] = useState('')
  const photoRef = useRef()

  function uploadPhoto(e) {
    const f = e.target.files[0]
    if (!f) return
    const r = new FileReader()
    r.onload = ev => setPhoto(ev.target.result)
    r.readAsDataURL(f)
  }

  async function diagnose() {
    if (!photo) return
    setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: 'image/jpeg', data: photo.split(',')[1] }
              },
              {
                type: 'text',
                text: `You are a plant doctor with dark cottagecore energy — direct, warm, no nonsense. 
Analyze this plant photo${context ? ` (additional context: ${context})` : ''}.
Plant name: ${plant.nickname || plant.name}${plant.species ? `, species: ${plant.species}` : ''}.

Respond in this EXACT JSON format only, no other text:
{
  "diagnosis": "What is wrong in 1-2 sentences",
  "likely_cause": "The most likely cause",
  "severity": "mild|moderate|urgent",
  "quarantine": true|false,
  "treatment_steps": ["step 1", "step 2", "step 3", "step 4"],
  "recovery_timeline": "Expected recovery time",
  "sassy_note": "One sassy but caring line about what happened",
  "is_pest": true|false,
  "pest_type": "pest name or null"
}`
              }
            ]
          }]
        })
      })
      const d = await res.json()
      const text = d.content?.[0]?.text || ''
      const parsed = JSON.parse(text)
      setResult(parsed)
    } catch (e) {
      setResult({ 
        diagnosis: 'Could not analyze the photo. Try again with better lighting.',
        likely_cause: 'Unknown', severity: 'mild', quarantine: false,
        treatment_steps: ['Check soil moisture', 'Inspect leaves closely', 'Isolate if pests visible'],
        recovery_timeline: 'Varies', sassy_note: 'Mercury retrograde may be involved.',
        is_pest: false, pest_type: null
      })
    }
    setLoading(false)
  }

  function accept() {
    if (result) onResult({ photo, diagnosis: result })
    onClose()
  }

  const sev = result ? SEVERITY[result.severity] || SEVERITY.mild : null

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(17)}>📸 Photo Diagnosis</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4, marginBottom: 20, fontStyle: 'italic' }}>
        Take a photo of the problem area. AI will identify what's wrong and build a treatment plan.
      </div>

      {!photo ? (
        <div>
          <input type="file" accept="image/*" capture="environment" ref={photoRef} style={{ display: 'none' }} onChange={uploadPhoto} />
          <button style={{ ...sBtnP, width: '100%', padding: '16px', fontSize: 15, marginBottom: 10 }} onClick={() => photoRef.current?.click()}>
            📷 Take or upload photo
          </button>
          <div style={{ marginBottom: 14 }}>
            <div style={sLbl}>Describe what you see (optional)</div>
            <input style={sInp} placeholder="Yellow leaves, sticky residue, white spots..." value={context} onChange={e => setContext(e.target.value)} />
          </div>
        </div>
      ) : (
        <div>
          <img src={photo} alt="plant problem" style={{ width: '100%', borderRadius: 14, marginBottom: 14, maxHeight: 260, objectFit: 'cover', border: `1px solid ${C.border}` }} />
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <input style={{ ...sInp, flex: 1 }} placeholder="Anything else to add?" value={context} onChange={e => setContext(e.target.value)} />
            <button style={{ ...sBtnS }} onClick={() => { setPhoto(null); setResult(null) }}>Retake</button>
          </div>
        </div>
      )}

      {photo && !result && (
        <button style={{ ...sBtnP, width: '100%', padding: '14px', fontSize: 14 }} onClick={diagnose} disabled={loading}>
          {loading ? '🔍 Analyzing your plant...' : '🔍 Diagnose this plant'}
        </button>
      )}

      {result && (
        <div>
          <div style={{ background: sev.bg, border: `1px solid ${sev.color}44`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{sev.icon}</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: sev.color, letterSpacing: '1px', textTransform: 'uppercase' }}>{sev.label} — {result.recovery_timeline}</div>
                {result.quarantine && <div style={{ fontSize: 11, color: C.dangerText, marginTop: 2 }}>⚠️ Quarantine recommended</div>}
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>{result.diagnosis}</div>
            <div style={{ fontSize: 13, color: C.textMuted, fontStyle: 'italic' }}>{result.sassy_note}</div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={sLbl}>Likely cause</div>
            <div style={{ fontSize: 13, color: C.text }}>{result.likely_cause}</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={sLbl}>Treatment plan</div>
            {result.treatment_steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, background: C.accent + '22', border: `1px solid ${C.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5, paddingTop: 2 }}>{step}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ ...sBtnP, flex: 1, padding: '12px' }} onClick={accept}>
              Start Recovery Mode
            </button>
            <button style={{ ...sBtn, padding: '12px' }} onClick={() => { setResult(null); setPhoto(null) }}>
              Retake
            </button>
          </div>
        </div>
      )}
    </Sheet>
  )
}

// ── Recovery Mode View ────────────────────────────────────────────────────────
export function RecoveryMode({ plant, onUpdate, onGraduate, onMemorialGarden }) {
  const [showDiagnosis, setShowDiagnosis] = useState(false)
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [checkInNote, setCheckInNote] = useState('')
  const [checkInPhoto, setCheckInPhoto] = useState(null)
  const checkInPhotoRef = useRef()

  const recovery = plant.recovery || {}
  const checkIns = recovery.checkIns || []
  const diagnosis = recovery.diagnosis || null
  const startDate = recovery.startDate ? new Date(recovery.startDate) : null
  const daysIn = startDate ? Math.floor((Date.now() - startDate) / 86400000) : 0
  const sev = diagnosis ? (SEVERITY[diagnosis.severity] || SEVERITY.mild) : null

  function uploadCheckInPhoto(e) {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader()
    r.onload = ev => setCheckInPhoto(ev.target.result)
    r.readAsDataURL(f)
  }

  function addCheckIn() {
    if (!checkInNote.trim() && !checkInPhoto) return
    const updated = [...checkIns, {
      id: Date.now(), date: new Date().toISOString(),
      note: checkInNote, photo: checkInPhoto
    }]
    onUpdate(plant.id, { recovery: { ...recovery, checkIns: updated } })
    setCheckInNote(''); setCheckInPhoto(null); setShowCheckIn(false)
  }

  function handleDiagnosisResult({ photo, diagnosis: diag }) {
    onUpdate(plant.id, {
      mood: 'crisis',
      recovery: {
        ...recovery,
        startDate: recovery.startDate || new Date().toISOString(),
        active: true,
        diagnosis: diag,
        diagnosisPhoto: photo,
      }
    })
  }

  return (
    <div>
      {showDiagnosis && (
        <PhotoDiagnosis
          plant={plant}
          onResult={handleDiagnosisResult}
          onClose={() => setShowDiagnosis(false)}
        />
      )}

      {/* Header */}
      <div style={{ background: '#2a1210', border: `1px solid #5a2020`, borderRadius: 16, padding: '14px 16px', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>🏥</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#e87070' }}>Recovery Mode</div>
            <div style={{ fontSize: 12, color: '#8a5050' }}>
              {daysIn > 0 ? `Day ${daysIn} of recovery` : 'Just started'}
              {recovery.quarantine && ' · Quarantined'}
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <button style={{ ...sBtnP, fontSize: 11, padding: '5px 12px', background: '#7ec850' }} onClick={onGraduate}>
              ✓ Recovered!
            </button>
          </div>
        </div>
        {sev && diagnosis && (
          <div style={{ background: sev.bg, borderRadius: 10, padding: '8px 12px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: sev.color, marginBottom: 2 }}>{sev.icon} {sev.label} severity</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{diagnosis.diagnosis}</div>
          </div>
        )}
      </div>

      {/* Diagnosis photo */}
      {recovery.diagnosisPhoto && (
        <div style={{ marginBottom: 14 }}>
          <div style={sLbl}>Diagnosis photo</div>
          <img src={recovery.diagnosisPhoto} alt="diagnosis" style={{ width: '100%', borderRadius: 12, maxHeight: 180, objectFit: 'cover', border: `1px solid ${C.border}` }} />
        </div>
      )}

      {/* Treatment plan */}
      {diagnosis?.treatment_steps && (
        <div style={sCard({ marginBottom: 14 })}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>📋 Treatment Plan</div>
          {diagnosis.treatment_steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 22, height: 22, borderRadius: 7, background: C.accent + '22', border: `1px solid ${C.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5, paddingTop: 2 }}>{step}</div>
            </div>
          ))}
          {diagnosis.recovery_timeline && (
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 8, fontStyle: 'italic' }}>⏱️ Expected: {diagnosis.recovery_timeline}</div>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        <button style={{ ...sBtnP, fontSize: 12, padding: '8px 14px' }} onClick={() => setShowDiagnosis(true)}>
          📸 {diagnosis ? 'New diagnosis' : 'Diagnose with photo'}
        </button>
        <button style={{ ...sBtn, fontSize: 12, padding: '8px 14px' }} onClick={() => setShowCheckIn(true)}>
          📝 Check-in
        </button>
        <button style={{ ...sBtnS, fontSize: 12, padding: '8px 14px', color: C.dangerText, borderColor: C.dangerBorder }} onClick={onMemorialGarden}>
          🪦 Move to Memorial Garden
        </button>
      </div>

      {/* Check-in form */}
      {showCheckIn && (
        <div style={sCard({ marginBottom: 14 })}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>Weekly check-in</div>
          <textarea style={{ ...sInp, minHeight: 70, resize: 'vertical', marginBottom: 10 }} placeholder="How is it looking? Any improvement? New symptoms?" value={checkInNote} onChange={e => setCheckInNote(e.target.value)} />
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input type="file" accept="image/*" capture="environment" ref={checkInPhotoRef} style={{ display: 'none' }} onChange={uploadCheckInPhoto} />
            <button style={sBtnS} onClick={() => checkInPhotoRef.current?.click()}>📷 Add photo</button>
            {checkInPhoto && <span style={{ fontSize: 12, color: C.accent, alignSelf: 'center' }}>✓ Photo added</span>}
          </div>
          {checkInPhoto && <img src={checkInPhoto} alt="" style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover', marginBottom: 10 }} />}
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={sBtnP} onClick={addCheckIn}>Save check-in</button>
            <button style={sBtn} onClick={() => { setShowCheckIn(false); setCheckInNote(''); setCheckInPhoto(null) }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Check-in timeline */}
      {checkIns.length > 0 && (
        <div>
          <div style={sLbl}>Recovery timeline</div>
          {[...checkIns].reverse().map((ci, i) => (
            <div key={ci.id} style={sCard({ marginBottom: 8 })}>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 4 }}>
                {new Date(ci.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                {i === 0 && <span style={{ color: C.accent, marginLeft: 6 }}>· Latest</span>}
              </div>
              {ci.photo && <img src={ci.photo} alt="" style={{ width: '100%', borderRadius: 10, marginBottom: 8, maxHeight: 160, objectFit: 'cover' }} />}
              {ci.note && <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{ci.note}</div>}
            </div>
          ))}
        </div>
      )}

      {checkIns.length === 0 && !diagnosis && (
        <div style={{ textAlign: 'center', padding: '1rem 0', color: C.textMuted, fontSize: 13, fontStyle: 'italic' }}>
          Start with a photo diagnosis or add a check-in to track recovery.
        </div>
      )}
    </div>
  )
}
