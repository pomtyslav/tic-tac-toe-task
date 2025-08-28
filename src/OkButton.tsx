import React from "react";

interface OkButtonProps {
  onClick: () => void;
}

const OkButton: React.FC<OkButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-4 ml-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
  >
    Ok
  </button>
);

export default OkButton;