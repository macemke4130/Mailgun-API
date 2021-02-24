import * as express from 'express';
import { sendEmail } from './utils/mailgun';

const router = express.Router();

router.post('/api/email/send', async (req, res, next) => {
    try {
        const r = await sendEmail(
            req.body.from,
            req.body.to,
            req.body.subject,
            req.body.message
        );
        res.send({ response: "Email Sent!" });
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

export default router;