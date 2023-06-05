const { JSDOM } = require('jsdom')

async function crawlPage(currentURL) {
    try {
        const resp = await fetch(currentURL)
        console.log(`actively crawling: ${currentURL}`)
        if (resp.status > 399) {
            console.log(`error in fetch wtih status code: ${resp.status} on page ${currentURL}`)
            return
        }

        const contentType = resp.headers.get("content-type") 
        if (!contentType.includes("text/html")) {
            console.log(`non html response. content type: ${contentType}`)
            return 
        }
    }
    catch(err) {
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }

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