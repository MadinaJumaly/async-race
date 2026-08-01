interface CarIconProps {
  color: string;
  size?: number;
}

function CarIcon({ color, size = 48 }: CarIconProps) {
  const gradientId = `sheen-${color.replace('#', '')}`;
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 150 60" aria-label="car">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <ellipse cx="75" cy="52" rx="60" ry="5" fill="#000" opacity="0.18" />
      <path
        d="M6 38 C6 30 12 27 22 26 L40 21 C50 12 62 9 75 9 C90 9 102 13 112 22 L132 26 C142 28 146 31 146 39 C146 45 142 47 134 47 L16 47 C9 47 6 44 6 38 Z"
        fill={color}
      />
      <path
        d="M6 38 C6 30 12 27 22 26 L40 21 C50 12 62 9 75 9 C90 9 102 13 112 22 L132 26 C142 28 146 31 146 39 C146 45 142 47 134 47 L16 47 C9 47 6 44 6 38 Z"
        fill={`url(#${gradientId})`}
      />
      <path d="M48 22 C55 14 64 12 75 12 C87 12 96 15 104 23 L98 27 L54 27 Z" fill="#111" opacity="0.55" />
      <path d="M52 20 C58 15 66 14 75 14 L75 26 L56 26 Z" fill="#7fd4ff" opacity="0.45" />
      <circle cx="40" cy="47" r="10" fill="#0a0a0a" />
      <circle cx="40" cy="47" r="4.5" fill="#888" />
      <circle cx="40" cy="47" r="1.8" fill="#ccc" />
      <circle cx="110" cy="47" r="10" fill="#0a0a0a" />
      <circle cx="110" cy="47" r="4.5" fill="#888" />
      <circle cx="110" cy="47" r="1.8" fill="#ccc" />
      <rect x="140" y="33" width="5" height="4" rx="2" fill="#fff2b0" />
      <rect x="140" y="40" width="5" height="3" rx="1.5" fill="#fff2b0" />
    </svg>
  );
}

export default CarIcon;
