Feature('Validate default Cloud Settings');

Before(({ loginAs }) => {
    loginAs('bob');
  });

Scenario('Basic validation of Pallet Tracker form', async ({ I, navFragment, cloudPage }) => {
    await navFragment.gotoCloudSettings();
    await cloudPage.validatePalletTrackerForm();
    const days = await cloudPage.getRetainDays();
    I.say('Retain Days: ' + days);
    I.assertEqual(days, '7');
    const hours = await cloudPage.getRetainHours();
    I.say('Retain Hours: ' + hours);
    I.assertEqual(hours, '0');
});
