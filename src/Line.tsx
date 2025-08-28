interface LineProps {
  startPoint: { x: number; y: number }
  endPoint: { x: number; y: number }
  winner?: 'X' | 'O'
}

function Line ({startPoint, endPoint, winner}: LineProps) {
  const strokeClass =
    winner === 'X'
      ? 'stroke-black'
      : winner === 'O'
      ? 'stroke-pink-500'
      : 'stroke-blue-500';

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <line
        x1={startPoint.x}
        y1={startPoint.y}
        x2={endPoint.x}
        y2={endPoint.y}
        className={strokeClass}
        strokeWidth="3"
      />
    </svg>
  );
};

export default Line;