// ── Rooted Botanical Icon Set ────────────────────────────────────────────────
// Hand-drawn style SVG icons. All accept size and color props.
// Usage: <LeafIcon size={24} color="#7ec850" />

import React from 'react'

const defaults = { size: 24, color: '#e8dfc8' }

export function LeafIcon({ size = 24, color = '#7ec850', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M12 22V12" />
      <path d="M12 12C12 12 7 10 5 6C8 3 14 4 17 7C19 10 17 14 12 12Z" />
      <path d="M12 12C12 12 15 9 18 10" strokeOpacity="0.5" />
    </svg>
  )
}

export function WaterDropIcon({ size = 24, color = '#5b9fd4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M12 2C12 2 5 10 5 15C5 18.866 8.134 22 12 22C15.866 22 19 18.866 19 15C19 10 12 2 12 2Z" />
      <path d="M9 16C9 17.657 10.343 19 12 19" strokeOpacity="0.5" />
    </svg>
  )
}

export function SkullIcon({ size = 24, color = '#e8dfc8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M12 3C7.582 3 4 6.582 4 11C4 13.8 5.4 16.3 7.5 17.8V20H16.5V17.8C18.6 16.3 20 13.8 20 11C20 6.582 16.418 3 12 3Z" />
      <path d="M9 20V22H15V20" />
      <circle cx="9.5" cy="11" r="1.5" fill={color} />
      <circle cx="14.5" cy="11" r="1.5" fill={color} />
      <path d="M10.5 15H13.5" strokeOpacity="0.6" />
    </svg>
  )
}

export function ScissorsIcon({ size = 24, color = '#c8922a', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4L8.12 15.88" />
      <path d="M14.47 14.48L20 20" />
      <path d="M8.12 8.12L12 12" />
    </svg>
  )
}

export function SunIcon({ size = 24, color = '#c8922a', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2V4M12 20V22M2 12H4M20 12H22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" />
    </svg>
  )
}

