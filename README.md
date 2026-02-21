# Website Blocker

A lightweight Chrome extension that blocks distracting websites and redirects you to a productive alternative when you try to visit them.

## Features

- **Block any website** — Add domains (e.g. `facebook.com`, `youtube.com`) to your blocklist
- **Unblock sites** — Remove sites from the list with a single click
- **Persistent blocklist** — Uses Chrome sync storage so your blocklist follows you across devices
- **Native blocking** — Uses Chrome's `declarativeNetRequest` API for efficient, network-level blocking
- **Productive redirect** — Blocked sites redirect to a Notion habit tracker to help you stay on track

## Installation

1. Clone or download this repository.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the `website-blocker` folder.
5. The extension icon will appear in your toolbar — click it to manage your blocklist.

## Usage

1. Click the extension icon to open the popup.
2. Enter a domain (e.g. `youtube.com`) and click **Add Site** or press **Enter**.
3. The site will be added to your blocklist and immediately blocked.
4. To unblock a site, click the **Remove** button next to it in the list.
5. When you try to visit a blocked site, you'll be redirected to your Notion habit tracker.

## Project Structure

```
website-blocker/
├── manifest.json   # Extension configuration (Manifest V3)
├── popup.html      # Popup UI
├── popup.js        # Popup logic and blocklist management
├── content.js      # Redirects blocked sites to Notion habit tracker
├── styles.css      # Popup styles
├── rules.json      # Dynamic rules storage (managed by extension)
├── README.md
└── LICENSE
```

## Permissions

- **storage** — Save your blocklist locally (syncs across Chrome profiles).
- **declarativeNetRequest** — Block network requests to listed domains.
- **host_permissions (`<all_urls>`)** — Required to block requests and run content scripts on any site.

## Customization

The redirect URL when visiting a blocked site is set in `content.js`. Edit the URL to point to your own habit tracker, productivity dashboard, or any page you'd like to see instead.

## License

See [LICENSE](LICENSE) for details.
