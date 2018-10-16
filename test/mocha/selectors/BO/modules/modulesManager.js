module.exports = {
  ModuleManager: {
    module_description_block: '#main-div div[data-tech-name="%B"]',
    see_more_link: '#main-div div.module-short-list:not([style])  button.see-more, #main-div div.module-short-list[style=""]  button.see-more',
    module_element: '#main-div div.module-short-list:not([style]) > div > div:nth-child(%ID), #main-div div.module-short-list[style=""] > div > div:nth-child(%ID)',
    module_action_href: '#main-div div[data-tech-name="%B"] div[class="module-actions"] > a, #main-div div[data-tech-name="%B"] form > button[data-confirm_modal="module-modal-confirm-%B-disable"]',
    configure_link: '#main-div div[data-tech-name="%B"] div[class*="module-actions"] a',

  }
};
