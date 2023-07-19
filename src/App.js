import { Homepage } from "./Pages/Homepage"
import {Reservation} from "./Pages/Reservation"
import {Routes, Route} from 'react-router-dom'
import { About } from "./Components/About"
import { ContactData } from "./Components/Contact-Form-HTML-CSS-master/app"
const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/reservation' element={<Reservation/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<ContactData/>}/>
      </Routes>
  )
}
export default App
