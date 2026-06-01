import React, { useState, useRef } from 'react'
import { C, ls, lsSet, waterStatus, daysAgo } from './constants'
import { Sheet, Modal, sBtn, sBtnP, sBtnS, sInp, sLbl, sBtwn, sRow, sCard, sH, sAv, sBdg } from './components'

// ── Zone plant guidance based on species/name keywords ────────────────────────
const ZONE_SUGGESTIONS = [
  { keywords: ['fern','fittonia','nerve','baby tears','calathea','maranta','prayer'], zone: 1, reason: 'Moisture-loving — prefers frequent watering' },
  { keywords: ['pothos','philodendron','monstera','syngonium','tradescantia','spider','peace lily','anthurium'], zone: 2, reason: 'Moderate waterer — let top inch dry between waterings' },
  { keywords: ['zz','snake','sansevieria','hoya','cast iron','aspidistra','rubber','dracaena','aglaonema'], zone: 3, reason: 'Drought tolerant — let soil dry significantly' },
  { keywords: ['succulent','cactus','cacti','aloe','haworthia','echeveria','sedum','euphorbia','agave'], zone: 4, reason: 'Desert plant — water sparingly once a month' },
  { keywords: ['orchid','phalaenopsis','dendrobium'], zone: 2, reason: 'Orchid — check roots: green = skip, silver/gray = water' },
]

export function suggestZone(plant) {
  const text = ((plant.name || '') + ' ' + (plant.species || '') + ' ' + (plant.nickname || '')).toLowerCase()
  for (const s of ZONE_SUGGESTIONS) {
    if (s.keywords.some(k => text.includes(k))) return s
  }
  return null
}

// ── Default zones matching the Rooted guide ───────────────────────────────────
const DEFAULT_ZONES = [
  { id: 1, name: 'Zone 1', subtitle: 'Frequent Waterers', color: '#7ec850', icon: '🌱', days: [1, 4], scheduleLabel: 'Mon & Thu', notes: 'Ferns, Fittonia, Baby Tears, moisture-loving tropicals. These plants dislike drying out completely.', frequency: 'twice_weekly' },
  { id: 2, name: 'Zone 2', subtitle: 'Moderate Waterers', color: '#5b9fd4', icon: '💧', days: [3], scheduleLabel: 'Wednesday', notes: 'Pothos, Philodendrons, Monstera. Prefer partial drying between waterings.\n\nOrchid rule: Green roots = skip. Silver/gray roots = water.', frequency: 'weekly' },
  { id: 3, name: 'Zone 3', subtitle: 'Low Waterers', color: '#c8922a', icon: '☀️', days: [6], scheduleLabel: 'Saturday', notes: 'ZZ Plant, Snake Plant, Hoya. Prefer significant drying between waterings.', frequency: 'weekly' },
  { id: 4, name: 'Zone 4', subtitle: 'Monthly Waterers', color: '#9a7ab8', icon: '🌙', days: [6], scheduleLabel: '1st Saturday of month', notes: 'Succulents, Cacti, desert plants. Water sparingly — check soil thoroughly first.', frequency: 'monthly' },
]

const PROP_ZONE = { id: 'prop', name: 'Prop Zone', subtitle: 'Propagation Review', color: '#c8922a', icon: '✂️', days: [0], scheduleLabel: 'Every Sunday', notes: 'Check root length, change water, mist prop boxes. Review all active cuttings.', frequency: 'weekly' }

const FREQ_OPTIONS = [
  { id: 'twice_weekly', label: 'Twice a week', days: 'Pick 2 days' },
  { id: 'weekly', label: 'Once a week', days: 'Pick 1 day' },
  { id: 'biweekly', label: 'Every 2 weeks', days: 'Pick a day' },
  { id: 'monthly', label: 'Once a month', days: 'Pick a day' },
  { id: 'custom', label: 'Custom', days: 'Set your own' },
]

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAY_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function isDueToday(zone) {
  if (!zone.days || zone.days.length === 0) return false
  const today = new Date().getDay()
  if (zone.frequency === 'monthly') {
    const d = new Date()
    const firstSat = new Date(d.getFullYear(), d.getMonth(), 1)
    while (firstSat.getDay() !== (zone.days[0] || 6)) firstSat.setDate(firstSat.getDate() + 1)
    return d.getDate() === firstSat.getDate()
  }
  return zone.days.includes(today)
}

