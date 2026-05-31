// ── Brand colors ─────────────────────────────────────────────────────────────
// C is set dynamically - default to dark, updated by App
export let C = {
  bg: '#0d0c09',
  bgCard: '#1a1710',
  bgInput: '#13110d',
  bgSubtle: '#201d15',
  border: '#2e2a1e',
  borderAccent: '#4a4228',
  text: '#e8dfc8',
  textMuted: '#8a7d5a',
  textFaint: '#3a3520',
  accent: '#7ec850',
  accentText: '#0d1a07',
  gold: '#c8922a',
  danger: '#2a1212',
  dangerBorder: '#5a2020',
  dangerText: '#e87070',
  locBg: '#161410',
  locBorder: '#3a3018',
  locText: '#a89a6a',
  navBg: '#080806',
  lavender: '#9a7ab8',
}

export function setThemeColors(isDark) {
  const src = isDark ? DARK : LIGHT
  Object.keys(src).forEach(k => { C[k] = src[k] })
}

// ── Light mode colors ────────────────────────────────────────────────────────
export const LIGHT = {
  bg: '#f5f2ec',
  bgCard: '#ffffff',
  bgInput: '#ede9e0',
  bgSubtle: '#ede9e0',
  border: '#d8d0bc',
  borderAccent: '#b8a888',
  text: '#2a2015',
  textMuted: '#7a6a48',
  textFaint: '#c0b090',
  accent: '#5a9e35',
  accentText: '#ffffff',
  gold: '#a07418',
  danger: '#fce8e8',
  dangerBorder: '#e8b0b0',
  dangerText: '#c03030',
  locBg: '#eef5e8',
  locBorder: '#b8d8a0',
  locText: '#4a7030',
  navBg: '#ffffff',
  lavender: '#7060a0',
}

export const DARK = {
  bg: '#0d0c09',
  bgCard: '#1a1710',
  bgInput: '#13110d',
  bgSubtle: '#201d15',
  border: '#2e2a1e',
  borderAccent: '#4a4228',
  text: '#e8dfc8',
  textMuted: '#8a7d5a',
  textFaint: '#3a3520',
  accent: '#7ec850',
  accentText: '#0d1a07',
  gold: '#c8922a',
  danger: '#2a1212',
  dangerBorder: '#5a2020',
  dangerText: '#e87070',
  locBg: '#161410',
  locBorder: '#3a3018',
  locText: '#a89a6a',
  navBg: '#080806',
  lavender: '#9a7ab8',
}

// ── Mood colors ───────────────────────────────────────────────────────────────
export const MOOD_COLOR = {
  thriving: '#7ec850',
  okay: '#5b9fd4',
  struggling: '#d4934a',
  crisis: '#c94f4f',
}

// ── Static data ───────────────────────────────────────────────────────────────
export const SPACE_NAMES = [
  'My Plant Gang', 'The Jungle', 'The Sanctuary',
  'The Garden', 'My Green Space', 'The Nursery',
]

export const QUOTES = [
  'Your plants are rooting for you.',
  'A home for your plants.',
  'Held. Tended. Not abandoned.',
  'Plant care without perfectionism.',
  'Some things grow when you actually take care of them.',
]

export const TASKS = [
  'Monica is giving you a look. Rotate her 90 degrees.',
  'Someone needs their leaves dusted. They are judging you.',
  'Check the soil on a plant you have been avoiding.',
  'Take a photo of your most photogenic plant. They deserve it.',
  'Move one plant closer to natural light and see what happens.',
  'Give your most neglected plant a very sincere apology.',
  'Check for pests on the plant you least expect it from.',
]

export const ROOMS = [
  'All', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom',
  'Office', 'Patio', 'Balcony', 'Greenhouse', 'Plant Stand', 'Other',
]

export const MOODS = [
  { id: 'thriving',   label: 'Thriving',   color: '#7ec850', desc: 'Unbothered. Hydrated. Thriving.' },
  { id: 'okay',       label: 'Okay',       color: '#5b9fd4', desc: 'Medium plant energy today.' },
  { id: 'struggling', label: 'Struggling', color: '#d4934a', desc: 'Giving fine while clearly not.' },
  { id: 'crisis',     label: 'Crisis',     color: '#c94f4f', desc: 'In its villain era. Intervention required.' },
]

