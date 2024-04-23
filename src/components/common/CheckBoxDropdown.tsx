import React from "react";
import Select, { OptionProps, components } from "react-select";
import makeAnimated from "react-select/animated";

// Define the option type
export interface MultiOption {
  value: number;
  label: string;
  additionalInfo?: string;
}

export const formatOptionLabel = ({
  value,
  label,
  additionalInfo,
}: MultiOption) => (
  <div style={{ display: "flex" }}>
    <div>{label}</div>
    <div style={{ marginLeft: "10px", color: "#ccc" }}>{additionalInfo}</div>
  </div>
);

const OptionWithInfo: React.FC<OptionProps<MultiOption, false>> = (props) => {
  return (
    <components.Option {...props}>
      <div>
        <strong>{props.data.label}</strong>
        <br />
        <span>{props.data.additionalInfo}</span>
      </div>
    </components.Option>
  );
};

const CheckBoxDropdown: React.FC<{
  options: MultiOption[];
  onChange: (selectedValues: number[]) => void;
}> = ({ options, onChange }) => {
  const handleChange = (selectedOptions: MultiOption[] | null) => {
    if (selectedOptions) {
      onChange(selectedOptions.map((option) => option.value));
    } else {
      onChange([]);
    }
  };

  return (
    <Select<MultiOption, true>
      components={makeAnimated()}
      isMulti
      options={options}
      getOptionLabel={(option: MultiOption) => option.label}
      getOptionValue={(option: MultiOption) => option.value.toString()}
      onChange={(selectedOptions) =>
        handleChange(selectedOptions as MultiOption[])
      }
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
    />
  );
};

export default CheckBoxDropdown;
