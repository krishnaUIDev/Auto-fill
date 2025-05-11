// Create context menu items
function createContextMenu() {
  // Remove existing menu items
  chrome.contextMenus.removeAll(() => {
    // Create a parent menu item
    chrome.contextMenus.create({
      id: 'autofillMenu',
      title: 'Autofill',
      contexts: ['editable'],
    });

    // Get stored data and create menu items
    chrome.storage.sync.get(['autofillData'], function (result) {
      if (result.autofillData) {
        // Create menu items for each key in the JSON
        Object.keys(result.autofillData).forEach((key) => {
          chrome.contextMenus.create({
            id: key,
            parentId: 'autofillMenu',
            title: key.charAt(0).toUpperCase() + key.slice(1),
            contexts: ['editable'],
          });
        });
      }
    });
  });
}

// Initialize context menu on install
chrome.runtime.onInstalled.addListener(createContextMenu);

// Listen for updates from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateContextMenu') {
    createContextMenu();
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.storage.sync.get(['autofillData'], function (result) {
    if (result.autofillData && result.autofillData[info.menuItemId]) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'autofill',
        value: result.autofillData[info.menuItemId],
      });
    }
  });
});
