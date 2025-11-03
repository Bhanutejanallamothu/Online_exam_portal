import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import AdminNavBar from './admin/AdminNavBar'
import { BrowserRouter } from "react-router-dom";
import TeacherNavBar from './teacher/TeacherNavBar';
import StudentNavBar from './student/StudentNavBar';

function App() {

  return (
    <div>
      <BrowserRouter>
      {/* <AdminNavBar/> */}
      {/* <TeacherNavBar/> */}
      <StudentNavBar/>
      </BrowserRouter>
    </div>
     
  )
}

export default App
