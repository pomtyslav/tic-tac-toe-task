interface GridControlsProps {
  selectedSize: number;
  onSelectChange: (value: number) => void;
  onApply: () => void;  
}

function GridControls({ selectedSize, onSelectChange, onApply }: GridControlsProps) {
  return (
    <div className='flex items-center gap-4'>
      <select
        name="select-size"
        value={selectedSize}
        onChange={e => onSelectChange(Number(e.target.value))}
        className='border-2 rounded-md'
      >
        {[...Array(7)].map((_, i) => {
          const val = i + 3;
          return <option key={val} value={val}>{val} x {val}</option>;
        })}
      </select>
      <button type="button" onClick={onApply}>Apply</button>
    </div>
  );
}

export default GridControls;