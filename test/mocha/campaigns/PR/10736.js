const authentication = require('../common_scenarios/authentication');
const {ModuleManager} = require('../../selectors/BO/modules/moduleManager');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');
const {CommonBO} = require('../../selectors/BO/commonBO');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10736
 */
scenario('PR-10736: Check the quick access links', () => {
  authentication.signInBO('10736');
  scenario('Check links "new product" and "manage module" from quick access links', client => {
    test('should click on "Quick Access" button', () => client.waitForAndClick(CommonBO.quick_access_button));
    test('should click on "Installed modules" link', () => client.waitForAndClick(CommonBO.quick_access_link.split('%B').join(2)));
    test('should check that "Modules" tab is existing', () => client.waitFor(ModuleManager.module_tab));
    test('should click on "Quick Access" button', () => client.waitForAndClick(CommonBO.quick_access_button));
    test('should click on "New product" link', () => client.waitForAndClick(CommonBO.quick_access_link.split('%B').join(4)));
    test('should check that product name input is existing', () => client.waitFor(AddProduct.Basic_settings.name_input));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
