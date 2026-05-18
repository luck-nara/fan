import { useMemo } from 'react'
import { motion } from 'framer-motion'

function Star({ style }) {
  return (
    <motion.span
      className="absolute rounded-full bg-white animate-twinkle"
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{
        duration: style['--twinkle-duration']?.replace('s', '') || 3,
        repeat: Infinity,
        delay: parseFloat(style['--twinkle-delay'] || 0),
        ease: 'easeInOut',
      }}
    />
  )
}

export default function StarBackground({ count = 80 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 2.5 + 1}px`,
        height: `${Math.random() * 2.5 + 1}px`,
        '--twinkle-duration': `${Math.random() * 3 + 2}s`,
        '--twinkle-delay': `${Math.random() * 4}s`,
        opacity: Math.random() * 0.5 + 0.3,
      })),
    [count],
  )

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {stars.map((star) => (
        <Star key={star.id} style={star} />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(255,77,141,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(233,30,99,0.06) 0%, transparent 40%)',
        }}
      />
    </motion.div>
  )
}
