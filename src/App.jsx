import React, { useState, useEffect, useRef } from 'react'
import iconLogo from './assets/icon.png'
import splashLogo from './assets/splash.png'
import SplashScreen from './SplashScreen'
import Onboarding from './Onboarding'
import { Ring, Confetti, Modal, Sheet, EmojiPick, sBtn, sBtnP, sBtnS, sInp, sLbl, sBtwn, sRow, sCard, sTab, sBdg, sH, sAv } from './components'
import { C, MOOD_COLOR, MOODS, ROOMS, PESTS, VERDICTS, PLANT_BADGES, EMOJIS, INIT_PLANTS, INIT_POSTS, QUOTES, TASKS, SPACE_NAMES, PROFILE_BADGES, SEASONAL_THEMES, getSeason, daysAgo, waterStatus, sassyMsg, getGreeting, ls, lsSet, setThemeColors, checkAutoEarnBadges, checkProfileBadges, searchPlantDB, PLANT_DB } from './constants'
import GrowthTimeline from './GrowthTimeline'
import { AboutRooted, AboutCozySkull } from './AboutPages'
import { RecoveryMode, PhotoDiagnosis } from './RecoveryMode'
import { MemorialGarden, moveToMemorial } from './MemorialGarden'
import { WateringZones, suggestZone } from './WateringZones'
import { ProfileScreen, RemindersScreen, AppearanceScreen, TempUnitsScreen, CalendarScreen, PhotoStorageScreen, BackupScreen, ContactScreen, RateScreen } from './Settings'

const NAV = [
  ['greenhouse', '🌿', 'Greenhouse'],
  ['collection', '🪴', 'Collection'],
  ['planterr', '🚑', 'Plant ER'],
  ['community', '☕', 'Community'],
  ['journal', '📖', 'Journal'],
]

