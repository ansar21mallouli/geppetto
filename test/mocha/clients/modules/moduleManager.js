let CommonClient = require('../common_client');

class ModuleManager extends CommonClient {

  async getCategoryNumber(selector) {
    const numberCategory = await page.$eval(selector, (el, className) => el.getElementsByClassName(className).length, 'module-category-menu');
    global.numberCategory = numberCategory;
  }

  async getCategoryName(selector) {
    const categoryName = await page.$eval(selector, el => el.innerText);
    global.categoryName = categoryName;
  }

  async getNumberModuleByCategory(selector) {
    const numberModule = await page.$eval(selector, el => el.innerText);
    global.numberModule = numberModule;
  }

  async getDataTechName(selector) {
    const datatechname = await page.$eval(selector, (el, attribute) => el.getAttribute(attribute), 'data-tech-name');
    global.dataTechName = datatechname;
  }

  async getModuleButtonText(selector) {
    const buttonText = await page.$eval(selector, el => el.innerText);
    global.buttonText = buttonText.toUpperCase();
  }

  async checkConfigureButton(selector, buttonText) {
    if (buttonText !== "CONFIGURE") {
      await this.isNotExisting(selector);
    }
  }


}

module.exports = ModuleManager;
