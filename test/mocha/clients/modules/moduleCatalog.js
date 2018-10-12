let CommonClient = require('../common_client');
global.elementsSortedTable = [];
global.elementsTable = [];

class ModuleCatalog extends CommonClient {

  async getTableField(selector, i, sorted = false) {
    await page.$eval(selector.replace('%ID', i), (el, attribute) => el.getAttribute(attribute), 'data-price').then((data) => {
      if (sorted) {
        elementsSortedTable[i - 1] = data;
      }
      else {
        elementsTable[i - 1] = data;
      }
    });
  }

  async checkSortTable(increase = true) {
    if (increase)
      expect(elementsTable.sort(function (a, b) {
        return a - b;
      })).to.deep.equal(elementsSortedTable);
    else
      expect(elementsTable.sort(function (a, b) {
        return a - b;
      }).reverse()).to.deep.equal(elementsSortedTable);
  }

}

module.exports = ModuleCatalog;
