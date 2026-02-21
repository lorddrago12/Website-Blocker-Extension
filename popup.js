document.addEventListener("DOMContentLoaded", function () {
    var addSiteButton = document.getElementById("addBtn");
    var siteInput = document.getElementById("siteinput");
    var blockedList = document.getElementById("BlockedList");

    // Load and display blocked sites on popup open
    updateBlockedList();

    addSiteButton.addEventListener("click", function () {
        var siteInputValue = siteInput.value.trim();
        if (siteInputValue) {
            chrome.storage.sync.get("blockedSites", function (data) {
                var blockedSites = data.blockedSites || [];
                
                // Check if site already exists
                if (blockedSites.indexOf(siteInputValue) === -1) {
                    blockedSites.push(siteInputValue);
                    chrome.storage.sync.set({ blockedSites: blockedSites }, function () {
                        siteInput.value = "";
                        updateBlockedList();
                        updateBlockingRules();
                    });
                } else {
                    alert("Site is already blocked!");
                }
            });
        }
    });

    function updateBlockedList() {
        chrome.storage.sync.get("blockedSites", function (data) {
            var blockedSites = data.blockedSites || [];
            blockedList.innerHTML = "";
            
            blockedSites.forEach(function (site, index) {
                var li = document.createElement("li");
                li.textContent = site;

                // Add a remove button
                var removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.className = "removeBtn";
                removeButton.addEventListener("click", function () {
                    chrome.storage.sync.get("blockedSites", function (data) {
                        var blockedSites = data.blockedSites || [];
                        var siteIndex = blockedSites.indexOf(site);
                        if (siteIndex !== -1) {
                            blockedSites.splice(siteIndex, 1);
                            chrome.storage.sync.set({ blockedSites: blockedSites }, function () {
                                updateBlockedList();
                                updateBlockingRules();
                            });
                        }
                    });
                });

                li.appendChild(removeButton);
                blockedList.appendChild(li);
            });
        });
    }

    function updateBlockingRules() {
        chrome.storage.sync.get("blockedSites", function (data) {
            var blockedSites = data.blockedSites || [];
            
            // Get existing dynamic rules
            chrome.declarativeNetRequest.getDynamicRules(function (existingRules) {
                // Remove all existing dynamic rules
                var ruleIdsToRemove = existingRules.map(function (rule) {
                    return rule.id;
                });
                
                if (ruleIdsToRemove.length > 0) {
                    chrome.declarativeNetRequest.updateDynamicRules({
                        removeRuleIds: ruleIdsToRemove
                    }, function () {
                        addNewRules(blockedSites);
                    });
                } else {
                    addNewRules(blockedSites);
                }
            });
        });
    }

    function addNewRules(blockedSites) {
        var rules = blockedSites.map(function (site, index) {
            // Remove protocol if present
            var domain = site.replace(/^https?:\/\//, "").replace(/^www\./, "");
            
            return {
                id: index + 1,
                priority: 1,
                action: {
                    type: "block"
                },
                condition: {
                    urlFilter: "*://" + domain + "/*",
                    resourceTypes: ["main_frame", "sub_frame"]
                }
            };
        });

        if (rules.length > 0) {
            chrome.declarativeNetRequest.updateDynamicRules({
                addRules: rules
            }, function () {
                console.log("Blocking rules updated successfully");
            });
        }
    }
});
