document.addEventListener('DOMContentLoaded', function () {
  // Load saved settings
  chrome.storage.sync.get(['autofillData'], function (result) {
    if (result.autofillData) {
      document.getElementById('jsonEditor').value = JSON.stringify(
        result.autofillData,
        null,
        2
      );
    }
  });

  // Save settings
  document.getElementById('saveButton').addEventListener('click', function () {
    const jsonText = document.getElementById('jsonEditor').value;
    const status = document.getElementById('status');

    try {
      // Parse JSON to validate
      const autofillData = JSON.parse(jsonText);

      // Save to storage
      chrome.storage.sync.set({ autofillData: autofillData }, function () {
        status.textContent = 'Settings saved!';
        status.className = 'status success';
        status.style.display = 'block';

        // Update context menu
        chrome.runtime.sendMessage({ action: 'updateContextMenu' });

        setTimeout(function () {
          status.style.display = 'none';
        }, 2000);
      });
    } catch (e) {
      status.textContent = 'Error: Invalid JSON format';
      status.className = 'status error';
      status.style.display = 'block';

      setTimeout(function () {
        status.style.display = 'none';
      }, 2000);
    }
  });
});
