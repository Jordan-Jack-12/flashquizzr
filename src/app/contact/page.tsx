import { resend } from "@/utils/resend/resend-instance";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";

function ContactPage() {
  async function sendEmail(formdata: FormData) {
    "use server";
    const emailSchema = z.object({
      email: z.string().email("email is not valid"),
      subject: z.string().min(1, "subject is too short"),
      message: z.string().min(1, "message is too short"),
      offer: z.string().min(0),
    });
    const email = formdata.get("email") as string;
    const subject = formdata.get("subject") as string;
    const message = formdata.get("message") as string;
    const offer = formdata.get("offer") as string;

    const { error, data } = emailSchema.safeParse({
      email,
      subject,
      message,
      offer,
    });

    if (!error && offer.length < 1) {
      const { error } = await resend.emails.send({
        from: "Flashquizzr <mail@mail.flashquizzr.com>",
        to: "contact@flashquizzr.com",
        subject: `Message from ${data.email} via Flashquizzr Contact`,
        text: `Message from ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
      });
      if (error) {
        console.log(error);
        redirect("/failed");
      }
    }

    if (error) {
      console.log(error);
      redirect("/failed");
    }

    console.log("successfully sent email");
    redirect("/success");
  }

  return (
    <main className="w-screen">
      <h1 className="text-3xl font-semibold text-center mt-5 md:mt-10">
        Contact
      </h1>
      <form
        className="mx-auto max-w-xl p-5 flex flex-col gap-4"
        action={sendEmail}
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-stone-800 rounded border-2 border-stone-700 text-base px-[0.75rem] py-2"
            placeholder="name@example.com"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="subject" className="text-sm">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            className="bg-stone-800 rounded border-2 border-stone-700 text-base px-[0.75rem] py-2"
            placeholder="Subject"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="text-sm">
            Message
          </label>
          <textarea
            name="message"
            cols={10}
            className="bg-stone-800 rounded border-2 border-stone-700 text-base px-[0.75rem] py-2"
            placeholder="message"
          />
        </div>
        <div className="hidden">
          <label htmlFor="offer" className="text-sm">
            Offer
          </label>
          <input
            type="text"
            name="offer"
            className="bg-stone-800 rounded border-2 border-stone-700 text-base px-[0.75rem] py-2"
            placeholder="Subject"
          />
        </div>
        <button
          type="submit"
          className="button_gradient text-orange-900 font-bold px-[0.75rem] py-2 rounded"
        >
          Send
        </button>
      </form>
    </main>
  );
}

export default ContactPage;

