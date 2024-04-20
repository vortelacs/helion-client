import React from "react";

export interface Option<T = number> {
  value: T;
  label: string;
  additionalInfo?: string;
}

interface DropdownProps<T = string> {
  options: Option<T>[];
  onSelect: (selectedValue: T) => void;
  renderOption?: (option: Option<T>) => React.ReactNode;
}
const Dropdown: React.FC<DropdownProps<any>> = ({
  options,
  onSelect,
  renderOption,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(JSON.parse(event.target.value));
  };

  return (
    <select onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} value={JSON.stringify(option.value)}>
          {renderOption
            ? renderOption(option)
            : `${option.label}${
                option.additionalInfo ? ` - ${option.additionalInfo}` : ""
              }`}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
