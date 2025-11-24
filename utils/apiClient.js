const {request} = require('@playwright/test');

exports.baseURL = async ()=>{
    const apiContext = await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com'
    });

    return apiContext;

}