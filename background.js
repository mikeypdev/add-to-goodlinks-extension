chrome.browserAction.onClicked.addListener((tab) => {
  if (tab && tab.url) {
    const pageUrl = encodeURIComponent(tab.url);
    const pageTitle = encodeURIComponent(tab.title);

    chrome.storage.sync.get(["firstRun"], (result) => {
      const isFirstRun = !result.firstRun;

      chrome.storage.sync.get(["quickMode"], (storageResult) => {
        const quickMode = storageResult.quickMode ?? true;
        const quickParam = quickMode ? "1" : "0";
        const goodLinksUrl = `goodlinks://x-callback-url/save?url=${pageUrl}&title=${pageTitle}&quick=${quickParam}`;

        if (isFirstRun) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/goodlinks-icon-48.png",
            title: "GoodLinks Security Popup",
            message:
              "The browser will ask for confirmation before launching GoodLinks. Please check the `ALWAYS` checkbox and accept the prompt to continue.",
          });
        }

        // Create the tab to trigger the x-callback-url
        chrome.tabs.create(
          { url: goodLinksUrl, active: isFirstRun },
          (newTab) => {
            // No longer automatically removing the tab.
            // The user can manually close the blank tab that opens.
            if (isFirstRun) {
              chrome.storage.sync.set({ firstRun: true });
            }
          }
        );
      });
    });
  } else {
    console.error("No active tab or URL to save.");
  }
});
