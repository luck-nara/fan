import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { loveMessages } from '../data/messages'
import BurstHearts from './BurstHearts'
import FloatingHearts from './FloatingHearts'
import StarBackground from './StarBackground'
import TypingMessage from './TypingMessage'

export default function MainPage({ onComplete }) {
  const [index, setIndex] = useState(0)
  const [burstKey, setBurstKey] = useState(0)

  const handleMessageComplete = useCallback(() => {
    setBurstKey((k) => k + 1)

    setTimeout(() => {
      if (index < loveMessages.length - 1) {
        setIndex((i) => i + 1)
      } else {
        setTimeout(() => onComplete?.(), 1800)
      }
    }, 2200)
  }, [index, onComplete])

  const progress = ((index + 1) / loveMessages.length) * 100

  return (
    <motion.div
      className="relative flex h-full min-h-dvh w-full flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, #3d1028 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #2d0a1f 0%, transparent 50%), linear-gradient(180deg, #1a0a14 0%, #0d0509 100%)',
        }}
      />

      <StarBackground count={50} />
      <FloatingHearts count={20} intensity="low" />
      <BurstHearts trigger={burstKey} />

      <div className="relative z-10 flex min-h-[200px] w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-20">
        <AnimatePresence mode="wait">
          <TypingMessage
            key={loveMessages[index]}
            text={loveMessages[index]}
            onComplete={handleMessageComplete}
            speed={50}
          />
        </AnimatePresence>

        <motion.div
          className="mt-12 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {loveMessages.map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: i === index ? 24 : 8,
                background:
                  i <= index
                    ? 'linear-gradient(90deg, #ff4d8d, #ff6b9d)'
                    : 'rgba(255,77,141,0.2)',
                boxShadow: i === index ? '0 0 12px rgba(255,77,141,0.8)' : 'none',
              }}
              animate={i === index ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-pink-950/50">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-rose-600"
          style={{ boxShadow: '0 0 10px rgba(255, 77, 141, 0.8)' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  )
}
