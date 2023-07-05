import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'

function AuthRoute() {
  const { authToken } = useAppSelector((state) => state.auth)

  if (authToken === null) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default AuthRoute