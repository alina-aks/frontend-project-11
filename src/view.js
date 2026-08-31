import { subscribe } from 'valtio/vanilla';
import state from './state.js';

const initView = () => {
    const input = document.querySelector("#url-input");
    const feedback = document.querySelector("#feedback");

    subscribe(state, () => {
        if (state.form.status === "error"){
            feedback.textContent = state.form.error;
            input.classList.add("border-red-500");
            feedback.classList.add("text-red-500");

            input.classList.remove("border-blue-500");
            feedback.classList.remove("text-green-600");

            return;
        }

        if (state.form.status === "success"){
            feedback.textContent = "RSS успешно загружен";
            feedback.classList.add("text-green-600");

            input.classList.remove("border-red-500");
            feedback.classList.remove("text-red-500");

            return;
        }

        feedback.textContent = "";
        input.classList.remove("border-red-500", "border-blue-500");
        feedback.classList.remove("text-red-500", "text-green-600");

    })
}

export default initView;
    