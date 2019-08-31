const AWS = require('aws-sdk');
const ses = new AWS.SES({ apiVersion: '2010-12-01' });
class emailUtils {
    static sendMail(from, to, message, oggetto) {
        const params = {
            Destination: { ToAddresses: [to] },
            Message: {
                Body: {
                    Html: { Charset: 'UTF-8', Data: message },
                    Text: {
                        Charset: 'UTF-8',
                        Data: 'This is the message body in text format.'
                    }
                },
                Subject: { Charset: 'UTF-8', Data: oggetto }
            },
            Source: from,
            ReplyToAddresses: [from],
        }
        ses.sendEmail(params, (err, data) => {
            if (err) {
                console.log("[emailUtils.sendEmail error]:", err, err.stack)
                throw err;
            } else
                console.log("[emailUtils.sendEmail]: Email notification sent!")
        })
    }
} module.exports = emailUtils;