function PropLabModal({ plants, onUpdatePlant, onNavigate, onClose, C, sCard, sH, sBtn, sBtnP, sBdg }) {
  const [filterStatus, setFilterStatus] = useState('all')
  const statuses = ['all', 'Rooting', 'Potted', 'Gifted', 'Failed']
  const allProps = plants.flatMap(p =>
    (p.propagations || []).map(pr => ({ ...pr, plantId: p.id, plantName: p.name, plantEmoji: p.emoji || '🪴' }))
  )
  const filtered = filterStatus === 'all' ? allProps : allProps.filter(pr => pr.status === filterStatus)
  const statusColor = { Rooting: C.accent, Potted: '#6ab04c', Gifted: '#c8922a', Failed: '#888' }

  return (
    <div style={{ position: 'fixed', inset: 0, background: C.bg, zIndex: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${C.border}`, position: 'sticky', top: 0, background: C.bg, zIndex: 10 }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.textMuted, fontSize: 20, cursor: 'pointer', padding: 0, lineHeight: 1 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: C.text }}>✂️ Propagation Lab</div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>{allProps.length} total across {plants.filter(p => p.propagations?.length).length} plants</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, padding: '10px 16px', overflowX: 'auto', borderBottom: `1px solid ${C.border}` }}>
        {statuses.map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} style={{
            padding: '5px 14px', borderRadius: 20, border: `1px solid ${filterStatus === s ? C.accent : C.border}`,
            background: filterStatus === s ? C.accent + '22' : 'transparent',
            color: filterStatus === s ? C.accent : C.textMuted, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0
          }}>{s === 'all' ? `All (${allProps.length})` : `${s} (${allProps.filter(p => p.status === s).length})`}</button>
        ))}
      </div>

      <div style={{ padding: '12px 16px', flex: 1 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: C.textMuted }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>✂️</div>
            <div style={{ fontStyle: 'italic', fontSize: 14 }}>No propagations yet. Snip snip!</div>
            <div style={{ fontSize: 12, marginTop: 6 }}>Open a plant's Propagations tab to get started.</div>
          </div>
        )}
        {filtered.map(prop => (
          <div key={`${prop.plantId}-${prop.id}`} onClick={() => onNavigate(prop.plantId)}
            style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '12px 14px', marginBottom: 10, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>{prop.plantEmoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: C.textMuted }}>{prop.plantName}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{prop.method || 'Unnamed prop'}</div>
              </div>
              <span style={{ background: (statusColor[prop.status] || C.accent) + '22', color: statusColor[prop.status] || C.accent, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 10 }}>{prop.status}</span>
            </div>
            {prop.notes && <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{prop.notes}</div>}
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{prop.available && <span style={{ color: C.accent, marginRight: 8 }}>📋 On swap board</span>}{new Date(prop.date).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [spaceName, setSpaceName] = useState(() => ls('rr_space', null))
  const isFirstLaunch = !ls('rr_onboarded', null)
  const [appPhase, setAppPhase] = useState(isFirstLaunch ? 'splash_first' : 'splash_return')
  // splash_first → onboarding → app
  // splash_return → app
  const [darkMode, setDarkMode] = useState(() => {
    const saved = ls('rr_darkmode', true)
    setThemeColors(saved)
    return saved
  })
  const [plants, setPlants] = useState(() => ls('rr_plants', INIT_PLANTS))
  const [tab, setTab] = useState('greenhouse')
  const [roomFilter, setRoomFilter] = useState('All')
  const [selectedId, setSelectedId] = useState(null)
  const [plantTab, setPlantTab] = useState('overview')
  const [showAddPlant, setShowAddPlant] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [waterAnim, setWaterAnim] = useState(null)
  const [potdExpanded, setPotdExpanded] = useState(false)
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)])
  const [dailyTask] = useState(() => TASKS[new Date().getDay()])
  const [verdict] = useState(() => VERDICTS[Math.floor(Math.random() * VERDICTS.length)])
  const [newPlant, setNewPlant] = useState({ name: '', nickname: '', room: 'Living Room', species: '', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 365, notes: '', photo: null, emoji: '🌿', acquiredDate: '', rescueStory: '', giftedFrom: '' })
  const [plantSearch, setPlantSearch] = useState('')
  const [plantSuggestions, setPlantSuggestions] = useState([])
  const [aiMode, setAiMode] = useState('id')
  const [aiInput, setAiInput] = useState('')
  const [aiResult, setAiResult] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [location, setLocation] = useState(() => ls('rr_loc', null))
  const [locationTip, setLocationTip] = useState(() => ls('rr_tip', null))
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [cityInput, setCityInput] = useState('')
  const [showLocationSetup, setShowLocationSetup] = useState(false)
  const [posts, setPosts] = useState(INIT_POSTS)
  const [swaps, setSwaps] = useState([
    { id: 1, author: 'PropQueenJess', avatar: '✂️', offering: 'Pothos cuttings (rooted)', wanting: 'Hoya or string of pearls', location: 'Local / Ship' },
    { id: 2, author: 'UrbanJungleMike', avatar: '🌴', offering: 'Monstera deliciosa pup', wanting: 'Any rare aroid', location: 'Local only' },
  ])
  const [vacMode, setVacMode] = useState(false)
  const [vacReturn, setVacReturn] = useState('')
  const [vacDepart, setVacDepart] = useState('')
  const [vacNotes, setVacNotes] = useState('')
  const [showVac, setShowVac] = useState(false)
  const [showCaretaker, setShowCaretaker] = useState(false)
  const [showRename, setShowRename] = useState(false)
  const [renameInput, setRenameInput] = useState('')
  const [courtTaps, setCourtTaps] = useState(0)
  const [showCourt, setShowCourt] = useState(false)
  const [showShed, setShowShed] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showCozySkull, setShowCozySkull] = useState(false)
  const [user, setUser] = useState(() => ls('rr_user', null))
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' })
  const [authLoading, setAuthLoading] = useState(false)
  const [journalInput, setJournalInput] = useState('')
  const [showPestForm, setShowPestForm] = useState(false)
  const [showPropForm, setShowPropForm] = useState(false)
  const [healthSection, setHealthSection] = useState('pests')
  const [logSection, setLogSection] = useState('journal')
  const [pestInput, setPestInput] = useState({ type: '', treatment: '' })
  const [propInput, setPropInput] = useState({ method: '', notes: '', available: false })
  const photoRef = useRef()
  const jPhotoRef = useRef()
  const plantPhotoRef = useRef()
  const [showProfile, setShowProfile] = useState(false)
  const [showReminders, setShowReminders] = useState(false)
  const [showAppearance, setShowAppearance] = useState(false)
  const [showTempUnits, setShowTempUnits] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showPhotoStorage, setShowPhotoStorage] = useState(false)
  const [showBackup, setShowBackup] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showRate, setShowRate] = useState(false)
  const [showMemorial, setShowMemorial] = useState(false)
  const [showZones, setShowZones] = useState(false)
  const [showPropLab, setShowPropLab] = useState(false)
  const [showPhotoDiagnosis, setShowPhotoDiagnosis] = useState(false)
  const [profileBadges, setProfileBadges] = useState(() => ls('rr_profile_badges', []))
  const [newBadges, setNewBadges] = useState([])
  const [showNewBadges, setShowNewBadges] = useState(false)
  const season = getSeason()
  const seasonTheme = SEASONAL_THEMES[season]

  useEffect(() => { if (spaceName) lsSet('rr_space', spaceName) }, [spaceName])
  useEffect(() => { lsSet('rr_plants', plants) }, [plants])
  useEffect(() => { if (location) lsSet('rr_loc', location) }, [location])
  useEffect(() => { if (locationTip) lsSet('rr_tip', locationTip) }, [locationTip])
  useEffect(() => { if (user) lsSet('rr_user', user) }, [user])

  // ── First launch: long splash → onboarding ─────────────────────────────
  if (appPhase === 'splash_first') {
    return <SplashScreen duration={2500} onDone={() => setAppPhase('onboarding')} />
  }

  if (appPhase === 'onboarding') {
    return (
      <Onboarding onComplete={({ name, email, space }) => {
        if (space) { setSpaceName(space); lsSet('rr_space', space) }
        if (name || email) { const u = { name: name || '', email: email || '' }; setUser(u); lsSet('rr_user', u) }
        lsSet('rr_onboarded', true)
        setAppPhase('app')
      }} />
    )
  }

  // ── Repeat launch: short splash → app ──────────────────────────────────
  if (appPhase === 'splash_return') {
    return <SplashScreen duration={1000} onDone={() => setAppPhase('app')} />
  }

  const sp = plants.find(p => p.id === selectedId) || null
  const filtered = roomFilter === 'All' ? plants : plants.filter(p => p.room === roomFilter)
  const urgent = plants.filter(p => waterStatus(p).urgent)
  const needsWater = plants.filter(p => waterStatus(p).pct < 0.5)
  const potd = plants[0] || null
  const greeting = getGreeting()

  // ── Plant actions ───────────────────────────────────────────────────────────
  function waterPlant(id) {
    setPlants(p => {
      const updated = p.map(x => x.id === id ? { ...x, lastWatered: new Date().toISOString(), waterStreak: (x.waterStreak || 0) + 1 } : x)
      // Check profile badges after watering
      const earned = checkProfileBadges(updated, profileBadges)
      const fresh = earned.filter(b => !profileBadges.includes(b))
      if (fresh.length > 0) {
        setProfileBadges(earned)
        lsSet('rr_profile_badges', earned)
        setNewBadges(fresh)
        setShowNewBadges(true)
      }
      return updated
    })
    setWaterAnim(id)
    setTimeout(() => setWaterAnim(null), 700)
  }
  function updatePlant(id, fields) {
    const was = plants.find(p => p.id === id)
    setPlants(p => {
      const updated = p.map(x => {
        if (x.id !== id) return x
        const merged = { ...x, ...fields }
        // Auto-earn plant badges
        merged.badges = checkAutoEarnBadges(merged, p)
        return merged
      })
      // Check profile badges too
      const earned = checkProfileBadges(updated, profileBadges)
      const fresh = earned.filter(b => !profileBadges.includes(b))
      if (fresh.length > 0) {
        setProfileBadges(earned)
        lsSet('rr_profile_badges', earned)
        setNewBadges(fresh)
        setShowNewBadges(true)
      }
      return updated
    })
    if (fields.mood === 'thriving' && was?.mood !== 'thriving') {
      setConfetti(true)
      setTimeout(() => setConfetti(false), 2800)
    }
  }
  function addPlant() {
    if (!newPlant.name) return
    setPlants(p => {
      const updated = [...p, { ...newPlant, id: Date.now(), lastWatered: null, mood: 'okay', pests: [], propagations: [], journal: [], lastFertilized: null, lastRepotted: null, waterStreak: 0, badges: [], milestones: [] }]
      const earned = checkProfileBadges(updated, profileBadges)
      const fresh = earned.filter(b => !profileBadges.includes(b))
      if (fresh.length > 0) { setProfileBadges(earned); lsSet('rr_profile_badges', earned); setNewBadges(fresh); setShowNewBadges(true) }
      return updated
    })
    setNewPlant({ name: '', nickname: '', room: 'Living Room', species: '', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 365, notes: '', photo: null, emoji: '🌿', acquiredDate: '', rescueStory: '', giftedFrom: '' })
    setShowAddPlant(false)
  }
  function delPlant(id) { setPlants(p => p.filter(x => x.id !== id)); setSelectedId(null) }
  function addPest() {
    if (!pestInput.type || !sp) return
    updatePlant(selectedId, { pests: [...(sp.pests || []), { ...pestInput, id: Date.now(), date: new Date().toISOString(), treated: false, lastSprayed: null, sprayFreq: null }] })
    setPestInput({ type: '', treatment: '' }); setShowPestForm(false)
  }
  function graduateFromRecovery(id) {
    updatePlant(id, {
      mood: 'thriving',
      recovery: { ...((plants.find(p=>p.id===id)||{}).recovery||{}), active: false, recoveredDate: new Date().toISOString() }
    })
    setConfetti(true)
    setTimeout(() => setConfetti(false), 2800)
  }

  function sendToMemorial(plant) {
    moveToMemorial(plant)
    setPlants(p => p.filter(x => x.id !== plant.id))
    setSelectedId(null)
  }

  function addProp() {
    if (!propInput.method || !sp) return
    const newProp = { ...propInput, id: Date.now(), date: new Date().toISOString(), status: 'Rooting' }
    updatePlant(selectedId, { propagations: [...(sp.propagations || []), newProp] })
    // Cross-post to community swap board if available is checked
    if (propInput.available) {
      const swapEntry = {
        id: Date.now() + 1,
        author: user?.name || 'You',
        avatar: sp.emoji || '🌿',
        offering: `${sp.nickname || sp.name} cutting — ${propInput.method}`,
        wanting: 'Open to trades!',
        location: location?.label || 'Location not set',
        fromPropLab: true,
      }
      setSwaps(sl => [swapEntry, ...sl])
    }
    setPropInput({ method: '', notes: '', available: false }); setShowPropForm(false)
  }
  function addJournal(photo) {
    if (!sp) return
    updatePlant(selectedId, { journal: [...(sp.journal || []), { id: Date.now(), date: new Date().toISOString(), note: journalInput, photo: photo || null }] })
    setJournalInput('')
  }
  function uploadPhoto(e, cb) {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader()
    r.onload = ev => cb(ev.target.result)
    r.readAsDataURL(f)
  }

  // ── AI ──────────────────────────────────────────────────────────────────────
  async function callAI(prompt) {
    setAiLoading(true); setAiResult('')
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] }),
      })
      const d = await res.json()
      setAiResult(d.content?.[0]?.text || 'No result. Try again?')
    } catch { setAiResult('Something went wrong. Blame Mercury retrograde.') }
    setAiLoading(false)
  }

  // ── Location ────────────────────────────────────────────────────────────────
  async function fetchTip(label) {
    setLocationLoading(true); setLocationError('')
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 300, messages: [{ role: 'user', content: `Sassy plant expert. User in ${label}. Today: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. Give a 2-3 sentence local plant care tip. Fun, warm, no gendered language. No intro phrase.` }] }),
      })
      const d = await res.json()
      setLocationTip({ text: d.content?.[0]?.text || 'No tip available.', location: label })
    } catch { setLocationError('Could not load tip.') }
    setLocationLoading(false)
  }
  async function submitCity() {
    if (!cityInput.trim()) return
    const raw = cityInput.trim(); setLocationLoading(true)
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(raw)}&format=json&limit=1`)
      const d = await r.json()
      const label = d?.[0] ? (d[0].display_name.split(',')[0]?.trim() || raw) : raw
      setLocation({ label }); setShowLocationSetup(false); fetchTip(label)
    } catch { setLocation({ label: raw }); setShowLocationSetup(false); fetchTip(raw) }
    setLocationLoading(false); setCityInput('')
  }
  function autoDetect() {
    setLocationLoading(true)
    navigator.geolocation?.getCurrentPosition(async pos => {
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`)
        const d = await r.json()
        const city = d.address?.city || d.address?.town || d.address?.village || 'your area'
        const state = d.address?.state || ''
        const label = state ? `${city}, ${state}` : city
        setLocation({ label }); setShowLocationSetup(false); fetchTip(label)
      } catch { setLocation({ label: 'your location' }); setShowLocationSetup(false) }
      setLocationLoading(false)
    }, () => { setLocationError('Could not get location.'); setLocationLoading(false) })
  }

  // ── Auth ────────────────────────────────────────────────────────────────────
  async function handleAuth() {
    if (!authForm.email || !authForm.password) return
    setAuthLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const u = { email: authForm.email, name: authForm.name || authForm.email.split('@')[0], id: btoa(authForm.email) }
    setUser(u); setShowAuth(false); setAuthLoading(false)
  }

  function toggleDarkMode() {
    const next = !darkMode
    setDarkMode(next)
    setThemeColors(next)
    lsSet('rr_darkmode', next)
    document.body.style.background = next ? '#0d0c09' : '#f5f2ec'
    document.body.style.color = next ? '#e8dfc8' : '#2a2015'
  }

  // ── Shared layout pieces ────────────────────────────────────────────────────
  const navBar = (
    <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 680, background: C.navBg, borderTop: `1px solid ${C.border}`, display: 'flex', padding: '8px 4px env(safe-area-inset-bottom, 12px)', zIndex: 100 }}>
      {NAV.map(([id, icon, label]) => {
        const active = tab === id
        return (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '6px 2px', cursor: 'pointer', border: 'none', background: 'transparent' }}>
            <span style={{ fontSize: 22, filter: active ? 'none' : 'grayscale(80%)', opacity: active ? 1 : 0.4 }}>{icon}</span>
            <span style={{ fontSize: 9, fontWeight: active ? 700 : 400, color: active ? C.accent : C.textFaint, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
          </button>
        )
      })}
      <button onClick={() => setShowShed(true)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '6px 2px', cursor: 'pointer', border: 'none', background: 'transparent' }}>
        <span style={{ fontSize: 22, opacity: 0.4 }}>⚙️</span>
        <span style={{ fontSize: 9, color: C.textFaint, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shed</span>
      </button>
    </div>
  )

  const header = (
    <div style={{ padding: '0.9rem 1rem', borderBottom: `1px solid ${C.border}`, background: `linear-gradient(180deg, #1c1910 0%, ${C.bg} 100%)` }}>
      <div style={sBtwn}>
        <div style={sRow}>
          <img src={iconLogo} alt="Rooted" style={{ width: 32, height: 32, borderRadius: 8 }} />
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: C.text, lineHeight: 1 }}>Rooted</div>
            <div style={{ fontSize: 8, color: C.textMuted, letterSpacing: '2px', textTransform: 'uppercase', marginTop: 1 }}>by Cozy Skull</div>
          </div>
        </div>
        <div style={sRow}>
          {user
            ? <span style={{ fontSize: 12, color: C.textMuted }}>{user.name}</span>
            : <button style={{ ...sBtnP, fontSize: 11, padding: '5px 12px' }} onClick={() => setShowAuth(true)}>Sign in</button>
          }
          <button style={{ ...sBtnS, padding: '5px 10px', fontSize: 13 }} onClick={() => setShowShed(true)}>⚙️</button>
        </div>
      </div>
      {tab === 'greenhouse' && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 12, color: C.textMuted }}>{greeting.icon} {greeting.text}</div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{spaceName}</div>
          <div style={{ fontSize: 12, color: C.textMuted, fontStyle: 'italic', marginTop: 3, opacity: 0.85 }}>"{quote}"</div>
        </div>
      )}
    </div>
  )

  // ── Plant detail ────────────────────────────────────────────────────────────
  if (sp) {
    const ws = waterStatus(sp)
    const aura = MOOD_COLOR[sp.mood] || C.accent
    const spPests = sp.pests || []
    const spProps = sp.propagations || []
    const spJournal = sp.journal || []
    const spBadges = sp.badges || []

    return (
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", maxWidth: 680, margin: '0 auto', padding: '0 0 80px', background: C.bg, minHeight: '100vh', color: C.text }}>
        <Confetti active={confetti} onDone={() => setConfetti(false)} />

      {/* New badge notification */}
      {showNewBadges && newBadges.length > 0 && (
        <div style={{ position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 9000, background: C.bgCard, border: `1.5px solid ${C.accent}`, borderRadius: 16, padding: '14px 20px', maxWidth: 340, width: '90%', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: C.accent, marginBottom: 8 }}>🏅 Badge earned!</div>
          {newBadges.map(bid => {
            const b = PROFILE_BADGES.find(x => x.id === bid)
            return b ? (
              <div key={bid} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 24 }}>{b.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{b.label}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{b.desc}</div>
                </div>
              </div>
            ) : null
          })}
          <button style={{ ...sBtnP, width: '100%', padding: '9px', marginTop: 8, fontSize: 13 }} onClick={() => setShowNewBadges(false)}>Nice! 🌿</button>
        </div>
      )}
        <div style={{ padding: '0.9rem 1rem', borderBottom: `1px solid ${C.border}`, background: `linear-gradient(180deg, #1c1910 0%, ${C.bg} 100%)` }}>
          <div style={sBtwn}>
            <button style={{ ...sBtn, padding: '5px 12px', fontSize: 12 }} onClick={() => { setSelectedId(null); setPlantTab('overview'); setHealthSection('pests'); setLogSection('journal') }}>← Back</button>
            <button style={{ ...sBtn, color: C.dangerText, borderColor: C.dangerBorder, fontSize: 12, padding: '5px 12px' }} onClick={() => delPlant(sp.id)}>Delete</button>
          </div>
          <div style={{ ...sRow, marginTop: 12 }}>
            <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
              <div style={{ ...sAv(sp.photo), width: 52, height: 52, borderColor: aura + '55', fontSize: 28 }}>{!sp.photo && (sp.emoji || '🌿')}</div>
              <Ring pct={ws.pct} size={58} stroke={2.5} color={aura} bg={C.border} />
            </div>
            <div>
              <div style={sH(21)}>{sp.nickname || sp.name}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{sp.species || sp.name} · {sp.room}</div>
              {(sp.waterStreak || 0) > 2 && <div style={{ fontSize: 11, color: C.gold, marginTop: 2 }}>🔥 {sp.waterStreak}-day streak</div>}
            </div>
          </div>
          <div style={{ fontSize: 12, color: ws.color, marginTop: 8, fontStyle: 'italic' }}>{sassyMsg(sp)}</div>
        </div>

        <div style={{ display: 'flex', gap: 6, padding: '0.75rem 1rem', overflowX: 'auto', background: C.bg, borderBottom: `1px solid ${C.border}` }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'care', label: 'Care' },
            { id: 'health', label: spPests.filter(p => !p.treated).length > 0 || (sp.recovery && sp.recovery.active) ? '🚨 Health' : 'Health' },
            { id: 'propagations', label: 'Props' },
            { id: 'log', label: 'Log' },
          ].map(t => (
            <button key={t.id} style={{ ...sTab(plantTab === t.id), flexShrink: 0, fontSize: 11 }} onClick={() => setPlantTab(t.id)}>{t.label}</button>
          ))}
        </div>

        <div style={{ padding: '12px 14px' }}>
          {plantTab === 'overview' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                {[{l:'Water',v:ws.label,col:ws.color},{l:'Mood',v:sp.mood,col:MOOD_COLOR[sp.mood]},{l:'Room',v:sp.room,col:null},{l:'Every',v:`${sp.waterFreqDays||7}d`,col:null}].map((item, i) => (
                  <div key={i} style={{ background: C.bgSubtle, borderRadius: 12, padding: '0.75rem', border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' }}>{item.l}</div>
                    <div style={{ fontWeight: 600, color: item.col || C.text, marginTop: 3, fontSize: 13 }}>{item.v}</div>
                  </div>
                ))}
              </div>
              {spBadges.length > 0 && (
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
                  {spBadges.map(bid => { const b = PLANT_BADGES.find(x => x.id === bid); return b ? <span key={bid} style={sBdg(C.accent)}>{b.icon} {b.label}</span> : null })}
                </div>
              )}
              {sp.notes && <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 14, fontStyle: 'italic', lineHeight: 1.6 }}>{sp.notes}</div>}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                <button style={sBtnP} onClick={() => waterPlant(sp.id)}>
                  <span style={{ display: 'inline-block', transition: 'transform 0.2s', transform: waterAnim === sp.id ? 'scale(1.4)' : 'scale(1)' }}>💧</span> Log watering
                </button>
                <button style={sBtn} onClick={() => updatePlant(sp.id, { lastFertilized: new Date().toISOString() })}>🌱 Fertilize</button>
                <button style={sBtn} onClick={() => updatePlant(sp.id, { lastRepotted: new Date().toISOString() })}>🪴 Repot</button>
              </div>
              <div style={sLbl}>Mood</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {MOODS.map(m => (
                  <button key={m.id} style={{ ...sTab(sp.mood === m.id), borderColor: sp.mood === m.id ? m.color : C.border, color: sp.mood === m.id ? m.color : C.textMuted }} onClick={() => updatePlant(sp.id, { mood: m.id })}>{m.label}</button>
                ))}
              </div>
            </div>
          )}

          {plantTab === 'care' && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <div style={sLbl}>Avatar</div>
                <EmojiPick current={sp.emoji || '🌿'} onPick={em => updatePlant(sp.id, { emoji: em, photo: null })} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <input type="file" accept="image/*" ref={plantPhotoRef} style={{ display: 'none' }} onChange={e => uploadPhoto(e, photo => updatePlant(sp.id, { photo }))} />
                  <button style={sBtn} onClick={() => plantPhotoRef.current?.click()}>📷 Upload photo</button>
                  {sp.photo && <button style={{ ...sBtnS, color: C.dangerText, borderColor: C.dangerBorder }} onClick={() => updatePlant(sp.id, { photo: null })}>Remove</button>}
                </div>
                {sp.photo && <img src={sp.photo} alt="" style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover', marginTop: 10, border: `2px solid ${C.accent}` }} />}
              </div>
              {[['Watering (days)', 'waterFreqDays'], ['Fertilize (days)', 'fertilizeFreqDays'], ['Repot (days)', 'repotFreqDays']].map(([label, key]) => (
                <div key={key} style={{ marginBottom: 10 }}>
                  <div style={sLbl}>{label}</div>
                  <input style={sInp} type="number" min={1} value={sp[key] || 7} onChange={e => updatePlant(sp.id, { [key]: parseInt(e.target.value) || 1 })} />
                </div>
              ))}
              <div style={{ marginBottom: 10 }}>
                <div style={sLbl}>Notes</div>
                <textarea style={{ ...sInp, minHeight: 80, resize: 'vertical' }} value={sp.notes || ''} onChange={e => updatePlant(sp.id, { notes: e.target.value })} placeholder="Loves the east window..." />
              </div>
              <div style={sLbl}>Plant badges</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {PLANT_BADGES.map(b => {
                  const has = spBadges.includes(b.id)
                  return <button key={b.id} style={sTab(has)} onClick={() => updatePlant(sp.id, { badges: has ? spBadges.filter(x => x !== b.id) : [...spBadges, b.id] })}>{b.icon} {b.label}</button>
                })}
              </div>
            </div>
          )}

          {plantTab === 'memory' && null}

          {/* ── HEALTH tab: Pests + Recovery merged ── */}
          {plantTab === 'health' && (
            <div>
              {/* Recovery banner if active */}
              {sp.recovery && sp.recovery.active && (
                <div style={{ background: '#c94f4f22', border: '1px solid #c94f4f55', borderRadius: 12, padding: '10px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>🏥</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#c94f4f' }}>In Recovery Mode</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>Tracking treatment progress</div>
                  </div>
                  <button style={{ ...sBtnP, fontSize: 11, padding: '5px 12px', background: '#c94f4f' }} onClick={() => setHealthSection('recovery')}>View →</button>
                </div>
              )}

              {/* Active pest alerts */}
              {spPests.filter(p => !p.treated).length > 0 && (
                <div style={{ background: '#d4934a22', border: '1px solid #d4934a55', borderRadius: 12, padding: '10px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>🪲</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#d4934a' }}>{spPests.filter(p => !p.treated).length} active pest issue{spPests.filter(p => !p.treated).length > 1 ? 's' : ''}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{spPests.filter(p => !p.treated).map(p => p.type).join(', ')}</div>
                  </div>
                  <button style={{ ...sBtn, fontSize: 11, padding: '5px 12px' }} onClick={() => setHealthSection('pests')}>Manage →</button>
                </div>
              )}

              {/* Section toggle */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {[{ id: 'pests', label: '🪲 Pests' }, { id: 'recovery', label: '🏥 Recovery' }].map(s => (
                  <button key={s.id} style={{ ...sTab(healthSection === s.id), fontSize: 12 }} onClick={() => setHealthSection(s.id)}>{s.label}</button>
                ))}
              </div>

              {/* PESTS section */}
              {healthSection === 'pests' && (
                <div>
                  <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 12, fontStyle: 'italic' }}>Tap a pest to log it with a pre-filled treatment plan.</div>
                  <div style={sLbl}>Common pests</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                    {PESTS.map(pest => {
                      const active = spPests.find(p => p.pestId === pest.id && !p.treated)
                      return (
                        <button key={pest.id} style={{ ...sBtn, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, padding: '8px 10px', opacity: active ? 0.4 : 1 }}
                          onClick={() => { if (active) return; updatePlant(sp.id, { pests: [...spPests, { id: Date.now(), pestId: pest.id, type: pest.name, treatment: pest.treatment, sprayFreq: pest.sprayFreq, lastSprayed: null, date: new Date().toISOString(), treated: false }] }) }}>
                          <span style={{ fontSize: 18 }}>{pest.icon}</span>{pest.name}
                        </button>
                      )
                    })}
                  </div>
                  <button style={{ ...sBtnS, borderColor: C.accent, color: C.accent, marginBottom: 12 }} onClick={() => setShowPestForm(v => !v)}>+ Custom pest</button>
                  {showPestForm && (
                    <div style={sCard({ marginBottom: 12 })}>
                      <div style={{ marginBottom: 8 }}><div style={sLbl}>Pest type</div><input style={sInp} value={pestInput.type} onChange={e => setPestInput(p => ({ ...p, type: e.target.value }))} /></div>
                      <div style={{ marginBottom: 8 }}><div style={sLbl}>Treatment</div><input style={sInp} value={pestInput.treatment} onChange={e => setPestInput(p => ({ ...p, treatment: e.target.value }))} /></div>
                      <div style={{ display: 'flex', gap: 8 }}><button style={sBtnP} onClick={addPest}>Save</button><button style={sBtn} onClick={() => setShowPestForm(false)}>Cancel</button></div>
                    </div>
                  )}
                  {spPests.length === 0 && <div style={{ color: C.textMuted, fontSize: 13, fontStyle: 'italic' }}>No pest issues. Living the dream.</div>}
                  {spPests.map(pest => {
                    const preset = PESTS.find(p => p.id === pest.pestId)
                    const ds = daysAgo(pest.lastSprayed)
                    const due = pest.sprayFreq && (ds === null || ds >= pest.sprayFreq)
                    return (
                      <div key={pest.id} style={sCard({ marginTop: 10, borderColor: pest.treated ? C.border : '#d4934a66' })}>
                        <div style={sBtwn}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{preset && <span style={{ fontSize: 20 }}>{preset.icon}</span>}<div style={{ fontWeight: 600 }}>{pest.type}</div></div>
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            <span style={sBdg(pest.treated ? '#7ec850' : '#c94f4f')}>{pest.treated ? 'Treated' : 'Active'}</span>
                            <button style={sBtnS} onClick={() => updatePlant(sp.id, { pests: spPests.map(p => p.id === pest.id ? { ...p, treated: !p.treated } : p) })}>{pest.treated ? 'Reopen' : 'Mark treated'}</button>
                          </div>
                        </div>
                        {pest.treatment && <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 10, background: C.bgSubtle, fontSize: 12, lineHeight: 1.6, border: `0.5px solid ${C.border}` }}><div style={{ fontWeight: 700, color: C.accent, marginBottom: 4, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Treatment plan</div>{pest.treatment}</div>}
                        {pest.sprayFreq && !pest.treated && (
                          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 10, background: due ? C.danger : C.bgSubtle, border: `1px solid ${due ? C.dangerBorder : C.border}` }}>
                            <div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: due ? C.dangerText : C.text }}>🧴 Every {pest.sprayFreq}d</div>
                              <div style={{ fontSize: 11, color: due ? C.dangerText : C.textMuted, marginTop: 2 }}>{pest.lastSprayed ? (due ? `Overdue! Last ${ds}d ago` : `Last ${ds}d ago — next in ${pest.sprayFreq - ds}d`) : 'Start today!'}</div>
                            </div>
                            <button style={{ ...sBtnP, fontSize: 11, padding: '5px 12px', background: due ? '#c94f4f' : C.accent }} onClick={() => updatePlant(sp.id, { pests: spPests.map(p => p.id === pest.id ? { ...p, lastSprayed: new Date().toISOString() } : p) })}>Sprayed ✓</button>
                          </div>
                        )}
                        <button style={{ ...sBtnS, marginTop: 8, color: C.dangerText, borderColor: C.dangerBorder, fontSize: 11 }} onClick={() => updatePlant(sp.id, { pests: spPests.filter(p => p.id !== pest.id) })}>Remove</button>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* RECOVERY section */}
              {healthSection === 'recovery' && (
                <div>
                  {showPhotoDiagnosis && (
                    <PhotoDiagnosis
                      plant={sp}
                      onResult={({ photo, diagnosis }) => {
                        updatePlant(sp.id, {
                          mood: 'crisis',
                          recovery: { ...(sp.recovery || {}), active: true, startDate: (sp.recovery||{}).startDate || new Date().toISOString(), diagnosis, diagnosisPhoto: photo }
                        })
                      }}
                      onClose={() => setShowPhotoDiagnosis(false)}
                    />
                  )}
                  {!(sp.recovery && sp.recovery.active) ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                      <div style={{ fontSize: 48, marginBottom: 14 }}>🏥</div>
                      <div style={{ ...sH(16), marginBottom: 8 }}>Recovery Mode</div>
                      <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginBottom: 20 }}>When a plant is struggling, move it into Recovery Mode. Track treatments, progress photos, and the full recovery timeline.</div>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button style={sBtnP} onClick={() => { updatePlant(sp.id, { mood: 'crisis', recovery: { active: true, startDate: new Date().toISOString(), checkIns: [] } }) }}>Start Recovery Mode</button>
                        <button style={sBtn} onClick={() => setShowPhotoDiagnosis(true)}>📸 Diagnose with photo</button>
                      </div>
                    </div>
                  ) : (
                    <RecoveryMode plant={sp} onUpdate={updatePlant} onGraduate={() => graduateFromRecovery(sp.id)} onMemorialGarden={() => sendToMemorial(sp)} />
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── LOG tab: Journal + Timeline merged ── */}
          {plantTab === 'log' && (
            <div>
              {/* Log sub-toggle */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {[{ id: 'journal', label: '📖 Journal' }, { id: 'timeline', label: '🌱 Timeline' }].map(s => (
                  <button key={s.id} style={{ ...sTab(logSection === s.id), fontSize: 12 }} onClick={() => setLogSection(s.id)}>{s.label}</button>
                ))}
              </div>

              {logSection === 'journal' && (
                <div>
                  <textarea style={{ ...sInp, minHeight: 70, resize: 'vertical' }} placeholder="How is it looking today?" value={journalInput} onChange={e => setJournalInput(e.target.value)} />
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <button style={sBtnP} onClick={() => addJournal(null)}>Add entry</button>
                    <input type="file" accept="image/*" ref={jPhotoRef} style={{ display: 'none' }} onChange={e => uploadPhoto(e, photo => addJournal(photo))} />
                    <button style={sBtn} onClick={() => jPhotoRef.current?.click()}>📷 With photo</button>
                  </div>
                  {spJournal.length === 0 && <div style={{ color: C.textMuted, fontSize: 13, marginTop: 16, fontStyle: 'italic' }}>No entries yet. Start documenting.</div>}
                  {[...spJournal].reverse().map(entry => (
                    <div key={entry.id} style={sCard({ marginTop: 12 })}>
                      <div style={{ fontSize: 11, color: C.textMuted }}>{new Date(entry.date).toLocaleDateString()}</div>
                      {entry.photo && <img src={entry.photo} alt="" style={{ width: '100%', borderRadius: 10, marginTop: 8, maxHeight: 200, objectFit: 'cover' }} />}
                      {entry.note && <div style={{ fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{entry.note}</div>}
                    </div>
                  ))}
                </div>
              )}

              {logSection === 'timeline' && (
                <GrowthTimeline plant={sp} />
              )}

              {/* Memory Vault — tucked into Log tab at bottom */}
              {logSection === 'journal' && (
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ ...sH(14), marginBottom: 6 }}>Memory Vault 🖤</div>
                  <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 14, fontStyle: 'italic' }}>The story of this plant.</div>
                  <div style={{ marginBottom: 12 }}><div style={sLbl}>Acquired date</div><input style={sInp} type="date" value={sp.acquiredDate || ''} onChange={e => updatePlant(sp.id, { acquiredDate: e.target.value })} /></div>
                  <div style={{ marginBottom: 12 }}><div style={sLbl}>Gifted from</div><input style={sInp} placeholder="Who gave you this plant?" value={sp.giftedFrom || ''} onChange={e => updatePlant(sp.id, { giftedFrom: e.target.value })} /></div>
                  <div style={{ marginBottom: 12 }}><div style={sLbl}>Rescue story</div><textarea style={{ ...sInp, minHeight: 90, resize: 'vertical' }} placeholder="Found at a gas station for $2. Almost dead. Look at it now." value={sp.rescueStory || ''} onChange={e => updatePlant(sp.id, { rescueStory: e.target.value })} /></div>
                  <div>
                    <div style={sLbl}>Milestones</div>
                    {(sp.milestones || []).map((m, i) => (
                      <div key={i} style={{ background: C.bgSubtle, borderRadius: 10, padding: '8px 12px', marginBottom: 6, border: `0.5px solid ${C.border}`, fontSize: 13 }}>
                        {m.date ? new Date(m.date).toLocaleDateString() + ' — ' : ''}{m.text}
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                      <input id="mstone" style={{ ...sInp, flex: 1 }} placeholder="First leaf, survived pests, first flower..."
                        onKeyDown={e => { if (e.key === 'Enter' && e.target.value.trim()) { updatePlant(sp.id, { milestones: [...(sp.milestones||[]), { text: e.target.value.trim(), date: new Date().toISOString() }] }); e.target.value = '' } }} />
                      <button style={sBtnP} onClick={() => { const inp = document.getElementById('mstone'); if (inp?.value.trim()) { updatePlant(sp.id, { milestones: [...(sp.milestones||[]), { text: inp.value.trim(), date: new Date().toISOString() }] }); inp.value = '' } }}>Add</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
            <div>
              <div style={sBtwn}><div style={sH(15)}>Propagation Lab ✂️</div><button style={sBtnP} onClick={() => setShowPropForm(true)}>+ New</button></div>
              {showPropForm && (
                <div style={sCard({ marginTop: 12 })}>
                  <div style={{ marginBottom: 8 }}><div style={sLbl}>Method</div><input style={sInp} placeholder="Stem cutting, division..." value={propInput.method} onChange={e => setPropInput(p => ({ ...p, method: e.target.value }))} /></div>
                  <div style={{ marginBottom: 8 }}><div style={sLbl}>Notes</div><input style={sInp} placeholder="3 nodes, in water..." value={propInput.notes} onChange={e => setPropInput(p => ({ ...p, notes: e.target.value }))} /></div>
                  <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" id="avail" checked={propInput.available} onChange={e => setPropInput(p => ({ ...p, available: e.target.checked }))} /><label htmlFor="avail" style={{ fontSize: 13 }}>List on community swap board</label></div>
                  <div style={{ display: 'flex', gap: 8 }}><button style={sBtnP} onClick={addProp}>Save</button><button style={sBtn} onClick={() => setShowPropForm(false)}>Cancel</button></div>
                </div>
              )}
              {spProps.length === 0 && <div style={{ color: C.textMuted, fontSize: 13, marginTop: 12, fontStyle: 'italic' }}>No propagations yet. Snip snip!</div>}
              {spProps.map(prop => (
                <div key={prop.id} style={sCard({ marginTop: 12 })}>
                  <div style={sBtwn}>
                    <div style={{ fontWeight: 600 }}>{prop.method}</div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      {prop.available && <span style={sBdg(C.accent)}>Swap board</span>}
                      <select style={{ ...sInp, width: 'auto', fontSize: 12 }} value={prop.status} onChange={e => updatePlant(sp.id, { propagations: spProps.map(p => p.id === prop.id ? { ...p, status: e.target.value } : p) })}>
                        {['Rooting','Potted','Gifted','Failed'].map(x => <option key={x}>{x}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{new Date(prop.date).toLocaleDateString()}</div>
                  {prop.notes && <div style={{ fontSize: 13, marginTop: 4, color: C.textMuted }}>{prop.notes}</div>}
                </div>
              ))}
            </div>
          )}

          {plantTab === 'timeline' && (
            <GrowthTimeline plant={sp} />
          )}

          {plantTab === 'journal' && (
            <div>
              <div style={{ ...sH(15), marginBottom: 12 }}>Growth Journal 📖</div>
              <textarea style={{ ...sInp, minHeight: 70, resize: 'vertical' }} placeholder="How is it looking today?" value={journalInput} onChange={e => setJournalInput(e.target.value)} />
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button style={sBtnP} onClick={() => addJournal(null)}>Add entry</button>
                <input type="file" accept="image/*" ref={jPhotoRef} style={{ display: 'none' }} onChange={e => uploadPhoto(e, photo => addJournal(photo))} />
                <button style={sBtn} onClick={() => jPhotoRef.current?.click()}>📷 With photo</button>
              </div>
              {spJournal.length === 0 && <div style={{ color: C.textMuted, fontSize: 13, marginTop: 16, fontStyle: 'italic' }}>No entries yet. Start documenting.</div>}
              {[...spJournal].reverse().map(entry => (
                <div key={entry.id} style={sCard({ marginTop: 12 })}>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{new Date(entry.date).toLocaleDateString()}</div>
                  {entry.photo && <img src={entry.photo} alt="" style={{ width: '100%', borderRadius: 10, marginTop: 8, maxHeight: 200, objectFit: 'cover' }} />}
                  {entry.note && <div style={{ fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{entry.note}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 680, background: C.navBg, borderTop: `1px solid ${C.border}`, display: 'flex', padding: '8px 4px env(safe-area-inset-bottom, 12px)', zIndex: 100 }}>
          {NAV.map(([id, icon, label]) => (
            <button key={id} onClick={() => { setSelectedId(null); setPlantTab('overview'); setTab(id) }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '6px 2px', cursor: 'pointer', border: 'none', background: 'transparent' }}>
              <span style={{ fontSize: 22, opacity: 0.4 }}>{icon}</span>
              <span style={{ fontSize: 9, color: C.textFaint, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
            </button>
          ))}
          <button onClick={() => setShowShed(true)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '6px 2px', cursor: 'pointer', border: 'none', background: 'transparent' }}>
            <span style={{ fontSize: 22, opacity: 0.4 }}>⚙️</span>
            <span style={{ fontSize: 9, color: C.textFaint, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shed</span>
          </button>
        </div>
      </div>
    )
  }

  // ── Main app layout ─────────────────────────────────────────────────────────
  const appStyle = { fontFamily: "'DM Sans', system-ui, sans-serif", maxWidth: 680, margin: '0 auto', padding: '0 0 80px', background: C.bg, minHeight: '100vh', color: C.text }

  return (
    <div style={appStyle}>
      <Confetti active={confetti} onDone={() => setConfetti(false)} />

      {showMemorial && <MemorialGarden onClose={() => setShowMemorial(false)} />}
      {showZones && <WateringZones plants={plants} onUpdatePlant={updatePlant} onClose={() => setShowZones(false)} />}
      {showPropLab && <PropLabModal plants={plants} onUpdatePlant={updatePlant} onNavigate={(id) => { setSelectedId(id); setPlantTab('propagations'); setShowPropLab(false) }} onClose={() => setShowPropLab(false)} C={C} sCard={sCard} sH={sH} sBtn={sBtn} sBtnP={sBtnP} sBdg={sBdg} />}

      {/* Settings screens */}
      {showProfile && <ProfileScreen user={user} onSave={u => { setUser(u); setShowProfile(false) }} onClose={() => setShowProfile(false)} />}
      {showReminders && <RemindersScreen onClose={() => setShowReminders(false)} />}
      {showAppearance && <AppearanceScreen onClose={() => setShowAppearance(false)} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />}
      {showTempUnits && <TempUnitsScreen onClose={() => setShowTempUnits(false)} />}
      {showCalendar && <CalendarScreen plants={plants} onClose={() => setShowCalendar(false)} />}
      {showPhotoStorage && <PhotoStorageScreen plants={plants} onClose={() => setShowPhotoStorage(false)} />}
      {showBackup && <BackupScreen plants={plants} onClose={() => setShowBackup(false)} />}
      {showContact && <ContactScreen onClose={() => setShowContact(false)} />}
      {showRate && <RateScreen onClose={() => setShowRate(false)} />}

      {/* Modals */}
      {showAuth && (
        <Modal>
          <div style={{ ...sRow, marginBottom: 16 }}><div style={{ fontSize: 28 }}>🌿</div><div style={sH(18)}>{authMode === 'login' ? 'Welcome back' : 'Join Rooted'}</div></div>
          {authMode === 'signup' && <div style={{ marginBottom: 10 }}><div style={sLbl}>Name</div><input style={sInp} value={authForm.name} onChange={e => setAuthForm(p => ({ ...p, name: e.target.value }))} /></div>}
          <div style={{ marginBottom: 10 }}><div style={sLbl}>Email</div><input style={sInp} type="email" value={authForm.email} onChange={e => setAuthForm(p => ({ ...p, email: e.target.value }))} /></div>
          <div style={{ marginBottom: 16 }}><div style={sLbl}>Password</div><input style={sInp} type="password" value={authForm.password} onChange={e => setAuthForm(p => ({ ...p, password: e.target.value }))} /></div>
          <button style={{ ...sBtnP, width: '100%', padding: '12px', fontSize: 14 }} onClick={handleAuth} disabled={authLoading}>{authLoading ? 'One sec...' : authMode === 'login' ? 'Sign in' : 'Create account'}</button>
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: C.textMuted }}>
            {authMode === 'login'
              ? <span>No account? <button style={{ background: 'none', border: 'none', color: C.accent, cursor: 'pointer', fontSize: 13, fontWeight: 600 }} onClick={() => setAuthMode('signup')}>Sign up</button></span>
              : <span>Have account? <button style={{ background: 'none', border: 'none', color: C.accent, cursor: 'pointer', fontSize: 13, fontWeight: 600 }} onClick={() => setAuthMode('login')}>Sign in</button></span>}
          </div>
          <button style={{ ...sBtn, width: '100%', marginTop: 10 }} onClick={() => setShowAuth(false)}>Cancel</button>
        </Modal>
      )}

      {showLocationSetup && (
        <Modal>
          <div style={{ ...sH(17), marginBottom: 6 }}>📍 Where are your plants?</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 16 }}>Get care tips tailored to your local climate.</div>
          <button style={{ ...sBtnP, width: '100%', padding: '12px', marginBottom: 12 }} onClick={autoDetect} disabled={locationLoading}>{locationLoading ? 'Detecting...' : '📍 Auto-detect my location'}</button>
          <div style={{ textAlign: 'center', fontSize: 11, color: C.textFaint, marginBottom: 10 }}>— or —</div>
          <div style={{ marginBottom: 12 }}><div style={sLbl}>City or zip</div><input style={sInp} placeholder="Austin TX, 63650..." value={cityInput} onChange={e => setCityInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') submitCity() }} /></div>
          <button style={{ ...sBtnP, width: '100%', padding: '11px' }} onClick={submitCity} disabled={!cityInput.trim() || locationLoading}>Use this location</button>
          {locationError && <div style={{ fontSize: 13, color: C.dangerText, marginTop: 10 }}>{locationError}</div>}
          <button style={{ ...sBtn, width: '100%', marginTop: 10 }} onClick={() => setShowLocationSetup(false)}>Skip for now</button>
        </Modal>
      )}

      {showCaretaker && (
        <Sheet>
          <div style={sBtwn}><div style={sH(16)}>📋 Caretaker Sheet</div><button style={sBtnS} onClick={() => setShowCaretaker(false)}>✕</button></div>
          {vacNotes && <div style={{ background: C.locBg, border: `1px solid ${C.locBorder}`, borderRadius: 12, padding: '12px 14px', margin: '12px 0' }}><div style={sLbl}>Instructions</div><div style={{ fontSize: 13, color: C.locText, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{vacNotes}</div></div>}
          {plants.map(p => (
            <div key={p.id} style={sCard({ marginBottom: 8 })}>
              <div style={sRow}>
                <div style={{ ...sAv(p.photo, 38), fontSize: 20 }}>{!p.photo && (p.emoji || '🌿')}</div>
                <div style={{ flex: 1 }}><div style={sH(13)}>{p.nickname || p.name}</div><div style={{ fontSize: 11, color: C.textMuted }}>{p.room}</div></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 10 }}>
                <div style={{ background: C.bgSubtle, borderRadius: 8, padding: '6px 10px' }}><div style={{ fontSize: 9, color: C.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Water every</div><div style={{ fontSize: 13, fontWeight: 600 }}>{p.waterFreqDays} days</div></div>
                <div style={{ background: C.bgSubtle, borderRadius: 8, padding: '6px 10px' }}><div style={{ fontSize: 9, color: C.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</div><div style={{ fontSize: 13, fontWeight: 600 }}>{p.room}</div></div>
              </div>
              {p.notes && <div style={{ marginTop: 6, fontSize: 12, color: C.textMuted, fontStyle: 'italic' }}>{p.notes}</div>}
            </div>
          ))}
          <button style={{ ...sBtnP, width: '100%', padding: '12px', marginTop: 6 }} onClick={() => window.print()}>🖨️ Print / Save as PDF</button>
        </Sheet>
      )}

      {showRename && (
        <Modal>
          <div style={{ ...sH(17), marginBottom: 14 }}>Rename your space</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            {SPACE_NAMES.map(name => { const a = spaceName === name; return <button key={name} onClick={() => { setSpaceName(name); setShowRename(false) }} style={{ padding: '10px 8px', borderRadius: 12, border: `1.5px solid ${a ? C.accent : C.border}`, background: a ? C.bgSubtle : C.bgCard, color: a ? C.accent : C.textMuted, fontSize: 13, fontWeight: a ? 700 : 400, cursor: 'pointer' }}>{name}</button> })}
          </div>
          <input style={{ ...sInp, marginBottom: 12 }} placeholder="Or type a custom name..." value={renameInput} onChange={e => setRenameInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && renameInput.trim()) { setSpaceName(renameInput.trim()); setShowRename(false); setRenameInput('') } }} />
          <div style={{ display: 'flex', gap: 8 }}>
            {renameInput.trim() && <button style={sBtnP} onClick={() => { setSpaceName(renameInput.trim()); setShowRename(false); setRenameInput('') }}>Save</button>}
            <button style={{ ...sBtn, flex: 1 }} onClick={() => { setShowRename(false); setRenameInput('') }}>Done</button>
          </div>
        </Modal>
      )}

      {showCourt && (
        <Sheet>
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>⚖️</div>
            <div style={{ ...sH(21), textAlign: 'center', marginBottom: 6 }}>Plant Court</div>
            <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 20 }}>Today's Verdict</div>
            <div style={{ background: C.bgSubtle, border: `1px solid ${C.borderAccent}`, borderRadius: 16, padding: '1.25rem', marginBottom: 16, fontSize: 15, color: C.text, lineHeight: 1.7, fontStyle: 'italic' }}>"{verdict}"</div>
            <button style={{ ...sBtnP, padding: '11px 28px' }} onClick={() => setShowCourt(false)}>Dismissed</button>
          </div>
        </Sheet>
      )}

            {showAbout && (
        <AboutRooted
          onClose={() => setShowAbout(false)}
          onCourtTap={() => setCourtTaps(t => {
            const n = t + 1
            if (n >= 5) { setShowCourt(true); setShowAbout(false); return 0 }
            return n
          })}
          courtTaps={courtTaps}
        />
      )}
      {showCozySkull && (
        <AboutCozySkull onClose={() => setShowCozySkull(false)} />
      )}

      {showShed && (
        <Sheet>
          <div style={sBtwn}><div style={sH(17)}>⚙️ Potting Shed</div><button style={sBtnS} onClick={() => setShowShed(false)}>✕</button></div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16, fontStyle: 'italic' }}>This is where all the app settings live.</div>
          {[
            { section: 'Account', items: [{ icon: '👤', label: 'Profile', fn: () => { setShowProfile(true); setShowShed(false) } }, { icon: '☁️', label: 'Backup & Sync', fn: () => { setShowBackup(true); setShowShed(false) } }, { icon: '📷', label: 'Photo Storage', fn: () => { setShowPhotoStorage(true); setShowShed(false) } }] },
            { section: 'App Settings', items: [{ icon: '🔔', label: 'Reminders', fn: () => { setShowReminders(true); setShowShed(false) } }, { icon: '🌙', label: 'Appearance', fn: () => { setShowAppearance(true); setShowShed(false) } }, { icon: '📅', label: 'Calendar', fn: () => { setShowCalendar(true); setShowShed(false) } }, { icon: '🌡️', label: 'Temperature Units', fn: () => { setShowTempUnits(true); setShowShed(false) } }] },
            { section: 'Plant Tools', items: [{ icon: '🚑', label: 'Plant ER', fn: () => { setTab('planterr'); setShowShed(false) } }, { icon: '📖', label: 'Plant Journal', fn: () => { setTab('journal'); setShowShed(false) } }, { icon: '✂️', label: 'Propagation Lab', fn: () => { setTab('collection'); setShowShed(false); setShowPropLab(true) } }, { icon: '⚖️', label: 'Plant Court', fn: () => { setShowCourt(true); setShowShed(false) } }, { icon: '💧', label: 'Watering Zones', fn: () => { setShowZones(true); setShowShed(false) } }, { icon: '🪦', label: 'Memorial Garden', fn: () => { setShowMemorial(true); setShowShed(false) } }] },
            { section: 'Cozy Skull', items: [{ icon: '🖤', label: 'About Rooted', fn: () => { setShowAbout(true); setShowShed(false) } }, { icon: '🌿', label: 'About Cozy Skull', fn: () => { setShowCozySkull(true); setShowShed(false) } }, { icon: '📬', label: 'Contact Support', fn: () => { setShowContact(true); setShowShed(false) } }, { icon: '⭐', label: 'Rate Rooted', fn: () => { setShowRate(true); setShowShed(false) } }] },
          ].map(group => (
            <div key={group.section}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: '1px', textTransform: 'uppercase', margin: '16px 0 8px' }}>{group.section}</div>
              {group.items.map(item => (
                <div key={item.label} onClick={item.fn || (() => {})} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `0.5px solid ${C.border}`, cursor: 'pointer' }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div style={{ fontSize: 14, color: C.text }}>{item.label}</div>
                  <span style={{ marginLeft: 'auto', color: C.textMuted, fontSize: 16 }}>›</span>
                </div>
              ))}
            </div>
          ))}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
            <div style={{ ...sBtwn, marginBottom: 10 }}>
              <div style={{ fontSize: 13, color: C.textMuted }}>Space: <span style={{ color: C.text, fontWeight: 600 }}>{spaceName}</span></div>
              <button style={sBtnS} onClick={() => { setShowRename(true); setShowShed(false) }}>Rename</button>
            </div>
            {user
              ? <div style={sBtwn}><div style={{ fontSize: 13, color: C.textMuted }}>{user.name}</div><button style={{ ...sBtnS, color: C.dangerText, borderColor: C.dangerBorder }} onClick={() => { setUser(null); setShowShed(false) }}>Sign out</button></div>
              : <button style={{ ...sBtnP, width: '100%', padding: '11px', marginTop: 6 }} onClick={() => { setShowAuth(true); setShowShed(false) }}>Sign in to sync</button>}
          </div>
        </Sheet>
      )}

      {header}
      {navBar}

      {/* ── GREENHOUSE ─────────────────────────────────────────────────────── */}
      {tab === 'greenhouse' && (
        <div style={{ padding: '12px 14px' }}>
          {/* Seasonal banner */}
        <div style={{ background: seasonTheme.accent + '15', border: `1px solid ${seasonTheme.accent}33`, borderRadius: 12, padding: '8px 14px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 16 }}>{season === 'spring' ? '🌸' : season === 'summer' ? '🌻' : season === 'autumn' ? '🍂' : '❄️'}</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: seasonTheme.accent, letterSpacing: '1px', textTransform: 'uppercase' }}>{seasonTheme.name}</div>
            <div style={{ fontSize: 12, color: C.textMuted, fontStyle: 'italic' }}>{seasonTheme.greeting[new Date().getDate() % 3]}</div>
          </div>
        </div>

        {/* Watering Zones — always visible */}
        {(() => {
          const todayDay = new Date().getDay()
          const zones = JSON.parse(localStorage.getItem('rr_zones') || 'null') || []
          const todayZones = zones.filter(z => z.days && z.days.includes(todayDay))
          const isPropDay = todayDay === 0
          const allProps = plants.flatMap(p => (p.propagations||[]).filter(pr=>pr.status==='Rooting'))
          const hasActivity = todayZones.length > 0 || (isPropDay && allProps.length > 0)

          return (
            <div style={{ marginBottom: 12 }}>
              {hasActivity && (
                <>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>📅 Today's zone review</div>
                  {todayZones.map(zone => {
                    const count = plants.filter(p => p.wateringZone === zone.id).length
                    return (
                      <div key={zone.id} onClick={() => setShowZones(true)} style={{ background: (zone.color||'#7ec850') + '15', border: `1.5px solid ${zone.color||'#7ec850'}44`, borderRadius: 14, padding: '11px 14px', marginBottom: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 22 }}>{zone.icon||'💧'}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: zone.color||'#7ec850' }}>{zone.name}</div>
                          <div style={{ fontSize: 11, color: C.textMuted }}>{count} plants to review · Check before you water</div>
                        </div>
                        <div style={{ background: zone.color||'#7ec850', color: '#fff', borderRadius: 8, padding: '5px 12px', fontSize: 11, fontWeight: 700 }}>Review →</div>
                      </div>
                    )
                  })}
                  {isPropDay && allProps.length > 0 && (
                    <div onClick={() => setShowZones(true)} style={{ background: '#c8922a15', border: '1.5px solid #c8922a44', borderRadius: 14, padding: '11px 14px', marginBottom: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 22 }}>✂️</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#c8922a' }}>Prop Zone Sunday</div>
                        <div style={{ fontSize: 11, color: C.textMuted }}>{allProps.length} active props to check</div>
                      </div>
                      <div style={{ background: '#c8922a', color: '#fff', borderRadius: 8, padding: '5px 12px', fontSize: 11, fontWeight: 700 }}>Review →</div>
                    </div>
                  )}
                </>
              )}

              {/* Persistent zones quick-access bar */}
              <div onClick={() => setShowZones(true)} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>💧</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Watering Zones</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>
                    {zones.length === 0
                      ? 'Set up zones to organize your watering schedule'
                      : `${zones.length} zone${zones.length > 1 ? 's' : ''} · ${plants.filter(p => p.wateringZone).length} plants assigned`}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: C.textMuted }}>→</div>
              </div>
            </div>
          )
        })()}

        {/* How's the gang doing */}
        <div style={sCard({ marginBottom: 12, padding: '12px 14px' })}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>How's the gang doing?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { icon: '🌱', val: plants.filter(p => p.mood === 'thriving').length, label: 'Thriving', col: '#7ec850' },
              { icon: '💧', val: urgent.length, label: 'Needs Water', col: '#5b9fd4' },
              { icon: '🎭', val: plants.filter(p => p.mood === 'struggling').length, label: 'Being Dramatic', col: '#d4934a' },
              { icon: '🏥', val: plants.filter(p => p.recovery && p.recovery.active).length, label: 'In Plant ER', col: '#c94f4f' },
            ].map((s, i) => (
              <div key={i} style={{ background: C.bgSubtle, borderRadius: 10, padding: '10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: s.col, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: C.textMuted }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
            {[
              { icon: '🌱', val: plants.filter(p => p.mood === 'thriving').length, label: 'thriving', col: '#7ec850' },
              { icon: '💧', val: urgent.length, label: 'need water', col: '#5b9fd4' },
              { icon: '🪴', val: plants.filter(p => { const d = daysAgo(p.lastRepotted); return d === null || d > p.repotFreqDays }).length, label: 'repotting', col: '#c8922a' },
            ].map((s, i) => (
              <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 22, marginBottom: 2 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700, color: s.col }}>{s.val}</div>
                <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={sCard({ marginBottom: 14, borderColor: C.lavender + '44' })}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: C.lavender, marginBottom: 5 }}>🌙 Today's task</div>
            <div style={{ fontSize: 14, color: C.text, lineHeight: 1.6 }}>{dailyTask}</div>
          </div>

          {urgent.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: C.dangerText, marginBottom: 10 }}>Needs attention 👀</div>
              {urgent.map(p => (
                <div key={p.id} style={{ background: C.danger, border: `1px solid ${C.dangerBorder}`, borderRadius: 14, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setSelectedId(p.id)}>
                  <div><div style={{ fontWeight: 600, fontSize: 14, color: C.dangerText }}>{p.nickname || p.name}</div><div style={{ fontSize: 11, color: C.dangerText, marginTop: 2, opacity: 0.8 }}>{waterStatus(p).label}</div></div>
                  <button style={{ padding: '6px 14px', borderRadius: 9, border: `1px solid ${C.accent}`, background: 'transparent', color: C.accent, fontSize: 12, cursor: 'pointer' }} onClick={e => { e.stopPropagation(); waterPlant(p.id) }}>Water 💧</button>
                </div>
              ))}
            </div>
          )}

          {potd && (
            <div style={sCard({ marginBottom: 14, borderColor: MOOD_COLOR[potd.mood] + '44', cursor: 'pointer' })} onClick={() => setPotdExpanded(e => !e)}>
              <div style={sBtwn}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: C.textMuted }}>✨ Plant of the day</div>
                <span style={{ fontSize: 11, color: C.textMuted }}>{potdExpanded ? '▲' : '▼'}</span>
              </div>
              <div style={{ ...sRow, marginTop: 10 }}>
                <div style={{ ...sAv(potd.photo), fontSize: 26, boxShadow: `0 0 14px ${MOOD_COLOR[potd.mood]}44` }}>{!potd.photo && (potd.emoji || '🌿')}</div>
                <div>
                  <div style={sH(14)}>{potd.nickname || potd.name}</div>
                  <div style={{ fontSize: 12, color: C.textMuted, fontStyle: 'italic', marginTop: 2 }}>{MOODS.find(m => m.id === potd.mood)?.desc}</div>
                </div>
              </div>
              {potdExpanded && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `0.5px solid ${C.border}`, display: 'flex', gap: 8 }}>
                  <button style={sBtnP} onClick={e => { e.stopPropagation(); waterPlant(potd.id) }}>Water 💧</button>
                  <button style={sBtn} onClick={e => { e.stopPropagation(); setSelectedId(potd.id) }}>View →</button>
                </div>
              )}
            </div>
          )}

          {location ? (
            <div style={{ background: C.locBg, border: `1px solid ${C.locBorder}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
              <div style={sBtwn}>
                <div style={{ fontWeight: 600, fontSize: 13, color: C.locText }}>📍 {location.label}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={{ padding: '3px 9px', borderRadius: 8, border: `1px solid ${C.locBorder}`, background: 'transparent', color: C.locText, fontSize: 12, cursor: 'pointer' }} onClick={() => fetchTip(location.label)} disabled={locationLoading}>{locationLoading ? '...' : '↺'}</button>
                  <button style={{ padding: '3px 9px', borderRadius: 8, border: `1px solid ${C.locBorder}`, background: 'transparent', color: C.locText, fontSize: 12, cursor: 'pointer' }} onClick={() => setShowLocationSetup(true)}>Change</button>
                </div>
              </div>
              {locationLoading && <div style={{ fontSize: 13, color: C.locText, marginTop: 6 }}>Getting tip...</div>}
              {locationTip && !locationLoading && <div style={{ fontSize: 13, color: C.locText, lineHeight: 1.7, marginTop: 8 }}>{locationTip.text}</div>}
            </div>
          ) : (
            <div style={{ background: C.locBg, border: `1px solid ${C.locBorder}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14, cursor: 'pointer' }} onClick={() => setShowLocationSetup(true)}>
              <div style={{ fontWeight: 600, fontSize: 13, color: C.locText, marginBottom: 4 }}>📍 Set your location</div>
              <div style={{ fontSize: 13, color: C.locText }}>Get care tips tailored to your local climate.</div>
            </div>
          )}

          {!vacMode ? (
            <div style={sCard({ marginBottom: 14, cursor: 'pointer' })} onClick={() => setShowVac(v => !v)}>
              <div style={sBtwn}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: C.textMuted, marginBottom: 3 }}>✈️ Going somewhere?</div>
                  <div style={{ fontSize: 14, color: C.text }}>Vacation mode + caretaker sheet</div>
                </div>
                <span style={{ color: C.textMuted }}>{showVac ? '▲' : '▼'}</span>
              </div>
              {showVac && (
                <div style={{ marginTop: 14 }} onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                    <div><div style={sLbl}>Leaving on</div><input style={sInp} type="date" value={vacDepart} onChange={e => setVacDepart(e.target.value)} /></div>
                    <div><div style={sLbl}>Back on</div><input style={sInp} type="date" value={vacReturn} onChange={e => setVacReturn(e.target.value)} /></div>
                  </div>
                  <div style={{ marginBottom: 12 }}><div style={sLbl}>Caretaker notes</div><textarea style={{ ...sInp, minHeight: 75, resize: 'vertical' }} value={vacNotes} onChange={e => setVacNotes(e.target.value)} placeholder="Water Monica every 7 days. Do not move her." /></div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={sBtnP} onClick={() => { setVacMode(true); setShowVac(false) }}>Activate ✈️</button>
                    <button style={sBtn} onClick={() => setShowCaretaker(true)}>📋 View sheet</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ marginBottom: 14, background: C.bgSubtle, padding: '10px 14px', borderRadius: 12, border: `0.5px solid ${C.border}`, display: 'inline-flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: C.textMuted }}>✈️ Vacation mode active</span>
              <button style={{ background: 'none', border: 'none', color: C.accent, cursor: 'pointer', fontSize: 12 }} onClick={() => setShowCaretaker(true)}>📋</button>
              <button style={{ background: 'none', border: 'none', color: C.dangerText, cursor: 'pointer', fontSize: 12 }} onClick={() => setVacMode(false)}>End</button>
            </div>
          )}

          <div style={sBtwn}>
            <div style={{ fontSize: 13, color: C.textMuted }}>Your plants · {plants.length}</div>
            <button style={sBtnP} onClick={() => setTab('collection')}>View all →</button>
          </div>
          <div style={{ marginTop: 10 }}>
            {plants.slice(0, 3).map(plant => {
              const ws = waterStatus(plant)
              const aura = MOOD_COLOR[plant.mood] || C.accent
              return (
                <div key={plant.id} style={sCard({ borderColor: aura + '33', cursor: 'pointer', marginBottom: 10 })} onClick={() => setSelectedId(plant.id)}>
                  <div style={sRow}>
                    <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
                      <div style={{ ...sAv(plant.photo), width: 52, height: 52, borderColor: aura + '55', fontSize: 26 }}>{!plant.photo && (plant.emoji || '🌿')}</div>
                      <Ring pct={ws.pct} size={58} stroke={2.5} color={aura} bg={C.border} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={sBtwn}>
                        <div style={sH(14)}>{plant.nickname || plant.name}</div>
                        <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9, background: MOOD_COLOR[plant.mood] + '22', color: MOOD_COLOR[plant.mood], fontWeight: 700 }}>{plant.mood}</span>
                      </div>
                      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{plant.room}{plant.species ? ' · ' + plant.species : ''}</div>
                      <div style={{ fontSize: 12, color: ws.color, marginTop: 2, fontStyle: 'italic' }}>{ws.label}</div>
                    </div>
                  </div>
                </div>
              )
            })}
            {plants.length === 0 && (
              <div style={{ background: C.bgCard, border: `1px dashed ${C.borderAccent}`, borderRadius: 16, padding: '28px 20px', textAlign: 'center', marginTop: 10 }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>🌱</div>
                <div style={sH(15)}>Your greenhouse is empty.</div>
                <div style={{ fontSize: 13, color: C.textMuted, marginTop: 5 }}>Let's fix that.</div>
                <button style={{ ...sBtnP, marginTop: 14 }} onClick={() => { setTab('collection'); setShowAddPlant(true) }}>+ Add your first plant</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── COLLECTION ─────────────────────────────────────────────────────── */}
      {tab === 'collection' && (
        <div style={{ padding: '12px 14px' }}>
          <div style={sBtwn}>
            <select style={{ ...sInp, width: 'auto', fontSize: 13 }} value={roomFilter} onChange={e => setRoomFilter(e.target.value)}>
              {ROOMS.map(r => <option key={r}>{r}</option>)}
            </select>
            <button style={sBtnP} onClick={() => setShowAddPlant(true)}>+ Add plant</button>
          </div>
          {showAddPlant && (
            <div style={sCard({ marginTop: 12, marginBottom: 12 })}>
              <div style={{ ...sH(15), marginBottom: 12 }}>New plant 🌱</div>

              {/* Plant DB search */}
              <div style={{ marginBottom: 14 }}>
                <div style={sLbl}>Search plant database</div>
                <input
                  style={{ ...sInp, marginBottom: plantSuggestions.length ? 0 : undefined }}
                  placeholder="e.g. Monstera, Pothos, Snake Plant..."
                  value={plantSearch}
                  onChange={e => {
                    setPlantSearch(e.target.value)
                    setPlantSuggestions(searchPlantDB(e.target.value))
                  }}
                />
                {plantSuggestions.length > 0 && (
                  <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', marginTop: 2 }}>
                    {plantSuggestions.map(p => (
                      <div key={p.name} onClick={() => {
                        setNewPlant(prev => ({ ...prev, name: p.name, species: p.name, emoji: p.emoji, waterFreqDays: p.waterFreqDays, fertilizeFreqDays: p.fertilizeFreqDays, repotFreqDays: p.repotFreqDays, notes: p.notes }))
                        setPlantSearch('')
                        setPlantSuggestions([])
                      }} style={{ padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: 20 }}>{p.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: C.textMuted }}>
                            💧 Every {p.waterFreqDays}d · {p.light} light · {p.difficulty}
                            {p.toxicity === 'toxic' && <span style={{ color: '#c94f4f', marginLeft: 6 }}>⚠️ toxic</span>}
                            {p.toxicity === 'safe' && <span style={{ color: C.accent, marginLeft: 6 }}>✓ pet safe</span>}
                          </div>
                        </div>
                        <span style={{ fontSize: 11, color: C.accent }}>Auto-fill →</span>
                      </div>
                    ))}
                  </div>
                )}
                {newPlant.species && PLANT_DB.find(p => p.name === newPlant.species) && (
                  <div style={{ marginTop: 8, padding: '8px 12px', background: C.accent + '15', border: `1px solid ${C.accent}33`, borderRadius: 10, fontSize: 12, color: C.accent }}>
                    ✓ Auto-filled from plant database
                    {PLANT_DB.find(p => p.name === newPlant.species)?.toxicity === 'toxic' && <span style={{ color: '#c94f4f', marginLeft: 8 }}>⚠️ Toxic to pets</span>}
                    {PLANT_DB.find(p => p.name === newPlant.species)?.toxicity === 'safe' && <span style={{ color: C.accent, marginLeft: 8 }}>✓ Pet safe</span>}
                  </div>
                )}
              </div>
              {[['name','Plant name *'],['nickname','Nickname'],['species','Species']].map(([key, label]) => (
                <div key={key} style={{ marginBottom: 10 }}>
                  <div style={sLbl}>{label}</div>
                  <input style={sInp} value={newPlant[key]} onChange={e => setNewPlant(p => ({ ...p, [key]: e.target.value }))} />
                </div>
              ))}
              <div style={{ marginBottom: 10 }}>
                <div style={sLbl}>Room</div>
                <select style={sInp} value={newPlant.room} onChange={e => setNewPlant(p => ({ ...p, room: e.target.value }))}>
                  {ROOMS.filter(r => r !== 'All').map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              {(() => {
                const suggestion = suggestZone(newPlant)
                const zones = JSON.parse(localStorage.getItem('rr_zones') || 'null') || []
                const suggestedZone = suggestion ? zones.find(z => z.id === suggestion.zone) : null
                if (!suggestedZone) return null
                return (
                  <div style={{ marginBottom: 10, background: (suggestedZone.color||C.accent)+'15', border: `1px solid ${suggestedZone.color||C.accent}44`, borderRadius: 10, padding: '8px 12px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: suggestedZone.color||C.accent, marginBottom: 3 }}>💧 Suggested: {suggestedZone.name}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{suggestion.reason}</div>
                    <button onClick={() => setNewPlant(p => ({...p, wateringZone: suggestedZone.id}))} style={{ marginTop: 6, fontSize: 11, padding: '4px 10px', borderRadius: 7, border: `1px solid ${suggestedZone.color||C.accent}44`, background: 'transparent', color: suggestedZone.color||C.accent, cursor: 'pointer', fontWeight: 700 }}>
                      {newPlant.wateringZone === suggestedZone.id ? '✓ Added to zone' : 'Add to this zone'}
                    </button>
                  </div>
                )
              })()}
              <div style={{ marginBottom: 10 }}>
                <div style={sLbl}>Water every (days)</div>
                <input style={sInp} type="number" min={1} value={newPlant.waterFreqDays} onChange={e => setNewPlant(p => ({ ...p, waterFreqDays: parseInt(e.target.value) || 1 }))} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={sLbl}>Avatar</div>
                <EmojiPick current={newPlant.emoji || '🌿'} onPick={em => setNewPlant(p => ({ ...p, emoji: em, photo: null }))} />
                <input type="file" accept="image/*" ref={photoRef} style={{ display: 'none' }} onChange={e => uploadPhoto(e, photo => setNewPlant(p => ({ ...p, photo })))} />
                <button style={sBtnS} onClick={() => photoRef.current?.click()}>📷 Upload photo</button>
                {newPlant.photo && <img src={newPlant.photo} alt="" style={{ width: 64, height: 64, borderRadius: 10, objectFit: 'cover', marginTop: 8, border: `2px solid ${C.accent}` }} />}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={sBtnP} onClick={addPlant}>Save plant</button>
                <button style={sBtn} onClick={() => setShowAddPlant(false)}>Cancel</button>
              </div>
            </div>
          )}
          {filtered.length === 0 && !showAddPlant && (
            <div style={{ background: C.bgCard, border: `1px dashed ${C.borderAccent}`, borderRadius: 16, padding: '28px 20px', textAlign: 'center', marginTop: 12 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🌱</div>
              <div style={sH(14)}>Your greenhouse is empty. Let's fix that.</div>
              <button style={{ ...sBtnP, marginTop: 14 }} onClick={() => setShowAddPlant(true)}>+ Add your first plant</button>
            </div>
          )}
          <div style={{ marginTop: 10 }}>
            {filtered.map(plant => {
              const ws = waterStatus(plant)
              const aura = MOOD_COLOR[plant.mood] || C.accent
              return (
                <div key={plant.id} style={sCard({ borderColor: aura + '33', cursor: 'pointer', marginBottom: 10 })} onClick={() => setSelectedId(plant.id)}>
                  <div style={sRow}>
                    <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
                      <div style={{ ...sAv(plant.photo), width: 52, height: 52, borderColor: aura + '55', fontSize: 26 }}>{!plant.photo && (plant.emoji || '🌿')}</div>
                      <Ring pct={ws.pct} size={58} stroke={2.5} color={aura} bg={C.border} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={sBtwn}>
                        <div style={sH(14)}>{plant.nickname || plant.name}</div>
                        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                          {(plant.waterStreak || 0) > 2 && <span style={{ fontSize: 11, color: C.gold, fontWeight: 700 }}>🔥{plant.waterStreak}</span>}
                          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 9, background: MOOD_COLOR[plant.mood] + '22', color: MOOD_COLOR[plant.mood], fontWeight: 700 }}>{plant.mood}</span>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{plant.room}{plant.species ? ' · ' + plant.species : ''}</div>
                      <div style={{ fontSize: 12, color: ws.color, marginTop: 2, fontStyle: 'italic' }}>{ws.label}</div>
                    </div>
                  </div>
                </div>
              )
            })}
            {filtered.length > 0 && <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', background: 'transparent', border: `1px dashed ${C.borderAccent}`, borderRadius: 14, color: C.textMuted, fontSize: 13, cursor: 'pointer', width: '100%', marginTop: 4 }} onClick={() => setShowAddPlant(true)}>＋ Add another plant</button>}
          </div>
        </div>
      )}

      {/* ── PLANT ER ───────────────────────────────────────────────────────── */}
      {tab === 'planterr' && (
        <div style={{ padding: '12px 14px' }}>
          <div style={sH(21)}>Plant ER 🚑</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 16, fontStyle: 'italic' }}>Diagnose problems before they become disasters.</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button style={sTab(aiMode === 'id')} onClick={() => { setAiMode('id'); setAiResult(''); setAiInput('') }}>🔍 ID & Care</button>
            <button style={sTab(aiMode === 'diagnose')} onClick={() => { setAiMode('diagnose'); setAiResult(''); setAiInput('') }}>🩺 Diagnose</button>
          </div>
          {location && <div style={{ fontSize: 12, color: C.locText, background: C.locBg, padding: '6px 12px', borderRadius: 10, marginBottom: 14, border: `0.5px solid ${C.locBorder}`, display: 'inline-block' }}>📍 Tailored to {location.label}</div>}
          <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 10 }}>{aiMode === 'id' ? 'Type a plant name or describe what you see.' : 'Describe the symptoms. Be honest.'}</div>
          <textarea style={{ ...sInp, minHeight: 90, resize: 'vertical' }} placeholder={aiMode === 'id' ? 'e.g. fiddle leaf fig' : 'e.g. yellow leaves, wet soil for two weeks'} value={aiInput} onChange={e => setAiInput(e.target.value)} />
          <button style={{ ...sBtnP, marginTop: 12 }} disabled={aiLoading} onClick={() => {
            if (!aiInput.trim()) return
            const lc = location ? ` User in ${location.label}.` : ''
            if (aiMode === 'id') callAI(`Sassy plant expert with dark cottagecore energy.${lc} Full care guide for: ${aiInput}. Light, water, humidity, soil, fertilizing, common problems, toxicity, fun facts. No gendered language.`)
            else callAI(`Sassy plant doctor.${lc} Diagnose: ${aiInput}. What is wrong, why it happened, step-by-step treatment plan. Dark cottagecore energy. No gendered language.`)
          }}>{aiLoading ? (aiMode === 'id' ? 'Consulting the oracle...' : 'Running diagnostics...') : (aiMode === 'id' ? 'Identify & get care guide' : 'Diagnose my plant')}</button>
          {aiResult && <div style={sCard({ marginTop: 16, whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.8 })}>{aiResult}</div>}
        </div>
      )}

      {/* ── COMMUNITY ──────────────────────────────────────────────────────── */}
      {tab === 'community' && (
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 48 }}>

          {/* Teapot illustration area */}
          <div style={{ fontSize: 64, marginBottom: 20, filter: 'grayscale(30%)', opacity: 0.85 }}>☕</div>

          {/* Coming soon badge */}
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.gold, background: C.gold + '18', border: `1px solid ${C.gold}44`, borderRadius: 20, padding: '4px 14px', marginBottom: 18 }}>
            Coming Soon
          </div>

          {/* Headline */}
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: C.text, lineHeight: 1.2, marginBottom: 12, maxWidth: 280 }}>
            Dirt & Tea
          </div>

          {/* Tagline */}
          <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7, marginBottom: 32, maxWidth: 300, fontStyle: 'italic' }}>
            A community greenhouse for plant people. Ask questions, flex your wins, swap cuttings.
          </div>

          {/* Feature preview cards */}
          {[
            { icon: '💬', label: 'Community Feed', desc: 'Questions, flexes, and hot plant takes' },
            { icon: '✂️', label: 'Cutting Swaps', desc: 'Trade propagations with local growers' },
            { icon: '🌿', label: 'Plant Sitting', desc: 'Find trusted sitters for your collection' },
          ].map(f => (
            <div key={f.label} style={{ width: '100%', maxWidth: 320, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', opacity: 0.7 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{f.label}</div>
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{f.desc}</div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 11, color: C.gold, fontWeight: 700, flexShrink: 0 }}>Soon</div>
            </div>
          ))}

          <div style={{ marginTop: 28, fontSize: 12, color: C.textMuted, lineHeight: 1.8, maxWidth: 280 }}>
            We're building community the right way — when the greenhouse is full enough to feel alive.
          </div>

          <div style={{ marginTop: 8, fontSize: 12, color: C.textMuted, fontStyle: 'italic' }}>
            Follow{' '}
            <a href="https://www.instagram.com/cozy.skull" target="_blank" rel="noreferrer" style={{ color: C.accent, textDecoration: 'none', fontWeight: 600 }}>@cozy.skull</a>
            {' '}for the launch announcement.
          </div>

        </div>
      )}

      {/* ── JOURNAL ────────────────────────────────────────────────────────── */}
      {tab === 'journal' && (
        <div style={{ padding: '12px 14px' }}>
          <div style={sH(21)}>Growth Journal 📖</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 16, fontStyle: 'italic' }}>The living record of your plants.</div>
          {plants.length === 0 && <div style={{ color: C.textMuted, fontSize: 13, textAlign: 'center', padding: '2rem 0', fontStyle: 'italic' }}>Add some plants first and your journal will come alive.</div>}
          {plants.map(plant => {
            const entries = [...(plant.journal || [])].reverse().slice(0, 2)
            return (
              <div key={plant.id} style={sCard({ marginBottom: 12, cursor: 'pointer' })} onClick={() => { setSelectedId(plant.id); setPlantTab('log'); setLogSection('journal') }}>
                <div style={sRow}>
                  <div style={{ ...sAv(plant.photo, 42), fontSize: 22 }}>{!plant.photo && (plant.emoji || '🌿')}</div>
                  <div style={{ flex: 1 }}><div style={sH(13)}>{plant.nickname || plant.name}</div><div style={{ fontSize: 12, color: C.textMuted }}>{(plant.journal || []).length} {(plant.journal || []).length === 1 ? 'entry' : 'entries'}</div></div>
                  <span style={{ color: C.textMuted, fontSize: 15 }}>›</span>
                </div>
                {entries.map((e, i) => (
                  <div key={i} style={{ marginTop: 10, paddingTop: 10, borderTop: `0.5px solid ${C.border}` }}>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{new Date(e.date).toLocaleDateString()}</div>
                    {e.note && <div style={{ fontSize: 13, marginTop: 3, lineHeight: 1.5 }}>{e.note.slice(0, 80)}{e.note.length > 80 ? '...' : ''}</div>}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
