// ---------------------------------------------------------------------------
// KeychainFigure — inline SVG product artwork.
//
// Blocky avatar inside an acrylic shell. No external assets, nothing to 404.
// Variants: "blue" | "ink" | "paper" | "blueprint"
// ---------------------------------------------------------------------------

const PALETTES = {
  blue: { shell: '#1B34F0', inner: '#FFFFFF', head: '#FFD23F', torso: '#111111', accent: '#FF5C38' },
  ink: { shell: '#111111', inner: '#F5F5F2', head: '#1B34F0', torso: '#111111', accent: '#FFD23F' },
  paper: { shell: '#FFFFFF', inner: '#E4E8FF', head: '#FF5C38', torso: '#1B34F0', accent: '#111111' },
  blueprint: { shell: '#0F22A8', inner: '#DCE2FF', head: '#111111', torso: '#FFD23F', accent: '#1B34F0' },
}

export default function KeychainFigure({ variant = 'blue', label = '', className = '' }) {
  const p = PALETTES[variant] || PALETTES.blue
  return (
    <svg
      viewBox="0 0 220 300"
      role="img"
      aria-label={label || `Acrylic keychain mockup, ${variant} edition`}
      className={`keychain-fig ${className}`.trim()}
    >
      {/* ball chain */}
      <g fill="none" stroke="#111111" strokeWidth="4">
        <line x1="110" y1="8" x2="110" y2="30" />
      </g>
      <g fill="#D9D9D9" stroke="#111111" strokeWidth="3">
        <circle cx="110" cy="12" r="6" />
        <circle cx="96" cy="24" r="5" />
        <circle cx="124" cy="24" r="5" />
      </g>
      {/* split ring */}
      <ellipse cx="110" cy="52" rx="20" ry="16" fill="none" stroke="#111111" strokeWidth="6" />
      <ellipse cx="110" cy="52" rx="20" ry="16" fill="none" stroke="#8a8a85" strokeWidth="2" />

      {/* acrylic shell */}
      <g>
        <rect x="52" y="66" width="116" height="212" rx="26" fill={p.shell} stroke="#111111" strokeWidth="5" />
        <rect x="62" y="76" width="96" height="192" rx="18" fill={p.inner} stroke="#111111" strokeWidth="3" />
        {/* gloss streak */}
        <rect x="72" y="86" width="14" height="120" rx="7" fill="#FFFFFF" opacity="0.55" />
      </g>

      {/* blocky avatar */}
      <g stroke="#111111" strokeWidth="4">
        {/* legs */}
        <rect x="86" y="212" width="20" height="30" fill={p.torso} />
        <rect x="114" y="212" width="20" height="30" fill={p.torso} />
        {/* torso */}
        <rect x="82" y="168" width="56" height="48" fill={p.accent} />
        <rect x="82" y="168" width="56" height="14" fill={p.torso} opacity="0.85" />
        {/* arms */}
        <rect x="64" y="170" width="16" height="44" fill={p.head} />
        <rect x="140" y="170" width="16" height="44" fill={p.head} />
        {/* head */}
        <rect x="78" y="112" width="64" height="56" fill={p.head} />
        {/* cap for blueprint variant, horns for ink variant */}
        {variant === 'blueprint' && <rect x="74" y="100" width="72" height="16" fill={p.accent} />}
        {variant === 'ink' && (
          <g fill={p.accent}>
            <rect x="78" y="96" width="14" height="18" />
            <rect x="128" y="96" width="14" height="18" />
          </g>
        )}
        {variant === 'paper' && <rect x="78" y="112" width="64" height="12" fill={p.torso} />}
        {/* face */}
        <rect x="92" y="134" width="12" height="16" fill="#111111" stroke="none" />
        <rect x="116" y="134" width="12" height="16" fill="#111111" stroke="none" />
        <rect x="100" y="152" width="20" height="6" fill="#111111" stroke="none" />
      </g>

      {/* pixel sparkles */}
      <g fill={p.accent} stroke="#111111" strokeWidth="2">
        <rect x="30" y="120" width="10" height="10" />
        <rect x="180" y="200" width="10" height="10" />
      </g>
      <g fill="#FFFFFF" stroke="#111111" strokeWidth="2">
        <rect x="182" y="110" width="8" height="8" />
        <rect x="28" y="220" width="8" height="8" />
      </g>
    </svg>
  )
}
