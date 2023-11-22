import { useEffect } from 'react'
import { setScreenSize } from './utils/screen'
import { Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/main/MainPage'
import { IntroPage } from './pages/Intro/IntroPage'
import { FeedList } from '@/pages/FeedList/FeedList'
import { MyPage } from '@/pages/myPage/MyPage'
import MyFeedsPage from '@/pages/myFeed/MyFeedsPage'

function App(): JSX.Element {
  useEffect(() => {
    setScreenSize()
  }, [])
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/intro' element={<IntroPage />} />
      <Route path='/feed-list' element={<FeedList />} />
      <Route path='/my-page' element={<MyPage />} />
      <Route path='/my-feeds' element={<MyFeedsPage />} />
    </Routes>
  )
}

export default App
