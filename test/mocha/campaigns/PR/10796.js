const authentication = require('../common_scenarios/authentication');
const {Menu} = require('../../selectors/BO/menu');
const {Catalog} = require('../../selectors/BO/catalog/products/catalog');
const {AddProduct} = require('../../selectors/BO/catalog/products/addProduct');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10796
 */
scenario('PR-10796: Check the link to "SEO and URLs" in update product page', () => {
  authentication.signInBO('10796');
  scenario('Check that the link to "SEO and URLs" is correct', client => {
    test('should go to "Catalog > Products" page', async () => {
      await client.waitForAndClick(Menu.Sell.Catalog.catalog_menu);
      await client.waitForAndClick(Menu.Sell.Catalog.products_submenu, 2000);
    });
    test('should edit the first product', () => client.waitForAndClick(Catalog.edit_icon.replace("%TR", 1)));
    test('should go to "SEO" tab', () => client.waitForAndClick(AddProduct.seo_tab));
    test('should check the migrated page of "SEO and URLs" link', () => client.getAttributeInVar(AddProduct.SEO.seo_url_link, 'href', 'link'));
    test('should check that the link to the "Traffic & SEO" page should be the same of the migrated page of "SEO and URLs" link', async () => {
      await client.waitForAndClick(Menu.Configure.ShopParameters.shop_parameters_menu);
      await client.waitForAndClick(Menu.Configure.ShopParameters.traffic_seo_submenu,2000);
      await client.checkURL(tab['link'].split("?_token")[0]);
    });
  }, 'common_client');
  authentication.signOutBO();
}, 'common_client', true);
