import React from 'react'
import { IQuestion } from '../../pages/dashboard/Dashboard'

interface IQuestionsParam {
    myPersonalQuestions: IQuestion[]
}

function PersonalQuestionsContainer({myPersonalQuestions}: IQuestionsParam) {
  return (
    <div className='p-2 border rounded my-2'>
        {
            myPersonalQuestions.map((q, i) => (
                <p className='text-[18px] my-2 border-b items-center pb-2' key={q._id}>{i + 1}. {q.title} <span className='ml-4 text-xs'>{q.is_solved === "solved" ? "✅" : '❌' }</span></p>
            ))
        }
    </div>
  )
}

export default PersonalQuestionsContainer