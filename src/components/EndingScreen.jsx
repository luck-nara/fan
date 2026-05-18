import { motion } from 'framer-motion'
import FloatingHearts from './FloatingHearts'
import StarBackground from './StarBackground'

export default function EndingScreen() {
  return (
    <motion.div
      className="relative flex h-full min-h-dvh w-full flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, #4a1530 0%, #1a0a14 50%, #0d0509 100%)',
        }}
      />

      <StarBackground count={70} />
      <FloatingHearts count={30} intensity="medium" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 45%, rgba(255,77,141,0.25) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 45%, rgba(255,107,157,0.35) 0%, transparent 55%)',
            'radial-gradient(circle at 50% 45%, rgba(255,77,141,0.25) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1, type: 'spring', stiffness: 120 }}
      >
        <motion.div
          className="heart-glow animate-heartbeat text-8xl sm:text-9xl md:text-[10rem]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
        >
          ❤️
        </motion.div>

        <motion.p
          className="font-display text-glow text-2xl italic text-pink-100 sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          รักนะ 
        </motion.p>

        <motion.div
          className="mt-4 h-px w-32 bg-gradient-to-r from-transparent via-pink-400 to-transparent sm:w-48"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        />

        <motion.h2
          className="font-display text-glow text-3xl font-semibold text-pink-50 sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
           ขอเงินหน่อยสิ  ❤️
        </motion.h2>

        <motion.p
          className="mt-2 text-sm text-pink-300/60 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
        >
          อยากได้เงินเยอะๆ
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 flex gap-3 text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        {['♥', '♥', '♥'].map((h, i) => (
          <motion.span
            key={i}
            className="text-romance-pink"
            animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,77,141,0.8))' }}
          >
            {h}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}
