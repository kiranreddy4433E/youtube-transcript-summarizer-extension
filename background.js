chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    chrome.storage.local.get(["platform", "prompt"], (data) => {
      const platform = data.platform || "chatgpt";
      const prompt = data.prompt || "Summarize this video: [transcript]";

      chrome.tabs.sendMessage(sender.tab.id, { action: "getTranscript" }, (response) => {
        if (chrome.runtime.lastError || !response || !response.transcript) {
          console.error("Error getting transcript.");
          return;
        }

        const transcript = response.transcript;
        const finalPrompt = prompt.replace("[transcript]", transcript);
        let url = "";

        switch (platform.toLowerCase()) {
          case "chatgpt":
            url = "https://chat.openai.com/";
            break;
          case "gemini":
            url = "https://gemini.google.com/";
            break;
          case "claude":
            url = `https://claude.ai/?prompt=${encodeURIComponent(finalPrompt)}`;
            break;
          default:
            console.warn("Unknown platform selected.");
            return;
        }

        // Open the AI platform in a new tab
        chrome.tabs.create({ url });

        // For ChatGPT and Gemini, copy the prompt to clipboard and notify the user
        if (platform.toLowerCase() !== "claude") {
          navigator.clipboard.writeText(finalPrompt).then(() => {
            setTimeout(() => {
              chrome.notifications.create({
                type: "basic",
                iconUrl: "icon.png",
                title: "Prompt Copied!",
                message: `Go to ${platform} and paste the prompt (Ctrl+V).`
              });
            }, 500);
          }).catch(() => {
            setTimeout(() => {
              chrome.notifications.create({
                type: "basic",
                iconUrl: "icon.png",
                title: "Clipboard Error",
                message: "Could not copy to clipboard. Please do it manually."
              });
            }, 500);
          });
        }
      });
    });
  }
});
