import { motion } from 'framer-motion'
import FloatingHearts from './FloatingHearts'
import StarBackground from './StarBackground'

export default function LandingPage({ onEnter }) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        if (e.target === e.currentTarget) onEnter()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onEnter()
      }}
      className="relative flex h-full min-h-dvh w-full cursor-pointer flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.15,
        filter: 'blur(12px) brightness(1.5)',
      }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, #2d0a1f 0%, #1a0a14 40%, #0d0509 100%)',
        }}
      />

      <StarBackground count={60} />
      <FloatingHearts count={40} intensity="high" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(255,77,141,0.15) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(255,107,157,0.2) 0%, transparent 65%)',
            'radial-gradient(circle at 50% 50%, rgba(255,77,141,0.15) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 flex max-w-lg flex-col items-center gap-8 px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
      >
        <motion.div
          className="text-5xl sm:text-6xl"
          animate={{
            scale: [1, 1.1, 1],
            filter: [
              'drop-shadow(0 0 20px rgba(255,77,141,0.8))',
              'drop-shadow(0 0 40px rgba(255,107,157,1))',
              'drop-shadow(0 0 20px rgba(255,77,141,0.8))',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ❤️
        </motion.div>

        <motion.h1
          className="font-display text-glow text-2xl font-medium leading-snug text-pink-50 sm:text-3xl md:text-4xl"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          กดเข้ามาสิ มีอะไรจะบอก ❤️
        </motion.h1>

        <motion.p
          className="text-sm text-pink-300/70 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          แตะหน้าจอหรือกดปุ่มด้านล่าง
        </motion.p>

        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onEnter()
          }}
          className="btn-romantic relative mt-2 overflow-hidden rounded-full px-8 py-3.5 text-base font-medium tracking-wide text-white transition-transform active:scale-95 sm:px-10 sm:py-4 sm:text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />
          <span className="relative">เปิดอ่านข้อความ</span>
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center text-xs text-pink-400/40"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ♥ ♥ ♥
      </motion.div>
    </motion.div>
  )
}
