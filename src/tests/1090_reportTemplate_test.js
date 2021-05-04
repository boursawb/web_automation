Feature('Validate Report Template functions');

Before(({ loginAs }) => {
    loginAs('bob');
  });
 
Scenario('Validate add Report Template dialog', async ({ navFragment, rptTemplatesPage }) => {
    await navFragment.gotoReportTemplates();
    await rptTemplatesPage.validateUploadForm();
});
