const { I } = inject();

module.exports = {
  // Pallet not loaded elements
  palletNotLoaded: {
    button: {
      loadPallet: locate('button').withText('Load Pallet'),
    },
    text: {
      title: 'Pallet Not Loaded',
      subtitle: 'Scan a pallet and click below to load.',
      legendOperatorId: 'Checked out, scan or enter a valid id',
      legendPalletId: 'Scan a pallet barcode',
    },
    field: {
      operatorId: 'input[name="loadOperatorId"]',
      palletId: 'input[name="palletId"]',
    },
  },
  // Pallet is loaded elements
  palletIsLoaded: {
    button: {
      summary: locate('button').withText('Summary').as('Summary'),
      jobs: locate('button').withText('Jobs').as('Jobs'),
      cancel: locate('button').withText('Cancel').as('Cancel'),
      unloadPallet: locate('button').withText('Unload Pallet').as('Unload'),
    },
    text: {
      title: 'Pallet Is Loaded',
      subtitle:
        'Printed jobs will be associated with this pallet. Click unload pallet to start another.',
      headerPalletId: 'Pallet Id',
      headerStationId: 'Station Id',
      headerLoadTime: 'Pallet Load Time',
      headerOperator: 'Pallet Load Operator',
      headerTotalJobs: 'Total Jobs In Pallet',
      headerTotalSpreads: 'Total Spreads In Pallet',
      headerLastJob: 'Last Job',
    },
  },
  // Unload pallet elements
  palletUnload: {
    button: {
      finishAndPrint: locate('button').withText('Finish And Print Manifest').as('Finish and print'),
      cancelKeepLoading: locate('button').withText('Cancel And Keep Building').as('Cancel and build'),
    },
    text: {
      title: 'Unload Pallet',
      subtitle: 'Unload pallet and print manifest',
      labelPrintOn: locate('label').withText('Print Manifest On').as('PrintOn label'),
      labelOpId: locate('label').withText('Operator Id').as('Operator Id label'),
      labelCheckbox: 'Download Designer Data',
    },
    field: {
      unloadPallet: 'input[name="stationId"]',
      operatorId: 'input[name="unloadOperatorId"]',
    },
    list: {
      printOn: 'list[data-value="IDH - Fast"]',
    },
    checkbox: {
      downloadDesigner: 'input[type="checkbox"]',
    },
  },

  async cancelIfLoaded() {
    let h1Text = await I.grabTextFrom('h1');
    if (h1Text.includes('Pallet Is Loaded')) {
      I.click(this.palletIsLoaded.button.cancel);
    } else {
      return;
    }
  },
  
  async validatePalletNotLoaded() {
    I.see(this.palletNotLoaded.text.title);
    I.see(this.palletNotLoaded.text.subtitle);
    I.see(this.palletNotLoaded.text.legendOperatorId);
    I.see(this.palletNotLoaded.text.legendPalletId);
    I.wait(1);
  },

  validatePalletIsLoaded() {
    I.see(this.palletIsLoaded.text.title);
    I.see(this.palletIsLoaded.text.subtitle);
    I.see(this.palletIsLoaded.text.headerPalletId);
    I.see(this.palletIsLoaded.text.headerStationId);
    I.see(this.palletIsLoaded.text.headerLoadTime);
    I.see(this.palletIsLoaded.text.headerOperator);
    I.see(this.palletIsLoaded.text.headerTotalJobs);
    I.see(this.palletIsLoaded.text.headerTotalSpreads);
    I.see(this.palletIsLoaded.text.headerLastJob);
    I.wait(2);
  },

  validateUnloadPallet() {
    I.see(this.palletUnload.text.title);
    I.see(this.palletUnload.text.subtitle);
    I.see(this.palletUnload.text.labelPrintOn);
    I.see(this.palletUnload.text.labelOpId);
    I.see(this.palletUnload.text.labelCheckbox);
    I.wait(2);
  },

  validatePalletPrinted() {
    // Not a great check.  Have not been able to find a better way to show success, yet
    I.waitForInvisible('form', 5);
  },

  loadPallet(opId, palId) {
    I.clearField(this.palletNotLoaded.field.operatorId, opId);
    I.fillField(this.palletNotLoaded.field.operatorId, opId);
    I.fillField(this.palletNotLoaded.field.palletId, palId);
    I.click(this.palletNotLoaded.button.loadPallet);
    I.wait(2);
  },

  unloadPallet(station) {
    I.click(this.palletIsLoaded.button.unloadPallet);
    I.clearField(this.palletUnload.field.operatorId);
    I.fillField(this.palletUnload.field.operatorId, '12398755');
    I.click(this.palletUnload.button.finishAndPrint);
  },
};
