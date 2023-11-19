import { useEffect } from 'react'
import { setScreenSize } from './utils/screen'
import { Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/main/MainPage'
import { IntroPage } from './pages/Intro/IntroPage'
import { FeedList } from '@/pages/FeedList/FeedList'

function App(): JSX.Element {
  useEffect(() => {
    setScreenSize()
  }, [])
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/intro' element={<IntroPage />} />
      <Route path='/feed-list' element={<FeedList />} />
    </Routes>
  )
}

export default App
