const { I, navFragment, peoplePage, sitesPage, stationsPage } = inject();

module.exports = {
  async clearQaPeople() {
    await navFragment.gotoPeople();
    await peoplePage.filterById("_qa");
    if ((await this.filterResults()) > 0) {
      await this.deleteFiltered();
      I.assertEqual(
        await this.filterResults(),
        0,
        "All _qa people removed successfully"
      );
    }
    await peoplePage.clearFilter();
  },

  async clearQaStations() {
    await navFragment.gotoStations();
    await stationsPage.filterById("_qa");
    if ((await this.filterResults()) > 0) {
      await this.deleteFiltered();
      I.assertEqual(
        await this.filterResults(),
        0,
        "All _qa stations removed successfully"
      );
    }
    await stationsPage.clearFilter();
  },

  async clearQaSites() {
    await navFragment.gotoSites();
    await sitesPage.filterById("_qa");
    if ((await this.filterResults()) > 0) {
      await this.deleteFiltered();
      I.assertEqual(
        await this.filterResults(),
        0,
        "All _qa sites removed successfully"
      );
    }
    await sitesPage.clearFilter();
  },

  async filterResults() {
    let rowResults = 0;

    // Are there filtered rows to delete?
    const tableIsVisible = await I.isElementVisible("tbody tr");

    if (tableIsVisible) {
      rowResults = await I.getRowCount();
      return rowResults;
    }
    return rowResults;
  },

  /**
   * Removes all sites from the system specific to the QA process
   * prior to running any site related tests (as required)
   */
  async deleteFiltered() {
    // Are there filtered rows to delete?

    const tableIsVisible =
      (await I.grabNumberOfVisibleElements("tbody tr")) > 0;
    // If no filtered rows, msg === 'No results found'
    const msgVisible =
      (await I.grabNumberOfVisibleElements("p:nth-child(1)")) > 0;

    if (msgVisible) {
      I.say("No test records to delete.");
    } else if (tableIsVisible) {
      I.selectAll();
      I.click('button[aria-label="Delete"]');
      I.see(" deleted");
      I.waitForInvisible(".MuiSnackbar-root", 5);
      I.wait(1);
    }
  },

  async generatePressjobs(count) {
    const fs = require("fs");
    const path = require("path");
    const sourceDirectoryPath = path.join(__dirname, "../data/pjo/in/");
    // const destDirectoryPath = path.join(__dirname, "../data/pjo/out/");
    const uncDirectoryPath = '\\\\10.28.1.175\\idf\\sdkevents\\IPT_PressJobs_JSON\\';

    for (i = 0; i < count; i++) {
      // read file and make object
      let content = JSON.parse(
        fs.readFileSync(sourceDirectoryPath + "source.json")
      );

      // Get current date and convert to required format for json file
      let isoUtc = new Date();
      let isoLocal = await this.toISOLocal(isoUtc);
      let fileNameTimeStamp = await this.getFileNameDate(isoUtc);

      // Get current hour and minute for DPI time stamp
      let dpiDate = new Date;
      let hour = dpiDate.getHours();
      let minute = dpiDate.getMinutes();
      dpiStamp = hour + '' + minute;

      // update attributes in the json obj
      content.batchid = `80-0000${i}`;
      content.id = `80-0000${i}-10035-tcard-${dpiStamp}-0101010000_.pdf`
      content.jobUniqueId = `80-0000${i}-10035-tcard-${dpiStamp}-0101010000_.pdf`
      content.name = `80-0000${i}-8.5x11CALJEF-CalBody-${dpiStamp}-01010100${i}_.pdf`;
      content.printingStart = isoLocal;
      content.printingEnd = isoLocal;

      // write the file
      fs.writeFileSync(
        uncDirectoryPath + `80-0000${i}-SOME-JOB-NAME-${dpiStamp}.pdf_Press Job printing end_${fileNameTimeStamp}.json`,
        JSON.stringify(content)
      );
    }
  },

  /**
   * Takes the date from the json file and converts to iso UTC date object
   * then returns a string in local time that matches the string format used
   * in the IPT json files
   * @param {*} d Date passed into function
   */
  async toISOLocal(d) {
    I.say("Made it to the date function");
    var z = (n) => ("0" + n).slice(-2);
    var zz = (n) => ("00" + n).slice(-3);
    var off = d.getTimezoneOffset();
    var sign = off < 0 ? "+" : "-";
    off = Math.abs(off);

    return (
      d.getFullYear() +
      "-" +
      z(d.getMonth() + 1) +
      "-" +
      z(d.getDate()) +
      "T" +
      z(d.getHours()) +
      ":" +
      z(d.getMinutes()) +
      ":" +
      z(d.getSeconds()) +
      sign +
      z((off / 60) | 0) +
      ":" +
      z(off % 60)
    );
  },

  async getFileNameDate(d) {
    I.say("Made it to the date function");
    var z = (n) => ("0" + n).slice(-2);
    var zz = (n) => ("00" + n).slice(-3);
    var off = d.getTimezoneOffset();
    var sign = off < 0 ? "+" : "-";
    off = Math.abs(off);

    return (
      z(d.getMonth() + 1) +
      "_" +
      z(d.getDate()) +
      "_" +
      d.getFullYear().toString().substr(-2) +
      "-" +
      z(d.getHours()) +
      "_" +
      z(d.getMinutes()) +
      "_" +
      z(d.getSeconds()) +
      "_" + 'PM'
      // zz(d.getMilliseconds()) +
      // sign +
      // z((off / 60) | 0) +
      // "_" +
      // z(off % 60)
    );
  },
};
