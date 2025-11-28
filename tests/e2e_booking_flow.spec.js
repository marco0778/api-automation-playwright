const { test, expect } = require('@playwright/test');
const { baseURL } = require('../utils/apiClient');
const { getBookingById, getAnyBookingId } = require('../utils/apiHelper');
const { getToken } = require('../utils/tokenManager');

test(`Test end to end Booking Flow`, async () => {
    const url = await baseURL();
    const token = await getToken();

    // STEP 1: Create booking  
    const res_booking = await url.post(`/booking`,
        {
            data: {
                firstname: "Marco",
                lastname: "Lagi Nih",
                totalprice: 250,
                depositpaid: true,
                bookingdates: {
                    checkin: "2025-11-01",
                    checkout: "2025-11-03"
                },
                additionalneeds: "Breakfast"
            }
        }
    );

    const body_create_booking = await res_booking.json();
    console.log("Created Booking response : ", JSON.stringify(body_create_booking, null, 2));
    expect(res_booking.status()).toBe(200);

    // STEP 2: Get booking
    const bookingIdFromCreate = body_create_booking.bookingid;
    console.log(`Your booking ID is : ${bookingIdFromCreate}`);
    const getBookingAfterCreate = await getBookingById(bookingIdFromCreate);
    expect(getBookingAfterCreate.status()).toBe(200);
    // const loggergetBookingAfterCreate = await getBookingAfterCreate.json();
    // console.log(loggergetBookingAfterCreate);

    // STEP 3: Update booking
    const res_update = await url.put(`/booking/${bookingIdFromCreate}`,
        {
            headers: {
                'Cookie': `token=${token}`
            },
            data: {
                firstname: "Marco",
                lastname: "Is Adapting",
                totalprice: 300,
                depositpaid: false,
                bookingdates: {
                    checkin: "2025-11-01",
                    checkout: "2025-11-03"
                },
                additionalneeds: "Breakfast"
            }
        }
    );

    const bodyUpdateBooking = await res_update.json();
    expect(bodyUpdateBooking.lastname).toBe("Is Adapting");
    expect(bodyUpdateBooking.depositpaid).toBe(false);
    expect(bodyUpdateBooking.totalprice).toBe(300);
    expect(res_update.status()).toBe(200);
    console.log("Updated Booking response : ", JSON.stringify(bodyUpdateBooking, null, 2));

    // STEP 4: Get updated booking  
    const getBookingAfterUpdate = await getBookingById(bookingIdFromCreate);
    expect(getBookingAfterUpdate.status()).toBe(200);
    console.log(`Your booking ID of : ${bookingIdFromCreate} is successfully updated`);
    // const loggergetBookingAfterUpdate = await getBookingAfterUpdate.json();
    // console.log(loggergetBookingAfterUpdate);

    // STEP 5: Delete booking  
    const response_delete = await url.delete(`booking/${bookingIdFromCreate}`, {
        headers: {
            'Cookie': `token=${token}`
        }
    });

    const body_delete_status = await response_delete.status();
    const body_delete_statusText = await response_delete.statusText();
    expect(body_delete_status).toBe(201);
    console.log(`Status of deletion is : ${body_delete_status} with text ${body_delete_statusText}`);

    // STEP 6: Verify 404 
    const getDetailBookingIdafterDeletion = await getBookingById(bookingIdFromCreate);
    await expect(getDetailBookingIdafterDeletion.status()).toBe(404);
    console.log(`The Booking ID of ${bookingIdFromCreate} is no longer exists.`);
});