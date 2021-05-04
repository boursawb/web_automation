const { I } = inject();

module.exports = {

  // insert your locators and methods here
  button: {
    save: 'Save',
  },

  field: {
    stationId: '#stationId',

  },

  list: {
    station: 'li[data-value="IDH - Fast"',
  },

  text: {
    mainPageTitle: 'Infinity Production Tracker Station Association',
    funcTitle: 'Station Identity',
    funcSubtitle: 'Associate this physical station with a station configured in the system',
    selectionSubtext: 'Choose a station',
  },

  validatePageText() {
    I.see(this.text.mainPageTitle);
    I.see(this.text.funcTitle);
    I.see(this.text.funcSubtitle);
    I.see(this.text.selectionSubtext);
  },

  async setStationIDHFast() {
    I.click(this.field.stationId);
    I.click(this.list.station);
    I.click(this.button.save);
    I.see('Element updated');
    I.waitForInvisible('.MuiSnackbar-root', 5);
    I.wait(1);
  }
}
