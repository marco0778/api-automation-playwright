const { expect, test } = require("@playwright/test");
const { request } = require("https");
// const { getToken } = require("../utils/tokenManager");
const { baseURL } = require("../utils/apiClient");

test('Success to get token', async () => {
    const url = await baseURL();

    const res = await url.post('/auth', {
        data: {
            username: "admin",
            password: "password123"
        }
    });

    const body = await res.json();
    const bodyStatus = res.status();
    expect(bodyStatus).toBe(200);
    console.log(bodyStatus);
    console.log(body);
});