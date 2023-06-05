const { crawlPage } = require('./crawl.js')

function main() {
    if (process.argv.length < 3) {
        console.log("no website provided")
        process.exit(1)
    } 
    else if (process.argv.length > 3) {
        console.log("too many line args")
        process.exit(1)
    }
    else {
        const baseURL = process.argv[2]
        console.log(`starting crawl of ${baseURL}`)
        crawlPage(process.argv[2])
    }
}

main()