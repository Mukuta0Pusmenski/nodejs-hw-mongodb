
// import mongoose from 'mongoose';

// const contactSchema = new mongoose.Schema(
//   {
//     name:    { type: String, required: true },
//     email:   { type: String, required: true },
//     phone:   { type: String, required: true },
//     message: { type: String, default: '' },
//     owner:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
//   },
//   { timestamps: true, versionKey: false }
// );

// export default mongoose.model('Contact', contactSchema);

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email:       { type: String, required: true },
  isFavourite: { type: Boolean, default: false },
  contactType: { 
    type: String, 
    enum: ['work','home','personal'], 
    required: true 
  },
  userId:      {                   // ← нове поле
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Contact', contactSchema);
