import React from 'react'
import Home from './components/Home'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import FullDetails from './components/FullDetails'

function App() {
  return (
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/fulldetails/:name' element= {<FullDetails/>}/>
    </Routes>
  )
}

export default App