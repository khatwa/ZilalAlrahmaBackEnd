import validator from '../Helpers/validator'
import userEntityFactory from './user.entity'
import loginEntityFactory from './login.entity'
import { createHash as hash } from '../security'
import OrganizationEntityFactory from './organization.entity'
import RestorePasswordFactory from './restore-password.entity'
import VerifyCodeFactory from './verify-code.entity'
import ResetPasswordFactory from './reset-password.entity'
import MeetingEntityFactory from './meeting.entity'
import PostEntityFactory from './post.entity'
import VolunteerCategoryFactory from './volunteer-category.entity'
import VolunteerFactory from './volunteer.entity'

// entities will return this object in success or failure
function createObject(err, data, status = 500) {
  return {
    data,
    status,
    error: err,
    hasValidationError: err ? true : false,
  }
}

export const userEntity = userEntityFactory(hash, validator, createObject)
export const loginEntity = loginEntityFactory(validator, createObject)
export const organizationEntity = OrganizationEntityFactory(
  validator,
  createObject
)
export const restorePasswordEntity = RestorePasswordFactory(
  validator,
  createObject
)
export const verifyCodeEntity = VerifyCodeFactory(validator, createObject)
export const resetPasswordEntity = ResetPasswordFactory(validator, createObject)
export const meetingEntity = MeetingEntityFactory(validator, createObject)
export const postEntity = PostEntityFactory(validator, createObject)
export const volunteerCategory = VolunteerCategoryFactory(
  validator,
  createObject
)
export const volunteerEntity = VolunteerFactory(validator, createObject)
// for convention
export default {
  loginEntity,
  userEntity,
  organizationEntity,
  restorePasswordEntity,
  verifyCodeEntity,
  resetPasswordEntity,
  meetingEntity,
  postEntity,
  volunteerCategory,
  volunteerEntity,
}
