Feature('Common logon/logoff scenarios');

Scenario('Log in / out with valid credentials', ({ I, loginAs }) => {
  loginAs('bob');
  I.logout();
});

Scenario('Log in with invalid username', ({ loginAs }) => {
  loginAs('badUser');
});

Scenario('Log in with bad password', ({ loginAs }) => {
  loginAs('badPassword');
});

Scenario('Reset password for a user', ({ I }) => {
  I.resetPasswordFor('bob-dpi-operator@infdig.com');
});

Scenario('Attempt to reset password for invalid email', ({ I }) => {
  I.resetInactiveAccount('terminated@infdig.com');

});
