const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {Module} = require('../../selectors/BO/modules/module');
const {ModuleManager} = require('../../selectors/BO/modules/modulesManager');
const {CommonBO} = require('../../selectors/BO/commonBO');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10726
 */
scenario('PR-10726: Check search display, check Theme modules and My Other when they are empty and check configure button in Module Manager page', () => {
  authentication.signInBO('10726');

  /** This scenario is based on the bug described in this Issue
   * https://github.com/PrestaShop/PrestaShop/issues/10690
   */
  scenario('Check search display', client => {
    test('should go to "Modules > Module Manager" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.modules_menu);
      await client.waitForAndClick(Menu.Improve.Modules.modules_services_submenu);
    });
    test('should set input module search to "ps_banner" ', () => client.waitForAndType(Module.search_module_input, "ps_banner"));
    test('should click on search button', () => client.waitForAndClick(Module.search_button));
    test('should check the visibility of Banner module', () => client.waitFor(ModuleManager.module_description_block.replace("%B", "ps_banner"), {visible: true}));
  }, 'common_client');

  /** This scenario is based on the bug described in this Issue
   * https://github.com/PrestaShop/PrestaShop/issues/10720
   */
  scenario('Check existence of "Theme modules" & "Other" in Module Manager page', client => {
    test('should go to "Modules > Module Manager" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.modules_menu);
      await client.waitForAndClick(Menu.Improve.Modules.modules_services_submenu);
    });
    test('should close symfony toolbar', async () => {
      await client.isVisible(CommonBO.symfony_toolbar_close_button, 2000);
      if (global.visible) {
        await client.waitForAndClick(CommonBO.symfony_toolbar_close_button);
      }
    });
    test('check if "Theme modules" & "Other" categories exist with any module', async () => {
      await client.waitForAndClick(Module.category_filter_list);
      await client.getCategoryNumber(Module.category_list);
      for (let i = 3; i <= (numberCategory + 1); i++) {
        await client.getCategoryName(Module.category_filter_element.replace("%ID", i));
        if (categoryName.includes("Theme Modules") || categoryName.includes("Other")) {
          await client.checkTextValue(Module.category_filter_element_span.replace("%ID", i), '0', 'notequal')
        }
      }
    });
  }, 'modules/moduleManager');

  /** This scenario is based on the bug described in this Issue
   * https://github.com/PrestaShop/PrestaShop/issues/10688
   */
  scenario('Check configure button in "Module Manager" page', client => {
    test('should go to "Modules > Module Manager" page', async () => {
      await client.waitForAndClick(Menu.Improve.Modules.modules_menu);
      await client.waitForAndClick(Menu.Improve.Modules.modules_services_submenu);
    });
    test('should close symfony toolbar', async () => {
      await client.isVisible(CommonBO.symfony_toolbar_close_button, 2000);
      if (global.visible) {
        await client.waitForAndClick(CommonBO.symfony_toolbar_close_button);
      }
    });
    test('check if "Configure" button is the default action', async () => {
      await client.waitForAndClick(Module.category_filter_list);
      await client.getCategoryNumber(Module.category_list);
      for (let i = 3; i <= (numberCategory + 1); i++) {
        await client.getNumberModuleByCategory(Module.category_filter_element_span.replace("%ID", i));
        if (numberModule !== '0') {
          await client.waitForAndClick(Module.category_filter_element.replace("%ID", i));
          await client.isVisible(ModuleManager.see_more_link);
          if (visible) {
            await client.waitForAndClick(ModuleManager.see_more_link);
          }
          for (let j = 1; j <= numberModule; j++) {
            await client.getDataTechName(ModuleManager.module_element.split('%ID').join(j));
            await client.getModuleButtonText(ModuleManager.module_action_href.split('%B').join(dataTechName));
            await client.checkConfigureButton(ModuleManager.configure_link.split('%B').join(dataTechName), buttonText);
          }
          await client.waitForAndClick(Module.category_filter_list);
        }
      }
    });
  }, 'modules/moduleManager');
  authentication.signOutBO();
}, 'common_client', true);
