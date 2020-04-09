import mongoose from 'mongoose'

// import database models
import UserModel from './models/user.model'
import OrgModel from './models/organization.model'
import RestorePointModel from './models/restore-password'
import MeetingModel from './models/meeting.model'
import PostModel from './models/post.model'
import SupportModel from './models/support.model'
import VolunteerModel from './models/volunteer.model'
import VolunteerCategoryModel from './models/volunteer-category.model'

// import database functions (adapters)
import DatabaseAdapterFunctions from './adapters'

// export database models
export const userModel = UserModel
export const orgModel = OrgModel
export const restorePointModel = RestorePointModel
export const meetingModel = MeetingModel
export const postModel = PostModel
export const supportModel = SupportModel
export const volunteerModel = VolunteerModel
export const volunteerCategoryModel = VolunteerCategoryModel

// export database function & invoke adapter factory
export default DatabaseAdapterFunctions(mongoose)
