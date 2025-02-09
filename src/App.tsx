import { HashRouter, Route, Routes } from 'react-router'
import './App.css'
import Dock from './components/navigation/Dock'
import Navbar from './components/navigation/Navbar'
import Home from './routes/Home'
import Landing from './routes/Landing'
import Login from './routes/Login'
import Profile from './routes/Profile'

function App() {
  const isMobile = window.innerWidth < 768

  return (
    <main className='h-screen flex flex-col'>
      <Navbar />

      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </HashRouter>
      {isMobile ? <Dock /> : ""}
    </main>
  )
}

export default App
