import { Map } from './components/template/Map/Map'

declare global {
  interface Window {
    kakao: any
  }
}

function App(): JSX.Element {
  return (
    <>
      <Map />
    </>
  )
}

export default App
