function createSidebar(transcriptText = "Transcript will appear here...") {
  let sidebar = document.getElementById("yt-transcript-sidebar");
  if (sidebar) return;

  // Sidebar container
  sidebar = document.createElement("div");
  sidebar.id = "yt-transcript-sidebar";
  sidebar.style.position = "fixed";
  sidebar.style.top = "80px";
  sidebar.style.right = "10px";
  sidebar.style.width = "250px";
  sidebar.style.maxHeight = "70vh";
  sidebar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
  sidebar.style.zIndex = "9999";
  sidebar.style.overflowY = "auto";
  sidebar.style.boxShadow = "-2px 2px 6px rgba(0,0,0,0.15)";
  sidebar.style.padding = "12px";
  sidebar.style.fontSize = "13px";
  sidebar.style.lineHeight = "1.4";
  sidebar.style.borderRadius = "8px";
  sidebar.style.border = "1px solid #ccc";

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "5px";
  closeBtn.style.right = "8px";
  closeBtn.style.border = "none";
  closeBtn.style.background = "transparent";
  closeBtn.style.fontSize = "18px";
  closeBtn.style.cursor = "pointer";
  closeBtn.title = "Close";
  closeBtn.onclick = () => sidebar.remove();

  // Transcript content
  const transcriptDiv = document.createElement("div");
  transcriptDiv.id = "transcript-text";
  transcriptDiv.innerText = transcriptText;
  transcriptDiv.style.marginTop = "20px";

  // Copy button
  const copyBtn = document.createElement("button");
  copyBtn.innerText = "Copy Transcript";
  copyBtn.style.marginTop = "10px";
  copyBtn.style.padding = "6px 10px";
  copyBtn.style.backgroundColor = "#007bff";
  copyBtn.style.color = "#fff";
  copyBtn.style.border = "none";
  copyBtn.style.borderRadius = "4px";
  copyBtn.style.cursor = "pointer";

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(transcriptDiv.innerText)
      .then(() => alert("Transcript copied to clipboard!"))
      .catch(() => alert("Failed to copy transcript."));
  };

  // Append everything
  sidebar.appendChild(closeBtn);
  sidebar.appendChild(transcriptDiv);
  sidebar.appendChild(copyBtn);
  document.body.appendChild(sidebar);
}

function addSummarizeButton() {
  const existingBtn = document.getElementById("yt-summarize-btn");
  if (existingBtn) return;

  const btn = document.createElement("button");
  btn.id = "yt-summarize-btn";
  btn.innerText = "Summarize";
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.left = "20px";
  btn.style.zIndex = "9999";
  btn.style.padding = "10px 20px";
  btn.style.backgroundColor = "#ff0000";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
  btn.style.cursor = "pointer";
  btn.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  btn.onclick = () => {
    chrome.runtime.sendMessage({ action: "summarize" });
  };
  document.body.appendChild(btn);
}

// Handle transcript requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTranscript") {
    const transcriptElements = document.querySelectorAll(
      "ytd-transcript-segment-renderer span, ytd-transcript-segment-renderer, .segment, .cue-group"
    );

    if (!transcriptElements.length) {
      const fallbackMessage = `
Transcript not found. 
Please try the following:

1. Click the ⋮ (three dots) below the video title.
2. Look for and click “Show transcript”.
3. Then click the "Summarize" button again.

Note: Not all videos have transcripts or captions.
      `.trim();

      const sidebar = document.getElementById("yt-transcript-sidebar");
      if (sidebar) {
        const transcriptText = sidebar.querySelector("#transcript-text");
        if (transcriptText) {
          transcriptText.innerText = fallbackMessage;
        } else {
          sidebar.innerText = fallbackMessage;
        }
      }

      sendResponse({ transcript: fallbackMessage });
      return;
    }

    const transcript = Array.from(transcriptElements)
      .map(el => el.innerText.trim())
      .join(" ");

    const sidebar = document.getElementById("yt-transcript-sidebar");
    if (sidebar) {
      const transcriptText = sidebar.querySelector("#transcript-text");
      if (transcriptText) {
        transcriptText.innerText = transcript;
      } else {
        sidebar.innerText = transcript;
      }
    }

    sendResponse({ transcript });
  }
});

// OPTIONAL: Try to auto-click the "Show transcript" button
function tryAutoOpenTranscript() {
  const moreMenuBtn = document.querySelector('tp-yt-paper-icon-button[aria-label="More actions"]');
  if (moreMenuBtn) {
    moreMenuBtn.click();
    setTimeout(() => {
      const transcriptBtn = Array.from(document.querySelectorAll("ytd-menu-service-item-renderer"))
        .find(el => el.innerText.toLowerCase().includes("transcript"));
      if (transcriptBtn) {
        transcriptBtn.click();
      }
    }, 500);
  }
}

// Initialize sidebar and button
createSidebar();
addSummarizeButton();
setTimeout(tryAutoOpenTranscript, 2000);
