import { useAppSelector } from '../../hooks/hooks'
import { Navigate } from 'react-router-dom'

function Home() {
    const {authToken} = useAppSelector(state => state.auth)

    if(authToken !== null){
        return <Navigate to="/dashboard" />
    }

  return (
    <div className='container mx-auto py-2'>
       <h1>Welcome to Code Collab</h1>
      
    </div>
  )
}

export default Home