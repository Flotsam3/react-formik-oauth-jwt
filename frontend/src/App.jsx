import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Members from "./pages/Members";
import Protected from "./components/Protected";
import { AuthProvider } from "./components/AuthProvider";
import './App.css';

function App() { 

  return (
    <>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Protected />} >
            <Route path="/members" element={<Members />}/>
          </Route> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
