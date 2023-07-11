import React from 'react'

interface IQuestionInputFormParams {
    label: string
    type: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function QuestionInputForm({label, type, name, value, onChange}: IQuestionInputFormParams) {
  return (
    <div>
        <label className='font-bold'>{label}</label>
        <br/>
        <input
          className="mr-2 border p-2 w-[500px]"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
        <br />

    </div>
  )
}

export default QuestionInputForm