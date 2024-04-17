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
    <header>
      <nav
        className="relative flex w-full items-center justify-between bg-white py-2 shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-self-auto px-3">
          <div className="flex items-center"></div>
          <button onClick={onNavigateToForm}>Go to Form</button>
          <button onClick={onNavigateToTable}>Go to Table</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
