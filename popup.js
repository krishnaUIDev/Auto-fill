document.addEventListener('DOMContentLoaded', function () {
  const settingsButton = document.getElementById('settingsButton');
  const status = document.getElementById('status');

  settingsButton.addEventListener('click', function () {
    chrome.tabs.create({
      url: 'settings.html',
    });
  });
});
