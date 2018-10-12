const {Menu} = require('../../../selectors/BO/menu');
const {ModuleCatalog} = require('../../../selectors/BO/modules/modulesCatalog');
const {Module} = require('../../../selectors/BO/modules/module');

module.exports = {
  async installModule(dataTechName) {
    scenario('Search module by his data tech name then install it', client => {
      test('should go to "Modules > Module Catalog" page', async () => {
        await client.waitForAndClick(Menu.Improve.Modules.modules_menu);
        await client.waitForAndClick(Menu.Improve.Modules.modules_catalog_submenu, 2000);
      });
      test('should set input module search to "' + dataTechName.toUpperCase() + '" ', () => client.waitForAndType(Module.search_module_input, dataTechName));
      test('should click on search button', () => client.waitForAndClick(Module.search_button));
      test('should click on "Install" button', () => client.waitForAndClick(ModuleCatalog.install_button));
    }, 'common_client');
  }
};
