const { Helper } = codeceptjs;

class Table extends Helper {
  // before/after hooks
  /**
   * @protected
   */
  _before() {
    // remove if not used
  }

  /**
   * @protected
   */
  _after() {
    // remove if not used
  }

  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']

  /**
   * Get the total rows displayed in a table contained within
   * the table body (tbody tr)
   */
  async getRowCount() { 
    //const browser = this.helpers['Puppeteer'].browser;
    const { page } = this.helpers.Playwright;

    await page.waitForSelector('tbody');
    const tableRows = 'tbody tr';
    let rowCount = await page.$$eval(tableRows, rows => rows.length);
    return rowCount;    
  }

  /**
   * When a table is present on the page, will check the box
   * in column 1 of the header row to select all items listed on 
   * the current table page (could be more than one page full)
   */
  async selectAll() {
    const { page } = this.helpers.Playwright;
    await page.waitForSelector('thead tr th:nth-child(1)');
    await page.click('thead tr th:nth-child(1)');
  }

  /**
   * Checks the box in column 1 for the row containing the value
   * passed in (val), where that value exists in column (col)
   * @param {string} val The value you are looking for 
   * @param {number} col Which column the value will be in
   */
  async selectRow(val, col) {
    const { page } = this.helpers.Playwright;

    await page.waitForSelector('tbody');
    const tableRows = 'tbody tr';
    let rowCount = await page.$$eval(tableRows, rows => rows.length);

    for (let i = 0; i < rowCount; i++) {
      const str = await page.$eval(
        `${tableRows}:nth-child(${i + 1}) td:nth-child(${col})`,
        (e) => e.innerText
      )
      if (str === val) {
        await page.waitForSelector(`${tableRows}:nth-child(${i + 1}) td:nth-child(1)`);
        await page.click(`${tableRows}:nth-child(${i + 1}) td:nth-child(1)`);
        break;
      }
    }
  }

  /**
   * Will iterate through all rows displayed in the table and check the box
   * in column 1 for each row where the value in colum (col) matches.
   * @param {string} val The value passed in to look for
   * @param {number} col The column to find the value in
   */
  async selectAllRows(val, col) {
    const { page } = this.helpers.Playwright;

    await page.waitForSelector('tbody');
    const tableRows = 'tbody tr';
    let rowCount = await page.$$eval(tableRows, rows => rows.length);

    for (let i = 0; i < rowCount; i++) {
      const str = await page.$eval(
        `${tableRows}:nth-child(${i + 1}) td:nth-child(${col})`,
        (e) => e.innerText
      )
      if (str.includes(val)) {
        await page.waitForSelector(`${tableRows}:nth-child(${i + 1}) td:nth-child(1)`);
        await page.click(`${tableRows}:nth-child(${i + 1}) td:nth-child(1)`);
        continue;
      }
    }
  }

  /**
   * Locates the row containing the value passed in, in the
   * specified column (col)
   * @param {string} val Value passed in to look for in each row
   * @param {number} col The column to look for the value in
   */
  async editRow(val, col) {
    const { page } = this.helpers.Playwright;

    await page.waitForSelector('tbody');
    const tableRows = 'tbody tr';
    let rowCount = await page.$$eval(tableRows, rows => rows.length);

    for (let i = 0; i < rowCount; i++) {
      const str = await page.$eval(
        `${tableRows}:nth-child(${i + 1}) td:nth-child(${col})`,
        (e) => e.innerText
      )
      if (str === val) {
        await page.waitForSelector(`${tableRows}:nth-child(${i + 1}) td:nth-child(1)`);
        await page.click(`${tableRows}:nth-child(${i + 1}) td:nth-child(${col})`);
        break;
      }
    }
  }
}

module.exports = Table;
