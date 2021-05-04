Feature('Validate appropriate access for all profiles.');

// Admin profile
Scenario('Admin has access to the following features', async ({ I, loginAs, navFragment }) => {
  loginAs('admin');
  I.see('Dashboard');
  await navFragment.expandAdmin();
  I.see('Permissions');
  I.see('Sites');
  I.see('Report Templates');
  I.see('Stations');
  I.see('Operator CSV Import');
  await navFragment.expandSupervisor();
  I.see('People');
  I.see('Station Identity');
  await navFragment.expandOperator();
  I.see('Pallet Builder');
  I.see('Reprint Manifests');
  I.see('Manual Manifest');
});

Scenario('Admin profile cannot open restricted pages by url', async ({ I, loginAs, navFragment }) => {
  loginAs('admin');
  I.wait(1); // If amOnPage happens too quickly, all menus don't load
  I.amOnPage('/cloudsettings');
  await navFragment.expandAdmin();
  I.dontSee('Cloud Settings');
  I.logout();
});

// Operator profile
Scenario('Operator has access to the following features', async ({ I, loginAs, navFragment }) => {
  loginAs('operator');
  I.see('Dashboard');
  I.see('Operator');
  I.dontSee('Admin');
  I.dontSee('Supervisor');
  await navFragment.expandOperator();
  I.see('Pallet Builder');
  I.see('Reprint Manifests');
  I.see('Manual Manifest');
});

Scenario('Operator cannot open restricted pages by url', ({ I, loginAs }) => {
  loginAs('operator');
  I.wait(1); // If amOnPage happens too quickly, all menus don't load
  I.amOnPage('/user-claims');
  I.dontSee('Admin');
  I.dontSee('Supervisor');
  I.dontSee('Infinity Production Tracker Permissions');
  I.logout();
});

// Supervisor profile
Scenario('Supervisor has access to the following features', async ({ I, loginAs, navFragment }) => {
  loginAs('supervisor');
  I.see('Dashboard');
  I.see('Supervisor');
  I.see('Operator');
  I.dontSee('Admin');
  await navFragment.expandSupervisor();
  I.see('People');
  I.see('Station Identity');
  await navFragment.expandOperator();
  I.see('Pallet Builder');
  I.see('Reprint Manifests');
  I.see('Manual Manifest');
});

Scenario('Supervisor cannot open restricted pages by url', ({ I, loginAs }) => {
  loginAs('supervisor');
  I.wait(1); // If amOnPage happens too quickly, all menus don't load
  I.amOnPage('/user-claims');
  I.dontSee('Infinity Production Tracker Permissions');
  I.logout();
});




