const { Helper } = codeceptjs;

class Browser extends Helper {

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


  /**
   * The following are custom functions that extend Puppeteer's functionality.  The intention
   * is that they will be generic/applicable to any test that may need them.  Functions
   * specific to a key area of the page should be defined in the appropriate page object.
   */

   // - can be added to function to controll the browser
   // const browser = this.helpers['Puppeteer'].browser;
  
  async waitAndClick(selector) {
    const { page } = this.helpers.Playwright;
    await page.waitForSelector(selector)
    await page.click(selector)
  }

  async waitAndType(selector, text) {
    const { page } = this.helpers.Playwright;
    await page.waitForSelector(selector)
    await page.type(selector, text)
  }

  async getText(selector) {
    const { page } = this.helpers.Playwright;
    await page.waitForSelector(selector)
    const text = await page.$eval(selector, (e) => e.innerHTML)
    return text
  }

  async getCount(selector) {
    const { page } = this.helpers.Playwright;
    await page.waitForSelector(selector)
    const count = await page.$$eval(selector, (items) => items.length)
    return count
  }

  async isElementVisible(selector) {
    const { page } = this.helpers.Playwright;
    let visible = true
    await page
      .waitForSelector(selector, { visible: true, timeout: 3000 })
      .catch(() => {
        visible = false
      })
    return visible
  }

  async elementShouldNotExist(selector) {
    const { page } = this.helpers.Playwright;
    await page.waitFor(() => !document.querySelector(selector), {
      timeout: 5000,
    })
  }

  async waitForXpathAndClick(xpath) {
    const { page } = this.helpers.Playwright;
    await page.waitForXPath(xpath)
    const elements = await page.$x(xpath)
    if (elements.length > 1) {
      console.log('More than one match for provided xpath.')
    }
    await elements[0].click()
  }

  async waitForXpathAndClickIndexOf(xpath, index) {
    const { page } = this.helpers.Playwright;
    await page.waitForXPath(xpath)
    const elements = await page.$x(xpath)
    await elements[index].click()
  }

  async waitForXpathAndType(xpath) {
    const { page } = this.helpers.Playwright;
    await page.waitForXPath(xpath)
    const elements = await page.$x(xpath)
    if (elements.length > 1) {
      console.log('More than one match for provided xpath.')
    }
    await elements[0].click()
  }

  async waitForXpathAndTypeIndexOf(xpath) {
    const { page } = this.helpers.Playwright;
    await page.waitForXPath(xpath)
    const elements = await page.$x(xpath)
    await elements[index].click()
  }

  async isXpathVisible(xpath) {
    const { page } = this.helpers.Playwright;
    let visible = true
    await page
      .waitForXPath(xpath, { visible: true, timeout: 3000 })
      .catch(() => {
        visible = false
      })
    return visible
  }

  async hoverMouse(element) {
    const { page } = this.helpers.Playwright;
    await page.hover(element)
  }
}

module.exports = Browser;
