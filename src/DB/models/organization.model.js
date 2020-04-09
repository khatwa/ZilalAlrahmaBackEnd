import { Schema, model } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const OrgSchema = new Schema({
  orgName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  orgPhone: {
    type: Number,
    required: true,
  },
  orgVolunteerPhones: {
    type: Array,
    required: false,
  },
  orgAddress: {
    type: String,
    trim: true,
    required: true,
  },
  aboutOrg: {
    type: String,
    trim: true,
    required: true,
  },
  orgStatus: {
    type: Boolean,
  },
})

OrgSchema.plugin(autopopulate)
// OrgSchema.pre('findOne', function(next) {
//   this.populate('UserId')
// })

export default model('organization', OrgSchema)
