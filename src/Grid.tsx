import { useState, useEffect } from "react"
import Line from "./Line"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface GridProps {
  size: number // 🔹 grid size comes from App
  onWin?: (winner: string, resetGrid: () => void) => void
  onPlayerChange?: (player: 'X' | 'O') => void
  onFirstMove?: () => void
  isGameOver?: boolean
}

function Grid ({ size, onWin, onPlayerChange, onFirstMove, isGameOver }: GridProps) {
  const [player, setPlayer] = useState<'X' | 'O'>('X')
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 })
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 })
  const [matrix, setMatrix] = useState<string[][]>(
    Array.from({ length: size }, () => Array(size).fill(''))
  )

  useEffect(() => {
    setMatrix(Array.from({ length: size }, () => Array(size).fill('')))
  }, [size])

  const handleClickCell = (row: number, col: number) => {
    if (isGameOver) return // Prevent moves after win/draw

    if (row < 1 || row > size || col < 1 || col > size) {
      console.error('Invalid cell position')
      return
    }
    const cell = document.getElementById(`cell-${row}-${col}`)

    if (cell && cell.innerText === '') {
      cell.innerText = player
      cell!.classList.add(player === 'X' ? 'text-black-500' : 'text-pink-500')
      if (matrix.flat().filter(c => c !== '').length === 0 && onFirstMove) onFirstMove()
    } else {
      alert('Cell is already occupied or not found')
      return
    }

    const newMatrix = matrix.map((r, rowIndex) =>
      r.map((c, colIndex) => (rowIndex === row - 1 && colIndex === col - 1 ? player : c))
    )

    setMatrix(newMatrix)

    const winResult = checkWin(newMatrix, player)
    setTimeout(() => drawLine(winResult), 500)
    if (winResult[0] !== -3 && onWin) {
      onWin(player, resetGrid)
    } else if (winResult[0] === -3 && newMatrix.flat().every(cell => cell !== '')) {
      // draw condition
      if (onWin) onWin('Draw', resetGrid)
    } else {
      const nextPlayer = player === 'X' ? 'O' : 'X'
      setPlayer(nextPlayer)
      if (onPlayerChange) onPlayerChange(nextPlayer)
    }
  }

  const checkWin = (grid: string[][], player: string): number[] => {
    for (let i = 0; i < size; i++) {
      if (grid[i].every(cell => cell === player)) return [i, 10]
      if (grid.every(row => row[i] === player)) return [10, i]
    }
    if (grid.every((row, i) => row[i] === player)) return [-1]
    if (grid.every((row, i) => row[size - 1 - i] === player)) return [-2]
    return [-3, -3]
  }

  const resetGrid = () => {
    setMatrix(Array.from({ length: size }, () => Array(size).fill('')))
    for (let row = 1; row <= size; row++) {
      for (let col = 1; col <= size; col++) {
        const cell = document.getElementById(`cell-${row}-${col}`)
        if (cell) {
          cell.innerText = ''
          cell.classList.remove('text-black-500', 'text-pink-500')
        }
      }
    }
    removeLine()
    setPlayer('X')
  }

  const drawLine = (cells: number[]) => {
    let cellStart, cellStartX, cellStartY
    let cellEnd, cellEndX, cellEndY
    // lose condition
    if (cells[0] == -3) return ''
    // main diagonal condition
    if (cells[0] == -1) {
      cellStart = document.getElementById('cell-1-1')
      cellEnd = document.getElementById(`cell-${size}-${size}`)

      cellStartX = cellStart!.getBoundingClientRect().x
      cellStartY = cellStart!.getBoundingClientRect().y

      cellEndX = cellEnd!.getBoundingClientRect().x + 60
      cellEndY = cellEnd!.getBoundingClientRect().y + 60

      setStartPoint({ x: cellStartX, y: cellStartY})
      setEndPoint({ x: cellEndX, y: cellEndY})
    }
    // anti diagonal condition
    if (cells[0] == -2) {
      cellStart = document.getElementById(`cell-1-${size}`)
      cellEnd = document.getElementById(`cell-${size}-1`)

      cellStartX = cellStart!.getBoundingClientRect().x + 60
      cellStartY = cellStart!.getBoundingClientRect().y

      cellEndX = cellEnd!.getBoundingClientRect().x
      cellEndY = cellEnd!.getBoundingClientRect().y + 60

      setStartPoint({ x: cellStartX, y: cellStartY})
      setEndPoint({ x: cellEndX, y: cellEndY})
    }
    // row win condition
    if (cells[1] == 10) {
      cellStart = document.getElementById(`cell-${cells[0]+1}-1`)
      cellEnd = document.getElementById(`cell-${cells[0]+1}-${size}`)

      cellStartX = cellStart!.getBoundingClientRect().x
      cellStartY = cellStart!.getBoundingClientRect().y + 30

      cellEndX = cellEnd!.getBoundingClientRect().x + 60
      cellEndY = cellEnd!.getBoundingClientRect().y + 30

      setStartPoint({ x: cellStartX, y: cellStartY})
      setEndPoint({ x: cellEndX, y: cellEndY})
    }
    // column win condition
    if (cells[0] == 10) {
      cellStart = document.getElementById(`cell-1-${cells[1]+1}`)
      cellEnd = document.getElementById(`cell-${size}-${cells[1]+1}`)

      cellStartX = cellStart!.getBoundingClientRect().x + 30
      cellStartY = cellStart!.getBoundingClientRect().y

      cellEndX = cellEnd!.getBoundingClientRect().x + 30
      cellEndY = cellEnd!.getBoundingClientRect().y + 60

      setStartPoint({ x: cellStartX, y: cellStartY})
      setEndPoint({ x: cellEndX, y: cellEndY})
    }
  }

  const removeLine = () => {
    setStartPoint({ x: 0, y: 0})
    setEndPoint({ x: 0, y: 0})
  }

  const buildGrid = () => {
    const rows = []
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      const cells = []
      for (let colIndex = 0; colIndex < size; colIndex++) {
        cells.push(
          <td
            key={colIndex}
            className={classNames(
              colIndex < size - 1 ? 'border-3 border-solid border-black' : '',
              rowIndex < size - 1 ? 'border-3 border-solid border-black' : '',
              'text-center text-[35px] font-tic-tac h-15 w-15'
            )}
            id={`cell-${rowIndex+1}-${colIndex+1}`}
            onClick={() => handleClickCell(rowIndex+1, colIndex+1)}
          ></td>
        )
      }
      rows.push(<tr key={rowIndex}>{cells}</tr>)
    }
    return rows
  }

  return (
    <>
      <table className='border-collapse border-black border-3 h-auto w-auto divide-y-3 divide-solid divide-black'>
        <tbody>{buildGrid()}</tbody>
      </table>
      <Line startPoint={startPoint} endPoint={endPoint} winner={player}/>
    </>
  )
}

export default Grid
