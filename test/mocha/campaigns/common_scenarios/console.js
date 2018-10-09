module.exports = {
  async verificationConsole(menu, submenu, name) {
    scenario('Check that the javascript console do not display error due to form elements having equal ids in "' + name + '" page', client => {
      test('should go to "' + name + '" page then check console', async () => {
        await client.waitForAndClick(menu);
        if (name !== "Stats" && name !== "Dashboard") {
          await client.waitForAndClick(submenu);
        }
        await page.on('console', msg => {
          try {
            expect(msg.text()).to.not.contain('[DOM] Found 2 elements with non-unique id');
          } catch (error) {
            console.log(error);
          }
        });
      });
    }, 'common_client');
  }
};
