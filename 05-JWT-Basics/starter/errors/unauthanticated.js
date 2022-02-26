const CustomAPIError = require('./custom-error')
const {StatusCode} = require('http-status-codes')
class UnauthantificatedError extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statusCode = this.statusCode.UNAUTHORIZED
    }
  }
  
  module.exports = UnauthantificatedError