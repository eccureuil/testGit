import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AuthApp from './Login/login.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthApp/>
      
    </>
  )
}

export default App
