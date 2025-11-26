const { test, expect } = require('@playwright/test');
const { baseURL } = require('../utils/apiClient');

test(`Test Booking`, async () => {
    const url = await baseURL();

    const response = await url.post('/booking',
        {
            data: {
                firstname: "Jim",
                lastname: "Brown",
                totalprice: 111,
                depositpaid: true,
                bookingdates: {
                    checkin: "2025-01-01",
                    checkout: "2025-02-01"
                },
                additionalneeds: "Breakfast"
            }
        }
    );

    const body = await response.json();
    const bodyStatus = response.status();
    expect(bodyStatus).toBe(200);

    console.log(body);
});