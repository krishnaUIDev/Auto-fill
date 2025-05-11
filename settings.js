document.addEventListener('DOMContentLoaded', function () {
  const keyValueContainer = document.getElementById('keyValueContainer');
  const addPairBtn = document.getElementById('addPairBtn');
  const saveButton = document.getElementById('saveButton');
  const status = document.getElementById('status');

  // Load existing settings when page opens
  chrome.storage.sync.get(['autofillData'], function (result) {
    const data = result.autofillData || {};
    Object.entries(data).forEach(([key, value]) => {
      addKeyValuePair(key, value);
    });
  });

  // Add new key-value pair
  addPairBtn.addEventListener('click', () => {
    addKeyValuePair('', '');
  });

  // Save settings
  saveButton.addEventListener('click', () => {
    const data = {};
    const pairs = keyValueContainer.getElementsByClassName('key-value-pair');

    for (let pair of pairs) {
      const key = pair.querySelector('.key-input').value.trim();
      const value = pair.querySelector('.value-textarea').value.trim();

      if (key && value) {
        data[key] = value;
      }
    }

    chrome.storage.sync.set({ autofillData: data }, function () {
      // Update context menu after saving
      chrome.runtime.sendMessage({ action: 'updateContextMenu' }, function () {
        showStatus('Settings saved successfully!', 'success');
      });
    });
  });

  function addKeyValuePair(key, value) {
    const pairDiv = document.createElement('div');
    pairDiv.className = 'key-value-pair';

    const keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.className = 'key-input';
    keyInput.placeholder = 'Field name';
    keyInput.value = key;

    const valueTextarea = document.createElement('textarea');
    valueTextarea.className = 'value-textarea';
    valueTextarea.placeholder = 'Value (supports multiple lines)';
    valueTextarea.value = value;
    valueTextarea.rows = 3; // Show 3 lines by default

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function () {
      pairDiv.remove();
    };

    pairDiv.appendChild(keyInput);
    pairDiv.appendChild(valueTextarea);
    pairDiv.appendChild(removeBtn);
    keyValueContainer.appendChild(pairDiv);
  }

  function showStatus(message, type) {
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
    setTimeout(() => {
      status.style.display = 'none';
    }, 3000);
  }
});
