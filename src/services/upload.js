// // src/services/upload.js
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const tmpDir = path.join(process.cwd(), 'tmp');

// // створюємо папку, якщо нема
// if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, tmpDir),
//   filename: (req, file, cb) => {
//     const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, `${unique}-${file.originalname}`);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) cb(null, true);
//   else cb(new Error('Only image files are allowed'), false);
// };

// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 2 * 1024 * 1024 } // макс 2 МБ
// });

import multer from 'multer';
import path from 'path';
import fs from 'fs';

const tmpDir = path.join(process.cwd(), 'tmp');

// Створюємо папку, якщо її нема
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, tmpDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

export const upload = multer({ storage });
