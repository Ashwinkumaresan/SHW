import './App.css'
import { BrowserRouter, Routes, Route, useParams } from "react-router";
import { Chatbot } from './Components/Chatbot/Chatbot'
import { Navbar } from './Components/Navbar/Navbar'
import { Home } from './Pages/Home/Home'
import { Login } from './Pages/Login/Login'
import { Profile } from './Pages/Profile/Profile'
import { Signup } from './Pages/Signup/Signup';
import { MedicalRecord } from './Pages/MedicalRecord/MedicalRecord';

function App() {
  const WordPage = () => {
    const { text } = useParams(); // Extract word from route
    return <MedicalRecord word = {text}/> ; // Passing as prop
};

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={[<Chatbot/> ,<Navbar /> ,<Home/>]}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={ <Signup/> }></Route>
        <Route path="/record/detail/:text" element={ < WordPage/> }></Route>
      </Routes>
    </BrowserRouter>
    {/* <Chatbot/> <Navbar /> <Home/> */}
      {/* <Profile/> */}
      
    </>
  )
}

export default App
