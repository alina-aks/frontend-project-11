import './style.css'
import initView from './view.js';
import * as yup from 'yup';
import state from './state.js';

initView()

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
    (value) => !state.feeds.includes(value),

)

form.addEventListener("submit", (event)=>{
  event.preventDefault()
  const formData = new FormData(form)
  const url = formData.get("url")

  schema.validate(url)
    .then(()=>{
      state.form.status = "success"
      state.form.error = null
      state.feeds.push(url)

      form.reset()
      input.focus()
    })
    .catch((error)=>{
      state.form.status = "error"
      state.form.error = error.message
    })

})


