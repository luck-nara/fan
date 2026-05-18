import { useCallback, useEffect, useRef, useState } from 'react'
import { MUSIC_FALLBACK, MUSIC_SRC } from '../data/messages'

export function useAudio() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.volume = 0.35
    audio.preload = 'auto'
    audio.src = MUSIC_SRC

    const onError = () => {
      if (audio.src !== MUSIC_FALLBACK) {
        audio.src = MUSIC_FALLBACK
        audio.load()
      }
    }

    const onCanPlay = () => setReady(true)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('error', onError)
    audio.addEventListener('canplaythrough', onCanPlay)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    audio.load()
    audioRef.current = audio

    return () => {
      audio.removeEventListener('error', onError)
      audio.removeEventListener('canplaythrough', onCanPlay)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false
    try {
      if (audio.error && audio.src !== MUSIC_FALLBACK) {
        audio.src = MUSIC_FALLBACK
      }
      await audio.play()
      setIsPlaying(true)
      return true
    } catch {
      if (audio.src !== MUSIC_FALLBACK) {
        try {
          audio.src = MUSIC_FALLBACK
          await audio.play()
          setIsPlaying(true)
          return true
        } catch {
          return false
        }
      }
      return false
    }
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause()
    } else {
      await play()
    }
  }, [isPlaying, play, pause])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }, [])

  return { isPlaying, isMuted, ready, play, pause, toggle, toggleMute }
}