export const EMOJIS = [
  '🌿','🪴','🌵','🌴','🌸','🌺','🍃','🌾',
  '🎋','🪷','🌻','🌹','🌱','🍀','🌳','🪻','💐','🌼','🫧',
]

export const PESTS = [
  { id: 'fg', name: 'Fungus Gnats', icon: '🦟', treatment: 'Let soil dry fully. Yellow sticky traps. Neem oil drench weekly x3.', sprayFreq: 7 },
  { id: 'sm', name: 'Spider Mites',  icon: '🕷️', treatment: 'Neem oil every 5 days. Increase humidity. Isolate immediately.', sprayFreq: 5 },
  { id: 'mb', name: 'Mealybugs',    icon: '🐛', treatment: 'Rubbing alcohol on cotton swab. Neem oil weekly.', sprayFreq: 7 },
  { id: 'sc', name: 'Scale',        icon: '🪲', treatment: 'Scrape off manually. Neem oil weekly x4.', sprayFreq: 7 },
  { id: 'ap', name: 'Aphids',       icon: '🐜', treatment: 'Blast with water. Insecticidal soap every 3 days for 2 weeks.', sprayFreq: 3 },
  { id: 'th', name: 'Thrips',       icon: '🐝', treatment: 'Spinosad every 5 days. Blue sticky traps. Treat 6+ weeks.', sprayFreq: 5 },
  { id: 'rr', name: 'Root Rot',     icon: '🍄', treatment: 'Unpot. Trim brown roots. Dry 24hrs. Repot in fresh well-draining mix.', sprayFreq: null },
  { id: 'wf', name: 'Whitefly',     icon: '🦋', treatment: 'Yellow sticky traps. Spray leaf undersides every 3 days.', sprayFreq: 3 },
]

export const VERDICTS = [
  'Your pothos is innocent. The overwatering allegations remain under investigation.',
  'The monstera has been found guilty of dramatic yellowing despite adequate care. The jury suspects attention-seeking.',
  'Case dismissed. The soil was dry. You know what you did.',
  'The spider plant has been acquitted. The prosecution evidence was circumstantial at best.',
  'Guilty of thriving in low light conditions against all expectations. The court is impressed.',
  'Your fiddle leaf fig is hereby sentenced to a south-facing window. No appeals.',
]

export const PLANT_BADGES = [
  { id: 'one_year',    icon: '🎂', label: '1 Year Strong' },
  { id: 'thriving',    icon: '🌟', label: 'Thriving' },
  { id: 'pest_free',   icon: '🧹', label: 'Pest Free' },
  { id: 'well_fed',    icon: '🌱', label: 'Well Fed' },
  { id: 'propagated',  icon: '✂️', label: 'Made Babies' },
  { id: 'documented',  icon: '📖', label: 'Well Documented' },
  { id: 'rescue',      icon: '🚑', label: 'Rescue Story' },
  { id: 'drama',       icon: '🎭', label: 'Drama Plant' },
  { id: 'showstopper', icon: '✨', label: 'Showstopper' },
]

export const INIT_PLANTS = [
  {
    id: 1, name: 'Monstera', nickname: 'Monica', room: 'Living Room',
    species: 'Monstera deliciosa',
    lastWatered: new Date(Date.now() - 3 * 86400000).toISOString(),
    waterFreqDays: 7, mood: 'thriving', photo: null, emoji: '🌿',
    notes: 'Loves the south window.',
    pests: [],
    propagations: [{
      id: 1, method: 'Stem cutting', notes: '2 nodes',
      date: new Date(Date.now() - 10 * 86400000).toISOString(),
      status: 'Rooting', available: true,
    }],
    journal: [], fertilizeFreqDays: 30, lastFertilized: null,
    repotFreqDays: 365, lastRepotted: null,
    waterStreak: 4, badges: ['thriving'],
    acquiredDate: '2024-03-15', rescueStory: '', giftedFrom: '', milestones: [],
  },
  {
    id: 2, name: 'Pothos', nickname: 'Patty', room: 'Bedroom',
    species: 'Epipremnum aureum',
    lastWatered: new Date(Date.now() - 12 * 86400000).toISOString(),
    waterFreqDays: 10, mood: 'struggling', photo: null, emoji: '🍃',
    notes: '',
    pests: [], propagations: [], journal: [],
    fertilizeFreqDays: 30, lastFertilized: null,
    repotFreqDays: 365, lastRepotted: null,
    waterStreak: 0, badges: [],
    acquiredDate: '2023-11-01',
    rescueStory: 'Found at a gas station for $2. Almost dead. Look at it now.',
    giftedFrom: '', milestones: [],
  },
]

