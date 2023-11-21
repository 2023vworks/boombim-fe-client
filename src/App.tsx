import { useEffect } from 'react'
import { setScreenSize } from './utils/screen'
import { Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/main/MainPage'
import { IntroPage } from './pages/Intro/IntroPage'
import { MyPage } from '@/pages/myPage/MyPage'
import MyFeedsPage from '@/pages/myFeed/MyFeedsPage'
import { FeedsPage } from '@/pages/feed/FeedsPage'

function App(): JSX.Element {
  useEffect(() => {
    setScreenSize()
  }, [])
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/intro' element={<IntroPage />} />
      <Route path='/my-page' element={<MyPage />} />
      <Route path='/my-feeds' element={<MyFeedsPage />} />
      <Route path='/feed-list' element={<FeedsPage />} />
    </Routes>
  )
}

export default App
