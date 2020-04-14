import { Schema, model } from 'mongoose'

import autoPopulate from 'mongoose-autopopulate'

const SupportSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    autopopulate: true,
  },
  orgId: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
    autopopulate: true,
  },
  amount: {
    type: Number,
  },

  date: {
    type: Date,
    required: true,
  },
  volunteerCategory: {
    type: Schema.Types.ObjectId,
    ref: 'volunteerCategory',
  },
  notes: {
    type: String,
  },
})

SupportSchema.plugin(autoPopulate)

export default model('support', SupportSchema)
