import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<SignUp/>}/>
     
    </Routes>
    
    </BrowserRouter>
  )
}
export default App
