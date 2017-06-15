var validator = require('./ForgetPasswordValidation');
var smtp = require('smtp');
var template = require('template');

module.exports = function ({ email }) {
  var validationResult = validator({ email });
  if (validationResult) {
    // validation failed
    throw validationResult;
  }

  return new Promise((res, rej) => {
    // merge email
    return template.merge('ForgetPasswordTemplate', { email });
  }).then((emailBody) => {
    return smtp.push([email], emailBody);
  });
}