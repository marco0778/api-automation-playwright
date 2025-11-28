const { test, expect } = require('@playwright/test');
const { baseURL } = require('../utils/apiClient');
const { getToken } = require('../utils/tokenManager');
const { getAnyBookingId } = require('../utils/apiHelper');

test(`Wrong Credentials (Auth)`, async () => {
    const url = await baseURL();

    const response = await url.post(`/auth`,
        {
            data: {
                username: "admin",
                password: "password321"
            }
        }
    );

    const body = await response.json();
    console.log(JSON.stringify(body, null, 2));
    await expect(body).toHaveProperty("reason");
    await expect(body.reason).toBe("Bad credentials");
});

test(`Create Booking with Missing Field of totalprice`, async () => {
    const url = await baseURL();

    const response = await url.post('/booking',
        {
            data: {
                firstname: "Jim",
                lastname: "Brown",
                depositpaid: true,
                bookingdates: {
                    checkin: "2025-01-01",
                    checkout: "2025-02-01"
                },
                additionalneeds: "Breakfast"
            }
        }
    );

    const body = await response.statusText();
    expect(response.status()).not.toBe(200);

    console.log(`Your request is failed with message : ${body}`);
});


test(`Update Booking Without Token`, async () => {
    const url = await baseURL();
    const randomBookingid = await getAnyBookingId();

    const response = await url.put(`/booking/${randomBookingid}`,
        {
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

    expect(response.status()).toBe(403);
    const responseStatus = await response.statusText();
    console.log(`Your request to update is failed with status : ${responseStatus}`);
});


test(`Update Booking With Wrong Token`, async () => {
    const url = await baseURL();
    const randomBookingid = await getAnyBookingId();

    const response = await url.put(`/booking/${randomBookingid}`,
        {
            headers: {
                'Cookie': `token=Token1234567890`
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

    await expect(response.status()).toBe(403);
    const responseStatus = await response.statusText();
    console.log(`Your request to update is failed with status : ${responseStatus}`);

});


test(`Delete Booking Without Token`, async () => {
    const url = await baseURL();
    const randomBookingid = await getAnyBookingId();

    const response_delete = await url.delete(`booking/${randomBookingid}`, {
        headers: {
        }
    });

    await expect(response_delete.status()).toBe(403);
    console.log(`Your request to delete is failed with message : ${response_delete.statusText()}`);
});


test(`Delete Booking With Invalid ID`, async () => {
    const url = await baseURL();
    const token = await getToken();

    const response_delete = await url.delete(`booking/999999`, {
        headers: {
            'Cookie': `token=${token}`
        }
    });

    await expect(response_delete.status()).toBe(405);
    console.log(`Your request to delete is failed with message : ${response_delete.statusText()}`);
});