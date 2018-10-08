const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {LogsPage} = require('../../selectors/BO/advancedParameters/logsPage');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10857
 */
scenario('PR-10857: Check the "Help" button in the logs page', () => {
  authentication.signInBO('10857');
  scenario('Check that the "Help" button successfully work', client => {
    test('should go to "Advanced Parameters > Logs" page', async () => {
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.advanced_parameters_menu);
      await client.waitForAndClick(Menu.Configure.AdvancedParameters.logs_submenu);
    });
    test('should click on "Help" button', () => client.waitForAndClick(LogsPage.help_button));
    test('should check that the "Help" sidebar is well opened', () => client.waitFor(LogsPage.close_sidebar_button));
    test('should click on "Close" button of sidebar', () => client.waitForAndClick(LogsPage.close_sidebar_button));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
