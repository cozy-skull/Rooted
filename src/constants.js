// ── Brand colors ─────────────────────────────────────────────────────────────
export const C = {
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
