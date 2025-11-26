const { test, expect } = require('@playwright/test');
const { baseURL } = require('../utils/apiClient');
const {getSpecificBookingid, getBookingid} = require('../utils/apiHelper');
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
    console.log(`Status after create : ${getDetailBookingId}`);
    
    const response_delete = await url.delete(`booking/${getCreateid}`,{
        headers : {
            'Cookie' : `token=${token}`
        }
    });

    const body_delete_status = await response_delete.status();
    const body_delete_statusText = await response_delete.statusText();
    console.log(`${body_delete_status} : ${body_delete_statusText}`);

    const getDetailBookingIdafterDelete = await getSpecificBookingid(getCreateid);

    
    expect(getDetailBookingIdafterDelete).toBe(404);
})