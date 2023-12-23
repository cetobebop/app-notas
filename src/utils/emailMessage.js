import { Resend } from 'resend';
import {config} from "dotenv"

config()

export default async function (email, msg, title) {
    

const resend = new Resend(process.env.RESEND_API_KEY);

(async function () {
  try {
    const data = await resend.emails.send({
      from: 'Recordatorio <scheduled_message@resend.dev>',
      to: [email],
      subject: title,
      html: msg,
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();
}

