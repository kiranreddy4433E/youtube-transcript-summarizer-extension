# 🎬 YouTube Transcript Summarizer Chrome Extension

This Chrome extension enhances your YouTube viewing experience by allowing you to view video transcripts in a sidebar and summarize them using your favorite AI platforms: **ChatGPT**, **Gemini**, or **Claude**.

---

## 🚀 Features

- ✅ Display video transcript in a sidebar on any YouTube video
- ✅ Summarize transcript content with one click
- ✅ Choose from ChatGPT (OpenAI), Gemini (Google), or Claude (Anthropic)
- ✅ Define a custom summarization prompt
- ✅ Save platform and prompt preferences
- ✅ Copy transcript manually if needed
- ✅ Error handling for videos without transcripts

---

## 🖥️ How It Works

1. Injects a **Summarize** button onto YouTube pages.
2. When clicked:
   - If using **ChatGPT API** (via your key), it shows the summary directly in the sidebar.
   - For **Gemini** or **Claude**, it opens the platform and copies the prompt to your clipboard.
3. The **Options** page lets you configure:
   - AI platform (ChatGPT, Gemini, Claude)
   - Your own custom prompt
   - (Optional) OpenAI API key (for ChatGPT direct integration)

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/yt-transcript-summarizer.git
cd yt-transcript-summarizer
2. Load Extension in Chrome
Go to chrome://extensions/

Enable Developer Mode (top right)

Click Load unpacked

Select the folder where this repo is cloned

🧠 Usage
Visit any YouTube video.

Click the red Summarize button at the bottom-left.

On first use, go to the extension’s Options page or popup to:

Select your preferred AI platform

Enter your OpenAI API key (if using ChatGPT)

Customize your prompt (optional)

Click Summarize again. The transcript is shown in a sidebar, and the summary is either:

Directly shown (ChatGPT API), or

Copied to your clipboard (Gemini/Claude)

⚠️ Notes
Not all videos have transcripts. The extension shows helpful instructions in those cases.

OpenAI API key is required for direct ChatGPT integration. You can get yours from: https://platform.openai.com/account/api-keys

The API key is securely stored locally via chrome.storage.local and never sent to any third-party servers.

🛠️ Tech Stack
HTML, CSS, JavaScript

Chrome Extension (Manifest v3)

OpenAI API (optional, if using ChatGPT directly)

🎥 Demo
(Optional)
You can record a short video using Loom, OBS, or Chrome’s screen recorder and link it here.

🧑‍💻 Author
Chandra Kiran Reddy Reddycharla
Frontend Developer
[Portfolio](https://kiranreddyportfolio.netlify.app/)
