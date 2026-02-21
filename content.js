chrome.storage.sync.get("blockedSites", function(data) {
    var blockedSites = data.blockedSites || [];

    for (var i = 0; i < blockedSites.length; i++) {
        if (window.location.href.includes(blockedSites[i])) {
            document.documentElement.innerHTML = "";
            window.location.href = "-"; // add the page href you want to redirect it to when you visit the blocked website. for eg. a notion to-do page
        }
    }
});
