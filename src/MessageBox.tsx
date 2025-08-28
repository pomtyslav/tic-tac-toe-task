import NewGameButton from "./NewGameButton"
import OkButton from "./OkButton"
import { useRef } from "react"

export interface MessageBoxProps {
  message: string
  onClose: () => void
  onNewGame: () => void
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, onClose, onNewGame }) => {
  const boxRef = useRef<HTMLDivElement>(null)

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
      onClose() // close if clicked outside
    }
  }

return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={boxRef}
        className="bg-white p-8 rounded-lg shadow-lg text-center min-w-[300px]"
      >
        <h2 className="text-xl font-semibold mb-4 whitespace-pre-line">{message}</h2>
        <NewGameButton onClick={onNewGame} />
        <OkButton onClick={onClose} />
      </div>
    </div>
  )
}

export default MessageBox
