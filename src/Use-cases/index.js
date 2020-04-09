/**
 * ==================================================
 * ==================================================
 * ===== WHAT NEXT: Names are inconsistent.     =====
 * ===== TODO: Make factory's names consistent. =====
 * ==================================================
 * ==================================================
 */

import loginFactory from './login-user'
import AddUserFactory from './add-user'
import AddOrgFactory from './add-org'
import RestorePasswordFactory from './restore-password-restore'
import RestorePasswordVerifyFactory from './restore-password-verify'
import RestorePasswordResetFactory from './restore-password-reset'
import AddMeetingFactory from './add-meeting'
import AddVolunteerFactory from './add-volunteer'
import AddPostFactory from './add-post'
import AddVolunteerCategoryFactory from './add-volunteer-category'
import GetItemById from './get-by-id'
import GetItemsByOrgId from './get-by-org-id'
import GetItemsFactory from './get-all'
// import database methods & models

import database, {
  userModel,
  supportModel,
  postModel,
  volunteerCategoryModel,
  volunteerModel,
  meetingModel,
  orgModel,
  restorePointModel,
} from '../DB'

// export and inject db methods & models to the use case
export const login = loginFactory(userModel, database)
export const addUser = AddUserFactory(userModel, database)
export const addOrg = AddOrgFactory(orgModel, database)
export const restorePassword = RestorePasswordFactory(
  { RestorePoint: restorePointModel, User: userModel },
  database
)

export const restorePasswordVerify = RestorePasswordVerifyFactory(
  restorePointModel,
  database
)
export const restorePasswordReset = RestorePasswordResetFactory(
  { RestorePoint: restorePointModel, User: userModel },
  database
)

export const addMeeting = AddMeetingFactory(meetingModel, database)
export const addPost = AddPostFactory(postModel, database)
export const addVolunteerCategory = AddVolunteerCategoryFactory(
  volunteerCategoryModel,
  database
)

export const addVolunteer = AddVolunteerFactory(volunteerModel, database)
export const addSupporter = AddVolunteerFactory(supportModel, database)
export const getOrgProfile = GetItemById(orgModel, database)
export const getUserProfile = GetItemById(userModel, database)
export const getVolunteerCategory = GetItemById(
  volunteerCategoryModel,
  database
)
export const getPostInfo = GetItemById(postModel, database)
export const getMeetingInfo = GetItemById(meetingModel, database)
export const getSupporterInfo = GetItemById(supportModel, database)
export const getVolunteerInfo = GetItemById(volunteerModel, database)

// get items by organization id
export const getOrgPosts = GetItemsByOrgId(postModel, database)
export const getOrgMeetings = GetItemsByOrgId(meetingModel, database)
export const getOrgVolunteers = GetItemsByOrgId(volunteerModel, database)
export const getOrgSupporters = GetItemsByOrgId(supportModel, database)

export const getAllCategories = GetItemsFactory(
  volunteerCategoryModel,
  database
)
export const getAllOrgs = GetItemsFactory(orgModel, database)

export default {
  login,
  addUser,
  login,
  restorePassword,
  restorePasswordVerify,
  restorePasswordReset,
  addOrg,
  addMeeting,
  addSupporter,
  addPost,
  addVolunteerCategory,
  addVolunteer,
  getOrgProfile,
  getUserProfile,
  getVolunteerCategory,
  getPostInfo,
  getMeetingInfo,
  getSupporterInfo,
  getVolunteerInfo,
  getOrgPosts,
  getOrgMeetings,
  getOrgVolunteers,
  getOrgSupporters,
  getAllCategories,
  getAllOrgs,
}
