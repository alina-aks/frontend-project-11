const parseRss = (data) => {
    const parser = new DOMParser
    const parseDoc = parser.parseFromString(data, "application/xml");

    const parseError = parseDoc.querySelector('parsererror')
    if (parseError) {
        throw new Error('errors.invalidRss')
    }

    const xmlDoc = parseDoc.querySelector("channel");
    if (!xmlDoc) {
        throw new Error('errors.invalidRss')
    }

    const title = xmlDoc.querySelector("title").textContent;
    const description = xmlDoc.querySelector("description").textContent;
    const items = Array.from(xmlDoc.querySelectorAll("item"))

    const posts = items.map((item)=>{
        const title = item.querySelector("title").textContent
        const link = item.querySelector("link").textContent
        return {title, link}
    })

    const feed = {title, description}

    return {feed, posts}

}

export default parseRss;