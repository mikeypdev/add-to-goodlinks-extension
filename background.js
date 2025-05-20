chrome.action.onClicked.addListener((tab) => {
  if (tab && tab.url) {
    const pageUrl = encodeURIComponent(tab.url);
    const pageTitle = encodeURIComponent(tab.title);

    chrome.storage.sync.get(["quickMode"], (storageResult) => {
      const quickMode = storageResult.quickMode ?? false; // Default to false if not set
      const quickParam = quickMode ? "1" : "0";
      const goodLinksUrl = `goodlinks://x-callback-url/save?url=${pageUrl}&title=${pageTitle}&quick=${quickParam}`;

      // Create the tab to trigger the x-callback-url
      // Always create as active to ensure consistent behavior with the native prompt
      chrome.tabs.create(
        { url: goodLinksUrl, active: true },
        (newTab) => {
          // The user can manually close the blank tab that opens.
        }
      );
    });
  } else {
    console.error("No active tab or URL to save.");
  }
});
