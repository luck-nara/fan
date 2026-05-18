import { useMemo } from 'react'
import { motion } from 'framer-motion'

const HEART_COLORS = ['#ff4d8d', '#ff6b9d', '#ff8fab', '#e91e63', '#f48fb1']

function Heart({ config }) {
  const { left, delay, duration, size, color, drift, opacity } = config

  return (
    <motion.div
      className="pointer-events-none absolute select-none"
      style={{
        left: `${left}%`,
        bottom: '-10%',
        fontSize: size,
        color,
        opacity,
        filter: `drop-shadow(0 0 ${size * 0.4}px ${color})`,
      }}
      initial={{ y: 0, x: 0, opacity: 0, scale: 0.5 }}
      animate={{
        y: '-110vh',
        x: drift,
        opacity: [0, opacity, opacity, 0],
        scale: [0.5, 1, 1, 0.8],
        rotate: [0, 15, -10, 5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      ♥
    </motion.div>
  )
}

export default function FloatingHearts({ count = 35, intensity = 'high' }) {
  const hearts = useMemo(() => {
    const n =
      intensity === 'high'
        ? count
        : intensity === 'medium'
          ? Math.floor(count * 0.7)
          : Math.floor(count * 0.5)
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: Math.random() * 8 + 10,
      size: Math.random() * 18 + 10,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      drift: (Math.random() - 0.5) * 80,
      opacity: Math.random() * 0.5 + 0.3,
    }))
  }, [count, intensity])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <Heart key={h.id} config={h} />
      ))}
    </div>
  )
}
