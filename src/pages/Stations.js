const { I } = inject();

module.exports = {

  // insert your locators and methods here
  button: {
    create: 'a[href="#/station/create"]',
    clone: 'a[aria-label="Clone"]',
    export: 'Export',
    save: 'button[aria-label="Save"]',
    delete: 'button[aria-label="Delete"]',
    addFilter: 'button[aria-label="Add filter"]',
    clearFilter: 'button[title="Remove this filter"]',
  },

  field: {
    name: '#name',
    siteId: '#siteId',
    location: '#location',
    stationType: '#stationType',
    barcode: '#barcode',
  },

  table: {
    colId: 'span[data-field="id"]',
    colName: 'span[data-field="name"]',
    colSite: 'span[data-field="siteId"]',
    colLoc: 'span[data-field="location"]',
    colStationType: 'span[data-field="stationType"]',
    colBarcode: 'span[data-field="barcode"]',
    colCreatedBy: 'span[data-field="createdby"]',
  },

  filter: {
    item: {
      id: 'li[data-key="id"]',
      name: 'li[data-key="name"]',
      siteId: 'li[data-key="siteId"]',
      location: 'li[data-key="location"]',
      stationType: 'li[data-key="stationType"]',
      barcode: 'li[data-key="barcode"]',
    },
    field: {
      id: '#id',
      name: '#name',
      siteId: '#siteId',
      location: '#location',
      stationType: '#stationType',
      barcode: '#barcode',
    },
  },

  text: {
    mainPageTitle: 'Infinity Production Tracker Stations',
    createStationTitle: 'Station Setup',
    createStationSubtitle: 'Configure station related settings. Once a station is configured, it can be adopted by a physical machine on the production floor.',
    rowsText: 'Rows per page:',
  },

  validatePageText() {
    I.see(this.text.mainPageTitle);
    I.see(this.text.rowsText);
  },

  createNewStation(name, siteId, location, type, barcode) {
    I.click(this.button.create);
    I.fillField(this.field.name, name);
    I.click(this.field.siteId);
    I.click(locate('li').withText(siteId));
    I.fillField(this.field.location, location);
    I.click(this.field.stationType);
    I.click(locate('li').withText(type));
    I.fillField(this.field.barcode, barcode);
    I.click(this.button.save);
    I.see('Element created');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    I.wait(1);
  },

  editExistingStation(stationId, location, barcode) {
    I.editRow(stationId, 2);
    I.clearField(this.field.location);
    I.fillField(this.field.location, location);
    I.clearField(this.field.barcode);
    I.fillField(this.field.barcode, barcode);
    I.click(this.button.save);
    I.see('Element updated');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    I.wait(1);
  },

  cloneStation(name, location, barcode) {
    I.click(this.button.clone);
    I.clearField(this.field.name);
    I.fillField(this.field.name, name);
    I.clearField(this.field.location);
    I.fillField(this.field.location, location);
    I.clearField(this.field.barcode);
    I.fillField(this.field.barcode, barcode);
    I.click(this.button.save);
    I.see('Element created');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    I.wait(1);
  },

  /**
   * Deletes the station from within the edit window
   * @param {string} siteId The site to be deleted
   */
  async deleteFromEdit(stationId) {
    await I.selectRow(stationId, 2);
    I.click(this.button.delete);
    I.see('Element deleted');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    I.wait(1);
  },

  /**
   * Deletes the station by checking the box for the row and clicking the
   * delete button in the UI
   * @param {string} siteId
   */
  async deleteFromTable(stationId) {
    I.editRow(stationId, 2);
    I.click(this.button.delete);
    I.see('Element deleted');
  },  

  filterById(value) {
    I.click(this.button.addFilter);
    I.click(this.filter.item.id);
    I.fillField(this.filter.field.id, value);
    I.wait(2);
  },

  filterByName(value) {
    I.click(this.button.addFilter);
    I.click(this.filter.item.name);
    I.fillField(this.filter.field.name, value);
    I.wait(2);
  },

  filterBySite(value) {
    I.click(this.button.addFilter);
    I.click(this.filter.item.siteId);
    I.fillField(this.filter.field.siteId, value);
    I.wait(2);
  },

  filterByLocation(value) {
    I.click(this.button.addFilter);
    I.click(this.filter.item.location);
    I.fillField(this.filter.field.location, value);
    I.wait(2);
  },

  filterByType(value) {
    I.click(this.button.addFilter);
    I.click(this.filter.item.stationType);
    I.fillField(this.filter.field.stationType, value);
    I.wait(2);
  },

  filterByBarcode(value) {
    I.click(this.button.addFilter);
    I.click(this.filter.item.barcode);
    I.fillField(this.filter.field.barcode, value);
    I.wait(2);
  },

  clearFilterId() {
    I.click('button[title="Remove this filter"][data-key="id"]');
    I.wait(1);
  },

  clearFilterName() {
    I.click('button[title="Remove this filter"][data-key="name"]');
    I.wait(1);
  },

  clearFilterSite() {
    I.click('button[title="Remove this filter"][data-key="siteId"]');
    I.wait(1);
  },

  clearFilterLocation() {
    I.click('button[title="Remove this filter"][data-key="location"]');
    I.wait(1);
  },

  clearFilterType() {
    I.click('button[title="Remove this filter"][data-key="stationType"]');
    I.wait(1);
  },

  clearFilterBarcode() {
    I.click('button[title="Remove this filter"][data-key="barcode"]');
    I.wait(1);
  },

  clearFilter() {
    I.click(this.button.clearFilter);
    I.wait(1);
  },

  async formValidation() {
    I.click(this.button.create);
    I.say('Making sure Save is not available');
    I.dontSee(this.button.save);
    I.say('Checking helper text for all station creation fields.');
    I.see('Name of device represented by this station. Used to match work to this station, such as press jobs.');
    I.see('Site where station is located');
    I.see('Description of where this station is physically located on a site');
    I.see('Type of station for example digital press, binding...');
    I.see('A unique barcode id for this station');
    I.see('Additional Notes');
    I.say('Checking field legend text');
    I.see('Name');
    I.see('Site');
    I.see('Physical Location');
    I.see('Station Type');
    I.see('Station Barcode');
    I.fillField(this.field.name, 'IDQA');
    I.say('Attempting to save a site with only the Name specified.');
    I.click(this.button.save);
    I.see('barcode is a required field');
    const siteVal = await I.grabTextFrom(
      locate('p').withAttr({ id: 'siteId-helper-text' }),
    );
    const locationVal = await I.grabTextFrom(
      locate('p').withAttr({ id: 'location-helper-text' }),
    );
    const typeVal = await I.grabTextFrom(
      locate('p').withAttr({ id: 'stationType-helper-text' }),
    );
    I.assertContain(
      [siteVal, locationVal, typeVal],
      'Required',
      'Missing -Required- validation text',
    );
    I.say('Validator validation complete');
  },
}
