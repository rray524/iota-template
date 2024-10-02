"use client";
import React from "react";
import { sendMail } from "../action";
import { useForm } from "react-hook-form";
import { Input } from "./component";
import { useToast } from "@/contexts/toast-context";
import { ToastContainer } from "react-toastify";
import { handlePhoneChange } from "../../[id]/lead-form/utils";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: initialState,
  });
  const { showToast } = useToast();
  const onSubmit = async (formData: any) => {
    if (!isValid) return;

    const templateParams = {
      from_email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    };

    try {
      await sendMail(templateParams);
      showToast("Your message has been sent successfully!", "success");
      reset();
    } catch (error) {
      showToast("There was an error sending your message.", "error");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5"
        data-testid="contact-form"
        noValidate
      >
        <Input
          register={register("firstName", {
            required: "First Name is required",
          })}
          name="firstName"
          placeHolder="Your First Name"
          error={errors.firstName}
        />

        <Input
          register={register("lastName", {
            required: "Last Name is required",
          })}
          name="lastName"
          placeHolder="Your Last Name"
          error={errors.lastName}
        />

        <Input
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
          name="email"
          placeHolder="Your Email"
          error={errors.email}
        />

        <Input
          register={register("phone", {
            required: "Phone Number is required",
            validate: (value) =>
              value.length === 10 || "Phone number must be 10 digits",
            onChange: handlePhoneChange,
          })}
          name="phone"
          placeHolder="Your Phone Number"
          error={errors.phone}
        />

        <Input
          register={register("message", {
            required: "Message is required",
          })}
          name="message"
          placeHolder="Please send me information about this property"
          error={errors.message}
          isTextArea
        />

        <div className="flex items-end md:col-span-2">
          <button
            type="submit"
            className="h-14 uppercase text-sm font-bold tracking-wide bg-indigo-600 text-gray-100 p-1 rounded-lg w-full focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default ContactForm;
