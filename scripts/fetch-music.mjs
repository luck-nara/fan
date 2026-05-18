import { writeFileSync } from 'fs'

const out = new URL('../public/music/romantic.mp3', import.meta.url)

const candidates = [
  {
    name: 'Love’s Pathway — เปียโนโรแมนติก',
    url: 'https://gimi.media/audios/loves-pathway-background-romantic-piano-free-audio.mp3',
  },
  {
    name: 'To Be Loved — เปียโนนุ่มๆ',
    url: 'https://gimi.media/audios/to-be-loved-gentle-romantic-piano-free-audio.mp3',
  },
  {
    name: 'Romantic Love Background',
    url: 'https://gimi.media/audios/romantic-love-background-couple-music-free-audio-5.mp3',
  },
  {
    name: 'Beautiful Love — เปียโน cinematic',
    url: 'https://gimi.media/audios/beautiful-love-cinematic-romantic-piano-free-audio.mp3',
  },
  {
    name: 'Mixkit Romantic Harp',
    url: 'https://assets.mixkit.co/music/preview/mixkit-romantic-harp-902.mp3',
    headers: { Referer: 'https://mixkit.co/', Origin: 'https://mixkit.co' },
  },
  {
    name: 'Mixkit True Love',
    url: 'https://assets.mixkit.co/music/preview/mixkit-true-love-43.mp3',
    headers: { Referer: 'https://mixkit.co/', Origin: 'https://mixkit.co' },
  },
]

for (const { name, url, headers = {} } of candidates) {
  try {
    console.log('Trying:', name)
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', ...headers },
      redirect: 'follow',
    })
    if (!res.ok) {
      console.log('  →', res.status)
      continue
    }
    const buf = Buffer.from(await res.arrayBuffer())
    const isMp3 =
      (buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) ||
      (buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0)
    if (!isMp3 || buf.length < 100000) {
      console.log('  → invalid or too small', buf.length)
      continue
    }
    writeFileSync(out, buf)
    console.log(
      `✓ บันทึกแล้ว ${Math.round((buf.length / 1024 / 1024) * 10) / 10} MB → public/music/romantic.mp3`,
    )
    console.log('  แหล่ง:', url)
    process.exit(0)
  } catch (e) {
    console.log('  →', e.message)
  }
}

console.error('ดาวน์โหลดไม่สำเร็จ — ใช้ลิงก์ออนไลน์ในเบราว์เซอร์')
process.exit(1)
