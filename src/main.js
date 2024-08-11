import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";

import { searchImages } from "./js/pixabay-api.js"
import { createGalleryMarkup } from "./js/render-functions.js"

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loadingText = document.querySelector(".loading-text");
const loadMoreBtn = document.querySelector(".load-more");
const simpleGallery = new SimpleLightbox(".gallery a", { captionDelay: 250, captionsData: "alt" });


const queryParams = {
    page: 1,
    per_page: 15,
    q: "",
    maxPage: 0
}

form.addEventListener("submit", handleSearch);

const iziToastErrorOptions = {
    title: 'Error',
    message: 'Empty query!',
    titleColor: 'white',
    messageColor: 'white',
    backgroundColor: 'red',
    position: 'topRight'
}

async function handleSearch(event) {
    event.preventDefault();

    const form = event.currentTarget;
    queryParams.q = form.elements.query.value.trim();

    if (queryParams.q === "") {
        iziToast.show(iziToastErrorOptions);
        return;
    }

    queryParams.page = 1;
    gallery.innerHTML = "";
    loadingText.classList.remove("hidden");
    loadMoreBtn.classList.add("hidden");

    try {
        const { hits, totalHits } = await searchImages(queryParams);
        if (totalHits === 0) {
            throw new Error("Sorry, there are no images matching your search query. Please try again!")
        }

        queryParams.maxPage = Math.ceil(totalHits / queryParams.per_page);


        loadingText.classList.add("hidden");
        gallery.innerHTML = createGalleryMarkup(hits)
        simpleGallery.refresh()

        if (queryParams.maxPage > 1) {
            loadMoreBtn.classList.remove("hidden");
            loadMoreBtn.addEventListener("click", handleLoadMore)
        }

    } catch (err) {
        iziToast.show({ ...iziToastErrorOptions, message: err.message });
        loadingText.classList.add("hidden");
    } finally {
        form.reset()
    }
}

async function handleLoadMore() {
    loadingText.classList.remove("hidden");
    loadMoreBtn.classList.add("hidden");

    queryParams.page += 1;


    try {
        const { hits } = await searchImages(queryParams);

        loadingText.classList.add("hidden");
        gallery.insertAdjacentHTML("beforeend", createGalleryMarkup(hits))
        simpleGallery.refresh()

        window.scrollBy({
            top: gallery.children[0].getBoundingClientRect().height * 2,
            behavior: "smooth",
        });

    } catch (err) {
        iziToast.show({ ...iziToastErrorOptions, message: err.message });
        loadingText.classList.add("hidden");
        loadMoreBtn.classList.add("hidden");
    } finally {
        if (queryParams.page === queryParams.maxPage) {
            loadingText.classList.add("hidden");
            loadMoreBtn.classList.add("hidden");
            loadMoreBtn.removeEventListener("click", handleLoadMore)
            iziToast.show({ ...iziToastErrorOptions, message: "We're sorry, but you've reached the end of search results." });
        } else {
            loadMoreBtn.classList.remove("hidden");
        }
    }


}
