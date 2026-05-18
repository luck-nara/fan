import { useCallback, useEffect, useRef, useState } from 'react'
import { MUSIC_TRACKS } from '../data/messages'

export function useAudio() {
  const audioRef = useRef(null)
  const trackIndexRef = useRef(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [ready, setReady] = useState(false)

  const setTrack = useCallback((index) => {
    const audio = audioRef.current
    if (!audio || index >= MUSIC_TRACKS.length) return false
    trackIndexRef.current = index
    audio.src = MUSIC_TRACKS[index]
    audio.load()
    return true
  }, [])

  const tryNextTrack = useCallback(() => {
    const next = trackIndexRef.current + 1
    if (next < MUSIC_TRACKS.length) {
      setTrack(next)
      return true
    }
    return false
  }, [setTrack])

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.volume = 0.4
    audio.preload = 'auto'
    audio.crossOrigin = 'anonymous'
    audioRef.current = audio

    const onCanPlay = () => setReady(true)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onError = () => {
      if (tryNextTrack()) return
      setReady(false)
    }

    audio.addEventListener('canplaythrough', onCanPlay)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)

    setTrack(0)

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
      audio.pause()
      audioRef.current = null
    }
  }, [setTrack, tryNextTrack])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false

    for (let attempt = 0; attempt < MUSIC_TRACKS.length; attempt++) {
      try {
        if (audio.error) tryNextTrack()
        await audio.play()
        setIsPlaying(true)
        return true
      } catch {
        if (!tryNextTrack()) break
      }
    }
    return false
  }, [tryNextTrack])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(async () => {
    if (isPlaying) pause()
    else await play()
  }, [isPlaying, play, pause])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }, [])

  return { isPlaying, isMuted, ready, play, pause, toggle, toggleMute }
}
