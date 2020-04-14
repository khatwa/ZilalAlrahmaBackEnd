import { Schema, model } from 'mongoose'

import autoPopulate from 'mongoose-autopopulate'

const MeetingSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    autopopulate: true,
  },
  orgId: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
    autopopulate: true,
  },
  meetingDate: {
    type: String,
    required: true,
  },

  purpose: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  notes: {
    type: String,
  },
})

MeetingSchema.plugin(autoPopulate)

export default model('meeting', MeetingSchema)
