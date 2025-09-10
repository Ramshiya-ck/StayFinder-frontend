import React from 'react'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'
import { UnauthHeader } from '../components/UnauthHeader'

export const UserLayout = () => {
  return (
    <>
    <UnauthHeader />
    <Outlet />
    </>
  )
}