// ── Zone Edit Modal ───────────────────────────────────────────────────────────
function ZoneEditModal({ zone, onSave, onDelete, onClose }) {
  const [name, setName] = useState(zone.name)
  const [subtitle, setSubtitle] = useState(zone.subtitle || '')
  const [icon, setIcon] = useState(zone.icon)
  const [color, setColor] = useState(zone.color)
  const [days, setDays] = useState(zone.days || [])
  const [frequency, setFrequency] = useState(zone.frequency || 'weekly')
  const [notes, setNotes] = useState(zone.notes || '')

  const ICONS = ['🌱','💧','☀️','🌙','🌿','🪴','🌵','🌺','🍃','✨','🏡','⛅']
  const COLORS = ['#7ec850','#5b9fd4','#c8922a','#9a7ab8','#e87070','#5bc8a8','#d4934a','#c8d4b8']

  function toggleDay(d) {
    setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }

  function buildScheduleLabel() {
    if (frequency === 'monthly') return `1st ${DAY_FULL[days[0]] || 'Saturday'} of month`
    if (days.length === 0) return 'No days set'
    return days.sort((a,b)=>a-b).map(d => DAY_NAMES[d]).join(' & ')
  }

  function save() {
    onSave({ ...zone, name, subtitle, icon, color, days, frequency, notes, scheduleLabel: buildScheduleLabel() })
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <div style={sBtwn}>
        <div style={sH(16)}>Edit Zone</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <div style={sLbl}>Zone name</div>
          <input style={sInp} value={name} onChange={e => setName(e.target.value)} placeholder="Zone 1, The Thirsty Corner..." />
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={sLbl}>Description</div>
          <input style={sInp} value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Frequent Waterers, Desert Plants..." />
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={sLbl}>Icon</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {ICONS.map(ic => (
              <button key={ic} onClick={() => setIcon(ic)} style={{ fontSize: 20, padding: '5px 7px', borderRadius: 8, border: `1.5px solid ${icon === ic ? color : C.border}`, background: icon === ic ? color + '22' : 'transparent', cursor: 'pointer' }}>{ic}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={sLbl}>Color</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {COLORS.map(col => (
              <div key={col} onClick={() => setColor(col)} style={{ width: 28, height: 28, borderRadius: 8, background: col, cursor: 'pointer', border: `2px solid ${color === col ? '#fff' : 'transparent'}`, boxSizing: 'border-box' }} />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={sLbl}>Frequency</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {FREQ_OPTIONS.map(f => (
              <div key={f.id} onClick={() => setFrequency(f.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, border: `1.5px solid ${frequency === f.id ? color : C.border}`, background: frequency === f.id ? color + '15' : C.bgCard, cursor: 'pointer' }}>
                <div style={{ width: 16, height: 16, borderRadius: 8, border: `2px solid ${frequency === f.id ? color : C.borderAccent}`, background: frequency === f.id ? color : 'transparent', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, color: frequency === f.id ? color : C.text, fontWeight: frequency === f.id ? 700 : 400 }}>{f.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={sLbl}>Review days</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {DAY_NAMES.map((d, i) => (
              <button key={i} onClick={() => toggleDay(i)} style={{ flex: 1, padding: '8px 2px', borderRadius: 8, border: `1.5px solid ${days.includes(i) ? color : C.border}`, background: days.includes(i) ? color + '22' : 'transparent', color: days.includes(i) ? color : C.textMuted, fontSize: 10, fontWeight: days.includes(i) ? 700 : 400, cursor: 'pointer' }}>{d}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={sLbl}>Zone notes & special rules</div>
          <textarea style={{ ...sInp, minHeight: 80, resize: 'vertical' }} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Plant examples, special care notes, reminders..." />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ ...sBtnP, flex: 1, padding: '11px' }} onClick={save}>Save zone</button>
          {zone.id > 4 && (
            <button style={{ ...sBtnS, color: C.dangerText, borderColor: C.dangerBorder }} onClick={() => { onDelete(zone.id); onClose() }}>Delete</button>
          )}
        </div>
      </div>
    </Modal>
  )
}

// ── Today's Zone Review ───────────────────────────────────────────────────────
function ZoneReview({ zone, plants, onUpdatePlant, onClose }) {
  const zonePlants = plants.filter(p => zone.id === 'prop'
    ? (p.propagations || []).some(pr => pr.status === 'Rooting')
    : p.wateringZone === zone.id
  )
  const [actions, setActions] = useState({}) // plantId -> 'watered'|'skipped'|'attention'
  const photoRef = useRef()
  const [propActions, setPropActions] = useState({}) // propId -> action

  function setAction(id, action) {
    setActions(prev => ({ ...prev, [id]: action }))
    if (action === 'watered') {
      onUpdatePlant(id, { lastWatered: new Date().toISOString(), waterStreak: ((plants.find(p=>p.id===id)||{}).waterStreak||0)+1 })
    }
    if (action === 'attention') {
      onUpdatePlant(id, { mood: 'struggling' })
    }
  }

  if (zone.id === 'prop') {
    const allProps = plants.flatMap(p => (p.propagations||[]).filter(pr=>pr.status==='Rooting').map(pr=>({...pr, plantId:p.id, plantName:p.nickname||p.name, plantEmoji:p.emoji||'🌿'})))

    return (
      <Sheet>
        <div style={sBtwn}>
          <div style={sH(16)}>✂️ Prop Zone Review</div>
          <button style={sBtnS} onClick={onClose}>✕</button>
        </div>
        <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 16, fontStyle: 'italic' }}>Check root length, change water, mist prop boxes. Every Sunday.</div>
        {allProps.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: C.textMuted, fontSize: 13, fontStyle: 'italic' }}>No active propagations. Start one in a plant's Propagation Lab tab.</div>
        )}
        {allProps.map(prop => (
          <div key={prop.id} style={sCard({ marginBottom: 10 })}>
            <div style={sBtwn}>
              <div style={sRow}>
                <span style={{ fontSize: 22 }}>{prop.plantEmoji}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{prop.plantName}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{prop.method} · Started {daysAgo(prop.date)}d ago</div>
                </div>
              </div>
              <div style={{ fontSize: 11, padding: '3px 8px', borderRadius: 8, background: C.accent + '22', color: C.accent, fontWeight: 700 }}>{prop.status}</div>
            </div>
            {prop.notes && <div style={{ fontSize: 12, color: C.textMuted, marginTop: 6, fontStyle: 'italic' }}>{prop.notes}</div>}
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
              {[
                { id: 'water_changed', label: '💧 Changed water', col: '#5b9fd4' },
                { id: 'progress_photo', label: '📸 Progress photo', col: C.lavender },
                { id: 'rooted', label: '🌱 Transferred to soil', col: C.accent },
                { id: 'failed', label: '❌ Didn\'t make it', col: C.dangerText },
              ].map(action => {
                const key = prop.id + '_' + action.id
                const done = propActions[key]
                return (
                  <button key={action.id} onClick={() => setPropActions(prev => ({...prev, [key]: !done}))} style={{ fontSize: 11, padding: '5px 10px', borderRadius: 8, border: `1px solid ${done ? action.col : C.border}`, background: done ? action.col + '22' : 'transparent', color: done ? action.col : C.textMuted, cursor: 'pointer' }}>
                    {done ? '✓ ' : ''}{action.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
        <div style={{ background: C.bgSubtle, borderRadius: 12, padding: '10px 14px', marginTop: 8, border: `0.5px solid ${C.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 4 }}>💡 Prop Zone reminder</div>
          <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>Check root length · Change water every 5–7 days · Open prop boxes for airflow · Mist if soil is dry · Celebrate every root you see</div>
        </div>
      </Sheet>
    )
  }

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(16)}>{zone.icon} {zone.name} Review</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 4, fontStyle: 'italic' }}>{zone.subtitle}</div>
      <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>
        Remember: <span style={{ color: C.text, fontWeight: 600 }}>Check before you water.</span> These are review days, not automatic watering days.
      </div>

      {zone.notes && (
        <div style={{ background: zone.color + '12', border: `1px solid ${zone.color}33`, borderRadius: 12, padding: '10px 14px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: zone.color, marginBottom: 4, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Zone notes</div>
          <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{zone.notes}</div>
        </div>
      )}

      {zonePlants.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: C.textMuted, fontSize: 13, fontStyle: 'italic' }}>No plants in this zone yet.</div>
      ) : null}

      {zonePlants.map(plant => {
        const ws = waterStatus(plant)
        const da = daysAgo(plant.lastWatered)
        const action = actions[plant.id]
        return (
          <div key={plant.id} style={{ ...sCard(), marginBottom: 10, borderColor: action === 'watered' ? C.accent + '66' : action === 'attention' ? C.dangerBorder : action === 'skipped' ? C.border : C.border, background: action === 'watered' ? C.accent + '08' : C.bgCard }}>
            <div style={sRow}>
              <div style={{ ...sAv(plant.photo, 46), fontSize: 24, borderColor: ws.color + '55', flexShrink: 0 }}>{!plant.photo && (plant.emoji || '🌿')}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={sBtwn}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{plant.nickname || plant.name}</div>
                  {action && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 7, background: action==='watered'?C.accent+'22':action==='attention'?C.danger:C.bgSubtle, color: action==='watered'?C.accent:action==='attention'?C.dangerText:C.textMuted, fontWeight: 700 }}>{action==='watered'?'✓ Watered':action==='skipped'?'Skipped':'Needs attention'}</span>}
                </div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{plant.room}{plant.species ? ' · ' + plant.species : ''}</div>
                <div style={{ fontSize: 11, color: ws.color, marginTop: 2, fontStyle: 'italic' }}>
                  {da === null ? 'Never watered' : `Last watered ${da}d ago`}
                </div>
              </div>
            </div>
            {!action && (
              <div style={{ display: 'flex', gap: 7, marginTop: 10 }}>
                <button onClick={() => setAction(plant.id, 'watered')} style={{ flex: 1, padding: '8px', borderRadius: 9, border: `1px solid ${C.accent}44`, background: C.accent + '15', color: C.accent, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>💧 Watered</button>
                <button onClick={() => setAction(plant.id, 'skipped')} style={{ flex: 1, padding: '8px', borderRadius: 9, border: `1px solid ${C.border}`, background: 'transparent', color: C.textMuted, fontSize: 12, cursor: 'pointer' }}>Skip</button>
                <button onClick={() => setAction(plant.id, 'attention')} style={{ flex: 1, padding: '8px', borderRadius: 9, border: `1px solid ${C.dangerBorder}`, background: C.danger, color: C.dangerText, fontSize: 12, cursor: 'pointer' }}>⚠️ Needs help</button>
              </div>
            )}
          </div>
        )
      })}

      {zonePlants.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <div style={{ fontSize: 12, color: C.textMuted }}>
            {Object.keys(actions).length} of {zonePlants.length} reviewed
          </div>
          {Object.keys(actions).length === zonePlants.length && (
            <div style={{ fontSize: 13, color: C.accent, fontWeight: 700, marginTop: 6 }}>✓ Zone review complete! 🌿</div>
          )}
        </div>
      )}
    </Sheet>
  )
}

// ── Main Watering Zones Screen ────────────────────────────────────────────────
export function WateringZones({ plants, onUpdatePlant, onClose }) {
  const [zones, setZones] = useState(() => ls('rr_zones', DEFAULT_ZONES))
  const [editingZone, setEditingZone] = useState(null)
  const [reviewing, setReviewing] = useState(null)
  const [assigning, setAssigning] = useState(null)
  const [showNewZone, setShowNewZone] = useState(false)
  const [view, setView] = useState('zones') // 'zones' | 'unassigned'

  function saveZones(updated) { setZones(updated); lsSet('rr_zones', updated) }
  function updateZone(id, fields) { saveZones(zones.map(z => z.id === id ? { ...z, ...fields } : z)) }
  function deleteZone(id) {
    saveZones(zones.filter(z => z.id !== id))
    plants.filter(p => p.wateringZone === id).forEach(p => onUpdatePlant(p.id, { wateringZone: null }))
  }
  function addZone() {
    const newId = Date.now()
    const newZone = { id: newId, name: 'New Zone', subtitle: 'Custom Zone', color: '#7ec850', icon: '🌿', days: [], scheduleLabel: 'Set days', notes: '', frequency: 'weekly' }
    saveZones([...zones, newZone])
    setEditingZone(newZone)
  }

  const allZones = [...zones, PROP_ZONE]
  const todayZones = allZones.filter(z => isDueToday(z))
  const unassigned = plants.filter(p => !p.wateringZone)
  const allProps = plants.flatMap(p => (p.propagations||[]).filter(pr=>pr.status==='Rooting'))

  return (
    <Sheet>
      {editingZone && (
        <ZoneEditModal
          zone={editingZone}
          onSave={updated => updateZone(updated.id, updated)}
          onDelete={deleteZone}
          onClose={() => setEditingZone(null)}
        />
      )}
      {reviewing && (
        <ZoneReview
          zone={reviewing}
          plants={plants}
          onUpdatePlant={onUpdatePlant}
          onClose={() => setReviewing(null)}
        />
      )}

      <div style={sBtwn}>
        <div style={sH(17)}>💧 Watering Zones</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4, marginBottom: 4, lineHeight: 1.6 }}>
        Group plants by when they need water. These are <span style={{ color: C.text, fontWeight: 600 }}>review days</span> — check before you water.
      </div>

      {/* Today's zones */}
      {todayZones.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8, marginTop: 12 }}>📅 Today's review</div>
          {todayZones.map(zone => {
            const count = zone.id === 'prop' ? allProps.length : plants.filter(p => p.wateringZone === zone.id).length
            return (
              <div key={zone.id} onClick={() => setReviewing(zone)} style={{ background: zone.color + '15', border: `1.5px solid ${zone.color}44`, borderRadius: 14, padding: '12px 16px', marginBottom: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: zone.color + '22', border: `1.5px solid ${zone.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{zone.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: zone.color }}>{zone.name}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{count} {zone.id === 'prop' ? 'active props' : 'plants'} to review</div>
                </div>
                <div style={{ background: zone.color, color: '#fff', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 700 }}>Review →</div>
              </div>
            )
          })}
        </div>
      )}

      <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10, marginTop: 4 }}>All zones</div>

      {/* Regular zones */}
      {zones.map(zone => {
        const zonePlants = plants.filter(p => p.wateringZone === zone.id)
        const isToday = isDueToday(zone)
        return (
          <div key={zone.id} style={{ ...sCard(), marginBottom: 10, borderColor: isToday ? zone.color + '55' : C.border }}>
            <div style={sBtwn}>
              <div style={sRow}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: zone.color + '22', border: `1.5px solid ${zone.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{zone.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: zone.color }}>{zone.name}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{zone.scheduleLabel} · {zonePlants.length} plants</div>
                  {zone.subtitle && <div style={{ fontSize: 11, color: C.textFaint, fontStyle: 'italic' }}>{zone.subtitle}</div>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {isToday && <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 7, background: zone.color + '22', color: zone.color, fontWeight: 700 }}>TODAY</span>}
                <button style={sBtnS} onClick={() => setEditingZone(zone)}>Edit</button>
                <button style={{ ...sBtnS, borderColor: C.accent + '55', color: C.accent }} onClick={() => setAssigning(assigning === zone.id ? null : zone.id)}>+ Plants</button>
              </div>
            </div>

            {/* Plants in zone */}
            {zonePlants.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                {zonePlants.map(p => {
                  const ws = waterStatus(p)
                  return (
                    <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                      <div style={{ ...sAv(p.photo, 42), fontSize: 20, borderColor: ws.color + '55' }}>{!p.photo && (p.emoji || '🌿')}</div>
                      <div style={{ fontSize: 8, color: C.textMuted, textAlign: 'center', maxWidth: 42 }}>{(p.nickname || p.name).slice(0, 7)}</div>
                      <button onClick={() => onUpdatePlant(p.id, { wateringZone: null })} style={{ fontSize: 8, color: C.textFaint, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>✕</button>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Assign panel */}
            {assigning === zone.id && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `0.5px solid ${C.border}` }}>
                <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 8 }}>Tap to add to {zone.name}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {plants.filter(p => p.wateringZone !== zone.id).map(p => {
                    const suggestion = suggestZone(p)
                    const suggested = suggestion && suggestion.zone === zone.id
                    return (
                      <div key={p.id} onClick={() => onUpdatePlant(p.id, { wateringZone: zone.id })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', position: 'relative' }}>
                        <div style={{ ...sAv(p.photo, 42), fontSize: 20, borderColor: suggested ? zone.color + '99' : (p.wateringZone ? '#3a3520' : C.border), opacity: p.wateringZone ? 0.4 : 1 }}>{!p.photo && (p.emoji || '🌿')}</div>
                        <div style={{ fontSize: 8, color: suggested ? zone.color : C.textMuted, textAlign: 'center', maxWidth: 42, fontWeight: suggested ? 700 : 400 }}>{(p.nickname || p.name).slice(0, 7)}</div>
                        {suggested && <div style={{ fontSize: 7, color: zone.color, fontWeight: 700 }}>✓ fit</div>}
                      </div>
                    )
                  })}
                </div>
                {/* Zone guidance */}
                {zone.notes && <div style={{ marginTop: 10, fontSize: 11, color: C.textMuted, fontStyle: 'italic', lineHeight: 1.5, background: C.bgSubtle, borderRadius: 8, padding: '7px 10px' }}>{zone.notes.split('\n')[0]}</div>}
                <button style={{ ...sBtnS, marginTop: 10 }} onClick={() => setAssigning(null)}>Done</button>
              </div>
            )}
          </div>
        )
      })}

      {/* Propagation Zone */}
      <div style={{ ...sCard(), marginBottom: 10, borderColor: allProps.length > 0 ? PROP_ZONE.color + '44' : C.border, borderStyle: 'dashed' }}>
        <div style={sBtwn}>
          <div style={sRow}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: PROP_ZONE.color + '22', border: `1.5px solid ${PROP_ZONE.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>✂️</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: PROP_ZONE.color }}>Prop Zone</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>Every Sunday · {allProps.length} active props</div>
              <div style={{ fontSize: 11, color: C.textFaint, fontStyle: 'italic' }}>Auto-filled from Propagation Lab</div>
            </div>
          </div>
          {isDueToday(PROP_ZONE) && <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 7, background: PROP_ZONE.color + '22', color: PROP_ZONE.color, fontWeight: 700 }}>TODAY</span>}
        </div>
        {allProps.length > 0 && (
          <button style={{ ...sBtnP, width: '100%', marginTop: 10, padding: '9px', fontSize: 12 }} onClick={() => setReviewing(PROP_ZONE)}>✂️ Start prop review</button>
        )}
        {allProps.length === 0 && <div style={{ fontSize: 12, color: C.textFaint, marginTop: 8, fontStyle: 'italic', textAlign: 'center' }}>Start propagations in any plant's lab to see them here</div>}
      </div>

      {/* Add custom zone */}
      <button onClick={addZone} style={{ width: '100%', padding: '11px', borderRadius: 14, border: `1px dashed ${C.borderAccent}`, background: 'transparent', color: C.textMuted, fontSize: 13, cursor: 'pointer', marginBottom: 10 }}>＋ Create custom zone</button>

      {/* Unassigned */}
      {unassigned.length > 0 && (
        <div style={sCard({ borderColor: C.borderAccent, borderStyle: 'dashed' })}>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>🌿 Not in a zone yet ({unassigned.length})</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {unassigned.map(p => {
              const suggestion = suggestZone(p)
              return (
                <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ ...sAv(p.photo, 42), fontSize: 20, opacity: 0.7 }}>{!p.photo && (p.emoji || '🌿')}</div>
                  <div style={{ fontSize: 8, color: C.textMuted, textAlign: 'center', maxWidth: 42 }}>{(p.nickname || p.name).slice(0, 7)}</div>
                  {suggestion && <div style={{ fontSize: 8, color: zones.find(z=>z.id===suggestion.zone)?.color || C.accent, fontWeight: 700 }}>→ Z{suggestion.zone}</div>}
                </div>
              )
            })}
          </div>
          {unassigned.some(p => suggestZone(p)) && (
            <div style={{ marginTop: 10, fontSize: 11, color: C.textMuted, fontStyle: 'italic', lineHeight: 1.5 }}>
              Arrows show suggested zones based on plant type. Open a zone and tap plants to assign them.
            </div>
          )}
        </div>
      )}

      <div style={{ fontSize: 11, color: C.textFaint, textAlign: 'center', marginTop: 14, lineHeight: 1.6, fontStyle: 'italic' }}>
        Watering Zones are review schedules, not automatic watering schedules.{'\n'}Check soil before you water.
      </div>
    </Sheet>
  )
}
