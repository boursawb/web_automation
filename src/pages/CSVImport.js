const { I } = inject();

module.exports = {

  // insert your locators and methods here
  button: {
    import: locate('button').withText('Import CSV File'),
  },

  text: {
    title: 'Operator Bulk CSV Import',
    body1: 'Import operators in bulk using a CSV file.',
    body2: 'An example CSV file can be generated from the list of operators, using the export button.',
    body3: 'Note that previously existing records will not be overwritten.',  
  },

  basicPageValidation() {
    I.see(this.text.title);
    I.see(this.text.body1);
    I.see(this.text.body2);
    I.see(this.text.body3);
    I.seeElement(this.button.import);
  }
}
