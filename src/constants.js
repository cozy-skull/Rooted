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
  { id: 'plant_sitter', icon: '🏡', label: 'Plant Sitter',           desc: 'Cared for a friend\'s plants' },
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
    greeting: ['Time to slow down and tend.', 'Cozy season for plants.', "Harvest what you've grown."],
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

// ── Plant Profile Database ───────────────────────────────────────────────────
// 40 common houseplants. waterFreqDays = typical indoor frequency.
// light: 'low' | 'medium' | 'bright' | 'direct'
// humidity: 'low' | 'medium' | 'high'
// toxicity: 'safe' | 'toxic' | 'mildly-toxic'
// difficulty: 'easy' | 'medium' | 'hard'
// commonPests: array of pest IDs from PESTS
// suggestedZone: 1=high freq, 2=moderate, 3=drought tolerant, 4=desert

export const PLANT_DB = [
  { name: 'Monstera Deliciosa', emoji: '🌿', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'medium', humidity: 'medium', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 2, notes: 'Let top 2 inches dry between waterings. Loves to climb — give it a moss pole.', commonPests: ['sm', 'sc', 'th'], funFact: 'The holes in the leaves are called fenestrations — they help the plant survive tropical storms.' },
  { name: 'Pothos', emoji: '🌱', waterFreqDays: 9, fertilizeFreqDays: 45, repotFreqDays: 548, light: 'low', humidity: 'low', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 2, notes: 'Nearly indestructible. Tolerates low light and neglect. Yellowing = overwatering.', commonPests: ['mb', 'sm'], funFact: 'NASA listed pothos as one of the top air-purifying plants in their 1989 Clean Air Study.' },
  { name: 'Snake Plant', emoji: '🌵', waterFreqDays: 21, fertilizeFreqDays: 60, repotFreqDays: 730, light: 'low', humidity: 'low', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 3, notes: 'Water sparingly — root rot is the #1 killer. Thrives on neglect.', commonPests: ['sc', 'mb'], funFact: 'Snake plants release oxygen at night, making them ideal bedroom plants.' },
  { name: 'ZZ Plant', emoji: '🌿', waterFreqDays: 21, fertilizeFreqDays: 60, repotFreqDays: 730, light: 'low', humidity: 'low', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 3, notes: 'Stores water in its rhizomes. Water thoroughly then ignore for weeks.', commonPests: ['sc'], funFact: 'ZZ plants can go months without water and still look perfect. The ultimate low-maintenance plant.' },
  { name: 'Fiddle Leaf Fig', emoji: '🌳', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'bright', humidity: 'medium', difficulty: 'hard', toxicity: 'toxic', suggestedZone: 2, notes: 'Do not move it. Ever. Consistent conditions only — hates drafts and dry air.', commonPests: ['sc', 'sm', 'rr'], funFact: 'FLFs drop leaves when stressed. Brown edges mean dry air; brown spots mean root rot or overwatering.' },
  { name: 'Peace Lily', emoji: '🌸', waterFreqDays: 7, fertilizeFreqDays: 45, repotFreqDays: 548, light: 'low', humidity: 'high', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 1, notes: 'Will dramatically droop when thirsty — then bounce back within hours of watering.', commonPests: ['sm', 'mb', 'sc'], funFact: 'Peace lilies will tell you when they need water by drooping. They are the drama queens of the plant world — in the best way.' },
  { name: 'Spider Plant', emoji: '🌿', waterFreqDays: 7, fertilizeFreqDays: 45, repotFreqDays: 365, light: 'medium', humidity: 'medium', difficulty: 'easy', toxicity: 'safe', suggestedZone: 2, notes: 'Produces babies (spiderettes) on long runners. Propagate freely.', commonPests: ['sm', 'ap'], funFact: 'Spider plants are one of the few truly pet-safe common houseplants. The babies are easily propagated in water.' },
  { name: 'Rubber Plant', emoji: '🌿', waterFreqDays: 10, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'bright', humidity: 'medium', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 3, notes: 'Wipe leaves with a damp cloth to keep them glossy and photosynthesizing efficiently.', commonPests: ['sc', 'sm', 'mb'], funFact: 'Rubber plants can grow up to 100 feet tall in their native Assam and South Asia.' },
  { name: 'Philodendron', emoji: '🌿', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'medium', humidity: 'medium', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 2, notes: 'Let top inch dry out. Yellow leaves = overwatering, brown tips = underwatering or low humidity.', commonPests: ['sm', 'mb', 'ap'], funFact: 'There are over 480 species of philodendron — the second largest genus in the Araceae family.' },
  { name: 'Calathea', emoji: '🌺', waterFreqDays: 5, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'low', humidity: 'high', difficulty: 'hard', toxicity: 'safe', suggestedZone: 1, notes: 'Use distilled or rainwater — sensitive to fluoride. High humidity is non-negotiable.', commonPests: ['sm', 'mb'], funFact: 'Calatheas fold their leaves up at night and open them in the morning — a process called nyctinasty.' },
  { name: 'Monstera Adansonii', emoji: '🕳️', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'medium', humidity: 'medium', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 2, notes: 'More hole-y than deliciosa. Loves to trail or climb. Keep out of direct sun.', commonPests: ['sm', 'sc'], funFact: 'The swiss cheese-like holes develop as the plant matures — juvenile leaves are often solid.' },
  { name: 'Hoya', emoji: '🌸', waterFreqDays: 14, fertilizeFreqDays: 30, repotFreqDays: 730, light: 'bright', humidity: 'medium', difficulty: 'easy', toxicity: 'safe', suggestedZone: 3, notes: 'Loves to be root-bound. Do not remove spent flower spurs — new blooms grow from them.', commonPests: ['mb', 'sc', 'ap'], funFact: 'Hoya flowers smell strongest at night and produce nectar. Some varieties take years to bloom but it\'s worth the wait.' },
  { name: 'String of Pearls', emoji: '📿', waterFreqDays: 14, fertilizeFreqDays: 60, repotFreqDays: 730, light: 'bright', humidity: 'low', difficulty: 'medium', toxicity: 'toxic', suggestedZone: 4, notes: 'Extremely sensitive to overwatering. Water only when the pearls start to look slightly shriveled.', commonPests: ['mb', 'ap'], funFact: 'String of pearls is actually a succulent — the round leaves store water for dry spells.' },
  { name: 'Aloe Vera', emoji: '🌵', waterFreqDays: 21, fertilizeFreqDays: 90, repotFreqDays: 730, light: 'direct', humidity: 'low', difficulty: 'easy', toxicity: 'mildly-toxic', suggestedZone: 4, notes: 'Gritty, well-draining soil. Water deeply then let it fully dry. Direct sun preferred.', commonPests: ['mb', 'sc'], funFact: 'Aloe gel contains over 75 active compounds including vitamins, enzymes, minerals, and amino acids.' },
  { name: 'Succulents (General)', emoji: '🪨', waterFreqDays: 21, fertilizeFreqDays: 90, repotFreqDays: 730, light: 'direct', humidity: 'low', difficulty: 'easy', toxicity: 'mildly-toxic', suggestedZone: 4, notes: 'The #1 succulent killer is overwatering. When in doubt, don\'t water.', commonPests: ['mb', 'sc', 'ap'], funFact: 'Succulents evolved in arid environments — their plump leaves are essentially water storage tanks.' },
  { name: 'Cactus (General)', emoji: '🌵', waterFreqDays: 30, fertilizeFreqDays: 90, repotFreqDays: 1095, light: 'direct', humidity: 'low', difficulty: 'easy', toxicity: 'safe', suggestedZone: 4, notes: 'Water even less in winter. Needs excellent drainage and full sun.', commonPests: ['sc', 'mb'], funFact: 'Cacti are only native to the Americas — the spines are actually modified leaves.' },
  { name: 'Dracaena', emoji: '🌴', waterFreqDays: 14, fertilizeFreqDays: 45, repotFreqDays: 730, light: 'medium', humidity: 'low', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 3, notes: 'Sensitive to fluoride — use filtered water. Brown tips = fluoride toxicity or low humidity.', commonPests: ['sm', 'sc', 'mb'], funFact: 'Dracaena means "female dragon" in Greek — the red resin from some varieties was historically used as dragon\'s blood.' },
  { name: 'Fern (Boston)', emoji: '🌿', waterFreqDays: 4, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'medium', humidity: 'high', difficulty: 'medium', toxicity: 'safe', suggestedZone: 1, notes: 'Never let it dry out. Mist daily or set on a pebble tray. Hates central heating.', commonPests: ['sm', 'sc'], funFact: 'Ferns are some of the oldest plants on Earth — they\'ve been around for over 360 million years.' },
  { name: 'Bird of Paradise', emoji: '🦜', waterFreqDays: 10, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'direct', humidity: 'medium', difficulty: 'medium', toxicity: 'toxic', suggestedZone: 2, notes: 'Needs lots of light to thrive. Split leaves are normal and a sign of a happy, mature plant.', commonPests: ['sc', 'sm', 'mb'], funFact: 'In the wild, bird of paradise is pollinated by sunbirds that land on the blue petals to access nectar.' },
  { name: 'Chinese Evergreen', emoji: '🌿', waterFreqDays: 10, fertilizeFreqDays: 45, repotFreqDays: 548, light: 'low', humidity: 'medium', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 2, notes: 'Extremely adaptable. The darker the leaves, the more low-light tolerant.', commonPests: ['mb', 'sm', 'sc'], funFact: 'In parts of Asia, Chinese evergreens are considered good luck plants and are gifted at business openings.' },
  { name: 'Prayer Plant', emoji: '🙏', waterFreqDays: 5, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'low', humidity: 'high', difficulty: 'medium', toxicity: 'safe', suggestedZone: 1, notes: 'Use filtered water. Folds leaves up at night like hands in prayer.', commonPests: ['sm', 'mb'], funFact: 'Prayer plants move their leaves in a daily cycle called nyctinasty — nobody fully understands why.' },
  { name: 'Tradescantia', emoji: '💜', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'bright', humidity: 'medium', difficulty: 'easy', toxicity: 'mildly-toxic', suggestedZone: 2, notes: 'Pinch back leggy growth to keep it bushy. Propagates in water in days.', commonPests: ['sm', 'ap', 'th'], funFact: 'Tradescantia is one of the fastest-growing and easiest-to-propagate plants — cuttings root in water within a week.' },
  { name: 'Cast Iron Plant', emoji: '🌿', waterFreqDays: 14, fertilizeFreqDays: 60, repotFreqDays: 1095, light: 'low', humidity: 'low', difficulty: 'easy', toxicity: 'safe', suggestedZone: 3, notes: 'Lives up to its name — virtually indestructible. Grows slowly but lives for decades.', commonPests: ['sc'], funFact: 'Cast iron plants grow so slowly they\'re often passed down through generations as family heirlooms.' },
  { name: 'Anthurium', emoji: '❤️', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 548, light: 'bright', humidity: 'high', difficulty: 'medium', toxicity: 'toxic', suggestedZone: 2, notes: 'The waxy "flower" is actually a spathe (modified leaf). Bright indirect light = more blooms.', commonPests: ['sm', 'mb', 'sc'], funFact: 'Anthurium blooms last for months and the "flower" is technically a modified leaf called a spathe.' },
  { name: 'Orchid (Phalaenopsis)', emoji: '🌸', waterFreqDays: 10, fertilizeFreqDays: 14, repotFreqDays: 730, light: 'bright', humidity: 'medium', difficulty: 'medium', toxicity: 'safe', suggestedZone: 2, notes: 'Water by soaking in a bowl for 15 min, then drain fully. Never let it sit in water.', commonPests: ['sc', 'mb', 'sm'], funFact: 'After blooming, cutting the spike just above a node can trigger a second bloom cycle.' },
  { name: 'Alocasia', emoji: '🌿', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'bright', humidity: 'high', difficulty: 'hard', toxicity: 'toxic', suggestedZone: 1, notes: 'Goes dormant in low light winters — do not panic. Water less until new growth appears.', commonPests: ['sm', 'mb', 'rr'], funFact: 'Alocasia leaves can grow over 3 feet long in their native rainforest habitat.' },
  { name: 'Jade Plant', emoji: '💚', waterFreqDays: 14, fertilizeFreqDays: 60, repotFreqDays: 730, light: 'direct', humidity: 'low', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 4, notes: 'Water thoroughly then let soil dry completely. Prefers to be slightly root-bound.', commonPests: ['mb', 'sc'], funFact: 'Jade plants are considered symbols of good luck in many cultures and can live for 70-100 years.' },
  { name: 'Croton', emoji: '🍂', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 548, light: 'direct', humidity: 'medium', difficulty: 'medium', toxicity: 'toxic', suggestedZone: 2, notes: 'More light = more vivid color. Will drop leaves dramatically if moved or stressed.', commonPests: ['sm', 'mb', 'sc'], funFact: 'Croton leaf colors intensify with more sunlight — low light plants become greener over time.' },
  { name: 'Nerve Plant (Fittonia)', emoji: '🌿', waterFreqDays: 4, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'low', humidity: 'high', difficulty: 'medium', toxicity: 'safe', suggestedZone: 1, notes: 'Will dramatically wilt if dry — then perk back up quickly after watering.', commonPests: ['mb', 'ap'], funFact: 'Fittonias are drama queens — they faint theatrically when thirsty then recover perfectly after watering.' },
  { name: 'Syngonium', emoji: '🌿', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'medium', humidity: 'medium', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 2, notes: 'Arrow-shaped when young, multi-lobed when mature. Trim to keep compact.', commonPests: ['sm', 'mb', 'ap'], funFact: 'Syngonium leaves change shape dramatically as the plant matures — young plants and old plants look like different species.' },
  { name: 'African Violet', emoji: '💜', waterFreqDays: 7, fertilizeFreqDays: 14, repotFreqDays: 548, light: 'bright', humidity: 'medium', difficulty: 'medium', toxicity: 'safe', suggestedZone: 2, notes: 'Water from the bottom — wet leaves cause spotting. Consistent temps and indirect light.', commonPests: ['mb', 'th'], funFact: 'African violets are not actually violets — they\'re in the Gesneriaceae family, native to Tanzania.' },
  { name: 'Bromeliad', emoji: '🌺', waterFreqDays: 14, fertilizeFreqDays: 60, repotFreqDays: 548, light: 'bright', humidity: 'medium', difficulty: 'easy', toxicity: 'safe', suggestedZone: 3, notes: 'Water into the central cup, not the soil. Flush the cup monthly to prevent stagnation.', commonPests: ['sc', 'mb'], funFact: 'Bromeliads bloom once then produce pups (offshoots) before dying — the parent sacrifices itself for the next generation.' },
  { name: 'Oxalis', emoji: '🍀', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 548, light: 'bright', humidity: 'medium', difficulty: 'easy', toxicity: 'mildly-toxic', suggestedZone: 2, notes: 'Goes dormant periodically — stop watering and let it rest for 4-6 weeks.', commonPests: ['ap', 'sm'], funFact: 'Oxalis folds its leaves closed at night and when stressed — a survival mechanism from its native South America.' },
  { name: 'Monstera Thai Constellation', emoji: '⭐', waterFreqDays: 10, fertilizeFreqDays: 30, repotFreqDays: 548, light: 'bright', humidity: 'high', difficulty: 'hard', toxicity: 'toxic', suggestedZone: 2, notes: 'The white variegation means less chlorophyll — needs more light than standard monstera.', commonPests: ['sm', 'sc', 'th'], funFact: 'Thai Constellation is a lab-produced cultivar, not found in the wild. Each leaf pattern is completely unique.' },
  { name: 'Pilea Peperomioides', emoji: '🪙', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'bright', humidity: 'medium', difficulty: 'easy', toxicity: 'safe', suggestedZone: 2, notes: 'Rotate weekly for even growth. Produces pups at the base — free plants!', commonPests: ['sm', 'mb', 'fg'], funFact: 'Pilea went from a single cutting smuggled out of China in 1945 to one of the most shared houseplants in the world.' },
  { name: 'Peperomia', emoji: '🌿', waterFreqDays: 10, fertilizeFreqDays: 45, repotFreqDays: 548, light: 'medium', humidity: 'medium', difficulty: 'easy', toxicity: 'safe', suggestedZone: 3, notes: 'Semi-succulent leaves store water. Overwatering is the main cause of death.', commonPests: ['mb', 'sc'], funFact: 'There are over 1,000 species of peperomia — making it one of the most diverse plant genera.' },
  { name: 'Ctenanthe', emoji: '🌿', waterFreqDays: 5, fertilizeFreqDays: 30, repotFreqDays: 365, light: 'medium', humidity: 'high', difficulty: 'medium', toxicity: 'safe', suggestedZone: 1, notes: 'Related to calathea. Use filtered water and keep humidity high.', commonPests: ['sm', 'mb'], funFact: 'Ctenanthe are often called "never-never plants" because they\'re notoriously difficult to kill despite looking delicate.' },
  { name: 'Haworthia', emoji: '🌵', waterFreqDays: 14, fertilizeFreqDays: 60, repotFreqDays: 730, light: 'bright', humidity: 'low', difficulty: 'easy', toxicity: 'safe', suggestedZone: 4, notes: 'One of the few succulents that tolerates lower light. Still needs good drainage.', commonPests: ['mb', 'sc'], funFact: 'Haworthia are native to South Africa and can survive months of drought in their natural habitat.' },
  { name: 'Begonia', emoji: '🌸', waterFreqDays: 7, fertilizeFreqDays: 14, repotFreqDays: 365, light: 'bright', humidity: 'medium', difficulty: 'medium', toxicity: 'toxic', suggestedZone: 2, notes: 'Water at the base — wet leaves invite powdery mildew. Deadhead spent blooms.', commonPests: ['mb', 'th', 'sm'], funFact: 'There are over 2,000 species of begonia — making it one of the largest plant genera in existence.' },
  { name: 'Dieffenbachia', emoji: '🌿', waterFreqDays: 7, fertilizeFreqDays: 30, repotFreqDays: 548, light: 'medium', humidity: 'medium', difficulty: 'easy', toxicity: 'toxic', suggestedZone: 2, notes: 'Highly toxic — wash hands after handling. Very adaptable to indoor conditions.', commonPests: ['sm', 'mb', 'sc'], funFact: 'Dieffenbachia is nicknamed "dumb cane" because its sap can temporarily paralyze the tongue if ingested.' },
]

// Search plant database by name (fuzzy match)
export function searchPlantDB(query) {
  if (!query || query.length < 2) return []
  const q = query.toLowerCase()
  return PLANT_DB.filter(p =>
    p.name.toLowerCase().includes(q)
  ).slice(0, 5)
}
