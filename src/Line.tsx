interface LineProps {
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
}

function Line ({startPoint, endPoint}: LineProps) {
  

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none border-1">
      <line
        x1={startPoint.x}
        y1={startPoint.y}
        x2={endPoint.x}
        y2={endPoint.y}
        stroke="blue"
        strokeWidth="3"
      />
    </svg>
  );
};

export default Line;