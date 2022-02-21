function generateGoogleLink(tab) {
    let url = tab.url
    let data = url.split("?")[1].split("&")
    let lat = data[0].split("=")[1]
    let lng = data[1].split("=")[1]
    let googleLink = `https://www.google.com/maps/@${lat},${lng},18z`

    return googleLink
}


function generateShadowMapLink(tab) {
    let url = tab.url
    let data = url.split("@")[1].split("/")[0].split(",")
    let lat = data[0]
    let lng = data[1]
    let shadowMapLink = `https://app.shadowmap.org/?lat=${lat}&lng=${lng}&zoom=15`

    return shadowMapLink
}

chrome.browserAction.onClicked.addListener(function(tab) {

    let tabURL = tab.url


    if (tabURL.includes("app.shadowmap")) {
        let url = generateGoogleLink(tab)
        chrome.tabs.create({ url: url });
    } else if (tabURL.includes("google") && tabURL.includes("/maps/")) {
        let url = generateShadowMapLink(tab)
        chrome.tabs.create({ url: url });
    }


})
