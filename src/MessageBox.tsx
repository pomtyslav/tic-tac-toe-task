import NewGameButton from "./NewGameButton";
import OkButton from "./OkButton";

export interface MessageBoxProps {
  message: string;
  onClose: () => void;
  onNewGame: () => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, onClose, onNewGame }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center min-w-[300px]">
      <h2 className="text-xl font-semibold mb-4">{message}</h2>
      <NewGameButton onClick={onNewGame} />
      <OkButton onClick={onClose} />
    </div>
  </div>
);

export default MessageBox;
