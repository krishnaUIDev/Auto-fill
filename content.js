// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'autofill') {
    // Get the active element
    const activeElement = document.activeElement;

    if (
      activeElement &&
      (activeElement.isContentEditable ||
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA')
    ) {
      // If it's an input or textarea element
      if (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA'
      ) {
        const startPos = activeElement.selectionStart;
        const endPos = activeElement.selectionEnd;
        const beforeText = activeElement.value.substring(0, startPos);
        const afterText = activeElement.value.substring(endPos);
        activeElement.value = beforeText + request.value + afterText;

        // Set cursor position after the inserted text
        const newPos = startPos + request.value.length;
        activeElement.setSelectionRange(newPos, newPos);
      }
      // If it's a contenteditable element
      else if (activeElement.isContentEditable) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const textNode = document.createTextNode(request.value);
        range.deleteContents();
        range.insertNode(textNode);

        // Move cursor to end of inserted text
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
});
