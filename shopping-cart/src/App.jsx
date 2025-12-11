import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar';
import Home from './Home';
import Shop from './Shop';
import Cart from './Cart';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </>
  )
}

export default App
