import buildProxyUrl from "./api.js";
import axios from 'axios'
import state from './state.js'
import parseRss from './parser.js'

const updateFeeds = () => {
    const promises = state.feeds.map((feed) => {
        const proxyUrl = buildProxyUrl(feed.url)
        return axios.get(proxyUrl)
            .then((response)=> {
                const data = response.data.contents;
                const {posts} = parseRss(data)

                const newPosts = posts
                    .filter((post)=>{
                        return !state.posts.some(
                            (currentPost) => currentPost.link === post.link,
                        )
                    })
                    .map((post)=>({
                        id: crypto.randomUUID(),
                        feedId: feed.id,
                        title: post.title,
                        link: post.link,
                    }))
                state.posts.push(...newPosts)
            })
            .catch(()=> null)    
    })
    Promise.all(promises)
        .finally(() => {
        setTimeout(updateFeeds, 5000)
        })
    
}

export default updateFeeds