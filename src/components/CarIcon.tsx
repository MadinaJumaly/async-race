interface CarIconProps {
  color: string;
  size?: number;
}

function CarIcon({ color, size = 48 }: CarIconProps) {
  return (
    <svg width={size} height={size / 2} viewBox="0 0 100 50" aria-label="car">
      <path
        d="M10 35 L20 20 L45 20 L55 10 L80 10 L90 30 L90 35 Z"
        fill={color}
        stroke="#333"
        strokeWidth="2"
      />
      <circle cx="28" cy="38" r="7" fill="#222" />
      <circle cx="75" cy="38" r="7" fill="#222" />
    </svg>
  );
}

export default CarIcon;
