// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({

    /**
     * Reset the password for the specified user/email.
     * The email address of the user to have the password reset for.
     * @param {string} email
     */
    resetPasswordFor: function (email) {
      this.amOnPage('/login');
      this.fillField('#username', email);
      this.click('Forgot Password?');
      this.see('Send Password Reset?');
      this.see('A password reset will be sent to the following email:');
      this.fillField('input[type="email"]', email);
      this.click('Send Email');
      this.see('Password reset email sent!');
    },

    resetInactiveAccount: function (email) {
      this.amOnPage('/login');
      this.fillField('#username', email);
      this.click('Forgot Password?');
      this.see('Send Password Reset?');
      this.see('A password reset will be sent to the following email:');
      this.fillField('input[type="email"]', email);
      this.click('Send Email');
      this.see('There is no user record corresponding to this identifier. The user may have been deleted.')
    },

    logout: function () {
      this.click('Profile');
      this.click(locate('div').find('div').withText('Logout').as('Logout Button'));
      this.wait(1);
      this.see('Username: test@example.com');
    },   

  });
}
