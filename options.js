document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["platform", "prompt"], (data) => {
    if (data.platform) {
      document.getElementById("platform").value = data.platform;
    }
    if (data.prompt) {
      document.getElementById("prompt").value = data.prompt;
    }
  });
});

document.getElementById("save").addEventListener("click", () => {
  const platform = document.getElementById("platform").value;
  const prompt = document.getElementById("prompt").value;

  chrome.storage.local.set({ platform, prompt }, () => {
    alert("Settings saved!");
  });
});
