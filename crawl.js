const {JSDOM} = require('jsdom')

async function crawlPage(currentURL) {
    console.log(`actively crawling: ${currentURL}`)
    const resp = await fetch(currentURL)

    console.log(resp.text)
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const element of linkElements) {
        if (element.href.slice(0, 1) === '/') {
            try {
                urls.push(new URL(element.href, baseURL).href)
            } catch(err) {
                console.log("error with relative URL")
            }
        } else {
            try {
                urls.push(new URL(element.href).href)
            } catch(err) {
                console.log("error with relative URL")
            }
        }
    }
    return urls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = urlObj.hostname + urlObj.pathname
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML, 
    crawlPage,
}