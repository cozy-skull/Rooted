import React, { useState } from 'react'
import { C, MOOD_COLOR, daysAgo } from './constants'
import { sCard, sH, sBtwn, sRow, sBdg, sBtnS, sAv } from './components'

function TimelineEvent({ event, isLast }) {
  const typeConfig = {
    watered:     { icon: '💧', color: '#5b9fd4', label: 'Watered' },
    fertilized:  { icon: '🌱', color: '#7ec850', label: 'Fertilized' },
    repotted:    { icon: '🪴', color: '#c8922a', label: 'Repotted' },
    mood_change: { icon: '🌿', color: C.textMuted, label: 'Mood changed' },
    journal:     { icon: '📖', color: C.lavender, label: 'Journal entry' },
    milestone:   { icon: '⭐', color: '#c8922a', label: 'Milestone' },
    acquired:    { icon: '🏠', color: '#7ec850', label: 'Joined the family' },
    pest:        { icon: '🛡️', color: '#e87070', label: 'Pest treated' },
    propagation: { icon: '✂️', color: '#7ec850', label: 'Propagation started' },
  }

  const cfg = typeConfig[event.type] || { icon: '🌿', color: C.textMuted, label: event.type }

  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: isLast ? 0 : 4 }}>
      {/* Timeline spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 36 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: cfg.color + '22', border: `1.5px solid ${cfg.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
          {cfg.icon}
        </div>
        {!isLast && <div style={{ width: 2, flex: 1, minHeight: 16, background: C.border, margin: '4px 0' }} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 16, paddingTop: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{event.label || cfg.label}</div>
          <div style={{ fontSize: 11, color: C.textMuted }}>{event.dateStr}</div>
        </div>
        {event.note && (
          <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5, marginTop: 2 }}>{event.note}</div>
        )}
        {event.photo && (
          <img src={event.photo} alt="" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 10, marginTop: 8, border: `1px solid ${C.border}` }} />
        )}
        {event.mood && (
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 8, background: MOOD_COLOR[event.mood] + '22', color: MOOD_COLOR[event.mood], fontWeight: 700, marginTop: 4, display: 'inline-block' }}>{event.mood}</span>
        )}
      </div>
    </div>
  )
}

function buildTimeline(plant) {
  const events = []

  function fmt(iso) {
    if (!iso) return ''
    const d = new Date(iso)
    const daysA = Math.floor((Date.now() - d) / 86400000)
    if (daysA === 0) return 'Today'
    if (daysA === 1) return 'Yesterday'
    if (daysA < 7) return `${daysA}d ago`
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: d.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined })
  }

  // Acquired
  if (plant.acquiredDate) {
    events.push({ type: 'acquired', date: new Date(plant.acquiredDate).getTime(), dateStr: fmt(plant.acquiredDate), label: `${plant.nickname || plant.name} joined the family`, note: plant.rescueStory || plant.giftedFrom ? (plant.giftedFrom ? `Gifted by ${plant.giftedFrom}` : plant.rescueStory) : null })
  }

  // Journal entries
  ;(plant.journal || []).forEach(j => {
    events.push({ type: 'journal', date: new Date(j.date).getTime(), dateStr: fmt(j.date), note: j.note, photo: j.photo })
  })

  // Milestones
  ;(plant.milestones || []).forEach(m => {
    events.push({ type: 'milestone', date: new Date(m.date).getTime(), dateStr: fmt(m.date), label: m.text })
  })

  // Propagations
  ;(plant.propagations || []).forEach(p => {
    events.push({ type: 'propagation', date: new Date(p.date).getTime(), dateStr: fmt(p.date), label: `Propagation started — ${p.method}`, note: p.notes || null })
  })

  // Pest treatments
  ;(plant.pests || []).filter(p => p.treated).forEach(p => {
    events.push({ type: 'pest', date: new Date(p.date).getTime(), dateStr: fmt(p.date), label: `${p.type} — treated & resolved` })
  })

  // Last watered / fertilized / repotted (just the most recent)
  if (plant.lastWatered) {
    events.push({ type: 'watered', date: new Date(plant.lastWatered).getTime(), dateStr: fmt(plant.lastWatered), label: `Watered${(plant.waterStreak||0) > 2 ? ` — 🔥 ${plant.waterStreak}-day streak` : ''}` })
  }
  if (plant.lastFertilized) {
    events.push({ type: 'fertilized', date: new Date(plant.lastFertilized).getTime(), dateStr: fmt(plant.lastFertilized) })
  }
  if (plant.lastRepotted) {
    events.push({ type: 'repotted', date: new Date(plant.lastRepotted).getTime(), dateStr: fmt(plant.lastRepotted) })
  }

  // Sort newest first
  return events.sort((a, b) => b.date - a.date)
}

export default function GrowthTimeline({ plant }) {
  const [filter, setFilter] = useState('all')
  const events = buildTimeline(plant)

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'journal', label: '📖 Journal' },
    { id: 'care', label: '💧 Care' },
    { id: 'milestones', label: '⭐ Milestones' },
  ]

  const careTypes = ['watered', 'fertilized', 'repotted', 'pest', 'propagation']

  const filtered = events.filter(e => {
    if (filter === 'all') return true
    if (filter === 'journal') return e.type === 'journal'
    if (filter === 'care') return careTypes.includes(e.type)
    if (filter === 'milestones') return e.type === 'milestone' || e.type === 'acquired'
    return true
  })

  // Summary stats
  const ageStr = plant.acquiredDate
    ? (() => {
        const days = Math.floor((Date.now() - new Date(plant.acquiredDate)) / 86400000)
        if (days < 30) return `${days} days old`
        if (days < 365) return `${Math.floor(days/30)} months old`
        const yrs = Math.floor(days/365)
        const mos = Math.floor((days % 365) / 30)
        return `${yrs}y ${mos}m old`
      })()
    : null

  return (
    <div>
      {/* Stats strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[
          { icon: '📅', val: ageStr || '—', label: 'Age' },
          { icon: '📖', val: (plant.journal || []).length, label: 'Entries' },
          { icon: '⭐', val: (plant.milestones || []).length, label: 'Milestones' },
        ].map((s, i) => (
          <div key={i} style={{ background: C.bgSubtle, borderRadius: 12, padding: '10px 8px', textAlign: 'center', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 18, marginBottom: 2 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: C.accent }}>{s.val}</div>
            <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto' }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, border: `1px solid ${filter === f.id ? C.accent : C.border}`, background: filter === f.id ? C.bgSubtle : 'transparent', cursor: 'pointer', color: filter === f.id ? C.accent : C.textMuted, fontWeight: filter === f.id ? 700 : 400, flexShrink: 0, fontFamily: 'inherit' }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: C.textMuted, fontSize: 13, fontStyle: 'italic' }}>
          No {filter === 'all' ? '' : filter + ' '}events yet. Start documenting this plant's story.
        </div>
      ) : (
        <div>
          {filtered.map((event, i) => (
            <TimelineEvent key={i} event={event} isLast={i === filtered.length - 1} />
          ))}
        </div>
      )}
    </div>
  )
}
