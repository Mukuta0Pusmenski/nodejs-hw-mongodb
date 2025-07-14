// src/middlewares/upload.js

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }  // до 2 MB
});

export default upload;
