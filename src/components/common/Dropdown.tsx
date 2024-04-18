import React from "react";

interface Option {
  value: string;
  label: string;
  additionalInfo: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (selectedValue: string) => void;
  renderOption?: (option: Option) => React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  renderOption,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelect(selectedValue);
  };

  return (
    <select onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {renderOption
            ? renderOption(option)
            : `${option.label} - ${option.additionalInfo}`}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
