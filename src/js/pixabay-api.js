const BASE_URL = "https://pixabay.com/api"
const API_KEY = "30733650-3915f9571a70fae81f0483ef4"


function searchImages(q) {
    const params = new URLSearchParams({
        key: API_KEY,
        q,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    })
    return fetch(`${BASE_URL}?${params}`).then(res => {
        if (!res.ok) throw new Error("Sorry, there are no images matching your search query. Please try again!")

        return res.json()
    })
}

export { searchImages }