import { Schema, model } from 'mongoose'
import autoPopulate from 'mongoose-autopopulate'
const UserSchema = new Schema({
  orgId: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
    autopopulate: true,
  },

  firstName: {
    type: String,
    trim: true,
  },

  lastName: {
    type: String,
    trim: true,
  },

  password: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },

  isOwner: {
    type: Boolean,
    default: false,
  },
  isPartner: {
    type: Boolean,
    default: false,
  },
  registrationDate: {
    type: Date,
  },
})

UserSchema.plugin(autoPopulate)

export default model('user', UserSchema)
