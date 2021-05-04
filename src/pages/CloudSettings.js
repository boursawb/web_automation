const { I } = inject();

module.exports = {

  // insert your locators and methods here
  button: {
    save: 'button[aria-label="Save"]',
    palletTracker: 'a[href="#/cloudsettings/palletTracker"]',
  },

  field: {
    retainDays: '#retainDays',
    retainHours: '#retainHours',
  },

  text: {
    mainPageTitle: 'Infinity Production Tracker Cloud Settings',
    funcTitle: 'Pallet Tracker',
    funcSubtitle: 'Settings related to the pallet tracking stations',
    rowsText: 'Rows per page:',
  },

  validatePageText() {
    I.see(this.text.mainPageTitle);
    I.see(this.text.rowsText);
  },

  validatePalletTrackerForm() {
    I.click(this.button.palletTracker);
    I.see(this.text.funcTitle);
    I.see(this.text.funcSubtitle);
    I.seeElement(this.field.retainDays);
    I.seeElement(this.field.retainHours);
    I.seeElement(this.button.save);
  },

  async getRetainDays() {
    const days = await I.grabValueFrom(this.field.retainDays);
    return days;
  },

  async getRetainHours() {
    const hours = await I.grabValueFrom(this.field.retainHours);
    return hours;
  },
}
