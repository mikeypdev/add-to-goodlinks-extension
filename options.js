document.addEventListener("DOMContentLoaded", () => {
  // Load saved settings
  chrome.storage.sync.get(["quickMode", "firstRun"], (result) => {
    document.getElementById("quickMode").checked = result.quickMode ?? true;
    document.getElementById("resetFirstRun").checked = false; // Not saved, user has to manually check it
  });

  // Save settings when the Save button is clicked
  document.getElementById("save").addEventListener("click", () => {
    const quickMode = document.getElementById("quickMode").checked;
    const resetFirstRun = document.getElementById("resetFirstRun").checked;

    // Save the quick mode setting
    chrome.storage.sync.set({ quickMode });

    // Reset firstRun flag if the user checked the box
    if (resetFirstRun) {
      chrome.storage.sync.set({ firstRun: false }, () => {
        alert(
          "Extension reset. The security popup should be shown on the next use."
        );
        document.getElementById("resetFirstRun").checked = false; // clear checkbox on reset
      });
    }

    // Confirmation message
    alert("Settings saved.");
  });
});
