// // import createError from 'http-errors';
// // import cloudinary  from '../services/cloudinary.js';
// // import User        from '../models/user.js';

// // export const updateAvatar = async (req, res, next) => {
// //   try {
// //     if (!req.file) throw createError(400, 'Avatar file is required');

// //     const result = await cloudinary.uploader.upload_stream(
// //       { folder: 'avatars', resource_type: 'image' },
// //       (err, uploadResult) => {
// //         if (err) throw err;
// //         return uploadResult;
// //       }
// //     ).end(req.file.buffer);

// //     const user = await User.findByIdAndUpdate(
// //       req.user.id,
// //       { avatarURL: result.secure_url },
// //       { new: true }
// //     );

// //     res.status(200).json({
// //       status: 200,
// //       message: 'Avatar updated successfully',
// //       data: { avatarURL: user.avatarURL }
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // };
// // src/controllers/users.js
// import createError from 'http-errors';
// import cloudinary  from '../services/cloudinary.js';
// import User        from '../models/user.js';

// export const updateAvatar = async (req, res, next) => {
//   try {
//     if (!req.file) throw createError(400, 'Avatar file is required');

//     const uploadResult = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: 'avatars', resource_type: 'image' },
//         (err, result) => err ? reject(err) : resolve(result)
//       );
//       stream.end(req.file.buffer);
//     });

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { avatarURL: uploadResult.secure_url },
//       { new: true }
//     );

//     res.json({
//       status: 200,
//       message: 'Avatar updated successfully',
//       data: { avatarURL: user.avatarURL }
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// src/controllers/users.js

import createError from 'http-errors';
import cloudinary  from '../services/cloudinary.js';
import User        from '../models/user.js';

/**
 * GET /users/current
 * Повертає дані аутентифікованого користувача
 */
export const getCurrent = async (req, res, next) => {
  try {
    const user = req.user;  // встановлює authenticate middleware

    if (!user) {
      throw createError(401, 'Not authenticated');
    }

    res.status(200).json({
      status: 200,
      message: 'Current user data',
      data: {
        _id:       user._id,
        name:      user.name,
        email:     user.email,
        avatarURL: user.avatarURL || null
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /users/avatar
 * Оновлює аватарку: приймає файл у req.file.buffer та зберігає в Cloudinary
 */
export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError(400, 'Avatar file is required');
    }

    // Завантажуємо buffer у Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'avatars', resource_type: 'image' },
        (err, result) => err ? reject(err) : resolve(result)
      );
      stream.end(req.file.buffer);
    });

    // Оновлюємо поле avatarURL
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL: uploadResult.secure_url },
      { new: true }
    );

    res.status(200).json({
      status: 200,
      message: 'Avatar updated successfully',
      data: { avatarURL: user.avatarURL }
    });
  } catch (err) {
    next(err);
  }
};
