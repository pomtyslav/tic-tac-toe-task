function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function buildGrid() {
  const size = 3
  const items = Array(size).fill(null);

  items.map((_, rowIndex) => {
    const cells = [];
    for (let colIndex = 0; colIndex < size; colIndex++) {
      cells.push(
        <td key={colIndex} className={classNames(
          colIndex < size - 1 ? 'border-r-3 border-solid border-black' : '',
          rowIndex < size - 1 ? 'border-b-3 border-solid border-black' : '',
          'h-20 w-20'
        )}></td>
      );
    }
    items.push(<tr key={rowIndex}>{cells}</tr>);
  })
  return items
}

function Tile () {
  
  return (
    <>
      <table className='border-collapse border-black h-90 w-90 divide-y-3 divide-solid divide-black border-3'>
        {buildGrid()}
      </table>
      <select name="select-size" id="">
        <option value="3">3 x 3</option>
        <option value="4">4 x 4</option>
        <option value="5">5 x 5</option>
        <option value="6">6 x 6</option>
        <option value="7">7 x 7</option>
        <option value="8">8 x 8</option>
        <option value="9">9 x 9</option>
      </select>
    </>
  )
}

export default Tile