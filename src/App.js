import { Homepage } from "./Pages/Homepage"
import {Reservation} from "./Pages/Reservation"
import {Routes, Route} from 'react-router-dom'
import { About } from "./Components/About"
import { Dashboard } from "./Components/Dashboard"
import { Dashboard1 } from "./Components/Dashboard1"
import { ContactData } from "./Components/Contact-Form-HTML-CSS-master/app"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"
import { Login } from "./Components/Login"
const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/reservation' element={<Reservation/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<ContactData/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/dashboard' element={useSelector(state=>state.loginState.email)==='admin1@gmail.com'?<Dashboard/>:<Dashboard1/>}/>
        <Route path='*' element={<ContactData/>}/>
      </Routes>
  )
}
export default App
