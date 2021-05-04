const { I } = inject();

module.exports = {

  // insert your locators and methods here

  button: {
    create: 'a[href="#/reporttemplates/create"]',
    export: 'button[aria-label="Export"]',

  },

  list: {
    category: '#category',
  },

  table: {
    colId: 'span[data-field="id"]',
    colCategory: 'span[data-field="category"]',
    colCreated: 'span[data-field="createdate"]',
    colLastUpd: 'span[data-field="lastupdate"]',
    colCreatedBy: 'span[data-field="createdby"]',
    colUpdatedBy: 'span[data-field="updatedby"]',
  },

  text: {
    mainPageTitle: 'Infinity Production Tracker Report Templates',
    rowsText: 'Rows per page:',
    // Text from Add Template form
    title: 'Report Template',
    subtitle: 'Upload report templates to use as in other flows.',
    uploadHint: 'Report File Zip',
    hotspotText: 'Drop a file to upload, or click to select it.',
    editorTitle: 'Additional Notes'
  },

  validateUploadForm() {
    I.click(this.button.create);
    I.see(this.text.title);
    I.see(this.text.subtitle);
    I.see(this.text.uploadHint);
    I.see(this.text.editorTitle);
    I.seeElement(this.list.category);
  }
}
