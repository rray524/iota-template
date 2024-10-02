"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { Input } from "./components";
import { useToast } from "@/contexts/toast-context";
import { ToastContainer } from "react-toastify";
import { handlePhoneChange } from "./utils";
import { sendMail } from "../../contact/action";

const LeadForm: React.FC = () => {
  const {
    register,
    trigger,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const reCaptchaRef = useRef<ReCAPTCHA | null>(null);
  const { showToast } = useToast();

  const submitForm = async (data: any) => {
    const valid = await trigger();
    if (!valid || !captchaVerified) {
      if (!captchaVerified) {
        showToast("Please complete the captcha verification.", "error");
      }
      return;
    }

    const formData = getValues();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      to_name: "Ashok Patel",
      message: formData.message,
    };

    try {
      await sendMail(templateParams);
      showToast("Your message has been sent successfully!", "success");
      reset();
      setCaptchaVerified(false);
      reCaptchaRef.current?.reset();
    } catch (error) {
      showToast(
        "There was an error sending your message. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="w-[100%] lg:w-[30%] mx-auto bg-white shadow rounded-lg p-6 my-2 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <Image
          className="shadow-lg mb-4"
          src="https://filecenter.bestforagents.com/Customers/358381/fileManager/Ash_Patel.JPG?src=Custom"
          alt="Agent"
          width={200}
          height={200}
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Ashok (Ash) Patel
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">Broker</p>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Dir: 416-669-7892</p>
            <p>Bus: 905-497-6701</p>
            <p>Fax: 905-497-6700</p>
          </div>
        </div>
      </div>

      <form
        className="mt-6 flex flex-col gap-3"
        onSubmit={handleSubmit(submitForm)}
        noValidate
      >
        <Input
          register={register("name", {
            required: "Name is required",
          })}
          name="name"
          placeHolder="Your Name"
          error={errors.name}
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
            required: "Phone is required",
            validate: (value) =>
              value.length === 10 || "Phone number must be 10 digits",
            onChange: handlePhoneChange,
          })}
          name="phone"
          placeHolder="Your Phone"
          error={errors.phone}
        />

        <Input
          register={register("message", {
            required: "Information field is required",
          })}
          name="message"
          placeHolder="Please send me information about this property"
          error={errors.message}
          isTextArea
        />

        <div
          className="captcha"
          style={{ transform: "scale(0.85)", transformOrigin: "0 0" }}
        >
          <ReCAPTCHA
            ref={reCaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={() => setCaptchaVerified(true)}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-black dark:bg-slate-400 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
          disabled={!captchaVerified || isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Request More Info"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LeadForm;
