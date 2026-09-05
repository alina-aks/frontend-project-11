import { proxy } from 'valtio/vanilla';

const state = proxy({
    feeds: [],
    posts: [],
    form: {
        error: null,
        status: "idle"
    },
    seenPostsId: []
})

export default state