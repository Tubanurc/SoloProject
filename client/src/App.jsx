import { useState, useEffect } from 'react'
import './App.css'
import {Link, Routes, Route} from 'react-router-dom'
import DisplayAll from './components/DisplayAll'
import CreateForm from './components/CreateForm'
import ViewOne from './components/ViewOne'
import Edit from './components/Edit'

function App() {
  const [habitList, setHabitList] = useState([])

  return (
    <>
      <Routes>
        <Route path="/" element={<DisplayAll habitList={habitList} setHabitList={setHabitList}/>}/>
        <Route path="/newHabit" element={<CreateForm habitList={habitList} setHabitList={setHabitList}/>}/>
        <Route path="/habit/:id" element={<ViewOne/>} />
        <Route path="/edit/:id" element={<Edit />} />

      </Routes>
    </>
  )
}

export default App
