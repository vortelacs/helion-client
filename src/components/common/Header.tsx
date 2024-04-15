import React from "react";

interface HeaderProps {
  onNavigateToForm: () => void;
  onNavigateToTable: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onNavigateToForm,
  onNavigateToTable,
}) => {
  return (
    <div
      style={{ background: "#f0f0f0", padding: "10px", marginBottom: "20px" }}
    >
      <button onClick={onNavigateToForm} style={{ marginRight: "10px" }}>
        Go to Form
      </button>
      <button onClick={onNavigateToTable}>Go to Table</button>
    </div>
  );
};

export default Header;