export function MoonIcon({ size = 24, color = '#a090c8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

export function SproutIcon({ size = 24, color = '#7ec850', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M12 22V13" />
      <path d="M12 13C12 13 8 11 6 7C9 4 15 5 17 9C18 12 16 15 12 13Z" />
      <path d="M12 13C12 13 10 8 7 8" strokeOpacity="0.4" />
    </svg>
  )
}

export function RootIcon({ size = 24, color = '#c8922a', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M12 3V13" />
      <path d="M12 13C9 15 6 17 5 20" />
      <path d="M12 13C15 15 18 17 19 20" />
      <path d="M12 16C11 18 10 19 9 21" strokeOpacity="0.5" />
      <path d="M12 16C13 18 14 19 15 21" strokeOpacity="0.5" />
      <path d="M7 17C6.5 18.5 6 19.5 5.5 21" strokeOpacity="0.3" />
      <path d="M17 17C17.5 18.5 18 19.5 18.5 21" strokeOpacity="0.3" />
    </svg>
  )
}

export function HeartIcon({ size = 24, color = '#c94f4f', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  )
}

export function BookIcon({ size = 24, color = '#e8dfc8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" />
      <path d="M8 7H16M8 11H13" strokeOpacity="0.5" />
    </svg>
  )
}

export function CameraIcon({ size = 24, color = '#e8dfc8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M23 19C23 19.53 22.79 20.04 22.41 20.41C22.04 20.79 21.53 21 21 21H3C2.47 21 1.96 20.79 1.59 20.41C1.21 20.04 1 19.53 1 19V8C1 7.47 1.21 6.96 1.59 6.59C1.96 6.21 2.47 6 3 6H7L9 3H15L17 6H21C21.53 6 22.04 6.21 22.41 6.59C22.79 6.96 23 7.47 23 8V19Z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

export function AlertIcon({ size = 24, color = '#c94f4f', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.54 21H20.46A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" />
      <path d="M12 9V13" />
      <circle cx="12" cy="17" r="0.5" fill={color} />
    </svg>
  )
}

export function ZoneIcon({ size = 24, color = '#7ec850', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12C21 13.657 16.97 15 12 15C7.03 15 3 13.657 3 12" />
      <path d="M3 5V19C3 20.657 7.03 22 12 22C16.97 22 21 20.657 21 19V5" />
    </svg>
  )
}

export function GlobeIcon({ size = 24, color = '#8a9a7a', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12H22" />
      <path d="M12 2C12 2 8 7 8 12C8 17 12 22 12 22C12 22 16 17 16 12C16 7 12 2 12 2Z" />
    </svg>
  )
}

export function GearIcon({ size = 24, color = '#8a9a7a', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15A1.65 1.65 0 0 0 19.85 17.1L19.93 17.19A2 2 0 0 1 17.1 20.02L17.01 19.94A1.65 1.65 0 0 0 14.91 19.49A1.65 1.65 0 0 0 14.5 21.14V21.25A2 2 0 0 1 11.5 21.25V21.14A1.65 1.65 0 0 0 10.35 19.58A1.65 1.65 0 0 0 8.25 19.94L8.16 20.02A2 2 0 0 1 5.33 17.19L5.41 17.1A1.65 1.65 0 0 0 5.86 15A1.65 1.65 0 0 0 4.21 14.5H4.1A2 2 0 0 1 4.1 11.5H4.21A1.65 1.65 0 0 0 5.77 10.35A1.65 1.65 0 0 0 5.41 8.25L5.33 8.16A2 2 0 0 1 8.16 5.33L8.25 5.41A1.65 1.65 0 0 0 10.35 5.86A1.65 1.65 0 0 0 11.5 4.21V4.1A2 2 0 0 1 14.5 4.1V4.21A1.65 1.65 0 0 0 15.65 5.77A1.65 1.65 0 0 0 17.75 5.41L17.84 5.33A2 2 0 0 1 20.67 8.16L20.59 8.25A1.65 1.65 0 0 0 20.14 10.35A1.65 1.65 0 0 0 21.79 11.5H21.9A2 2 0 0 1 21.9 14.5H21.79A1.65 1.65 0 0 0 20.23 15.65Z" />
    </svg>
  )
}

export function TeaIcon({ size = 24, color = '#c8922a', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M17 8H19A2 2 0 0 1 21 10V11A2 2 0 0 1 19 13H17" />
      <path d="M3 8H17V15A4 4 0 0 1 13 19H7A4 4 0 0 1 3 15V8Z" />
      <path d="M6 1V4M10 1V4M14 1V4" strokeOpacity="0.4" />
    </svg>
  )
}

export function CrossIcon({ size = 24, color = '#c94f4f', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 8V16M8 12H16" />
    </svg>
  )
}

export function GraveyardIcon({ size = 24, color = '#8a9a7a', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M9 21V12A3 3 0 0 1 15 12V21" />
      <path d="M6 12H18" strokeOpacity="0.4" />
      <path d="M3 21H21" />
      <path d="M12 6V9M10 7H14" strokeOpacity="0.6" />
    </svg>
  )
}

export function CloudSyncIcon({ size = 24, color = '#5b9fd4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M18 10H19A3 3 0 0 1 19 16H5A4 4 0 0 1 5 8C5 6 6.5 4.5 8.5 4.5C9.5 2.5 11.5 2 13.5 2.5C15.5 3 17 4.5 17.5 6.5" />
      <path d="M12 13V21M9 18L12 21L15 18" />
    </svg>
  )
}

// ── Nav icons (larger, for bottom nav bar) ───────────────────────────────────

export function NavGreenhouse({ active, color, size = 26 }) {
  const c = color || (active ? '#7ec850' : '#4a5a3a')
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10L12 3L21 10V21H15V15H9V21H3V10Z" />
      <path d="M12 3V8M9 6C9 6 10.5 8 12 8C13.5 8 15 6 15 6" strokeOpacity="0.5" />
    </svg>
  )
}

export function NavCollection({ active, color, size = 26 }) {
  const c = color || (active ? '#7ec850' : '#4a5a3a')
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="19" rx="8" ry="2" />
      <path d="M12 17V10" />
      <path d="M12 10C12 10 8 8 7 5C10 2 15 3 16 6C17 9 14 11 12 10Z" />
      <path d="M12 10C12 10 14 8 17 9" strokeOpacity="0.4" />
    </svg>
  )
}

export function NavPlantER({ active, color, size = 26 }) {
  const c = color || (active ? '#c94f4f' : '#4a5a3a')
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 8V16M8 12H16" />
    </svg>
  )
}

export function NavCommunity({ active, color, size = 26 }) {
  const c = color || (active ? '#c8922a' : '#4a5a3a')
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8H19A2 2 0 0 1 21 10V11A2 2 0 0 1 19 13H17" />
      <path d="M3 8H17V15A4 4 0 0 1 13 19H7A4 4 0 0 1 3 15V8Z" />
      <path d="M7 3V5M11 3V5" strokeOpacity="0.4" />
    </svg>
  )
}

export function NavJournal({ active, color, size = 26 }) {
  const c = color || (active ? '#7ec850' : '#4a5a3a')
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" />
      <path d="M8 7H16M8 11H13M8 15H11" strokeOpacity="0.5" />
    </svg>
  )
}

export function NavShed({ active, color, size = 26 }) {
  const c = color || (active ? '#7ec850' : '#4a5a3a')
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" strokeOpacity="0.6" />
    </svg>
  )
}
