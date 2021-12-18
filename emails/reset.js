const keys = require('../keys');
module.exports = function (email, token) {
  return {
    from: keys.EMAIL_FROM,
    to: email,
    subject: 'Password recovery',
    html: `
    <h2>Did you forget password?</h2>
    <p>Follow the link to recovery password ${email}</p>
    <p><a href="${keys.BASE_URL}/auth/password/${token}">Recovery password</a></p>
    <hr/>
    <a href="${keys.BASE_URL}">Luxury restaurant</a>
    `
  }
}