document.addEventListener("DOMContentLoaded", () => {
  const platformSelect = document.getElementById("platform");
  const promptInput = document.getElementById("prompt");
  const saveBtn = document.getElementById("saveBtn");
  const status = document.getElementById("status");

  chrome.storage.local.get(["platform", "prompt"], (data) => {
    if (data.platform) platformSelect.value = data.platform;
    if (data.prompt) promptInput.value = data.prompt;
  });

  saveBtn.addEventListener("click", () => {
    const platform = platformSelect.value;
    const prompt = promptInput.value;

    chrome.storage.local.set({ platform, prompt }, () => {
      status.textContent = "Preferences saved!";
      setTimeout(() => (status.textContent = ""), 2000);
    });
  });
});
