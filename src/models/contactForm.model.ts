import { model } from "mongoose";
import { IContactForm } from "../ts/interfaces/contactForm.interface";
import contactFormSchema from "./shcemaDefinations/contactForm.schema";

const ContactFormModel = model<IContactForm>("contact_forms", contactFormSchema);

export default ContactFormModel;
