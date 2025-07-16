
import createError from 'http-errors';
import cloudinary  from '../services/cloudinary.js';
import User        from '../models/user.js';


export const getCurrent = async (req, res, next) => {
  try {
    const user = req.user;  

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


export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError(400, 'Avatar file is required');
    }


    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'avatars', resource_type: 'image' },
        (err, result) => err ? reject(err) : resolve(result)
      );
      stream.end(req.file.buffer);
    });


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
