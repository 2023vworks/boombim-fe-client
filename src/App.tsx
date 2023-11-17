import { useEffect } from 'react'
import { setScreenSize } from './utils/screen'
import { Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/main/MainPage'

function App(): JSX.Element {
  useEffect(() => {
    setScreenSize()
  }, [])
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
    </Routes>
  )
}

export default App
