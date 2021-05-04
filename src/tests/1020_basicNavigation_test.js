const { I, navFragment } = inject();

Feature('Navigate to the main areas of the application');

Before(({ loginAs }) => {
  loginAs('bob');
});

Scenario('Basic page validation of Dashboard', async ({ dashboardPage }) => {
  await navFragment.gotoDashboard();
  await dashboardPage.validatePageText();
  I.assertEqual(
    'https://infinity-production-tracker-qa.web.app/#/',
    await I.grabCurrentUrl(),
  );
});

Scenario('Basic page validation of Permissions', async ({ permissionsPage }) => {
  await navFragment.gotoPermissions();
  I.assertEqual(
    'Infinity Production Tracker - qa',
    await I.grabTitle(),
  );
  I.assertEqual(
    'https://infinity-production-tracker-qa.web.app/#/user-claims',
    await I.grabCurrentUrl(),
  );
})

Scenario('Basic page validation of Sites', async ({ sitesPage }) => {
  await navFragment.gotoSites();
  await sitesPage.validateHomePageText();
  I.assertEqual(
    'Infinity Production Tracker - qa',
    await I.grabTitle(),
  );
  I.assertEqual(
    'https://infinity-production-tracker-qa.web.app/#/site',
    await I.grabCurrentUrl(),
  );
});

Scenario('Basic page validation of Report Templates', async ({ rptTemplatesPage }) => {
  await navFragment.gotoReportTemplates();
  await rptTemplatesPage.validateUploadForm();
  I.assertEqual(
    'Infinity Production Tracker - qa',
    await I.grabTitle(),
  );
  I.assertEqual(
    'https://infinity-production-tracker-qa.web.app/#/reporttemplates/create',
    await I.grabCurrentUrl(),
  );
});

Scenario('Basic page validation of Stations', async ({ stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.validatePageText();
  I.assertEqual(
    'Infinity Production Tracker - qa',
    await I.grabTitle(),
  );
  I.assertEqual(
    'https://infinity-production-tracker-qa.web.app/#/station',
    await I.grabCurrentUrl(),
  );
});

Scenario('Basic page validation of Cloud Settings', async ({ cloudPage }) => {
  await navFragment.gotoCloudSettings();
  await cloudPage.validatePageText();
  I.assertEqual(
    'Infinity Production Tracker - qa',
    await I.grabTitle(),
  );
  I.assertEqual(
    'https://infinity-production-tracker-qa.web.app/#/cloudsettings',
    await I.grabCurrentUrl(),
  );
});

Scenario('Basic page validation of CSV Import', async ({ cSVImportPage }) => {
  await navFragment.gotoCSVImport();
  await cSVImportPage.basicPageValidation();
  I.assertEqual(
    'Infinity Production Tracker - qa',
    await I.grabTitle(),
  );
  I.assertEqual(
    'https://infinity-production-tracker-qa.web.app/#/peopleImportCsv',
    await I.grabCurrentUrl(),
  );
});

Scenario('Basic page validation of People', async ({ peoplePage }) => {
  await navFragment.gotoPeople();
  await peoplePage.validatePageText();
  I.assertEqual(
    'Infinity Production Tracker - qa',
    await I.grabTitle(),
  );
  I.assertEqual(
    'https://infinity-production-tracker-qa.web.app/#/people',
    await I.grabCurrentUrl(),
  );
});

Scenario('Basic page validation for Station Identity', async ({ stationsPage, stationIdentityPage }) => {
  await navFragment.gotoStationIdentity();
  await stationIdentityPage.setStationIDHFast();
  await navFragment.gotoDashboard();
  await navFragment.gotoStationIdentity();
  await stationIdentityPage.validatePageText();
  I.assertEqual(
    'Infinity Production Tracker - qa',
    await I.grabTitle(),
  );
  I.assertEqual(
    'https://infinity-production-tracker-qa.web.app/#/stationadopt',
    await I.grabCurrentUrl(),
  );
});

Scenario('Basic page validation of Pallet Builder', async ({ stationIdentityPage, palletBuilderPage }) => {
  await navFragment.gotoStationIdentity();
  await stationIdentityPage.setStationIDHFast();
  await navFragment.gotoPalletBuilder();
  await palletBuilderPage.cancelIfLoaded();
  await palletBuilderPage.validatePalletNotLoaded();
  I.assertEqual(
    'Infinity Production Tracker - qa',
    await I.grabTitle(),
  );
  I.assertEqual(
    'https://infinity-production-tracker-qa.web.app/#/ppbbuildpallet',
    await I.grabCurrentUrl(),
  );
});

Scenario('Basic page validation of Reprint Manifest', async ({ stationIdentityPage, reprintManifestPage }) => {
  await navFragment.gotoStationIdentity();
  await stationIdentityPage.setStationIDHFast();
  await navFragment.gotoReprintManifest();
  await reprintManifestPage.validatePrintManifest();
  I.assertEqual(
    'Infinity Production Tracker - qa',
    await I.grabTitle(),
  );
  I.assertEqual(
    'https://infinity-production-tracker-qa.web.app/#/ppboperatorreprint',
    await I.grabCurrentUrl(),
  );
});

Scenario('Basic page validation of Manual Manifest', async ({ stationIdentityPage, manualManifestPage }) => {
  await navFragment.gotoStationIdentity();
  await stationIdentityPage.setStationIDHFast();
  await navFragment.gotoManualManifest();
  await manualManifestPage.validatePageText();
  I.assertEqual(
    'Infinity Production Tracker - qa',
    await I.grabTitle(),
  );
  I.assertEqual(
    'https://infinity-production-tracker-qa.web.app/#/ppboperatormanual',
    await I.grabCurrentUrl(),
  );
  I.logout();
});