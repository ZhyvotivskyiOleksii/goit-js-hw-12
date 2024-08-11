import axios from 'axios'


axios.defaults.baseURL = "https://pixabay.com/api";
axios.defaults.params = { key: "30733650-3915f9571a70fae81f0483ef4" }

async function searchImages({ page = 1, per_page = 20, q = "cat" }) {
    const { data } = await axios.get("/", {
        params: {
            q,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page,
            per_page
        }
    })

    return data
}

export { searchImages }