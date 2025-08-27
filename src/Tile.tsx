import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Tile () {
  const [size, setSize] = useState(3);
  const [selectedSize, setSelectedSize] = useState(3);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(Number(e.target.value));
  };

  const handleApply = () => {
    setSize(selectedSize);
  };

  const buildGrid = () => {
    const rows = [];
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      const cells = [];
      for (let colIndex = 0; colIndex < size; colIndex++) {
        cells.push(
          <td
            key={colIndex}
            className={classNames(
              colIndex < size - 1 ? 'border-r-3 border-solid border-black' : '',
              rowIndex < size - 1 ? 'border-b-3 border-solid border-black' : '',
              'h-20 w-20'
            )}
          ></td>
        );
      }
      rows.push(<tr key={rowIndex}>{cells}</tr>);
    }
    return rows;
  };

  return (
    <>
      <table className='border-collapse border-black h-auto w-auto divide-y-3 divide-solid divide-black border-3'>
        <tbody>{buildGrid()}</tbody>
      </table>

      <select name="select-size" value={selectedSize} onChange={handleSelectChange}>
        {[...Array(7)].map((_, i) => {
          const val = i + 3;
          return <option key={val} value={val}>{val} x {val}</option>;
        })}
      </select>

      <button type="button" onClick={handleApply}>Apply</button>
    </>
  )
}

export default Tile

