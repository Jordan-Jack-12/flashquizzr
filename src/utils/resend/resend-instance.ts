import { RESEND_API_KEY } from "@/lib/constants";
import { Resend } from "resend";

export const resend = new Resend(RESEND_API_KEY);