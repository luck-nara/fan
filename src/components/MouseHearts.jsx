import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const COLORS = ['#ff4d8d', '#ff6b9d', '#ff8fab', '#e91e63']

export default function MouseHearts({ enabled = true }) {
  const [hearts, setHearts] = useState([])

  const spawn = useCallback(
    (x, y) => {
      if (!enabled) return
      const id = crypto.randomUUID()
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      setHearts((prev) => [...prev.slice(-20), { id, x, y, color }])
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id))
      }, 1200)
    },
    [enabled],
  )

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => {
      if (Math.random() > 0.85) {
        spawn(e.clientX, e.clientY)
      }
    }

    const onTouch = (e) => {
      const touch = e.touches[0]
      if (touch) spawn(touch.clientX, touch.clientY)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [enabled, spawn])

  return (
    <AnimatePresence>
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="cursor-heart text-lg sm:text-xl"
          style={{ left: h.x, top: h.y, color: h.color }}
          initial={{ opacity: 1, scale: 0, x: '-50%', y: '-50%' }}
          animate={{
            opacity: 0,
            scale: 1.5,
            y: '-120%',
            x: `${-50 + (Math.random() - 0.5) * 40}%`,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          ♥
        </motion.span>
      ))}
    </AnimatePresence>
  )
}
