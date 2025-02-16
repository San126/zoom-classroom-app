
const axios = require('axios')
const moment = require('moment')

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const accountId = process.env.ACCOUNT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const auth_key = process.env.AUTH_KEY;
const auth_token_url = "https://zoom.us/oauth/token"
const api_base_url = "https://api.zoom.us/v2"

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
    headers: {
        'Authorization': `Basic ${auth_key}`
    }
};
exports.createZoomMeeting = async (topic, duration, start_time) => {
    try {
        let authResponse
        await axios.request(config)
            .then((response) => {
                authResponse = response.data;
            })
            .catch((error) => {
                console.log(error);
            });

        const access_token = authResponse.access_token

        const headers = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }


        let data = JSON.stringify({
            "topic": topic,
            "type": 2,
            "start_time": start_time,
            "duration": duration,
            "password": "12334",
            "settings": {
                "join_before_host": true,
                "waiting_room": false
            }
        });

        const meetingResponse = await axios.post(`${api_base_url}/users/me/meetings`, data, { headers });

        if (meetingResponse.status !== 201) {
            return 'Unable to generate meeting link'
        }

        const response_data = meetingResponse.data;

        const content = {
            meetingUrl: response_data.join_url,
            meetingTime: response_data.start_time,
            purpose: response_data.topic,
            duration: response_data.duration,
            message: 'Success',
            password: response_data.password,
            status: 1
        };
        return content

    } catch (e) {
        console.log(e)
    }
}