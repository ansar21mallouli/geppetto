const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {Contact} = require('../../selectors/BO/shopParameters/contact');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10751
 */
scenario('PR-10751: Filter stores list by name and address', () => {
  authentication.signInBO('10751');
  scenario('Filter stores list by name and address', client => {
    test('should go to "Shop Parameters > Contact" page then click on "Stores" tab', async () => {
      await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu);
      await client.waitForAndClick(Menu.Configure.ShopParameters.contact_submenu);
      await client.waitForAndClick(Menu.Configure.ShopParameters.stores_tab);
    });
    test('should search by "Name" for the first store', async () => {
      await client.getTextInVar(Contact.Store.store_column.replace("%TR", 1).replace("%TD", 3), 'nameFirstStore');
      await client.searchByValue(Contact.Store.name_search_input, Contact.Store.search_button, tab['nameFirstStore']);
    });
    test('should click on "Reset" button', async () => {
      await client.waitForAndClick(Contact.Store.reset_button);
    });
    test('should search by "Address" for the first store', async () => {
      await client.getTextInVar(Contact.Store.store_column.replace("%TR", 1).replace("%TD", 4), 'addressFirstStore');
      await client.searchByValue(Contact.Store.address_search_input, Contact.Store.search_button, tab['addressFirstStore']);
    });
    test('should click on "Reset" button', async () => {
      await client.waitForAndClick(Contact.Store.reset_button);
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', false);
