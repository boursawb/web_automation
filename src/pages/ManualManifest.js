const { I } = inject();

module.exports = {

  // insert your locators and methods here
  button: {
    // button: 'click',

  },

  field: {
    // id: '#id',

  },

  text: {
    mainPageTitle: 'Infinity Production Tracker',
    funcTitle: 'Manual Create Pallet Manifest',
    funcSubtitle: 'Enter pallet information to manually create a manifes',
  },

  validatePageText() {
    I.see(this.text.mainPageTitle);
    I.see(this.text.funcTitle);
    I.see(this.text.funcSubtitle);
  }
}
