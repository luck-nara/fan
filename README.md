# ❤️ เซอร์ไพรส์แฟน — Romantic Surprise Web

เว็บเซอร์ไพรส์แฟนสไตล์ cinematic romantic สร้างด้วย React + Vite + Tailwind CSS + Framer Motion

## เริ่มใช้งาน

```bash
npm install
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:5173`

## Build สำหรับ deploy

```bash
npm run build
npm run preview
```

## ปรับแต่งข้อความ

แก้ไขข้อความบอกรักใน `src/data/messages.js`

## เพลงพื้นหลัง

วางไฟล์ MP3 ของคุณที่ `public/music/romantic.mp3`  
หากไม่มีไฟล์ ระบบจะใช้เพลงสำรองจาก Mixkit อัตโนมัติ

> เบราว์เซอร์ส่วนใหญ่ต้องมีการกดปุ่มก่อนจึงเล่นเสียงได้ (นโยบาย Autoplay)

## ฟีเจอร์

- หน้าเปิด: พื้นหลังเข้ม + หัวใจเรืองแสงลอย + ดาววิบวับ
- Transition Fade / Zoom / Glow เข้าสู่หน้าหลัก
- พิมพ์ข้อความทีละประโยค (Typing Effect)
- หัวใจแตกกระจายเมื่อจบแต่ละประโยค
- หัวใจลอยตามเมาส์ / สัมผัส
- ปุ่มเปิด/ปิดเพลง
- หน้าจบ: หัวใจเต้น + "รักนะ ❤️"
- Responsive มือถือและคอมพิวเตอร์

## เทคโนโลยี

- React 19 + Vite 8
- Tailwind CSS 4
- Framer Motion
