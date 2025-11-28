const { baseURL } = require('../utils/apiClient');

exports.getAnyBookingId = async () => {
    const url = await baseURL();

    const response = await url.get('/booking');

    const body = await response.json();
    const randomIndex = Math.floor((Math.random() * body.length));
    console.log(`Your index is : ${randomIndex}`);

    return body[randomIndex].bookingid;
}

exports.getBookingById = async (bookingId) => {
    const url = await baseURL();

    const response = await url.get(`/booking/${bookingId}`);

    const body = await response.status();
    console.log(`Status of Get By Booking ID is : ${body}`);
    return response;
}