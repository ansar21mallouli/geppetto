const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {ModuleCatalog} = require('../../selectors/BO/modules/modulesCatalog');
const {ModuleManager} = require('../../selectors/BO/modules/modulesManager');
const {Module} = require('../../selectors/BO/modules/module');
const modules = require('../common_scenarios/modules/moduleCatalog');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10681
 */

scenario('PR-10681: Check Js & css issues', () => {
  authentication.signInBO('10681');

  /** This scenario is based on the bug described in this Issue
   * https://github.com/PrestaShop/PrestaShop/issues/10676
   */
  scenario('Check the sort on Module catalog page', client => {
    test('should go to "Modules > Module Catalog" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.modules_menu);
      await client.waitForAndClick(Menu.Improve.Modules.modules_catalog_submenu, 2000);
    });
    test('should select "Increasing price" from the "Sort by" list then check results', async () => {
      await client.getTextInVar(ModuleCatalog.number_module_span, 'number_module', 0, {}, true);
      for (let j = 1; j <= parseInt(tab["number_module"]); j++) {
        await client.getTableField(ModuleCatalog.module_div, j);
      }
      await client.waitForAndSelect(ModuleCatalog.sort_by_list, 'price');
      for (let j = 1; j <= parseInt(tab["number_module"]); j++) {
        await client.getTableField(ModuleCatalog.module_div, j, true);
      }
      await client.checkSortTable();
    });
    test('should select "Decreasing price" from the "Sort by" list then check results', async () => {
      await client.waitForAndSelect(ModuleCatalog.sort_by_list, 'price-desc');
      for (let j = 1; j <= parseInt(tab["number_module"]); j++) {
        await client.getTableField(ModuleCatalog.module_div, j, true);
      }
      await client.checkSortTable(false);
    });
  }, 'modules/moduleCatalog');

  /** This scenario is based on the bug described in this Issue
   * https://github.com/PrestaShop/PrestaShop/issues/10661
   */
  scenario('Check the filter by category in module catalog page', client => {
    test('should go to "Modules > Module Catalog" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.modules_menu);
      await client.waitForAndClick(Menu.Improve.Modules.modules_catalog_submenu, 2000);
    });
    test('should select the first element from "Categories" filter list', async () => {
      await client.waitForAndClick(Module.category_filter_list);
      await client.waitForAndClick(Module.category_filter_element.replace("%ID", 2));
      await client.getTextInVar(ModuleCatalog.number_module_span, 'first_number_module', 0, {}, true);
      await client.waitForAndClick(Module.category_filter_list);
      await client.checkTextValue(Module.category_filter_element_span.replace("%ID", 2), tab['first_number_module']);
    });
  }, 'common_client');

  /** This scenario is based on the bug described in this Issue
   * https://github.com/PrestaShop/PrestaShop/issues/10663
   */
  scenario('Check bulk actions on "Module Manager" page', client => {
    test('should go to "Modules > Module Manager" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.modules_menu);
      await client.waitForAndClick(Menu.Improve.Modules.modules_services_submenu);
    });
    test('should click on checkboxes related to "Best vouchers" and "Shop search" modules', async () => {
      await client.waitForAndClick(ModuleManager.module_checkbox.replace("%B", "statsbestvouchers"));
      await client.waitForAndClick(ModuleManager.module_checkbox.replace("%B", "statssearch"));
    });
    test('should select "Disable" from "Bulk actions" list', () => client.clickOnAction(ModuleManager.bulk_actions_list, ModuleManager.bulk_actions_element.replace("%B", "bulk-disable"), ModuleManager.bulk_action_confirm_yes_button));
    test('should verify the appearance of two green validations', async () => {
      await client.waitFor(ModuleManager.validation_msg_panel.replace("%ID", 1));
      await client.waitFor(ModuleManager.validation_msg_panel.replace("%ID", 2));
    });
    test('should select "Enable" from "Bulk actions" list', () => client.clickOnAction(ModuleManager.bulk_actions_list, ModuleManager.bulk_actions_element.replace("%B", "bulk-enable"), ModuleManager.bulk_action_confirm_yes_button));
    test('should verify the appearance of two green validations', async () => {
      await client.waitFor(ModuleManager.validation_msg_panel.replace("%ID", 1));
      await client.waitFor(ModuleManager.validation_msg_panel.replace("%ID", 2));
    });
    test('should select "Reset" from "Bulk actions" list', () => client.clickOnAction(ModuleManager.bulk_actions_list, ModuleManager.bulk_actions_element.replace("%B", "bulk-reset"), ModuleManager.bulk_action_confirm_yes_button));
    test('should verify the appearance of two green validations', async () => {
      await client.waitFor(ModuleManager.validation_msg_panel.replace("%ID", 1));
      await client.waitFor(ModuleManager.validation_msg_panel.replace("%ID", 2));
    });
    test('should select "Disable Mobile" from "Bulk actions" list', () => client.clickOnAction(ModuleManager.bulk_actions_list, ModuleManager.bulk_actions_element.replace("%B", "bulk-disable-mobile"), ModuleManager.bulk_action_confirm_yes_button));
    test('should verify the appearance of two green validations', async () => {
      await client.waitFor(ModuleManager.validation_msg_panel.replace("%ID", 1));
      await client.waitFor(ModuleManager.validation_msg_panel.replace("%ID", 2));
    });
    test('should select "Enable Mobile" from "Bulk actions" list', () => client.clickOnAction(ModuleManager.bulk_actions_list, ModuleManager.bulk_actions_element.replace("%B", "bulk-enable-mobile"), ModuleManager.bulk_action_confirm_yes_button));
    test('should verify the appearance of two green validations', async () => {
      await client.waitFor(ModuleManager.validation_msg_panel.replace("%ID", 1));
      await client.waitFor(ModuleManager.validation_msg_panel.replace("%ID", 2));
    });
    test('should select "Uninstall" from "Bulk actions" list', () => client.clickOnAction(ModuleManager.bulk_actions_list, ModuleManager.bulk_actions_element.replace("%B", "bulk-uninstall"), ModuleManager.bulk_action_confirm_yes_button));
    test('should verify the appearance of two green validations', async () => {
      await client.waitFor(ModuleManager.validation_msg_panel.replace("%ID", 1));
      await client.waitFor(ModuleManager.validation_msg_panel.replace("%ID", 2));
    });
  }, 'modules/moduleManager');
  modules.installModule('statsbestvouchers');
  modules.installModule('statssearch');

  /** This scenario is based on the bug described in this Issue
   * https://github.com/PrestaShop/PrestaShop/issues/10665
   */
  scenario('Upload a module then configure it', client => {
    test('should go to "Modules > Module Manager" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.modules_menu);
      await client.waitForAndClick(Menu.Improve.Modules.modules_services_submenu);
    });
    test('should click on "Upload a module" button', () => client.waitForAndClick(Module.upload_module_button));
    test('should upload zip file', () => client.uploadFile(ModuleManager.file_input, dataFileFolder, "paypal.zip"));
    test('should click on "Configure" button', () => client.waitForAndClick(Module.configure_button, 5000));
    test('should check that we are redirected to configure page', () => client.checkTextValue(ModuleManager.title_configure_page, "Configure"));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
