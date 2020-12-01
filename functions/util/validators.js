// const { user } = require('firebase-functions/lib/providers/auth')

const isEmpty = (string) => string != null && string.trim() === ''
const isEmail = email => {
  // eslint-disable-next-line
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return email.match(regEx)
}

exports.validateSignupData = (data) => {
  const errors = {

  }
  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty'
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address'
  }

  if (isEmpty(data.password)) {
    errors.password = 'Must not be empty'
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords must match'
  }
  if (isEmpty(data.handle)) {
    errors.handle = 'Must not be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0
  }
}

exports.validateLoginData = (data) => {
  const errors = {}

  if (isEmpty(data.email)) errors.email = 'Must not be empty'
  if (isEmpty(data.password)) errors.password = 'Must not be empty'

  return {
    errors,
    valid: Object.keys(errors).length === 0
  }
}

exports.reduceUserDetails = (data) => {
  const userDetails = {}
  if (!isEmpty(data.bio.trim())) {
    userDetails.bio = data.bio
  }
  if (!isEmpty(data.website.trim())) {
    // https://website.com
    if (data.website.trim().substring(0, 4) !== 'http') {
      userDetails.website = `https://${data.website.trim()}`
    } else {
      userDetails.website = data.website
    }
  }
  if (!isEmpty(data.location.trim())) {
    userDetails.location = data.location
  }
  return userDetails
}
