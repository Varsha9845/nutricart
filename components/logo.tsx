export function NutriCartLogo({ className = "w-14 h-14" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradients for depth */}
        <linearGradient id="avocadoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B2FF59" />
          <stop offset="100%" stopColor="#76FF03" />
        </linearGradient>
        <radialGradient id="pitGradient" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#8D6E63" />
          <stop offset="100%" stopColor="#5D4037" />
        </radialGradient>
      </defs>

      {/* Yellow outer frame accent */}
      <circle cx="100" cy="100" r="92" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.6" />

      {/* Avocado main shape */}
      <g>
        {/* Avocado body with gradient */}
        <path
          d="M 130 65 Q 155 80 155 105 Q 155 140 130 160 Q 100 175 70 160 Q 45 140 45 105 Q 45 80 70 65 Q 100 50 130 65 Z"
          fill="url(#avocadoGradient)"
          stroke="#00C853"
          strokeWidth="2.5"
        />

        {/* Avocado pit with radial gradient */}
        <circle cx="100" cy="105" r="22" fill="url(#pitGradient)" stroke="#00C853" strokeWidth="1.5" />

        {/* Pit shine/highlight */}
        <ellipse cx="94" cy="98" rx="8" ry="10" fill="#FFFFFF" opacity="0.3" />
      </g>

      {/* Berries cluster - more refined positioning */}
      <g>
        {/* Left berry */}
        <circle cx="50" cy="85" r="15" fill="#7C3AED" stroke="#9D4EDD" strokeWidth="1.5" />
        <circle cx="48" cy="81" r="5" fill="#FFFFFF" opacity="0.25" />

        {/* Top center berry */}
        <circle cx="75" cy="70" r="15" fill="#7C3AED" stroke="#9D4EDD" strokeWidth="1.5" />
        <circle cx="73" cy="66" r="5" fill="#FFFFFF" opacity="0.25" />

        {/* Bottom berry */}
        <circle cx="65" cy="110" r="15" fill="#7C3AED" stroke="#9D4EDD" strokeWidth="1.5" />
        <circle cx="63" cy="106" r="5" fill="#FFFFFF" opacity="0.25" />
      </g>

      {/* Small connecting leaf accent for elegance */}
      <path
        d="M 130 70 Q 145 75 150 65"
        stroke="#00C853"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}
