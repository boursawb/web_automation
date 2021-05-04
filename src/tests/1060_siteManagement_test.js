const { sitesPage } = inject();

// feature configured with config override to prevent browser restart between tests - NOT IN USE
// .config('Puppeteer', { restart: false })
Feature('Perform site management tasks');

Before(({ loginAs }) => {
  loginAs('bob');
});

Scenario('Prepare environment for test run', async ({ basePage }) => {
  await basePage.clearQaPeople();
  await basePage.clearQaStations();
  await basePage.clearQaSites();
});

Scenario('Site name cannot exceed 10 characters', async ({ I, sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.nameCharacterLimit('01234566790');
  I.see('Must be 10 characters or less');
});

Scenario('Perform text validation for Create Site', async ({ sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.formValidation();
});

Scenario('Create 8 sites for remaining tests', async ({ sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.createNewSite(
    '_qaIDN',
    'Infinity Digital North',
    '100 N Pine',
    'Suite A',
    'Portland',
    'Oregon',
    '97129',
  );
  await sitesPage.createNewSite(
    '_qaIDS',
    'Infinity Digital South',
    '200 S Cactus',
    'Suite B',
    'Austin',
    'Texas',
    '73301',
  );
  await sitesPage.createNewSite(
    '_qaIDE',
    'Infinity Digital East',
    '300 E Palm',
    'Suite C',
    'Boston',
    'Massachusetts',
    '02101',
  );
  await sitesPage.createNewSite(
    '_qaIDW',
    'Infinity Digital West',
    '400 N Spruce',
    'Suite D',
    'Los Vegas',
    'Nevada',
    '88901',
  );
  await sitesPage.createNewSite(
    '_qaIDNW',
    'Infinity Digital NW',
    '500 N Coffee',
    'Suite E',
    'Seattle',
    'Washington',
    '98101',
  );
  await sitesPage.createNewSite(
    '_qaIDSW',
    'Infinity Digital SW',
    '600 W Canyon',
    'Suite F',
    'Phoenix',
    'Arizona',
    '85001',
  );
  await sitesPage.createNewSite(
    '_qaIDNE',
    'Infinity Digital NE',
    '700 S Lobster',
    'Suite G',
    'Portland',
    'Maine',
    '04019',
  );
  await sitesPage.createNewSite(
    '_qaIDSE',
    'Infinity Digital SE',
    '800 E Maple',
    'Suite H',
    'Orlando',
    'Florida',
    '32789',
  );
});

Scenario('Edit an existing site', async ({ sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.editExistingSite('_qaIDN', 'Infinity Digital NT', '100 NE Pine LN', 'Suite AA');
});

Scenario('Validate changes made to site', async ({ I, sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.filterById('_qaIDN');
  I.see('Infinity Digital NT');
  I.see('Portland');
  I.see('OR');
  await sitesPage.clearFilter();
});

Scenario('Filter sites by SiteId', async ({ I, basePage, sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.filterById('_qaID');
  if ((await basePage.filterResults()) > 0) {
    I.assertEqual(await I.getRowCount(), 8, 'Expected rows found');
  } else {
    I.assertEqual(1, 8, 'Expected rows not found');
  }
  await sitesPage.clearFilter();
});

Scenario('Filter sites by name', async ({ I, basePage, sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.filterByName('Infinity Digital N');
  if ((await basePage.filterResults()) > 0) {
    I.assertEqual(await I.getRowCount(), 3, 'Expected rows found');
  } else {
    I.assertEqual(await I.getRowCount(), 3, 'Expected rows not found');
  }
  await sitesPage.clearFilter();
});

Scenario('Filter sites by city and name (combo)', async ({ I, basePage, sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.filterByCity('Portland');
  await sitesPage.filterByName('Infinity Digital N');
  if ((await basePage.filterResults()) > 0) {
    I.assertEqual(await I.getRowCount(), 2, 'Expected rows found');
  } else {
    I.assertEqual(1, 2, 'Expected rows not found');
  }
  await sitesPage.clearFilterCity();
  I.wait(2); // Seems to help if you pause when clear filters are back to back
  await sitesPage.clearFilterName();
});

Scenario('Filter sites by state', async ({ I, basePage, sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.filterByState('AZ');
  if ((await basePage.filterResults()) > 0) {
    I.assertEqual(await I.getRowCount(), 1, 'Expected rows found');
  } else {
    I.assertEqual(0, 1, 'Expected rows not found');
  }
  await sitesPage.clearFilter();
});

Scenario('Delete existing site from properties screen', async ({ sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.filterById('_qaIDNE');
  await sitesPage.deleteSiteFromEdit('_qaIDNE');
  await sitesPage.clearFilter();
});

Scenario('Delete existing site from the table', async ({ sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.filterById('_qaIDSE');
  await sitesPage.deleteSiteFromTable('_qaIDSE');
  await sitesPage.clearFilter();
});

Scenario('Delete remaining _qa sites used for testing', async ({ I, sitesPage, navFragment, basePage }) => {
  await navFragment.gotoSites();
  await sitesPage.filterById('_qa');
  await basePage.deleteFiltered();
  await sitesPage.clearFilter();
  I.logout();
});
