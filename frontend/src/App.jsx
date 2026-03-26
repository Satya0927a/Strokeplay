import { Route, Routes, useNavigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import PricingPage from "./pages/PricingPage"
import AboutusPage from "./pages/AboutusPage"
import FeaturesPage from "./pages/FeaturesPage"
import CharitiesPage from "./pages/CharitiesPage"
import { ClerkProvider, useUser } from "@clerk/react"
import ProtectedPages from "./pages/ProtectedPages"
import Dashboard from "./pages/Dashboard"
import { useEffect, useState } from "react"
import Adminpage from "./pages/AdminPage"

const App = () => {
  const [userdata, setuserdata] = useState(null)
  console.log(userdata);
  
  const { isLoaded, isSignedIn } = useUser()
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setuserdata(null)
    }
  }, [isLoaded, isSignedIn])
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<ProtectedPages userdata={userdata} setuserdata={setuserdata}><Dashboard /></ProtectedPages>} />
          <Route path="/admin" element={<ProtectedPages userdata={userdata} setuserdata={setuserdata}><Adminpage userdata={userdata}/></ProtectedPages>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pricing" element={<PricingPage userdata={userdata} setuserdata={setuserdata} />} />
        </Routes>
    </>
  )
}
export default App