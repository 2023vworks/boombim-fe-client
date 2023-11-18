import { useEffect } from 'react'
import { setScreenSize } from './utils/screen'
import { Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/main/MainPage'
import { IntroPage } from './pages/Intro/IntroPage'

function App(): JSX.Element {
  useEffect(() => {
    setScreenSize()
  }, [])
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/intro' element={<IntroPage />} />
    </Routes>
  )
}

export default App
