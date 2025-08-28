interface GridControlsProps {
  pendingSize?: number
  onSelectChange: (value: number) => void
  onApply: () => void  
}

function GridControls({ pendingSize, onSelectChange, onApply }: GridControlsProps) {
  return (
    <div className='flex items-center justify-center gap-4'>
      Select size <select
        name="select-size"
        value={pendingSize}
        onChange={e => onSelectChange(Number(e.target.value))}
        className='border-2 rounded-md'
      >
        {[...Array(7)].map((_, i) => {
          const val = i + 3
          return <option key={val} value={val}>{val} x {val}</option>
        })}
      </select>
      <button className="px-2 py-1 bg-black text-white rounded hover:bg-gray-700 transition" type="button" onClick={onApply}>Apply</button>
    </div>
  )
}

export default GridControls