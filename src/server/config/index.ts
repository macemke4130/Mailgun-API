import * as dotenv from 'dotenv';

dotenv.config();

export default {
    mailgunKeys: {
        apiKey: process.env.APIKEY,
        domain: process.env.DOMAIN
    },
    recipient: process.env.TOEMAIL
};