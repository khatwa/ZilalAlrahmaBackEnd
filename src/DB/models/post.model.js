import { Schema, model } from 'mongoose'

import autoPopulate from 'mongoose-autopopulate'

const PostSchema = new Schema({
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
  image: {
    type: String,
    required: true,
    trim: true,
  },

  title: {
    type: String,
    trim: true,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  createdIn: {
    type: Date,
    required: true,
  },
  updatedIn: {
    type: Date,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
})

PostSchema.plugin(autoPopulate)

export default model('post', PostSchema)
