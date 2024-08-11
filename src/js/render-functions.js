function createGalleryMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
      <img
        class="gallery-image"
        src="${webformatURL}"
        alt="${tags}"
      />
    </a>
    <div class="image-stats">
        <p>Likes <span>${likes}</span></p>
        <p>Views <span>${views}</span></p>
        <p>Comments <span>${comments}</span></p>
        <p>Downloads <span>${downloads}</span></p>
    </div>
    </li>`).join("")
}

export { createGalleryMarkup }