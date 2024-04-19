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
        className="relative flex w-full items-center justify-between  py-2 shadow-md bg-gray-800 lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap px-3">
          <button
            onClick={onNavigateToForm}
            className="text-white  hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Go to Form
          </button>
          <button
            onClick={onNavigateToTable}
            className="text-white  hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Go to Table
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
