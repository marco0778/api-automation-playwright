const { test, expect } = require('@playwright/test');
const { baseURL } = require('../utils/apiClient');
const {getSpecificBookingid, getAllBookingId} = require('../utils/apiHelper');
const {getToken} = require('../utils/tokenManager');

test(`Test create booking and delete`, async () => {
    const url = await baseURL();
    const token = await getToken();

    const response = await url.post('/booking',
        {
            data: {
                firstname: "Marco",
                lastname: "Second",
                totalprice: 111,
                depositpaid: false,
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
    await expect(bodyStatus).toBe(200);
    //console.log(body);

    const getCreateid = body.bookingid;
    // console.log(getCreateid);
    const getDetailBookingId = await getSpecificBookingid(getCreateid);
    const objectGetDetailBookingId = {getDetailBookingId};
    console.log(`Content of booking ID ${getCreateid} as following: ${objectGetDetailBookingId}`);
    
    const response_delete = await url.delete(`booking/${getCreateid}`,{
        headers : {
            'Cookie' : `token=${token}`
        }
    });

    const body_delete_status = await response_delete.status();
    const body_delete_statusText = await response_delete.statusText();
    console.log(`Status of deletion is : ${body_delete_status} with text ${body_delete_statusText}`);
    await expect(body_delete_status).toBe(201);
    
    const getDetailBookingIdafterDeletion = await getSpecificBookingid(getCreateid);
    // console.log(getDetailBookingIdafterDeletion.status());
    await expect(getDetailBookingIdafterDeletion.status()).toBe(404);


})