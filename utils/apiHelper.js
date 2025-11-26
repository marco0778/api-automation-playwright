const {baseURL} = require('../utils/apiClient');

exports.getBookingid = async () =>{
    const url = await baseURL();

    const response = await url.get('/booking');

    const body = await response.json();
    const randomIndex = Math.floor((Math.random() * body.length));
    console.log(`Your index is : ${randomIndex}`);

    return body[randomIndex].bookingid;
}

exports.getSpecificBookingid = async (bookingId) =>{
    const url = await baseURL();

    const response = await url.get(`/booking/${bookingId}`);

    const body_status = await response.status();
    return body_status;
}