export const INIT_POSTS = [
  {
    id: 1, type: 'question', author: 'PlantParentTara', avatar: '🌸', time: '2h ago',
    title: 'Why are my monstera leaves turning yellow?',
    body: 'Had it 6 months and it was amazing. Now 3 leaves went yellow in a week.',
    tags: ['monstera', 'help'], likes: 12,
    replies: [{ author: 'GreenThumbGreta', avatar: '🌿', text: 'Overwatering is the #1 cause! How often are you watering?', time: '1h ago' }],
  },
  {
    id: 2, type: 'swap', author: 'PropQueenJess', avatar: '✂️', time: '4h ago',
    title: 'Offering: Pothos cuttings (3 nodes each)',
    body: '8 rooted cuttings ready to go. Looking to trade for hoya or string of pearls.',
    tags: ['pothos', 'swap'], likes: 24, replies: [],
  },
  {
    id: 3, type: 'flex', author: 'UrbanJungleMike', avatar: '🌴', time: '1d ago',
    title: 'My monstera finally fenestrated',
    body: 'Three years of patience. It finally fenestrated and I cried actual tears.',
    tags: ['monstera', 'milestone'], likes: 87,
    replies: [{ author: 'PlantParentTara', avatar: '🌸', text: 'THE TEARS ARE JUSTIFIED!!', time: '20h ago' }],
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
export function daysAgo(iso) {
  if (!iso) return null
  return Math.floor((Date.now() - new Date(iso)) / 86400000)
}

export function waterStatus(p) {
  const d = daysAgo(p.lastWatered)
  if (d === null) return { label: 'Never watered', color: '#c94f4f', urgent: true, pct: 0 }
  const pct = Math.max(0, Math.min(1, 1 - d / p.waterFreqDays))
  const o = d - p.waterFreqDays
  if (o > 3) return { label: `${d}d ago — parched`, color: '#c94f4f', urgent: true, pct }
  if (o > 0) return { label: `${d}d ago — thirsty`, color: '#d4934a', urgent: true, pct }
  return { label: `${d}d ago — good`, color: '#7ec850', urgent: false, pct }
}

export function sassyMsg(p) {
  const d = daysAgo(p.lastWatered)
  const name = p.nickname || p.name
  if (!d) return `${name} has never been watered. We need to have a talk.`
  const o = d - p.waterFreqDays
  if (o > 5) return `EXCUSE ME — ${name} has been waiting ${d} days. This is neglect.`
  if (o > 0) return `${name} is giving you the silent treatment. It is thirsty.`
  return `${name} is hydrated and unbothered. You are doing great.`
}

export function getGreeting() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return { text: 'Good Morning', icon: '☀️' }
  if (h >= 12 && h < 18) return { text: 'Welcome Back', icon: '🌿' }
  return { text: 'Good Evening', icon: '🌙' }
}

export function ls(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}

export function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

// ── Badge auto-earn logic ─────────────────────────────────────────────────────
export function checkAutoEarnBadges(plant, allPlants) {
  const earned = new Set(plant.badges || [])

  // 1 Year Strong — acquired over 365 days ago
  if (plant.acquiredDate) {
    const days = Math.floor((Date.now() - new Date(plant.acquiredDate)) / 86400000)
    if (days >= 365) earned.add('one_year')
  }

  // Thriving — mood is thriving
  if (plant.mood === 'thriving') earned.add('thriving')
  else earned.delete('thriving')

  // Pest Free — no active pests
  const activePests = (plant.pests || []).filter(p => !p.treated)
  if (activePests.length === 0 && (plant.pests || []).length > 0) earned.add('pest_free')

  // Made Babies — has propagations
  if ((plant.propagations || []).length > 0) earned.add('propagated')

  // Well Documented — 5+ journal entries
  if ((plant.journal || []).length >= 5) earned.add('documented')

  // Rescue Story — has a rescue story written
  if (plant.rescueStory && plant.rescueStory.length > 20) earned.add('rescue')

  // Well Fed — has been fertilized at least once
  if (plant.lastFertilized) earned.add('well_fed')

  return Array.from(earned)
}

// ── Profile badge auto-earn ───────────────────────────────────────────────────
export function checkProfileBadges(plants, existingBadges) {
  const earned = new Set(existingBadges || [])

  if (plants.length >= 1) earned.add('first_plant')
  if (plants.length >= 5) earned.add('gang_5')
  if (plants.length >= 10) earned.add('gang_10')

  // Check watering streaks
  const maxStreak = Math.max(...plants.map(p => p.waterStreak || 0), 0)
  if (maxStreak >= 7) earned.add('streak_7')
  if (maxStreak >= 30) earned.add('streak_30')

  // Propagation wizard — any plant has propagations
  if (plants.some(p => (p.propagations || []).length > 0)) earned.add('propagator')

  // Pest slayer — any plant has treated pests
  if (plants.some(p => (p.pests || []).some(pest => pest.treated))) earned.add('pest_slayer')

  // Root keeper — any plant acquired 2+ years ago
  if (plants.some(p => {
    if (!p.acquiredDate) return false
    return Math.floor((Date.now() - new Date(p.acquiredDate)) / 86400000) >= 730
  })) earned.add('root_keeper')

  // Brought back from dead — any plant recovered from crisis
  if (plants.some(p => p.rescueStory && p.rescueStory.length > 20)) earned.add('resurrection')

  return Array.from(earned)
}

export const PROFILE_BADGES = [
  { id: 'first_plant',  icon: '🌱', label: 'First Roots',            desc: 'Added your first plant' },
  { id: 'gang_5',       icon: '🌿', label: 'Growing Gang',           desc: '5+ plants collected' },
  { id: 'gang_10',      icon: '🪴', label: 'Full Jungle',            desc: '10+ plants — committed' },
  { id: 'streak_7',     icon: '💧', label: '7-Day Streak',           desc: 'Watered on schedule 7 days' },
  { id: 'streak_30',    icon: '⚡', label: '30-Day Streak',          desc: '30 days consistent care' },
  { id: 'propagator',   icon: '✂️', label: 'Propagation Wizard',     desc: 'First propagation logged' },
  { id: 'pest_slayer',  icon: '🛡️', label: 'Pest Slayer',            desc: 'Treated and resolved a pest' },
  { id: 'plant_sitter', icon: '🏡', label: 'Plant Sitter',           desc: 'Cared for a friend's plants' },
  { id: 'root_keeper',  icon: '🖤', label: 'Root Keeper',            desc: 'Long-term plant parent (2+ years)' },
  { id: 'resurrection', icon: '💀', label: 'Brought Back From Dead', desc: 'Plant recovered from near-death' },
  { id: 'watered_all',  icon: '☕', label: 'Watered Everything',     desc: 'All plants on schedule' },
  { id: 'legendary',    icon: '🌙', label: 'Cozy Skull Legend',      desc: 'Gifted by a friend — highest honor' },
]

// ── Seasonal themes ───────────────────────────────────────────────────────────
export function getSeason() {
  const m = new Date().getMonth() // 0-11
  if (m >= 2 && m <= 4) return 'spring'
  if (m >= 5 && m <= 7) return 'summer'
  if (m >= 8 && m <= 10) return 'autumn'
  return 'winter'
}

export const SEASONAL_THEMES = {
  spring: {
    name: 'Spring Bloom',
    accent: '#a0c840',
    gold: '#c8a020',
    lavender: '#c080c0',
    bgCard: '#171814',
    border: '#2a2e20',
    greeting: ['New growth is coming.', 'Spring into plant care.', 'Bloom season is here.'],
  },
  summer: {
    name: 'Summer Garden',
    accent: '#7ec850',
    gold: '#e8a020',
    lavender: '#9a7ab8',
    bgCard: '#1a1710',
    border: '#2e2a1e',
    greeting: ['Long days, happy plants.', 'Peak growing season.', 'Sun-soaked and thriving.'],
  },
  autumn: {
    name: 'Autumn Harvest',
    accent: '#c8922a',
    gold: '#d4641a',
    lavender: '#9a6080',
    bgCard: '#1a1510',
    border: '#2e2018',
    greeting: ['Time to slow down and tend.', 'Cozy season for plants.', 'Harvest what you've grown.'],
  },
  winter: {
    name: 'Winter Rest',
    accent: '#70a8c8',
    gold: '#a0b8c8',
    lavender: '#8090b8',
    bgCard: '#141618',
    border: '#202428',
    greeting: ['Rest season. Water less.', 'Dormancy is self-care.', 'Quiet growth underground.'],
  },
}
