import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'

const Rootelement = () => {
  const navigate = useNavigate()
  return (
      <ClerkProvider
        routerPush={(to) => navigate(to)}
        routerReplace={(to) => navigate(to, { replace: true })}
        signInUrl="/loginin"
        signUpUrl="/signup"
        signInFallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
      >
        <App />
      </ClerkProvider>
  )
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Rootelement />
    </BrowserRouter>
  </StrictMode>,
)
