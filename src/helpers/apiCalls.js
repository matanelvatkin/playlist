import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000/api/"
axios.defaults.baseURL = "https://playlist-server.onrender.com"

const apiCalls = async (method, url, data) => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`
    try {
        const res = await axios({
            method: method,
            url: url,
            data:data
          });

        return res
    }
    catch (error) {
    }
}

export default apiCalls