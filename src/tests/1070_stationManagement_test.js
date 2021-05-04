const { sitesPage, navFragment } = inject();

Feature('Station management tests');

Before(({ loginAs }) => {
  loginAs('bob');
});

Scenario('Prepare environment for test run', async ({ basePage }) => {
  await basePage.clearQaPeople();
  await basePage.clearQaStations();
  await basePage.clearQaSites();
})

Scenario('Set station identity', async ({ stationIdentityPage }) => {
  await navFragment.gotoStationIdentity();
  await stationIdentityPage.setStationIDHFast();
});

Scenario('Perform text validation for Create Station', async ({ stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.formValidation();
});

Scenario('Create a site for remaining station tests', async ({ sitesPage }) => {
  await navFragment.gotoSites();
  await sitesPage.createNewSite(
    '_qaIDN',
    'Infinity Digital North',
    '123 Oak',
    'Apt B',
    'Bremerton',
    'Washington',
    '98662',
  );
});

Scenario('Create 5 stations to complete remaining tests', async ({ stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.createNewStation('_qa_Station_1', '_qaIDN', 'Basement', 'Digital Press', '100100');
  await stationsPage.createNewStation('_qa_Station_2', '_qaIDN', 'Lobby', 'Cutting', '200200');
  await stationsPage.createNewStation('_qa_Station_3', '_qaIDN', 'Suite', 'Cutting', '300300');
  await stationsPage.createNewStation('_qa_Station_4', '_qaIDN', 'Pent-qa-house', 'Cutting', '400400');
  await stationsPage.createNewStation('_qa_Station_5', '_qaIDN', 'Big-qa-House', 'Binding', '500500');
});

Scenario('Edit an existing station', async ({ stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.filterById('_qaIDN - _qa_Station_1')
  await stationsPage.editExistingStation('_qaIDN - _qa_Station_1', 'Basement_UPD', '100100_UPD');
  await stationsPage.clearFilter();
});

Scenario('Validate changes made to the station', async ({ I, stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.filterById('_qaIDN - _qa_Station_1');
  I.see('Basement_UPD');
  I.see('100100_UPD');
  await stationsPage.clearFilter();
});

Scenario('Clone an existing station', async ({ stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.filterById('_qaIDN - _qa_Station_1');
  await stationsPage.cloneStation('_qa_Station_1B', 'Basement_FINAL', '100100_FINAL');
  await stationsPage.clearFilter();
});

Scenario('Validate changes to cloned station (Station_1)', async ({ I, stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.filterById('_qaIDN - _qa_Station_1B');
  I.see('Basement_FINAL');
  I.see('100100_FINAL');
  await stationsPage.clearFilter();
});

Scenario('Filter station by Id', async ({ I, basePage, stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.filterById('_qaIDN - _qa_Station_1');
  if ((await basePage.filterResults()) > 0) {
    I.assertEqual(await I.getRowCount(), 2, 'Expected rows found');
  } else {
    I.assertEqual(1, 2, 'Expected rows not found');
  }
  await stationsPage.clearFilter();
});

Scenario('Filter station by name', async ({ I, basePage, stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.filterByName('Station_2');
  if ((await basePage.filterResults()) > 0) {
    I.assertEqual(await I.getRowCount(), 1, 'Expected rows found');
  } else {
    I.assertEqual(0, 1, 'Expected rows not found');
  }
  await stationsPage.clearFilter();
});

Scenario('Filter station by site', async ({ I, basePage, stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.filterBySite('_qaIDN');
  if ((await basePage.filterResults()) > 0) {
    I.assertEqual(await I.getRowCount(), 6, 'Expected rows found');
  } else {
    I.assertEqual(0, 6, 'Expected rows not found');
  }
  await stationsPage.clearFilter();
});

Scenario('Filter station by location', async ({ I, basePage, stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.filterByLocation('qa-house');
  if ((await basePage.filterResults()) > 0) {
    I.assertEqual(await I.getRowCount(), 2, 'Expected rows found');
  } else {
    I.assertEqual(0, 2, 'Expected rows not found');
  }
  await stationsPage.clearFilter();
});

Scenario('Filter by type and bar code (combo)', async ({ I, basePage, stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.filterBySite('IDN');
  await stationsPage.filterByType('cutting');
  await stationsPage.filterByBarcode('400400');
  if ((await basePage.filterResults()) > 0) {
    I.assertEqual(await I.getRowCount(), 1); 
  } else {
    I.assertEqual(0, 1); //
  }
  await stationsPage.clearFilterSite();
  I.wait(2);
  await stationsPage.clearFilterType();
  I.wait(2);
  await stationsPage.clearFilterBarcode();
});

Scenario('Delete existing station from the table view', async ({ stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.filterById('_qaIDN - _qa_Station_1')
  await stationsPage.deleteFromEdit('_qaIDN - _qa_Station_1');
  await stationsPage.clearFilter();
});

Scenario('Delete existing station from station properties', async ({ stationsPage }) => {
  await navFragment.gotoStations();
  await stationsPage.filterById('_qaIDN - _qa_Station_2')
  await stationsPage.deleteFromTable('_qaIDN - _qa_Station_2');
  await stationsPage.clearFilter();
});

Scenario('Delete remaining _qa stations', async ({ stationsPage, basePage }) => {
  await navFragment.gotoStations();
  await stationsPage.filterById('_qa');
  await basePage.deleteFiltered();
  await stationsPage.clearFilter();
});

Scenario('Delete site used for station testing', async ({ I, sitesPage }) => {
  await navFragment.gotoSites();
  await sitesPage.filterById('_qaIDN')
  await sitesPage.deleteSiteFromTable('_qaIDN');
  await sitesPage.clearFilter();
  I.logout();
});
