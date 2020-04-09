import { Schema, model } from 'mongoose'

const VolunteerCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

export default model('volunteerCategory', VolunteerCategorySchema)
