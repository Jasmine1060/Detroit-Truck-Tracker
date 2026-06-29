import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Air from './Pages/Air'
import Trucks from './Pages/Trucks'
import {Layout} from './layout'

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path= "/" element = {<Trucks/>}/>
          <Route path= "/Air" element = {<Air/>}/>
        </Route>
      </Routes>
    </Router>
  )

}

export default App





