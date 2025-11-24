const {test} = require("@playwright/test");
const { request } = require("https");
const {getToken} = require("../utils/tokenManager");

test('Test login to get the token', async () => {
    const testToken = await getToken();

    console.log(testToken);
});