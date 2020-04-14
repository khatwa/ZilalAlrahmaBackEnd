import { Schema, model } from 'mongoose'

const RestorePoint = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  verificationCode: {
    type: Number,
    required: true,
  },
  oldPassword: {
    type: String,
    required: true,
    trim: true,
  },
  restoreDate: {
    type: Date,
  },
  expiresIn: {
    type: Date,
    required: true,
  },
  restoreHash: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
})

export default model('restorePoint', RestorePoint)
