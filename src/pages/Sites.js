const { I } = inject();

module.exports = {
  // insert your locators and methods here
  button: {
    create: 'Create',
    export: 'Export',
    save: 'button[aria-label="Save"]',
    delete: 'button[aria-label="Delete"]',
    removeFilter: 'button[title="Remove this filter"]',
    addFilter: 'button[aria-label="Add filter"]',
  },

  field: {
    id: '#id',
    name: '#name',
    street1: '#street1',
    street2: '#street2',
    city: '#city',
    state: '#state',
    zip: '#zip',
    idFilter: 'input[id="id"]',
    nameFilter: 'input[id="name"]',
    cityFilter: 'input[id="city"]',
    stateFilter: 'input[id="state"]',
  },

  listItem: {
    id: 'li[data-key="id"]',
    name: 'li[data-key="name"]',
    city: 'li[data-key="city"]',
    state: 'li[data-key="state"]',
  },

  text: {
    pageTitle: 'Infinity Production Tracker Sites',
    createSiteTitle: 'Site Setup',
    createSiteSubTitle:
      'Configure site related settings.  Site settings are used for data analysis.',
  },

  popup: {
    snackbar: '.MuiSnackbarContent-root'
  },

  validateHomePageText() {
    I.see(this.text.pageTitle);
  },

  /**e
   * Creates a new IPT site given the parameters provided.
   *
   * @param {*} id Unique ID/name for the site
   * @param {*} name A name for the site
   * @param {*} street1 Street address line 1
   * @param {*} stree2 Street address line 2
   * @param {*} city The city where this site is located
   * @param {*} state The 2 character state abbreviation where this site is located (i.e. OR, WA, CA, etc.)
   * @param {*} zip The zip code for this city / state
   */
  createNewSite(id, name, street1, street2, city, state, zip) {
    I.click(this.button.create);
    I.fillField(this.field.id, id);
    I.fillField(this.field.name, name);
    I.fillField(this.field.street1, street1);
    I.fillField(this.field.street2, street2);
    I.fillField(this.field.city, city);
    I.click(this.field.state);
    I.click(locate('li').withText(state));
    I.fillField(this.field.zip, zip);
    I.click(this.button.save);
    I.see('Element created');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    I.wait(1);
  },

  editExistingSite(siteId, name, street1, street2) {
    this.filterById(siteId);
    I.editRow(siteId, 2);
    I.clearField(this.field.name);
    I.fillField(this.field.name, name);
    I.clearField(this.field.street1);
    I.fillField(this.field.street1, street1);
    I.fillField(this.field.street2, street2);
    I.click(this.button.save);
    I.see('Element updated');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    this.clearFilterId();
    I.wait(1);
  },

  nameCharacterLimit(siteId) {
    I.click(this.button.create);
    I.fillField(this.field.id, siteId);
    I.pressKey('Tab');
  },

  /**
   * Deletes the site from within the edit window of the site
   * @param {string} siteId The site to be deleted
   */
  async deleteSiteFromEdit(siteId) {
    await I.selectRow(siteId, 2);
    I.click(this.button.delete);
    I.see('Element deleted');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    I.wait(1);
  },

  /**
   * Deletes the site by checking the box for the row and clicking the
   * delete button in the UI
   * @param {string} siteId
   */
  async deleteSiteFromTable(siteId) {
    await I.editRow(siteId, 2);
    I.click(this.button.delete);
    I.see('Element deleted');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    I.wait(1);
  },

  /**
   * Searches the sites table for the value of 'search' in the column
   * number specified.  Checks the box in row 1 when a match isfound.
   * @param {string} search Item to search for in the table
   * @param {number} column The column to look for this item in
   */
  async selectSite(search, column) {
    await I.selectRow(search, column);
  },

  /**
   * Searches the sites table for the value passed in for 'search'
   * located in the column specified.  Checks the box in row 1 for
   * all matching rows.
   * @param {string} search Item to search for in the table
   * @param {number} column The column to look for this item in
   */
  async selectSites(search, column) {
    await I.selecAlltRows(search, column);
  },

  /**
   * Selects a row in the sites table based on the value passed in for
   * 'search', opening the item for editing.
   * @param {string} search Item to search for in the table
   */
  async editSite(search) {
    await I.editRow(search, 2);
  },

  validateSiteModification(siteId, val) {
    this.filterById(siteId)
    I.see(val);
    this.clearFilterId();
  },

  async formValidation() {
    I.click(this.button.create);
    I.say('Making sure Save is not available');
    I.dontSee(this.button.save);
    I.fillField(this.field.id, 'IDQA');
    I.say('Attempting to save a site with only ID specified.');
    I.click(this.button.save);
    I.see('The form is not valid. Please check for errors');
    const nameVal = await I.grabTextFrom(
      locate('p').withAttr({ id: 'name-helper-text' }),
    );
    const street1Val = await I.grabTextFrom(
      locate('p').withAttr({ id: 'name-helper-text' }),
    );
    const street2Val = await I.grabTextFrom(
      locate('p').withAttr({ id: 'name-helper-text' }),
    );
    const zipVal = await I.grabTextFrom(
      locate('p').withAttr({ id: 'name-helper-text' }),
    );
    I.assertContain(
      [nameVal, street1Val, street2Val, zipVal],
      'Required',
      'Missing -Required- validation text',
    );
    I.say('Validator validation successful');
  },

  filterById(value) {
    I.click(this.button.addFilter);
    I.click(this.listItem.id);
    I.fillField(this.field.idFilter, value);
    I.wait(1);
  },

  filterByName(value) {
    I.click(this.button.addFilter);
    I.click(this.listItem.name);
    I.fillField(this.field.nameFilter, value);
    I.wait(1);
  },

  filterByCity(value) {
    I.click(this.button.addFilter);
    I.click(this.listItem.city);
    I.fillField(this.field.cityFilter, value);
    I.wait(1);
  },

  filterByState(value) {
    I.click(this.button.addFilter);
    I.click(this.listItem.state);
    I.fillField(this.field.stateFilter, value);
    I.wait(1);
  },

  clearFilterId() {
    I.click('button[title="Remove this filter"][data-key="id"]');
    I.wait(1);
  },

  clearFilterName() {
    I.click('button[title="Remove this filter"][data-key="name"]');
    I.wait(1);
  },

  clearFilterCity() {
    I.click('button[title="Remove this filter"][data-key="city"]');
    I.wait(1);
  },

  clearFilterState() {
    I.click('button[title="Remove this filter"][data-key="state"]');
    I.wait(1);
  },

  clearFilter() {
    I.click(this.button.removeFilter);
  },
};
