// Example usage
const rssUrl = 'https://feeds.bloomberg.com/markets/news.rss';
fetchAndParseRSS(rssUrl);

async function fetchAndParseRSS(url) {
    try {
        const response = await fetch(url);
        const rssString = await response.text();
        parseRSS(rssString);
    } catch (error) {
        console.error('Error fetching or parsing RSS:', error);
    }
}

function parseRSS(rssString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssString, "text/xml");

    const channel = xmlDoc.getElementsByTagName("channel")[0];
    const items = channel.getElementsByTagName("item");

    const feedTitle = channel.getElementsByTagName("title")[0].textContent;
    const feedDescription = channel.getElementsByTagName("description")[0].textContent;

    console.log(`Feed Title: ${feedTitle}`);
    console.log(`Feed Description: ${feedDescription}`);
    console.log("Latest News Items:");

    for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName("title")[0].textContent;
        const description = items[i].getElementsByTagName("description")[0].textContent;
        const pubDate = items[i].getElementsByTagName("pubDate")[0].textContent;

        console.log(`Title: ${title}`);
        console.log(`Description: ${description}`);
        console.log(`Publication Date: ${pubDate}`);
        console.log("-----------------------------------");
    }
}
