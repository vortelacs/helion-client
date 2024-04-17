import React, { ReactNode, useState } from "react";

interface DropdownProps {
  buttonLabel: string;
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ buttonLabel, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        {buttonLabel}
      </button>
      {isOpen && (
        <div className="absolute mt-1 bg-white w-56 shadow-lg rounded-lg border">
          {children}
        </div>
      )}
    </div>
  );
};
