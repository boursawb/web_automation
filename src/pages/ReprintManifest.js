const { I } = inject();

module.exports = {
  // Reprint manifest elements
  printManifest: {
    button: {
    
    },

    field: {
      search: 'input[placeholder="Search"]',
    },

    table: {
      colActions: locate('th').withText('Actions'),
      colActions: locate('th').withText('Id'),
      colActions: locate('th').withText('Press'),
      colActions: locate('th').withText('Pallet Id'),
      colActions: locate('th').withText('Loaded'),
      colActions: locate('th').withText('Unloaded'),
      colActions: locate('th').withText('Jobs Count'),
    },
  
    text: {
      title: 'Print Manifest',
      subtitle: 'Choose a pallet manifest to print',
      tableTitle: 'Pallet Manifests',
    },
  },
  
  validatePrintManifest () {
    I.see(this.printManifest.text.title);
    I.see(this.printManifest.text.subtitle);
    I.see(this.printManifest.text.tableTitle);
  },
};
