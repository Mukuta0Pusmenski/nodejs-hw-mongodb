// import { Schema, model, Types } from 'mongoose';

// const sessionSchema = new Schema({
//   userId:                 { type: Types.ObjectId, ref: 'User', required: true },
//   accessToken:            { type: String, required: true },
//   refreshToken:           { type: String, required: true },
//   accessTokenValidUntil:  { type: Date,   required: true },
//   refreshTokenValidUntil: { type: Date,   required: true },
// }, { timestamps: true });

// export default model('Session', sessionSchema);
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true
    },
    accessToken: {
      type:     String,
      required: true
    },
    refreshToken: {
      type:     String,
      required: true,
      unique:   true
    },
    accessTokenValidUntil: {
      type: Date,
      required: true
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Session', sessionSchema);