import React from "react";

interface IInputParams {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputForm({ label, type, name, value, onChange }: IInputParams) {
  return (
    <div>
      <label>{label}</label>
      <br />
      <input
        className="my-2 border p-2 w-[350px] rounded"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputForm;
