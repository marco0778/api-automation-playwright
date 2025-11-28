const { test, expect } = require('@playwright/test');
const { baseURL } = require('../utils/apiClient');
const {getToken} = require('../utils/tokenManager');
const {getAllBookingId} = require('../utils/apiHelper');

test(`Test Update Booking`, async () => {
    const url = await baseURL();
    const token = await getToken();
    const randomBookingid = await getAllBookingId();

    const response = await url.put(`/booking/${randomBookingid}`,
        {
            headers: {
                'Cookie': `token=${token}`
            },
            data: {
                firstname: "Marco",
                lastname: "Cools",
                totalprice: 111,
                depositpaid: true,
                bookingdates: {
                    checkin: "2025-01-01",
                    checkout: "2025-01-02"
                },
                additionalneeds: "Breakfast"
            }
        }
    );

    const bodyresponse = await response.json();
    const body = await response.status();
    expect(body).toBe(200);
    const bodyStatus = await response.statusText();
    console.log(`${body} : ${bodyStatus}`);
    console.log(bodyresponse);
});