// // // // src/services/cloudinary.js

// // // import { v2 as cloudinary } from 'cloudinary';

// // // cloudinary.config({
// // //   cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
// // //   api_key:     process.env.CLOUDINARY_API_KEY,
// // //   api_secret:  process.env.CLOUDINARY_API_SECRET
// // // });

// // // console.log('Cloudinary:', {
// // //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// // //   api_key:    process.env.CLOUDINARY_API_KEY,
// // //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // // });

// // // export default cloudinary;


// // import { v2 as cloudinary } from 'cloudinary';

// // console.log('→ [cloudinary.js] CLOUDINARY_CLOUD_NAME =', process.env.CLOUDINARY_CLOUD_NAME);

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key:    process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// //   secure:     true
// // });



// // export default cloudinary;
// // src/services/cloudinary.js
// import { v2 as cloudinary } from 'cloudinary';

// console.log(
//   '→ [cloudinary.js] CLOUDINARY_CLOUD_NAME =',
//   process.env.CLOUDINARY_CLOUD_NAME
// );

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key:    process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure:     true
// });

// export default cloudinary;
// src/services/cloudinary.js
import dotenv from 'dotenv';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Примусово підхоплюємо .env з override
dotenv.config({
  path:     path.resolve(process.cwd(), '.env'),
  override: true
});

console.log('→ [cloudinary.js] CLOUDINARY_CLOUD_NAME =', process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true
});

export default cloudinary;
