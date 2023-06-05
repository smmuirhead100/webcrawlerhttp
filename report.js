function printReport(pages) {
    console.log("=================")
    console.log("REPORT") 
    console.log("=================")
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`found ${hits} links to page: ${url}`)
    }
    console.log("=================")
    console.log("REPORT") 
    console.log("=================")
}


function sortPages(pages) {
    pagesArray = Object.entries(pages)
    console.log(pagesArray)
    pagesArray.sort((a, b) => {
            aHits = a[1]
            bHits = b[1]
            return bHits - aHits
    })
    return pagesArray
}

module.exports = {
    sortPages, 
    printReport
}