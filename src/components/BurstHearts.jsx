import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const COLORS = ['#ff4d8d', '#ff6b9d', '#ff8fab', '#e91e63', '#f48fb1']

export default function BurstHearts({ trigger }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!trigger) return

    const newParticles = Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.5
      const dist = 60 + Math.random() * 100
      return {
        id: `${trigger}-${i}`,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 10 + Math.random() * 14,
        delay: Math.random() * 0.2,
      }
    })

    setParticles((prev) => [...prev, ...newParticles])

    const timer = setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((n) => n.id === p.id)),
      )
    }, 2000)

    return () => clearTimeout(timer)
  }, [trigger])

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute left-1/2 top-1/2"
            style={{
              color: p.color,
              fontSize: p.size,
              filter: `drop-shadow(0 0 6px ${p.color})`,
            }}
            initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0.6],
              x: `calc(-50% + ${p.x}px)`,
              y: `calc(-50% + ${p.y}px)`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: p.delay, ease: 'easeOut' }}
          >
            ♥
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
