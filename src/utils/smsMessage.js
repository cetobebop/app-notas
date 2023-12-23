import twilio from "twilio";
import { config } from "dotenv";

config();

export default async function (tlf, title, message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  await client.messages.create({
    body: ` << ${title} >>  ${message}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: tlf,
  });

  
}
