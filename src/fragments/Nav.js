const { I } = inject();

module.exports = {
  // Navigation drawer locators
  item: {
    dashboard: 'Dashboard',
    admin: 'li[id="resources.admin.name"]',
    permissions: 'a[id="user-claims"]',
    sites: 'a[id="site"]',
    reportTemplates: 'a[id="reporttemplates"]',
    stations: 'a[id="station"]',
    cloudSettings: 'a[id="cloudsettings"]',
    csvImport: 'a[id="importCsv"]',
    supervisor: 'li[id="resources.supervisor.name"]',
    people: 'a[id="people"]',
    supervisorPressPallets: 'a[id="presspalletbuilder"]',
    stationIdentity: 'a[id="stationadopt"]',
    operator: 'li[id="resources.operator.name"]',
    palletBuilder: 'a[id="operatorPalletBuilder"]',
    reprintManifest: 'a[id="operatorPalletReprint"]',
    manualPalletCreate: 'a[id="operatorManualPallet"]',
  },

  // Methods to access nav drawer menu items
  async gotoDashboard() {
    I.click(this.item.dashboard);
  },

  async gotoPermissions() {
    let isVisible = await I.grabNumberOfVisibleElements(this.item.permissions) > 0;
    if (isVisible) {
      I.click(this.item.permissions);
    } else {
      I.click(this.item.admin);
      I.click(this.item.permissions);
    };
  },

  async gotoSites() {
    let isVisible = await I.grabNumberOfVisibleElements(this.item.sites) > 0;
    if (isVisible) {
      I.click(this.item.sites);
    } else {
      I.click(this.item.admin);
      I.click(this.item.sites);
    };
  },

  async gotoReportTemplates() {
    let isVisible = await I.grabNumberOfVisibleElements(this.item.reportTemplates) > 0;
    if (isVisible) {
      I.click(this.item.reportTemplates);
    } else {
      I.click(this.item.admin);
      I.click(this.item.reportTemplates);
    };    
  },

  async gotoStations() {
    let isVisible = await I.grabNumberOfVisibleElements(this.item.stations) > 0;
    if (isVisible) {
      I.click(this.item.stations);
    } else {
      I.click(this.item.admin);
      I.click(this.item.stations);
    };
  },

  async gotoCloudSettings() {
    let isVisible = await I.grabNumberOfVisibleElements(this.item.cloudSettings) > 0;
    if (isVisible) {
      I.click(this.item.cloudSettings);
    } else {
      I.click(this.item.admin);
      I.click(this.item.cloudSettings);
    };
  },

  async gotoCSVImport() {
    let isVisible = await I.grabNumberOfVisibleElements(this.item.csvImport) > 0;
    if (isVisible) {
      I.click(this.item.csvImport);
    } else {
      I.click(this.item.admin);
      I.click(this.item.csvImport);
    };
  },

  async gotoPeople() {
    let isVisible = await I.grabNumberOfVisibleElements(this.item.people) > 0;
    if (isVisible) {
      I.click(this.item.people);
    } else {
      I.click(this.item.supervisor);
      I.click(this.item.people);
    };
  },

  async gotoStationIdentity() {
    let isVisible = await I.grabNumberOfVisibleElements(this.item.stationIdentity) > 0;
    if (isVisible) {
      I.click(this.item.stationIdentity);
    } else {
      I.click(this.item.supervisor);
      I.click(this.item.stationIdentity);
    }
  },

  async gotoPalletBuilder() {
    let isVisible = await I.grabNumberOfVisibleElements(this.item.palletBuilder) > 0;
    if (isVisible) {
      I.click(this.item.palletBuilder);
    } else {
      I.click(this.item.operator);
      I.click(this.item.palletBuilder);
    };
  },

  async gotoReprintManifest() {
    let isVisible = await I.grabNumberOfVisibleElements(this.item.reprintManifest) > 0;
    if (isVisible) {
      I.click(this.item.reprintManifest);
    } else {
      I.click(this.item.operator);
      I.click(this.item.reprintManifest);
    };
  },

  async gotoManualManifest() {
    let isVisible = await I.grabNumberOfVisibleElements(this.item.manualPalletCreate) > 0;
    if (isVisible) {
      I.click(this.item.manualPalletCreate);
    } else {
      I.click(this.item.operator);
      I.click(this.item.manualPalletCreate);
    };
  },

  expandSupervisor() {
    I.click(this.item.supervisor);
  },

  expandOperator() {
    I.click(this.item.operator);
  },

  expandAdmin() {
    I.click(this.item.admin);
  },
};
