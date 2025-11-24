const { request } = require("https");
const { baseURL } = require('../utils/apiClient');

exports.getToken = async () => {
    const getUrl = await baseURL();

    const dataLogin = {
        username: "admin",
        password: "password123"
    };

    const response = await getUrl.post('/auth',
        {
            data: dataLogin
        }
    );

    const body = await response.json();
    return body.token;
}