import { Homepage } from "./Pages/Homepage"
import {Reservation} from "./Pages/Reservation"
import {Routes, Route} from 'react-router-dom'
import { About } from "./Components/About"
import { Dashboard } from "./Components/Dashboard"
import { Dashboard1 } from "./Components/Dashboard1"
import { ContactData } from "./Components/Contact-Form-HTML-CSS-master/app"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"
import { Login } from "./Components/Login"
import { Reviews } from "./Components/reviews"
import { PeopleReviews } from "./Components/PeopleReviews"
import { Galary } from "./Components/Galary"
import './App.css'
import { Privacy } from "./Components/Privacy"
const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/reviews' element={<PeopleReviews/>}></Route>
        <Route path='/reservation' element={<Reservation/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<ContactData/>}/>
        <Route path = '/discounts' element={<Reviews/>}></Route>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/dashboard' element={useSelector(state=>state.loginState.email)==='kz.cars.mcr@gmail.com'?<Dashboard/>:<Dashboard1/>}/>
        {/* waqas@2000 */}
        <Route path="/gallery" element={<Galary/>}></Route>
        <Route path='/privacy-policy' element={<Privacy/>}></Route>
        <Route path='*' element={<ContactData/>}/>
      </Routes>
    // <div className="maintainance">
    //     <div className="sub-patient">
    //       <marquee behavior="" direction="">
    //         <p className="p-patient">The website is undermaintainance be patient please</p>
    //       </marquee>
    //     </div>
    // </div>
      )
}
export default App
