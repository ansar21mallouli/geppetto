const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const commonModule = require('../common_scenarios/modules/module');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10601
 */
scenario('PR-10601: Check "Upload module" & "Connect to Addons marketplace" buttons in the "Module Catalog page" & "Module Manager" pages', () => {
  authentication.signInBO('10601');
  scenario('Go to Module Catalog page', client => {
    test('should go to "Modules > Module Catalog" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.modules_menu);
      await client.waitForAndClick(Menu.Improve.Modules.modules_catalog_submenu, 2000);
    });
  }, 'common_client');
  commonModule.checkModuleButton();
  scenario('Go to Module Manager page', client => {
    test('should go to "Modules > Module Manager" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.modules_menu);
      await client.waitForAndClick(Menu.Improve.Modules.modules_services_submenu, 1000);
    });
  }, 'common_client');
  commonModule.checkModuleButton();
  authentication.signOutBO();
}, 'common_client', true);
