import React, { useState } from 'react'
import { C, SPACE_NAMES, ls, lsSet } from './constants'
import { Modal, Sheet, sBtn, sBtnP, sBtnS, sInp, sLbl, sBtwn, sRow, sCard, sH } from './components'

// ── Reusable row component for settings ──────────────────────────────────────
function SettingRow({ icon, label, value, onPress, danger }) {
  return (
    <div onClick={onPress} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: `0.5px solid ${C.border}`, cursor: onPress ? 'pointer' : 'default' }}>
      <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, color: danger ? C.dangerText : C.text }}>{label}</div>
        {value && <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{value}</div>}
      </div>
      {onPress && <span style={{ color: C.textMuted, fontSize: 16 }}>›</span>}
    </div>
  )
}

function SectionHeader({ label }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: '1px', textTransform: 'uppercase', margin: '18px 0 6px' }}>{label}</div>
}

// ── Profile Screen ────────────────────────────────────────────────────────────
export function ProfileScreen({ user, onSave, onClose }) {
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [saved, setSaved] = useState(false)

  function save() {
    onSave({ ...user, name, email, bio })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(17)}>👤 Profile</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: 24, background: C.bgSubtle, border: `2px solid ${C.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 10px' }}>🌿</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>Profile photo coming soon</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={sLbl}>Display name</div>
          <input style={sInp} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={sLbl}>Email</div>
          <input style={sInp} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={sLbl}>Bio</div>
          <textarea style={{ ...sInp, minHeight: 80, resize: 'vertical' }} value={bio} onChange={e => setBio(e.target.value)} placeholder="Plant parent. Feral about ferns." />
        </div>
        <button style={{ ...sBtnP, width: '100%', padding: '12px' }} onClick={save}>
          {saved ? '✓ Saved!' : 'Save profile'}
        </button>
      </div>
    </Sheet>
  )
}

// ── Reminders Screen ──────────────────────────────────────────────────────────
export function RemindersScreen({ onClose }) {
  const [waterReminders, setWaterReminders] = useState(() => ls('rr_remind_water', true))
  const [fertilizeReminders, setFertilizeReminders] = useState(() => ls('rr_remind_fert', false))
  const [reminderTime, setReminderTime] = useState(() => ls('rr_remind_time', '09:00'))
  const [saved, setSaved] = useState(false)

  function save() {
    lsSet('rr_remind_water', waterReminders)
    lsSet('rr_remind_fert', fertilizeReminders)
    lsSet('rr_remind_time', reminderTime)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const Toggle = ({ value, onChange, label, sub }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: `0.5px solid ${C.border}` }}>
      <div>
        <div style={{ fontSize: 14, color: C.text }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{sub}</div>}
      </div>
      <div onClick={() => onChange(!value)} style={{ width: 44, height: 26, borderRadius: 13, background: value ? C.accent : C.bgSubtle, border: `1px solid ${value ? C.accent : C.borderAccent}`, position: 'relative', cursor: 'pointer', transition: 'all 0.2s' }}>
        <div style={{ width: 20, height: 20, borderRadius: 10, background: value ? C.accentText : C.textMuted, position: 'absolute', top: 2, left: value ? 20 : 2, transition: 'left 0.2s' }} />
      </div>
    </div>
  )

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(17)}>🔔 Reminders</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4, marginBottom: 20, fontStyle: 'italic' }}>
        Push notifications are coming in the next update. For now these save your preferences.
      </div>
      <Toggle value={waterReminders} onChange={setWaterReminders} label="Watering reminders" sub="Get notified when plants need water" />
      <Toggle value={fertilizeReminders} onChange={setFertilizeReminders} label="Fertilizing reminders" sub="Monthly fertilizer nudges" />
      <div style={{ padding: '14px 0', borderBottom: `0.5px solid ${C.border}` }}>
        <div style={{ fontSize: 14, color: C.text, marginBottom: 8 }}>Reminder time</div>
        <input style={{ ...sInp, width: 'auto' }} type="time" value={reminderTime} onChange={e => setReminderTime(e.target.value)} />
      </div>
      <button style={{ ...sBtnP, width: '100%', padding: '12px', marginTop: 20 }} onClick={save}>
        {saved ? '✓ Saved!' : 'Save preferences'}
      </button>
    </Sheet>
  )
}

// ── Appearance Screen ─────────────────────────────────────────────────────────
export function AppearanceScreen({ onClose, darkMode, onToggleDarkMode }) {
  const [fontsize, setFontsize] = useState(() => ls('rr_fontsize', 'normal'))
  const [saved, setSaved] = useState(false)

  const sizes = [
    { id: 'small', label: 'Small' },
    { id: 'normal', label: 'Normal' },
    { id: 'large', label: 'Large' },
  ]

  function save() {
    lsSet('rr_fontsize', fontsize)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(17)}>🌙 Appearance</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      <div style={{ marginTop: 20 }}>

        {/* Dark / Light toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderRadius: 16, border: `1.5px solid ${C.border}`, background: C.bgCard, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 15, color: C.text, fontWeight: 600 }}>{darkMode ? '🌙 Dark mode' : '☀️ Light mode'}</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 3 }}>{darkMode ? 'Dark botanical — moody and rooted' : 'Light and airy — morning vibes'}</div>
          </div>
          <div
            onClick={onToggleDarkMode}
            style={{
              width: 52, height: 30, borderRadius: 15,
              background: darkMode ? C.accent : '#d0c8b0',
              border: `1px solid ${darkMode ? C.accent : '#b8a888'}`,
              position: 'relative', cursor: 'pointer',
              transition: 'background 0.3s',
              flexShrink: 0, marginLeft: 16,
            }}
          >
            <div style={{
              width: 24, height: 24, borderRadius: 12,
              background: '#fff',
              position: 'absolute', top: 2,
              left: darkMode ? 24 : 2,
              transition: 'left 0.3s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13,
            }}>
              {darkMode ? '🌙' : '☀️'}
            </div>
          </div>
        </div>

        <div style={sLbl}>Text size</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {sizes.map(s => (
            <button key={s.id} onClick={() => setFontsize(s.id)} style={{ flex: 1, padding: '10px', borderRadius: 12, border: `1.5px solid ${fontsize === s.id ? C.accent : C.border}`, background: fontsize === s.id ? C.bgSubtle : C.bgCard, color: fontsize === s.id ? C.accent : C.textMuted, fontSize: 13, fontWeight: fontsize === s.id ? 700 : 400, cursor: 'pointer' }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: C.bgSubtle, borderRadius: 12, padding: '12px 14px', marginBottom: 20, border: `0.5px solid ${C.border}` }}>
          <div style={{ fontSize: 12, color: C.textMuted, fontStyle: 'italic' }}>🌸 Seasonal themes are live! The app automatically shifts accent colors and greetings by season — Spring, Summer, Autumn, and Winter.</div>
        </div>
        <button style={{ ...sBtnP, width: '100%', padding: '12px' }} onClick={save}>
          {saved ? '✓ Saved!' : 'Save preferences'}
        </button>
      </div>
    </Sheet>
  )
}

// ── Temperature Units Screen ──────────────────────────────────────────────────
export function TempUnitsScreen({ onClose }) {
  const [unit, setUnit] = useState(() => ls('rr_temp', 'F'))
  const [saved, setSaved] = useState(false)

  function save() {
    lsSet('rr_temp', unit)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(17)}>🌡️ Temperature Units</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 20 }}>Used for care tips and plant information.</div>
        {[{ id: 'F', label: 'Fahrenheit', ex: '65–85°F' }, { id: 'C', label: 'Celsius', ex: '18–29°C' }].map(u => (
          <div key={u.id} onClick={() => setUnit(u.id)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 14px', borderRadius: 14, border: `1.5px solid ${unit === u.id ? C.accent : C.border}`, background: unit === u.id ? C.bgSubtle : C.bgCard, cursor: 'pointer', marginBottom: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: unit === u.id ? C.accent + '22' : C.bgSubtle, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>°{u.id}</div>
            <div>
              <div style={{ fontSize: 15, color: unit === u.id ? C.accent : C.text, fontWeight: unit === u.id ? 700 : 400 }}>{u.label}</div>
              <div style={{ fontSize: 13, color: C.textMuted }}>e.g. {u.ex}</div>
            </div>
            {unit === u.id && <div style={{ marginLeft: 'auto', color: C.accent, fontSize: 18 }}>✓</div>}
          </div>
        ))}
        <button style={{ ...sBtnP, width: '100%', padding: '12px', marginTop: 10 }} onClick={save}>
          {saved ? '✓ Saved!' : 'Save preference'}
        </button>
      </div>
    </Sheet>
  )
}

// ── Calendar Screen ───────────────────────────────────────────────────────────
export function CalendarScreen({ plants, onClose }) {
  const today = new Date()
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
  const monthName = today.toLocaleString('default', { month: 'long', year: 'numeric' })

  // Build watering schedule
  const wateringDays = {}
  plants.forEach(plant => {
    if (!plant.lastWatered) return
    const last = new Date(plant.lastWatered)
    const freq = plant.waterFreqDays || 7
    for (let i = 1; i <= 60; i++) {
      const next = new Date(last)
      next.setDate(last.getDate() + freq * i)
      if (next.getMonth() === today.getMonth() && next.getFullYear() === today.getFullYear()) {
        const d = next.getDate()
        if (!wateringDays[d]) wateringDays[d] = []
        wateringDays[d].push(plant.nickname || plant.name)
      }
    }
  })

  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(17)}>📅 Watering Calendar</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      <div style={{ fontSize: 14, color: C.textMuted, marginTop: 4, marginBottom: 16 }}>{monthName}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 16 }}>
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: '0.5px', padding: '4px 0' }}>{d}</div>
        ))}
        {days.map((day, i) => {
          const isToday = day === today.getDate()
          const hasWatering = day && wateringDays[day]
          return (
            <div key={i} style={{ textAlign: 'center', padding: '6px 2px', borderRadius: 8, background: isToday ? C.accent : hasWatering ? C.bgSubtle : 'transparent', border: isToday ? 'none' : hasWatering ? `1px solid ${C.accent}44` : 'none', minHeight: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 13, color: isToday ? C.accentText : day ? C.text : 'transparent', fontWeight: isToday ? 700 : 400 }}>{day || ''}</div>
              {hasWatering && !isToday && <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.accent, marginTop: 2 }} />}
            </div>
          )
        })}
      </div>
      {Object.keys(wateringDays).length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Upcoming this month</div>
          {Object.entries(wateringDays).sort((a,b) => parseInt(a[0]) - parseInt(b[0])).map(([day, names]) => (
            <div key={day} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `0.5px solid ${C.border}` }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: parseInt(day) < today.getDate() ? C.bgSubtle : C.accent + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: parseInt(day) < today.getDate() ? C.textMuted : C.accent, flexShrink: 0 }}>{day}</div>
              <div style={{ fontSize: 13, color: C.text }}>💧 {names.join(', ')}</div>
            </div>
          ))}
        </div>
      )}
      {Object.keys(wateringDays).length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: C.textMuted, fontSize: 13, fontStyle: 'italic' }}>Add plants with watering schedules to see your calendar fill up.</div>
      )}
    </Sheet>
  )
}

// ── Photo Storage Screen ──────────────────────────────────────────────────────
export function PhotoStorageScreen({ plants, onClose }) {
  const photos = plants.filter(p => p.photo).map(p => ({ name: p.nickname || p.name, photo: p.photo }))
  const journalPhotos = plants.flatMap(p => (p.journal || []).filter(j => j.photo).map(j => ({ name: p.nickname || p.name, photo: j.photo, date: j.date })))

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(17)}>📷 Photo Storage</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4, marginBottom: 20 }}>Photos are stored locally on your device. Cloud backup coming soon.</div>
      {photos.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Plant avatars ({photos.length})</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {photos.map((p, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img src={p.photo} alt={p.name} style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover', border: `1px solid ${C.border}` }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', borderRadius: '0 0 12px 12px', padding: '3px 5px', fontSize: 9, color: '#fff', textAlign: 'center' }}>{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {journalPhotos.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>Journal photos ({journalPhotos.length})</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {journalPhotos.map((p, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img src={p.photo} alt={p.name} style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover', border: `1px solid ${C.border}` }} />
              </div>
            ))}
          </div>
        </div>
      )}
      {photos.length === 0 && journalPhotos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: C.textMuted, fontSize: 13, fontStyle: 'italic' }}>No photos yet. Upload plant photos and they'll appear here.</div>
      )}
    </Sheet>
  )
}

// ── Backup & Sync Screen ──────────────────────────────────────────────────────
export function BackupScreen({ plants, onClose }) {
  const [exported, setExported] = useState(false)

  function exportData() {
    const data = {
      exported: new Date().toISOString(),
      version: '1.0',
      plants: plants,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rooted-backup.json'
    a.click()
    URL.revokeObjectURL(url)
    setExported(true)
    setTimeout(() => setExported(false), 3000)
  }

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(17)}>☁️ Backup & Sync</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ background: C.bgSubtle, borderRadius: 14, padding: '16px', marginBottom: 20, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 6 }}>📦 Local backup</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 14, lineHeight: 1.6 }}>Download all your plant data as a JSON file. Keep it safe — you can restore it later.</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 13, color: C.textMuted }}>🌿 {plants.length} plants</div>
            <div style={{ fontSize: 13, color: C.textMuted }}>·</div>
            <div style={{ fontSize: 13, color: C.textMuted }}>📖 {plants.reduce((a, p) => a + (p.journal||[]).length, 0)} journal entries</div>
          </div>
          <button style={{ ...sBtnP, width: '100%', padding: '12px' }} onClick={exportData}>
            {exported ? '✓ Downloaded!' : '⬇️ Export my data'}
          </button>
        </div>
        <div style={{ background: C.bgSubtle, borderRadius: 14, padding: '16px', border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 6 }}>☁️ Cloud sync</div>
          <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>Automatic cloud backup across all your devices is coming in the next update. Your data will sync seamlessly once you create an account.</div>
        </div>
      </div>
    </Sheet>
  )
}

// ── Contact Support Screen ────────────────────────────────────────────────────
export function ContactScreen({ onClose }) {
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

  function send() {
    if (!msg.trim()) return
    setSent(true)
    setMsg('')
  }

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(17)}>📬 Contact Support</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      {sent ? (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
          <div style={{ fontSize: 18, color: C.accent, fontWeight: 600, marginBottom: 8 }}>Message received!</div>
          <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>We'll get back to you soon. Thank you for helping make Rooted better.</div>
          <button style={{ ...sBtnP, marginTop: 24, padding: '10px 28px' }} onClick={() => setSent(false)}>Send another</button>
        </div>
      ) : (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 20, lineHeight: 1.6 }}>Found a bug? Have a feature idea? Just want to say hi? We read everything.</div>
          <div style={{ marginBottom: 12 }}>
            <div style={sLbl}>What's on your mind?</div>
            <textarea style={{ ...sInp, minHeight: 140, resize: 'vertical' }} placeholder="Tell us anything..." value={msg} onChange={e => setMsg(e.target.value)} />
          </div>
          <button style={{ ...sBtnP, width: '100%', padding: '12px' }} onClick={send} disabled={!msg.trim()}>Send message</button>
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: C.textMuted }}>Or email us at <span style={{ color: C.accent }}>hello@cozyskull.com</span></div>
        </div>
      )}
    </Sheet>
  )
}

// ── Rate Rooted Screen ────────────────────────────────────────────────────────
export function RateScreen({ onClose }) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <Sheet>
      <div style={sBtwn}>
        <div style={sH(17)}>⭐ Rate Rooted</div>
        <button style={sBtnS} onClick={onClose}>✕</button>
      </div>
      {sent ? (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
          <div style={{ fontSize: 18, color: C.accent, fontWeight: 600, marginBottom: 8 }}>Thank you!</div>
          <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>Your feedback means everything to this small team.</div>
        </div>
      ) : (
        <div style={{ marginTop: 24 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 16, color: C.textMuted, marginBottom: 16 }}>How are you feeling about Rooted?</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setRating(n)} style={{ fontSize: 36, background: 'none', border: 'none', cursor: 'pointer', opacity: n <= rating ? 1 : 0.3, transition: 'opacity 0.15s' }}>⭐</button>
              ))}
            </div>
          </div>
          {rating > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={sLbl}>Tell us more (optional)</div>
              <textarea style={{ ...sInp, minHeight: 100, resize: 'vertical' }} placeholder={rating >= 4 ? "What do you love about it?" : "What could be better?"} value={review} onChange={e => setReview(e.target.value)} />
            </div>
          )}
          <button style={{ ...sBtnP, width: '100%', padding: '12px', opacity: rating === 0 ? 0.4 : 1 }} onClick={() => { if (rating > 0) setSent(true) }} disabled={rating === 0}>
            Submit rating
          </button>
        </div>
      )}
    </Sheet>
  )
}
