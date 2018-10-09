const authentication = require('../common_scenarios/authentication');
const console = require('../common_scenarios/console');
const {Menu} = require('../../selectors/BO/menu');

/** This scenario is based on the bug described in this PR
 * https://github.com/PrestaShop/PrestaShop/pull/10684
 */

scenario('PR-10684: Check the Javascript console in all pages', () => {
  authentication.signInBO('10684');
  console.verificationConsole(Menu.dashboard_menu, Menu.dashboard_menu, "Dashboard");
  console.verificationConsole(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.invoices_submenu, "Invoices");
  console.verificationConsole(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.credit_slips_submenu, "Credit Slips");
  console.verificationConsole(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.delivery_slips_submenu, "Delivery Slips");
  console.verificationConsole(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu, "Products");
  console.verificationConsole(Menu.Sell.Stats.stats_menu, Menu.Sell.Stats.stats_menu, "Stats");
  console.verificationConsole(Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_catalog_submenu, "Modules > Module Catalog");
  console.verificationConsole(Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu, "Modules > Module Manager");
  console.verificationConsole(Menu.Improve.Design.design_menu, Menu.Improve.Design.theme_catalog_submenu, "Design > Theme Catalog");
  console.verificationConsole(Menu.Improve.Design.design_menu, Menu.Improve.Design.positions_submenu, "Design > Positions");
  console.verificationConsole(Menu.Improve.Shipping.shipping_menu, Menu.Improve.Shipping.preferences_submenu, "Shipping > Preferences");
  console.verificationConsole(Menu.Improve.Payment.payment_menu, Menu.Improve.Payment.payment_methods_submenu, "Payment > Payment Methods");
  console.verificationConsole(Menu.Improve.Payment.payment_menu, Menu.Improve.Payment.preferences_submenu, "Payment > Preferences");
  console.verificationConsole(Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu, "International > Localization");
  console.verificationConsole(Menu.Improve.International.international_menu, Menu.Improve.International.translations_submenu, "International > Translations");
  console.verificationConsole(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.general_submenu, "Shop Parameters > General");
  console.verificationConsole(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.order_settings_submenu, "Shop Parameters > Order Settings");
  console.verificationConsole(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.product_settings_submenu, "Shop Parameters > Product Settings");
  console.verificationConsole(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.customer_settings_submenu, "Shop Parameters > Customer Settings");
  console.verificationConsole(Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.information_submenu, "Advanced Parameters > Information");
  console.verificationConsole(Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.performance_submenu, "Advanced Parameters > Performance");
  console.verificationConsole(Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.administration_submenu, "Advanced Parameters > Administration");
  console.verificationConsole(Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.email_submenu, "Advanced Parameters > E-mail");
  console.verificationConsole(Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.import_submenu, "Advanced Parameters > Import");
  console.verificationConsole(Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.database_submenu, "Advanced Parameters > Database");
  console.verificationConsole(Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.logs_submenu, "Advanced Parameters > Logs");
  authentication.signOutBO();
}, 'common_client', true);
