import axios from "axios";
axios.defaults.withCredentials = true;

const axiosHelper = async (url, method, data) => {
    // const fullUrl = 'http://localhost:3000' + url;
    try {
        const response = await axios({
            url: url,
            method,
            data,
            withCredentials: true,
        });
        return response;
    } catch (error) {
        return error.response;
    }
};


export default axiosHelper;