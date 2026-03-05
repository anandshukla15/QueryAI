import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  const [count, setCount] = useState(0)
  //dashboard is the main page of the app, it will have the sidebar, navbar, stats and ai chat components
  return <Dashboard />
}

export default App
