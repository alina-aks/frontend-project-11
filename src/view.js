import { subscribe } from 'valtio/vanilla';
import state from './state.js';
import i18next from './i18n.js';

const initView = () => {
    const input = document.querySelector("#url-input");
    const feedback = document.querySelector("#feedback");
    const submitButton = document.querySelector("#submit-button")
    const feedsContainer = document.querySelector("#feeds")
    const postsContainer = document.querySelector("#posts") 

    const renderForm = () => {

        if (state.form.status === 'loading') {
            submitButton.disabled = true
            return
        }

        submitButton.disabled = false

        if (state.form.status === "error"){
            feedback.textContent = i18next.t(state.form.error);
            input.classList.add("border-red-500");
            feedback.classList.add("text-red-500");

            input.classList.remove("border-blue-500");
            feedback.classList.remove("text-green-600");

            return;
        }

        if (state.form.status === "success"){
            feedback.textContent = i18next.t("form.success");
            feedback.classList.add("text-green-600");

            input.classList.remove("border-red-500");
            feedback.classList.remove("text-red-500");

            return;
        }

        feedback.textContent = "";
        input.classList.remove("border-red-500", "border-blue-500");
        feedback.classList.remove("text-red-500", "text-green-600");
    }

    const renderFeeds = () => {
        feedsContainer.innerHTML = ""
        if (state.feeds.length === 0) {
            return     
        }
        
        const title = document.createElement("h2")
        title.textContent = i18next.t('sections.feeds');
        title.classList.add('text-2xl', 'font-semibold', 'mb-4')

        feedsContainer.append(title)
        state.feeds.forEach((feed) => {
            const feedElement = document.createElement('div')
            feedElement.classList.add(
                'mb-4',
                'rounded-lg',
                'bg-white',
                'p-4',
                'shadow-sm',
            )

            const feedTitle = document.createElement('h3')
            feedTitle.textContent = feed.title
            feedTitle.classList.add('font-semibold')

            const feedDescription = document.createElement('p')
            feedDescription.textContent = feed.description
            feedDescription.classList.add('text-gray-600')

            feedElement.append(feedTitle, feedDescription)
            feedsContainer.append(feedElement)

            })

    }

    const renderPosts = () => {
        postsContainer.innerHTML = ''
        if (state.posts.length === 0) {
            return
        }

        const title = document.createElement('h2')
        title.textContent = i18next.t('sections.posts')
        title.classList.add('text-2xl', 'font-semibold', 'mb-4')
        postsContainer.append(title)

        const list = document.createElement('ul')
        list.classList.add('space-y-3')

        state.posts.forEach((post) => {
            const item = document.createElement('li')
            const link = document.createElement('a')

            link.textContent = post.title
            link.href = post.link
            link.target = '_blank'
            link.rel = 'noopener noreferrer'

            link.classList.add('text-blue-600', 'hover:underline')
            item.append(link)
            list.append(item)
        })
        postsContainer.append(list)
  }

    renderForm()
    renderFeeds()
    renderPosts()

    subscribe(state, () => {
        renderForm()
        renderFeeds()
        renderPosts()
    })

}


export default initView;
    