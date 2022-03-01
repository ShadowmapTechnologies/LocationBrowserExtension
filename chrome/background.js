function generateGoogleLink(tab) {

    const url = tab.url
    const data = url.split("?")[1].split("&")
    const lat = data[0].split("=")[1]
    const lng = data[1].split("=")[1]
    const zoom = data[2].split("=")[1]

    const googleLink = `https://www.google.com/maps/@${lat},${lng},${zoom}z`

    return googleLink
}

function generateShadowmapLinkFromGoogleMaps(tab) {

    const url = tab.url
    const parameters = url.split(',')
    const longlat = /\/\@(.*),(.*),/.exec(url);
    const lat = longlat[1]
    const lng = longlat[2]

    var zoomLevel = 15

    for (const parameter of parameters) {
        if (parameter.slice(-1) === 'z') {
            const zoom = parseInt(parameter.replace('z', ''))
            zoomLevel = (3 < zoom && zoom < 19 ? zoom : zoomLevel)
            break
        } 
    }

    return `https://app.shadowmap.org/?lat=${lat}&lng=${lng}&zoom=${zoomLevel}`

}

function generateShadowmapLinkFromGoogleEarth(tab) {

    const url = tab.url
    const longlat = /\/\@(.*),(.*),/.exec(url);
    const extractLatLng = longlat[1].split(',')
    const zoomLevel = 15

    lat = extractLatLng[0]
    lng = extractLatLng[1]

    return `https://app.shadowmap.org/?lat=${lat}&lng=${lng}&zoom=${zoomLevel}`
}


chrome.action.onClicked.addListener(function (tab) {

    const tabURL = tab.url

    if (tabURL.includes("app.shadowmap")) {
        const url = generateGoogleLink(tab)
        chrome.tabs.create({ url });
        return
    }
    
    if (tabURL.includes("google") && (tabURL.includes("/maps/"))) {
        const url = generateShadowmapLinkFromGoogleMaps(tab);
        chrome.tabs.create({ url });
        return
    }
    
    if (tabURL.includes("google") &&  tabURL.includes("earth")) {
        const url = generateShadowmapLinkFromGoogleEarth(tab);
        chrome.tabs.create({ url });
        return
    }

})