import './style.css'
import initView from './view.js';
import * as yup from 'yup';
import state from './state.js';

initView()

const form = document.querySelector("#rss-form");
const input = document.querySelector("#url-input");

const schema = yup.string()
  .required("Не должно быть пустым")
  .url("Ссылка должна быть валидным URL")
  .test(
    'notDuplicate',
    'RSS уже существует',
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


