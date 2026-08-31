import { proxy } from 'valtio/vanilla';

const state = proxy({
    feeds: [],
    form: {
        error: null,
        status: "idle"
    }
})

export default state