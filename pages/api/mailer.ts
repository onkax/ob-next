import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";

const transport = createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  logger: true,
  debug: true,
});

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
): void {
  const { attachments, ...otherParams } = request.body;

  let mail_to = process.env.EMAIL_INFO;

  const result = transport.sendMail(
    {
      to: mail_to,
      from: process.env.SMTP_FROM,
      subject: process.env.EMAIL_SUBJ,
      html: JSON.stringify(otherParams),
      attachments: attachments,
      // this can be an html..
    },
    function (error, info) {
      if (error) {
        console.log(error.message);
      } else {
        console.log("Message sent: " + info.messageId);
      }
      transport.close();
    }
  );
  response.json(result);
}
