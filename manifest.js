{
  "manifest_version": 3,
  "name": "LR Custom Saver",
  "version": "2.0",
  "permissions": ["activeTab"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://www.languagereactor.com/*", "*://*.netflix.com/*", "*://*.youtube.com/*"],
      "js": ["content.js"]
    }
  ]
}
