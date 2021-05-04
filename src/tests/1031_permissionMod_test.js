const { navFragment, permissionsPage } = inject();

Feature('Modify permissions of existing users');

Before(({ loginAs }) => {
    loginAs('bob');
  });

Scenario('Correct settings applied for operator', async ({ I }) => {
    await navFragment.gotoPermissions();
    await permissionsPage.filterByName('bob-dpi-operator@infdig.com')
    await permissionsPage.editUser('bob-dpi-operator@infdig.com')
    I.seeCheckboxIsChecked('operator');
    I.dontSeeCheckboxIsChecked('supervisor');
    I.dontSeeCheckboxIsChecked('admin');
    await navFragment.gotoPermissions();
    I.saveScreenshot("Permission_Opp_Table.png");
    I.seeVisualDiff("Permission_Opp_Table.png", { tolerance: 2 });
    await permissionsPage.clearFilterName();
});

Scenario('Correct settings applied for supervisor', async ({ I }) => {
    await navFragment.gotoPermissions();
    await permissionsPage.filterByName('bob-dpi-supervisor@infdig.com')
    await permissionsPage.editUser('bob-dpi-supervisor@infdig.com')
    I.seeCheckboxIsChecked('operator');
    I.seeCheckboxIsChecked('supervisor');
    I.dontSeeCheckboxIsChecked('admin');
    await navFragment.gotoPermissions();
    I.saveScreenshot("Permission_Sup_Table.png");
    I.seeVisualDiff("Permission_Sup_Table.png", { tolerance: 2 });
    await permissionsPage.clearFilterName();
});

Scenario('Correct settings applied for admin', async ({ I }) => {
    await navFragment.gotoPermissions();
    await permissionsPage.filterByName('bob-dpi-admin@infdig.com')
    await permissionsPage.editUser('bob-dpi-admin@infdig.com')
    I.seeCheckboxIsChecked('operator');
    I.seeCheckboxIsChecked('supervisor');
    I.seeCheckboxIsChecked('admin');
    await navFragment.gotoPermissions();
    I.saveScreenshot("Permission_Admin_Table.png");
    I.seeVisualDiff("Permission_Admin_Table.png", { tolerance: 2 });
    await permissionsPage.clearFilterName();
});
