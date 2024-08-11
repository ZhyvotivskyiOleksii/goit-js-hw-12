import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";

import { searchImages } from "./js/pixabay-api.js"
import { createGalleryMarkup } from "./js/render-functions.js"

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loadingText = document.querySelector(".loading-text");
const simpleGallery = new SimpleLightbox(".gallery a", { captionDelay: 250, captionsData: "alt" });

form.addEventListener("submit", handleSearch);

const iziToastErrorOptions = {
    title: 'Error',
    message: 'Empty query!',
    titleColor: 'white',
    messageColor: 'white',
    backgroundColor: 'red',
    position: 'topRight'
}

function handleSearch(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const userQuery = form.elements.query.value.trim();

    if (userQuery === "") {
        iziToast.show(iziToastErrorOptions);
        return;
    }

    gallery.innerHTML = "";
    loadingText.classList.remove("hidden");

    searchImages(userQuery).then(data => {
        if (data.totalHits === 0) {
            throw new Error("Sorry, there are no images matching your search query. Please try again!")
        }

        loadingText.classList.add("hidden");
        gallery.innerHTML = createGalleryMarkup(data.hits)
        simpleGallery.refresh()
    }).catch(err => {
        iziToast.show({ ...iziToastErrorOptions, message: err.message });
        loadingText.classList.add("hidden");
    }).finally(() => form.reset())
}
