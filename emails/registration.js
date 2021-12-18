const keys = require('../keys');

module.exports = function (email) {
  return {
    from: keys.EMAIL_FROM,
    to: email,
    subject: 'You account was created in website Luxury restaurant',
    html: `
    <h2>Welcome to Luxury restaurant</h2>
    <p>You created account successfully with email - ${email}</p>
    <hr/>
    <a href="${keys.BASE_URL}">Luxury restaurant</a>
    `
  }
}