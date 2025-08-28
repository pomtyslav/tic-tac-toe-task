import './App.css'
import Grid from './Grid.tsx'
import MessageBox from './MessageBox.tsx'
import NewGameButton from './NewGameButton.tsx'
import TimeTracker from './TimeTracker.tsx'
import { useState, useRef } from 'react'

function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const centiseconds = Math.floor((ms % 1000) / 10)
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`
}

function App() {
  const [message, setMessage] = useState<string | null>(null)
  const resetGridRef = useRef<() => void>(() => {})
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [resetKey, setResetKey] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [xTime, setXTime] = useState(0)
  const [oTime, setOTime] = useState(0)

  // handler to show win or draw message
  const handleWin = (winner: string, resetGrid: () => void) => {
    setIsPaused(true)
    setIsGameOver(true)
    resetGridRef.current = resetGrid
    setTimeout(() => {
      let timeMsg = ''
      if (winner === 'Draw') {
        timeMsg = `Time spent: ${formatTime(xTime + oTime)}`
      } else if (winner === 'X') {
        timeMsg = `Time spent: ${formatTime(xTime)}`
      } else if (winner === 'O') {
        timeMsg = `Time spent: ${formatTime(oTime)}`
      }
      setMessage(
        (winner === 'Draw' ? 'Game is a draw!' : `Player ${winner} wins!`) +
          (timeMsg ? `\n${timeMsg}` : '')
      )
    }, 2000)
  }

  const handleCloseMessage = () => {
    setMessage(null)
  }

  const handleNewGame = () => {
    setMessage(null)
    resetGridRef.current()
    setCurrentPlayer('X')
    setResetKey(prev => prev + 1)
    setHasStarted(false)
    setIsPaused(false)
    setIsGameOver(false)
    setXTime(0)
    setOTime(0)
  }

  const handlePlayerChange = (player: 'X' | 'O') => {
    setCurrentPlayer(player)
  }

  const handlePlayerMove = () => {
    if (!hasStarted) setHasStarted(true)
  }

  // Callback from TimeTracker to update time for each player
  const handleTimeUpdate = (player: 'X' | 'O', ms: number) => {
    if (player === 'X') setXTime(ms)
    else setOTime(ms)
  }

  return (
    <>
      <div className='flex flex-col items-center justify-baseline h-screen w-screen gap-8'>
        <h1 className='text-5xl mt-8'>Tic-tac-toe</h1>
        <div className='flex flex-row items-center justify-center gap-8'>
          <div className="flex flex-col items-center gap-4">
            <span className="text-2xl font-bold text-black">Player X</span>
            <TimeTracker
              isActive={currentPlayer === 'X'}
              resetKey={resetKey}
              hasStarted={hasStarted}
              isPaused={isPaused}
              player="X"
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
          <div className='flex flex-col items-center gap-4'>
            <Grid
              onWin={handleWin}
              onPlayerChange={handlePlayerChange}
              onFirstMove={handlePlayerMove}
              isGameOver={isGameOver}
            />
            <NewGameButton onClick={handleNewGame} />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-2xl font-bold text-pink-500">Player O</span>
            <TimeTracker
              isActive={currentPlayer === 'O'}
              resetKey={resetKey}
              hasStarted={hasStarted}
              isPaused={isPaused}
              player="O"
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
        </div>
      </div>
      
      {message && (
        <MessageBox
          message={message}
          onClose={handleCloseMessage}
          onNewGame={handleNewGame}
        />
      )}
    </>
  )
}

export default App