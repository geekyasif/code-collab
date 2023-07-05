import { useEffect, useState } from 'react'
import SearchQuestion from '../../components/searchQuestion/SearchQuestion'
import { questions } from '../../utils/DemoData'
import { useAppSelector } from '../../hooks/hooks'
import { useNavigate } from 'react-router-dom'


interface IPersonal {
  is_personal: boolean,
  status: string
}

interface IMember {
  name: string,
  status: string
}

interface IGroup {
  id: number,
  name: string,
  members: IMember[]
}

export interface IQuestion {
  id: number,
  title: string,
  url: string,
  tags: string[],
  created_by: string,
  mentor_name: string,
  platform: string,
  solution_url: string,
  description: string,
  time_stamp: string,
  personal: IPersonal,
  group: IGroup | null
}



function Dashboard() {
  const navigate = useNavigate()
  const { user, authToken } = useAppSelector((state) => state.auth)
  const [myQuestions, setMyQuestions] = useState<IQuestion[]>([])

  const fetchMyQuestions = (): void => {
    let _questions: IQuestion[] = questions.filter((question: IQuestion) => question.created_by === user.username)
    setMyQuestions(_questions)
  }

  useEffect(() => {
    fetchMyQuestions()
  }, [])

  useEffect(() => {
    if (authToken === null) {
      navigate("/login")
    }
  }, [authToken, navigate])

  return (
    <div className='container mx-auto'>
      <SearchQuestion />
      <div>
        <h1 className='border p-2'>All Personal Questions</h1>
        {
          myQuestions.map((q: IQuestion) => (
            <div className='border  p-2 my-2 ' key={q.id}>
              <div className='flex flex-row justify-between' >
                <p>{q.title}    <span className='text-sm p-1 rounded bg-green-500 text-white'>{q.group === null ? "personal" : q.group.name}</span></p>
                {q.group?.members.map((m: IMember, i: number) => m.name === "asif" ? <p key={i}>{m.status}</p> : "")}
                {
                  q.personal.is_personal === true ? <p>{q.personal.status}</p> : ""
                }
                <a href={q.url} rel="noreferrer" target="_blank">Practice</a>
              </div>
              <div className='flex flex-row '>
                {
                  q.tags.map((tag: string, i: number) => <p key={i} className='text-xs border p-1 my-1  mr-2 '>{tag}</p>)
                }

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard