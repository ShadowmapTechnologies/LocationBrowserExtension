function generateGoogleLink(tab) {
    const url = tab.url
    const data = url.split("?")[1].split("&")
    const lat = data[0].split("=")[1]
    const lng = data[1].split("=")[1]

    const googleLink = `https://www.google.com/maps/@${lat},${lng},18z`

    return googleLink
}

function generateShadowMapLink(tab, isGoogleEarth = false) {

    const url = tab.url
    var longlat = /\/\@(.*),(.*),/.exec(url);

    var lat = longlat[1]
    var lng = longlat[2]
    var zoomLevel = 15

    if (isGoogleEarth) {
        let extractLatLng = longlat[1].split(',')
        lat = extractLatLng[0]
        lng = extractLatLng[1]
    } else {
        var parameters = url.split(',')

        for (const parameter of parameters) {
            if (parameter.slice(-1) === 'z') {
                zoomLevel = parameter.replace('z', '')
                break
            } 
        }
    }
    
    return `https://app.shadowmap.org/?lat=${lat}&lng=${lng}&zoom=${zoomLevel}`
}

chrome.action.onClicked.addListener(function (tab) {

    const tabURL = tab.url

    if (tabURL.includes("app.shadowmap")) {
        let url = generateGoogleLink(tab)
        chrome.tabs.create({ url });
    } else if (tabURL.includes("google") && (tabURL.includes("/maps/"))) {
        let url = generateShadowMapLink(tab);
        if (url != undefined) {
            chrome.tabs.create({ url });
        }
    } else if (tabURL.includes("google") &&  tabURL.includes("earth")) {
        let url = generateShadowMapLink(tab, true);
        if (url != undefined) {
            chrome.tabs.create({ url });
        }
    }

})
