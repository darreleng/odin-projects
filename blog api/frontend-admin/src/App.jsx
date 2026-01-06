import { Outlet } from 'react-router'
import Navbar from './Navbar'

export default function App() {

  return (
    <main className='container'>
      <Navbar />
      <Outlet />
    </main>
  )
}

