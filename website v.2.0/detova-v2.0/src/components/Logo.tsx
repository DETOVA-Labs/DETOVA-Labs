export default function Logo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[var(--acid-lime)]"
    >
      {/* Lightbulb bulb */}
      <circle cx="24" cy="16" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M18 26C18 29.3137 20.6863 32 24 32C27.3137 32 30 29.3137 30 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Rays */}
      <line x1="24" y1="2" x2="24" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35.5" y1="10.5" x2="32.5" y2="13.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="41" y1="22" x2="37" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35.5" y1="33.5" x2="32.5" y2="30.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="39" x2="24" y2="43" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12.5" y1="33.5" x2="15.5" y2="30.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="7" y1="22" x2="11" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12.5" y1="10.5" x2="15.5" y2="13.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Base */}
      <rect x="22" y="32" width="4" height="3" fill="currentColor" />
      <rect x="20" y="35" width="8" height="2" fill="currentColor" />
      
      {/* Dots in center */}
      <circle cx="22" cy="14" r="1.5" fill="currentColor" />
      <circle cx="26" cy="14" r="1.5" fill="currentColor" />
      <circle cx="24" cy="18" r="1.5" fill="currentColor" />
    </svg>
  )
}
