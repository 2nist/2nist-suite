import React from 'react';
import './radialhexmenu.css';

const menuOptions = [
  { label: 'Synonyms', action: () => console.log('Synonyms') },
  { label: 'Rhymes', action: () => console.log('Rhymes') },
  { label: 'Meter', action: () => console.log('Meter') },
  { label: 'Word Bank', action: () => console.log('Word Bank') },
  { label: 'AI Prompt', action: () => console.log('AI Prompt') },
  { label: 'Line Tools', action: () => console.log('Line Tools') }
];

const hexRadius = 60;

const getHexPosition = (i: number, centerX: number, centerY: number) => {
  const angle = (Math.PI / 3) * i - Math.PI / 6;
  return {
    x: centerX + hexRadius * 1.8 * Math.cos(angle),
    y: centerY + hexRadius * 1.8 * Math.sin(angle)
  };
};

const Hex = ({
  x,
  y,
  label,
  onClick,
  className = ''
}: {
  x: number;
  y: number;
  label: string;
  onClick: () => void;
  className?: string;
}) => {
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = Math.PI / 3 * i;
    const px = x + hexRadius * Math.cos(angle);
    const py = y + hexRadius * Math.sin(angle);
    return `${px},${py}`;
  }).join(' ');

  return (
    <g onClick={onClick} className={className} style={{ cursor: 'pointer' }}>
      <polygon points={points} stroke="#222" strokeWidth="3" fill="#e89f4f" />
      <text x={x} y={y + 5} fontSize="14" textAnchor="middle" fill="#fff">
        {label}
      </text>
    </g>
  );
};

const RadialHexMenu = ({ x = 300, y = 300 }: { x?: number; y?: number }) => {
  return (
    <svg width="600" height="600" className="radial-hex-menu">
      <Hex x={x} y={y} label="🎶" onClick={() => {}} className="center" />
      {menuOptions.map((option, i) => {
        const pos = getHexPosition(i, x, y);
        return (
          <Hex
            key={option.label}
            x={pos.x}
            y={pos.y}
            label={option.label}
            onClick={option.action}
          />
        );
      })}
    </svg>
  );
};

export default RadialHexMenu;