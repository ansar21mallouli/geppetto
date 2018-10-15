const {Module} = require('../../../selectors/BO/modules/module');
module.exports = {
  async checkModuleButton() {
    scenario('Check "Upload module" & "Connect to Addons marketplace" buttons', client => {
      test('should click on "Upload a module" button', () => client.waitForAndClick(Module.upload_module_button));
      test('should click close icon', () => client.waitForAndClick(Module.close_modal_upload_icon, 1000));
      test('should click on "Connect to Addons marketplace" button', () => client.waitForAndClick(Module.connect_addons_button, 1000));
      test('should check the existence of "Email" input', () => client.waitFor(Module.email_input));
      test('should click close icon', () => client.waitForAndClick(Module.close_modal_addons_icon, 1000));
    }, 'common_client');
  }
};
