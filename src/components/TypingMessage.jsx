import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function TypingMessage({ text, onComplete, speed = 55 }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0

    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
        onCompleteRef.current?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <motion.div
      key={text}
      className="relative px-4 text-center"
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <p className="font-display text-glow-soft text-xl leading-relaxed text-pink-100 sm:text-2xl md:text-3xl lg:text-4xl">
        {displayed}
        {!done && (
          <motion.span
            className="ml-0.5 inline-block text-pink-400"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            |
          </motion.span>
        )}
      </p>
    </motion.div>
  )
}
