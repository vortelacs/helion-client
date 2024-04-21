import React, { useState } from "react";

export interface FieldMetadata {
  name: string;
  label: string;
  type: "text" | "number" | "email";
}
interface GenericFormProps {
  fields: FieldMetadata[];
  initialData: { [key: string]: any };
  onSubmit: (data: { [key: string]: any }) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default GenericForm;
