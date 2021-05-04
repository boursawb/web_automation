const { I } = inject();

module.exports = {

  // insert your locators and methods here
  button: {
    create: 'a[aria-label="Create"]',
    export: 'button[aria-label="Export"]',
    save: 'button[aria-label="Save"]',
    delete: 'Delete',
    addFilter: 'button[aria-label="Add filter"]',
    removeFilter: 'button[title="Remove this filter"]',
  },

  field: {
    siteId: '#siteId',
    employeeId: '#id',
    firstName: '#firstName',
    lastName: '#lastName',
    shift: '#shift',
    category: '#category',
    filterId: 'input[id="id"]',
    filterFirstName: 'input[id="firstName"]',
    filterLastName: 'input[id="lastName"]',
    filterShift: 'input[id="shift"]',
    filterCategory: 'input[id="category"]',
    filterCreatedBy: 'input[id="createdby"]',
    filterUpdatedBy: 'input[id="updatedby"]',
  },

  filterList: {
    id: 'li[data-key="id"]',
    firstName: 'li[data-key="firstName"]',
    lastName: 'li[data-key="lastName"]',
    shift: 'li[data-key="shift"]',
    category: 'li[data-key="category"]',
    createdBy: 'li[data-key="createdby"]',
    updatedBy: 'li[data-key="updatedby"]',
  },

  text: {
    title: 'Infinity Production Tracker People',
  },

  validatePageText() {
    I.see(this.text.title);
  },

  createPerson(siteId, empId, fName, lName, shift, category) {
    I.click(this.button.create);
    I.click(this.field.siteId);
    I.click(locate('li').withText(siteId));
    I.fillField(this.field.employeeId, empId);
    I.fillField(this.field.firstName, fName);
    I.fillField(this.field.lastName, lName);
    I.fillField(this.field.shift, shift);
    I.fillField(this.field.category, category);
    I.click(this.button.save);
    I.see('Element created');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    I.wait(1);
  },

  createDupPerson(siteId, empId) {
    I.click(this.button.create);
    I.click(this.field.siteId);
    I.click(locate('li').withText(siteId));
    I.fillField(this.field.employeeId, empId);
    I.pressKey('Tab');
    I.waitForText('Id already exists');
  },

  updatePerson(empId, fName, lName) {
    this.filterById(empId);
    I.editRow(empId, 2);
    I.clearField(this.field.firstName);
    I.fillField(this.field.firstName, fName);
    I.clearField(this.field.lastName);
    I.fillField(this.field.lastName, lName); 
    I.click(this.button.save);
    I.see('Element updated');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    this.clearFilterId();
    I.wait(1);
  },

  validatePeopleModification(empId, val1, val2) {
    this.filterById(empId)
    I.see(val1);
    I.see(val2);
    this.clearFilterId();
  },

  async deletePersonFromTable(empId) {
    I.selectRow(empId, 2);
    I.click(this.button.delete);
    I.see('Element deleted');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    I.wait(1);
  },

  async deletePersonFromEdit(empId) {
    I.editRow(empId, 2);
    I.click(this.button.delete);
    I.see('Element deleted');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    I.wait(1);
  },

  async formValidation() {
    I.click(this.button.create);
    I.say('Making sure Save is not available');
    I.dontSee(this.button.save);
    I.say('Checking the create page title/subtitle');
    I.see('Operator Setup');
    I.see('Configure operator settings to allow them to check in to production activities.');
    I.say('Checking suggestions under fields.');
    I.see('Site where operator is located');
    I.see('A unique identifier for employees');
    I.see('Shift name or number');
    I.see('Am optional category such as temp, contract etc');
    I.see('Additional Notes');
    I.say('Checking field hint text');
    I.see('Site');
    I.see('Employee Id');
    I.see('First Name');
    I.see('Last Name');
    I.see('Shift');
    I.see('Category');
    I.say('Attempting to save a person with only the site specified.');
    I.click(this.field.siteId);
    I.click(locate('li').withText('_qaIDN - Infinity North'));
    I.wait(3);
    I.click(this.button.save);
    I.see('The form is not valid. Please check for errors');
    I.see('id is a required field');
    I.see('firstName is a required field');
    I.see('lastName is a required field');
    I.see('shift is a required field');
    I.say('Validator validation successful');
  },

  // Column Filters
  filterById(value) {
    I.click(this.button.addFilter);
    I.click(this.filterList.id);
    I.fillField(this.field.filterId, value);
    I.wait(1);
  },

  filterByFirstName(value) {
    I.click(this.button.addFilter);
    I.click(this.filterList.firstName);
    I.fillField(this.field.filterFirstName, value);
    I.wait(1);
  },

  filterByLastName(value) {
    I.click(this.button.addFilter);
    I.click(this.filterList.lastName);
    I.fillField(this.field.filterLastName, value);
    I.wait(1);
  },

  filterByShift(value) {
    I.click(this.button.addFilter);
    I.click(this.filterList.shift);
    I.fillField(this.field.filterShift, value);
    I.wait(1);
  },

  filterByCategory(value) {
    I.click(this.button.addFilter);
    I.click(this.filterList.category);
    I.fillField(this.field.filterCategory, value);
    I.wait(1);
  },

  filterByCreatedBy(value) {
    I.click(this.button.addFilter);
    I.click(this.filterList.createdBy);
    I.fillField(this.field.filterCreatedBy, value);
    I.wait(1);
  },

  filterByUpdatedBy(value) {
    I.click(this.button.addFilter);
    I.click(this.filterList.updatedBy);
    I.fillField(this.field.filterUpdatedBy, value);
    I.wait(1);
  },

  clearFilterId() {
    I.click('button[title="Remove this filter"][data-key="id"]');
    I.wait(1);
  },

  clearFilterFirstName() {
    I.click('button[title="Remove this filter"][data-key="firstName"]');
    I.wait(1);
  },

  clearFilterLastName() {
    I.click('button[title="Remove this filter"][data-key="lastName"]');
    I.wait(1);
  },

  clearFilterShift() {
    I.click('button[title="Remove this filter"][data-key="shift"]');
    I.wait(1);
  },

  clearFilterCategory() {
    I.click('button[title="Remove this filter"][data-key="category"]');
    I.wait(1);
  },

  clearFilterCreatedBy() {
    I.click('button[title="Remove this filter"][data-key="createdby"]');
    I.wait(1);
  },

  clearFilterUpdatedBy() {
    I.click('button[title="Remove this filter"][data-key="updatedby"]');
    I.wait(1);
  },

  clearFilter() {
    I.click(this.button.removeFilter);
  },
}
