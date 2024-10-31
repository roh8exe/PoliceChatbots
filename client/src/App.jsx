import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import Home from './Home'
import PCCForm from './PCCForm'
import PCCStatus from './PCCStatus'
import Report from './Report'
import Service from './Service' 
import Cophelp from './Cophelp'
import Admin from './Admin'
import Faq from './Faq'
// import './PCCForm.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
  <>
      <Router>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/PCCForm" element={<PCCForm />}></Route>
            <Route path="/PCCStatus" element={<PCCStatus/>}></Route>
            <Route path="/report" element={<Report />}></Route>
            <Route path="/service" element={<Service />}></Route>
            <Route path='/cophelp' element={<Cophelp />}></Route>
            <Route path='/admin' element={<Admin />}></Route>
            <Route path="/Faq" element={<Faq />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
