import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import EndingScreen from './components/EndingScreen'
import LandingPage from './components/LandingPage'
import MainPage from './components/MainPage'
import MouseHearts from './components/MouseHearts'
import MusicControl from './components/MusicControl'
import { useAudio } from './hooks/useAudio'

const PAGES = {
  landing: 'landing',
  main: 'main',
  ending: 'ending',
}

export default function App() {
  const [page, setPage] = useState(PAGES.landing)
  const audio = useAudio()

  const handleEnter = useCallback(async () => {
    await audio.play()
    setPage(PAGES.main)
  }, [audio])

  const handleMainComplete = useCallback(() => {
    setPage(PAGES.ending)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden bg-romance-dark">
      <MusicControl
        isPlaying={audio.isPlaying}
        isMuted={audio.isMuted}
        onToggle={audio.toggle}
        onToggleMute={audio.toggleMute}
      />

      <MouseHearts enabled />

      <AnimatePresence mode="wait">
        {page === PAGES.landing && (
          <LandingPage key="landing" onEnter={handleEnter} />
        )}
        {page === PAGES.main && (
          <MainPage key="main" onComplete={handleMainComplete} />
        )}
        {page === PAGES.ending && <EndingScreen key="ending" />}
      </AnimatePresence>
    </div>
  )
}
