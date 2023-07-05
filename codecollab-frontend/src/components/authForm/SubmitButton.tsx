import React from "react";

interface ISubmitButtonParams{
    text: string
}


function SubmitButton({text}: ISubmitButtonParams) {
  return (
    <button type="submit" className="border p-2 bg-blue-500 text-white rounded w-full">
      {text}
    </button>
  );
}

export default SubmitButton;
