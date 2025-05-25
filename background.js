chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    // Get user preferences from chrome.storage.local
    chrome.storage.local.get(["platform", "prompt"], (data) => {
      const platform = data.platform || "chatgpt";
      const prompt = data.prompt || "Summarize this video: [transcript]";

      // Ask content.js to fetch the YouTube transcript
      chrome.tabs.sendMessage(sender.tab.id, { action: "getTranscript" }, (response) => {
        if (chrome.runtime.lastError || !response || !response.transcript) {
          console.error("Error getting transcript.");
          return;
        }

        const transcript = response.transcript;
        const finalPrompt = prompt.replace("[transcript]", transcript);
        let url = "";

        // Determine which AI platform to use
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

        // For ChatGPT and Gemini, send prompt to content script to copy it
        if (platform.toLowerCase() !== "claude") {
          chrome.tabs.sendMessage(sender.tab.id, {
            action: "copyToClipboard",
            text: finalPrompt,
            platform: platform
          });
        }
      });
    });
  }
});
