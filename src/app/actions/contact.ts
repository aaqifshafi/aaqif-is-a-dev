"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL ?? "Contact Form <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO_EMAIL ?? "aaqifshafi@gmail.com";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!name || !email || !message) {
    return { status: "error", message: "All fields are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: email,
        subject: `New message from ${name}`,
        text: [
          "You received the following message from the contact form:",
          "",
          message,
          "",
          `Reply to: ${email}`,
        ].join("\n"),
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "Got your message!",
        text: [
          `Hi ${name},`,
          "",
          "Thanks for reaching out! I've received your message and will get back to you soon.",
          "",
          "— Aaqif",
        ].join("\n"),
      }),
    ]);

    return { status: "success" };
  } catch (err) {
    console.error("[contact]", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again or email me directly.",
    };
  }
}
