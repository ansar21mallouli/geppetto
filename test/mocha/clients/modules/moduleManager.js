let CommonClient = require('../common_client');

class ModuleManager extends CommonClient {

  async clickOnAction(selector_list, selector_element, selector_button) {
    await this.waitForAndClick(selector_list,1500);
    await this.waitForAndClick(selector_element);
    await this.waitForAndClick(selector_button,1000);
    await this.waitFor(2000);
  }

}

module.exports = ModuleManager;
