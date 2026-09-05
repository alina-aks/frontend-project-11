import './style.css'
import initView from './view.js';
import * as yup from 'yup';
import state from './state.js';
import axios from 'axios';
import parseRss from './parser.js';
import buildProxyUrl from './api.js';
import updateFeeds from './updater.js';

initView()
updateFeeds()

yup.setLocale({
  mixed: {
    required: 'errors.required',
  },
  string: {
    url: 'errors.invalidUrl',
  },
})

const form = document.querySelector("#rss-form");
const input = document.querySelector("#url-input");

const schema = yup.string()
  .required()
  .url()
  .test(
    "notDuplicate",
    "errors.duplicate",
    (value) => !state.feeds.some((feed) => feed.url === value)
)

form.addEventListener("submit", (event)=>{
  event.preventDefault()
  const formData = new FormData(form)
  const url = formData.get("url")

  schema.validate(url)
    .then(() => {
      state.form.status = 'loading'
      const proxyUrl = buildProxyUrl(url)
      return axios.get(proxyUrl)
    })
    .then((response)=>{
      const data = response.data.contents
      const {feed, posts} = parseRss(data)
      const feedId = crypto.randomUUID()

      const newFeed = {
        id: feedId,
        url,
        title: feed.title,
        description: feed.description,
      }

      const newPosts = posts.map((post) => ({
        id: crypto.randomUUID(),
        feedId,
        title: post.title,
        link: post.link,
        description: post.description,
      }))

      state.feeds.push(newFeed)
      state.posts.push(...newPosts)

      state.form.status = "success"
      state.form.error = null

      form.reset()
      input.focus()
    })

    .catch((error) => {
      state.form.status = 'error'

      if (axios.isAxiosError(error)) {
        state.form.error = 'errors.network'
      } else {
        state.form.error = error.message
      }
    })

})


