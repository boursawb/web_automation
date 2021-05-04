const { I } = inject();

module.exports = {

  // insert your locators and methods here
  button: {
    refreshPage: 'Refresh',
    refreshJobs: '.MuiFab-sizeSmall',
  },

  text: {
    title: 'Station -',
    subTitle: 'Recently Printed Jobs (last 24 hours)',
    timer: 'Next refresh in ',
  },

  validatePageText() {
    I.see(this.text.title);
    I.see(this.text.subTitle);
    I.hoverMouse(this.button.refreshJobs);
    I.wait(1);
    I.see(this.text.timer); 
  },

}
