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
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label
            htmlFor={field.name}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}
    </form>
  );
};

export default GenericForm;
