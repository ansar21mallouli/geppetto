const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {CategoryPage} = require('../../selectors/BO/catalog/categories/category');
const {AddCategory} = require('../../selectors/BO/catalog/categories/addCategory');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10950
 */
scenario('PR-10950: Check the breadcrumb link in categories page', () => {
  authentication.signInBO('10950');
  scenario('Check check the breadcrumb link', client => {
    test('should go to "Catalog > Categories" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.category_submenu);
    });
    test('should click on "Add new categories" button', () => client.waitForAndClick(CategoryPage.add_category_button));
    test('should check that breadcrumb link is "Modules > Modules Manager."', () => client.checkTextValue(AddCategory.breadcrumb_link, "Modules > Modules Manager."));
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
