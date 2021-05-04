Feature('People management and maintenance');

Before(({ loginAs }) => {
  loginAs('bob');
});

Scenario('Prepare environment for test run', async ({ basePage }) => {
  await basePage.clearQaPeople();
  await basePage.clearQaStations();
  await basePage.clearQaSites();
})

Scenario('Create temp site for people testing', async ({ sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.createNewSite('_qaIDN', 'Infinity North', '1234 Main', 'Apt B', 'Hillsboro', 'Oregon', '97124');
});

Scenario('Perform text validation for Create Person', async ({ peoplePage, navFragment }) => {
    await navFragment.gotoPeople();
    await peoplePage.formValidation();
  },
);

Scenario('Create 5 people in the _qaIDN site for remaining tests', async ({ navFragment, peoplePage }) => {
    await navFragment.gotoPeople();
    await peoplePage.createPerson('_qaIDN - Infinity North', '_qa001', 'qaTester', 'One', 'First', 'Temp');
    await peoplePage.createPerson('_qaIDN - Infinity North', '_qa002', 'qaTester', 'Two', 'Second', 'Perm');
    await peoplePage.createPerson('_qaIDN - Infinity North', '_qa003', 'qaTester', 'Three', 'Third', 'Contract');
    await peoplePage.createPerson('_qaIDN - Infinity North', '_qa004', 'qaTester', 'Four', 'Second', 'Perm');
    await peoplePage.createPerson('_qaIDN - Infinity North', '_qa005', 'qaTester', 'Five', 'First', 'Perm');
  },
);

Scenario('Attempt to create person with duplicate emp ID', async ({ navFragment, peoplePage }) => {
    await navFragment.gotoPeople();
    await peoplePage.createDupPerson('_qaIDN - Infinity North', '_qa002');
  },
);

Scenario('Update existing person', async ({ navFragment, peoplePage }) => {
  await navFragment.gotoPeople();
  await peoplePage.updatePerson('_qa001', 'qaTester_Upd', 'One_Upd');
});

Scenario('Validate changes made to person were successful', async ({ I, peoplePage, navFragment }) => {
    await navFragment.gotoPeople();
    await peoplePage.filterById('_qa001');
    I.see('qaTester_Upd');
    I.see('One_Upd');
    await peoplePage.clearFilterId();
  },
);

Scenario('Filter people by employee Id', async ({ I, basePage, peoplePage, navFragment }) => {
  await navFragment.gotoPeople();
  await peoplePage.filterById('_qa001');
  if (await basePage.filterResults() > 0) {
    I.assertEqual(await I.getRowCount(), 1), 'Expected rows found';
  } else {
    I.assertEqual(0, 1, 'Expected rows not found');
  }
  await peoplePage.clearFilter();
});

Scenario('Filter people by first name', async ({ I, basePage, peoplePage, navFragment }) => {
  await navFragment.gotoPeople();
  await peoplePage.filterByFirstName('qaTester');
  if (await basePage.filterResults() > 0) {
    I.assertEqual(await I.getRowCount(), 5, 'Expected rows found');
  } else {
    I.assertEqual(0, 5, 'Expected rows not found');
  }
  await peoplePage.clearFilter();
});

Scenario('Filter people by last name', async ({ I, basePage, peoplePage, navFragment }) => {
  await navFragment.gotoPeople();
  await peoplePage.filterByLastName('Five');
  if (await basePage.filterResults() > 0) {
    I.assertEqual(await I.getRowCount(), 1, 'Expected rows found');
  } else {
    I.assertEqual(0, 1, 'Expected rows not found');
  }
  await peoplePage.clearFilter();
})

Scenario('Filter people by shift and category (combo)', async ({ I, basePage, peoplePage, navFragment }) => {
  await navFragment.gotoPeople();
  await peoplePage.filterByShift('Second');
  await peoplePage.filterByCategory('Perm');
  if (await basePage.filterResults() > 0) {
    I.assertEqual(await I.getRowCount(), 2, 'Expected rows found');
  } else {
    I.assertEqual(0, 2, 'Expected rows not found');
  }
  await peoplePage.clearFilterShift();
  I.wait(2);
  await peoplePage.clearFilterCategory();
})

Scenario('Filter people by created/updated by', async ({ I, basePage, peoplePage, navFragment }) => {
  await navFragment.gotoPeople();
  await peoplePage.filterByFirstName('qaTester');
  await peoplePage.filterByCreatedBy('bob@infdig.com');
  await peoplePage.filterByUpdatedBy('bob@infdig.com');
  if (await basePage.filterResults() > 0) {
    I.assertEqual(await I.getRowCount(), 5, 'Expected rows found');
  } else {
    I.assertEqual(0, 5, 'Expected rows not found');
  }
  await peoplePage.clearFilterFirstName();
  I.wait(2);
  await peoplePage.clearFilterCreatedBy();
  I.wait(2);
  await peoplePage.clearFilterUpdatedBy();
})

Scenario('Delete an existing person from IPT (Table)', async ({ peoplePage, navFragment }) => {
  await navFragment.gotoPeople();
  await peoplePage.filterById('_qa');
  await peoplePage.deletePersonFromTable('_qa001');
  await peoplePage.clearFilter();
});

Scenario('Delete an existing person from IPT (Edit window)', async ({ peoplePage, navFragment }) => {
  await navFragment.gotoPeople();
  await peoplePage.filterById('_qa');
  await peoplePage.deletePersonFromEdit('_qa002');
  await peoplePage.clearFilter();
});

Scenario('Delete remaining people used for these tests', async ({ basePage, peoplePage, navFragment }) => {
  await navFragment.gotoPeople();
  await peoplePage.filterById('_qa');
  await basePage.deleteFiltered();
  await peoplePage.clearFilter();
})

Scenario('Delete site created for people tests', async ({ sitesPage, navFragment }) => {
  await navFragment.gotoSites();
  await sitesPage.filterById('_qaIDN');
  await sitesPage.deleteSiteFromTable('_qaIDN');
  await sitesPage.clearFilter();
});