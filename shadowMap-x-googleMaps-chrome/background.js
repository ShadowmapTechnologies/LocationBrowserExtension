function generateGoogleLink(tab) {
    const url = tab.url
    const data = url.split("?")[1].split("&")
    const lat = data[0].split("=")[1]
    const lng = data[1].split("=")[1]
    const googleLink = `https://www.google.com/maps/@${lat},${lng},18z`

    return googleLink
}


function generateShadowMapLink(tab) {
    const url = tab.url
    const data = url.split("@")[1].split("/")[0].split(",")
    const lat = data[0]
    const lng = data[1]
    const shadowMapLink = `https://app.shadowmap.org/?lat=${lat}&lng=${lng}&zoom=15`

    return shadowMapLink
}

chrome.browserAction.onClicked.addListener(function(tab) {

    const tabURL = tab.url

    if (tabURL.includes("app.shadowmap")) {
        let url = generateGoogleLink(tab)
        chrome.tabs.create({ url });
        return;
    } 

    if (tabURL.includes("google") && tabURL.includes("/maps/")) {
        let url = generateShadowMapLink(tab)
        chrome.tabs.create({ url });
        return
    }
})
