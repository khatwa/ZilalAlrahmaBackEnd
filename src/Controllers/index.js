// import controllers
import SignupFactory from './signup'
import LoginFactory from './login'
import RestorePasswordFactory from './restore-password-restore'
import RestorePasswordVerifyFactory from './restore-password-verify'
import RestorePasswordResetFactory from './restore-password-reset'
import AddNewOrgFactory from './add-new-org'
import AddMeetingFactory from './add-meeting'
import AddPostFactory from './add-post'
import AddVolunteerFactory from './add-volunteer'
import AddSupporterFactory from './add-supporter'
import AddVolunteerCategoryFactory from './add-volunteer-category'
import GetItemByIdFactory from './get-by-id'

import { createHash as hash, signToken } from '../security'

// import use cases. use cases will be injected to the controllers factory
import UseCases from '../Use-cases'
// UseCases.addSupport
// export as individual
export const signup = SignupFactory(UseCases)
export const login = LoginFactory(UseCases, hash, signToken)
export const restorePoint = RestorePasswordFactory(UseCases)
export const restorePointVerify = RestorePasswordVerifyFactory(
  UseCases
)
export const restorePointReset = RestorePasswordResetFactory(UseCases)
export const addNewOrg = AddNewOrgFactory(UseCases)
export const addMeeting = AddMeetingFactory(UseCases)
export const addPost = AddPostFactory(UseCases)
export const addSupporter = AddSupporterFactory(UseCases)
export const addVolunteer = AddVolunteerFactory(UseCases)
export const addVolunteerCategory = AddVolunteerCategoryFactory(UseCases)

// get item by their ids

export const getOrgProfile = GetItemByIdFactory(UseCases.getOrgProfile)
export const getUserProfile = GetItemByIdFactory(UseCases.getUserProfile)
export const getVolunteerCategory = GetItemByIdFactory(
  UseCases.getVolunteerCategory
)
export const getPostInfo = GetItemByIdFactory(UseCases.getPostInfo)
export const getMeetingInfo = GetItemByIdFactory(UseCases.getMeetingInfo)
export const getSupporterInfo = GetItemByIdFactory(UseCases.getSupporterInfo)
export const getVolunteerInfo = GetItemByIdFactory(UseCases.getVolunteerInfo)

// get item by their org ids

export const getOrgPosts = GetItemByIdFactory(UseCases.getOrgPosts)
export const getOrgMeetings = GetItemByIdFactory(UseCases.getOrgMeetings)
export const getOrgVolunteers = GetItemByIdFactory(UseCases.getOrgVolunteers)
export const getOrgSupporters = GetItemByIdFactory(UseCases.getOrgSupporters)

// get all items
export const getAllCategories = GetItemByIdFactory(UseCases.getAllCategories)
export const getAllOrgs = GetItemByIdFactory(UseCases.getAllOrgs)

