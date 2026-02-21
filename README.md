# Website Blocker

A lightweight Chrome extension that lets you block distracting websites by entering their URL.

## Features

- Block any website by typing its domain (e.g. `facebook.com`)
- Unblock sites with a single click
- Blocked sites persist across browser sessions
- Uses Chrome's `declarativeNetRequest` API for efficient, native-level blocking
- Dark-themed popup UI

## Installation

1. Clone or download this repository.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the `website-blocker` folder.
5. The extension icon will appear in your toolbar — click it to start blocking sites.

## Usage

1. Click the extension icon to open the popup.
2. Enter a domain (e.g. `youtube.com`) and click **Block** or press **Enter**.
3. The site will be added to your blocklist and immediately blocked.
4. To unblock a site, click the **✕** button next to it in the list.

## Project Structure

```
website-blocker/
├── manifest.json   # Extension configuration (Manifest V3)
├── popup.html      # Popup UI
├── popup.js        # Popup logic
├── styles.css      # Popup styles
├── rules.json      # Initial empty rules file
├── icons/          # Extension icons (16, 48, 128px)
├── README.md
└── LICENSE
```

## Permissions

- **storage** — Save your blocklist locally.
- **declarativeNetRequest** — Block network requests to listed domains.
- **host_permissions (`<all_urls>`)** — Required to block requests on any site.

## License

See [LICENSE](LICENSE) for details.
