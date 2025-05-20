document.addEventListener("DOMContentLoaded", () => {
  // Load saved settings
  chrome.storage.sync.get(["quickMode"], (result) => {
    document.getElementById("quickMode").checked = result.quickMode ?? false;
  });

  // Save settings when the Save button is clicked
  document.getElementById("save").addEventListener("click", () => {
    const quickMode = document.getElementById("quickMode").checked;

    // Save the quick mode setting
    chrome.storage.sync.set({ quickMode }, () => {
      // Close the options page after saving
      window.close();
    });
  });
});
