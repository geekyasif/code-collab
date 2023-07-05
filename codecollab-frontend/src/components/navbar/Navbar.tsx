import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { removeAuthtoken } from '../../features/auth/AuthSlice'


function Navbar() {
  const dispatch = useAppDispatch()
  const { authToken } = useAppSelector(state => state.auth)
  return (
    <nav className='border py-2'>
      <div className='flex flex-row container mx-auto py-2 justify-between'>
        <div>
          <Link className='p-2 mr-2 font-bold' to="/">Code Collab</Link>
        </div>
        <div>
          {
            authToken ? <>
              <Link className='border p-2 mr-2' to="/dashboard">Dashboard</Link>
              <Link className='border p-2 mr-2' to="/dashboard/add-question">Add Question</Link>
              <Link className='border p-2 mr-2' to="/dashboard/groups">Groups</Link>
              <button className='border p-2 mr-2' onClick={ () => dispatch(removeAuthtoken())}>Logout</button>
            </>
              : <>
                <Link className='border p-2 mr-2' to="/register">Register</Link>
                <Link className='border p-2 ' to="/login">Login</Link>

              </>
          }

        </div>
      </div>
    </nav>
  )
}

export default Navbar