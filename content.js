chrome.storage.sync.get("blockedSites", function(data) {
    var blockedSites = data.blockedSites || [];

    for (var i = 0; i < blockedSites.length; i++) {
        if (window.location.href.includes(blockedSites[i])) {
            document.documentElement.innerHTML = "";
            window.location.href = "https://www.notion.so/Habit-Tracker-2e31a0f1d30780698e2cd0cb6f82a06e";
        }
    }
});