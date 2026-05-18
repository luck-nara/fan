import { motion } from 'framer-motion'
import { MUSIC_LABEL } from '../data/messages'

export default function MusicControl({ isPlaying, isMuted, onToggle, onToggleMute }) {
  return (
    <motion.div
      className="fixed right-4 top-4 z-50 flex flex-col items-end gap-1 sm:right-6 sm:top-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <motion.div className="flex gap-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-500/30 bg-black/40 text-lg backdrop-blur-md transition-all hover:border-pink-400/60 hover:bg-pink-950/50 sm:h-11 sm:w-11"
          aria-label={isPlaying ? 'หยุดเพลง' : 'เล่นเพลง'}
          title={isPlaying ? 'หยุดเพลง' : 'เล่นเพลง'}
        >
          {isPlaying ? '🎵' : '🔇'}
        </button>
        {isPlaying && (
          <motion.button
            type="button"
            onClick={onToggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-500/30 bg-black/40 text-sm backdrop-blur-md transition-all hover:border-pink-400/60 hover:bg-pink-950/50 sm:h-11 sm:w-11"
            aria-label={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {isMuted ? '🔈' : '🔊'}
          </motion.button>
        )}
      </motion.div>
      {isPlaying && (
        <motion.span
          className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-pink-300/80 backdrop-blur-md sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {MUSIC_LABEL}
        </motion.span>
      )}
    </motion.div>
  )
}
