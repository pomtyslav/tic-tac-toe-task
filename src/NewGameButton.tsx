import React from "react";

interface NewGameButtonProps {
  onClick: () => void;
}

const NewGameButton: React.FC<NewGameButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    New Game
  </button>
);

export default NewGameButton;