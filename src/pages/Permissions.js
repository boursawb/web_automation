const { I } = inject();

module.exports = {

  // insert your locators and methods here
  button: {
    export: 'Export',
    admin: '#admin',
    supervisor: '#supervisor',
    operator: '#operator',
    save: 'Save',
    addFilter: 'button[aria-label="Add filter"]',
  },

  filter: {
    item: {
      name: 'li[data-key="name"]',
    },
    field: {
      name: '#name',
    }
    
  },

  text: {
    title: 'Infinity Production Tracker Permissions',
    rowsPerPageText: 'Rows per page:',
    changePermissionTitle: 'User Permissions',
    changePermissionsSubtitle: 'Change user permissions to allow access to different actions',
  },

  editUser(email) {
    I.editRow(email, 2);
  },

  filterByName(value) {
    I.click(this.button.addFilter);
    I.click(this.filter.item.name);
    I.fillField(this.filter.field.name, value);
    I.wait(2);
  },
  
  clearFilterName() {
    I.click('button[title="Remove this filter"][data-key="name"]');
    I.wait(1);
  },
};
