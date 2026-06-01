import React, { useState } from 'react'
import { C, ls, lsSet, waterStatus } from './constants'
import { Sheet, sBtn, sBtnP, sBtnS, sInp, sLbl, sBtwn, sRow, sCard, sH, sAv } from './components'

const ZONE_COLORS = ['#7ec850', '#5b9fd4', '#c8922a', '#9a7ab8']
const ZONE_ICONS = ['🌱', '💧', '☀️', '🌙']
const ZONE_DEFAULTS = [
  { name: 'Zone 1', schedule: 'Mon & Thu' },
  { name: 'Zone 2', schedule: 'Wednesday' },
  { name: 'Zone 3', schedule: 'Saturday' },
  { name: 'Zone 4', schedule: 'Monthly' },
]

export function WateringZones({ plants, onUpdatePlant, onClose }) {
  const [zones, setZones] = useState(() => ls('rr_zones', ZONE_DEFAULTS.map((z, i) => ({ ...z, id: i + 1, color: ZONE_COLORS[i], icon: ZONE_ICONS[i] }))))
  const [editingZone, setEditingZone] = useState(null)
  const [assigning, setAssigning] = useState(null) // plant being assigned

  function saveZones(updated) {
    setZones(updated)
    lsSet('rr_zones', updated)
  }

  function updateZone(id, fields) {
    saveZones(zones.map(z => z.id === id ? { ...z, ...fields } : z))
  }

  function assignPlantToZone(plantId, zoneId) {
    onUpdatePlant(plantId, { wateringZone: zoneId })
    setAssigning(null)
  }

  function getPlantsInZone(zoneId) {
    return plants.filter(p => p.wateringZone === zoneId)
  }

  function getUnassignedPlants() {
    return plants.filter(p => !p.wateringZone)
  }

  // What zone is due today?
  const today = new Date().getDay() // 0=Sun, 1=Mon...
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const todayName = dayNames[today]

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(17)}>💧 Watering Zones</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4, marginBottom: 20, lineHeight: 1.6 }}>
        Group plants by when they need water. Less chaos, more thriving. 🌿
      </div>

      {zones.map((zone, idx) => {
        const zonePlants = getPlantsInZone(zone.id)
        const isToday = zone.schedule.toLowerCase().includes(todayName.toLowerCase())

        return (
          <div key={zone.id} style={{ ...sCard(), marginBottom: 12, borderColor: isToday ? zone.color + '66' : C.border, background: isToday ? zone.color + '08' : C.bgCard }}>
            <div style={sBtwn}>
              <div style={sRow}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: zone.color + '22', border: `1.5px solid ${zone.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {zone.icon}
                </div>
                <div>
                  {editingZone === zone.id ? (
                    <input style={{ ...sInp, fontSize: 14, fontWeight: 700, width: 120, padding: '4px 8px' }} value={zone.name} onChange={e => updateZone(zone.id, { name: e.target.value })} onBlur={() => setEditingZone(null)} autoFocus />
                  ) : (
                    <div style={{ fontSize: 14, fontWeight: 700, color: zone.color, cursor: 'pointer' }} onClick={() => setEditingZone(zone.id)}>{zone.name}</div>
                  )}
                  <div style={{ fontSize: 12, color: C.textMuted }}>{zone.schedule} · {zonePlants.length} plants</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {isToday && <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 8, background: zone.color + '22', color: zone.color, fontWeight: 700 }}>TODAY</span>}
                <button style={sBtnS} onClick={() => setAssigning(zone.id)}>+ Add plant</button>
              </div>
            </div>

            {/* Plants in zone */}
            {zonePlants.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                {zonePlants.map(p => {
                  const ws = waterStatus(p)
                  return (
                    <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer' }} onClick={() => onUpdatePlant(p.id, { wateringZone: null })}>
                      <div style={{ ...sAv(p.photo, 44), fontSize: 22, borderColor: ws.color + '55' }}>{!p.photo && (p.emoji || '🌿')}</div>
                      <div style={{ fontSize: 9, color: C.textMuted, textAlign: 'center', maxWidth: 44 }}>{(p.nickname || p.name).slice(0, 6)}</div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Assign plants dropdown */}
            {assigning === zone.id && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `0.5px solid ${C.border}` }}>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>Tap a plant to add to {zone.name}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {plants.filter(p => p.wateringZone !== zone.id).map(p => (
                    <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', opacity: p.wateringZone ? 0.4 : 1 }} onClick={() => assignPlantToZone(p.id, zone.id)}>
                      <div style={{ ...sAv(p.photo, 40), fontSize: 20, borderColor: p.wateringZone ? '#3a3520' : C.accent + '55' }}>{!p.photo && (p.emoji || '🌿')}</div>
                      <div style={{ fontSize: 9, color: C.textMuted, textAlign: 'center', maxWidth: 40 }}>{(p.nickname || p.name).slice(0, 6)}</div>
                    </div>
                  ))}
                </div>
                <button style={{ ...sBtnS, marginTop: 10 }} onClick={() => setAssigning(null)}>Done</button>
              </div>
            )}
          </div>
        )
      })}

      {/* Unassigned plants */}
      {getUnassignedPlants().length > 0 && (
        <div style={sCard({ borderStyle: 'dashed', borderColor: C.borderAccent })}>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 10 }}>🌿 Not yet assigned ({getUnassignedPlants().length})</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {getUnassignedPlants().map(p => (
              <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ ...sAv(p.photo, 40), fontSize: 20, opacity: 0.6 }}>{!p.photo && (p.emoji || '🌿')}</div>
                <div style={{ fontSize: 9, color: C.textFaint, textAlign: 'center', maxWidth: 40 }}>{(p.nickname || p.name).slice(0, 6)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ fontSize: 12, color: C.textFaint, textAlign: 'center', marginTop: 16, fontStyle: 'italic' }}>
        Tap a plant in a zone to remove it. Tap "Add plant" to assign.
      </div>
    </Sheet>
  )
}
