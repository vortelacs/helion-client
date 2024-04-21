import React, { useState } from "react";

interface CustomCompanyFormProps {
  isVisible: boolean;
  setName: (name: string) => void;
  setCui: (cui: number) => void;
}

const CustomCompanyForm: React.FC<CustomCompanyFormProps> = ({ isVisible }) => {
  const [name, setName] = useState("");
  const [cui, setCui] = useState("");

  if (!isVisible) return null;

  return (
    <div className="flex">
      <div className="w-max max-100 flex">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Company Name"
        />
      </div>
      <input
        type="number"
        value={cui}
        onChange={(e) => setCui(e.target.value)}
        placeholder="CUI"
      />
    </div>
  );
};

export default CustomCompanyForm;
