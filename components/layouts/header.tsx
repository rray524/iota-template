"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/contexts/theme-context";
import Image from "next/image";
import { fieldLabel } from "@/assets/field-label";
import ToggleButton from "@/components/button/button-toggle";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setIsChecked(!isChecked);
    localStorage.setItem("isChecked", JSON.stringify(!isChecked));
  };

  useEffect(() => {
    const storedIsChecked = localStorage.getItem("isChecked");
    if (storedIsChecked !== null) {
      setIsChecked(JSON.parse(storedIsChecked));
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuItems = fieldLabel["menu-item"];

  return (
    <nav
      className={`flex flex-wrap items-center justify-between p-5 bg-gray-200 dark:bg-[#1b0a0a] transition-transform duration-300 fixed top-0 w-full z-50`}
    >
      <div className="flex justify-between items-center w-full md:hidden">
        <Link className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <svg
            className="h-8 w-8"
            fill="#0d9488"
            width="800px"
            height="800px"
            viewBox="0 0 50 50"
            version="1.2"
            baseProfile="tiny"
            xmlns="http://www.w3.org/2000/svg"
            overflow="inherit"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path d="M14.237 39.5h30.483v-26.081h-30.483v26.081zm15.489-23.485l10.99 9.598h-2.769v11.516h-6.436v-8.129h-4.065v8.129h-6.096v-11.516h-2.84l11.216-9.598zm-18.876-9.031v-5.966h-6.774v48.982h6.774v-39.967h35.226v-3.049z" />
            </g>
          </svg>
        </Link>
        <button
          id="hamburger"
          onClick={toggleMenu}
          className="flex items-center"
        >
          <div className="flex sm:gap-4 md:hidden w-full justify-between items-center my-4">
            <ToggleButton isChecked={isChecked} handleChange={handleChange} />
          </div>
          <Image
            className={`${isMenuOpen ? "!hidden" : "!block"}`}
            src="https://img.icons8.com/ios-filled/50/4dc0b5/xbox-menu.png"
            width="40"
            height="40"
            alt="Open Menu"
          />
          <Image
            className={`${isMenuOpen ? "!block" : "!hidden"}`}
            src="https://img.icons8.com/ios-filled/50/4dc0b5/cancel.png"
            width="40"
            height="40"
            alt="Close Menu"
          />
        </button>
      </div>
      <Link className="text-teal-600 md:block hidden" href="/">
        <span className="sr-only">Home</span>
        <svg
          className="h-8 w-8"
          fill="#0d9488"
          width="800px"
          height="800px"
          viewBox="0 0 50 50"
          version="1.2"
          baseProfile="tiny"
          xmlns="http://www.w3.org/2000/svg"
          overflow="inherit"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <path d="M14.237 39.5h30.483v-26.081h-30.483v26.081zm15.489-23.485l10.99 9.598h-2.769v11.516h-6.436v-8.129h-4.065v8.129h-6.096v-11.516h-2.84l11.216-9.598zm-18.876-9.031v-5.966h-6.774v48.982h6.774v-39.967h35.226v-3.049z" />
          </g>
        </svg>
      </Link>
      <div
        className={`toggle ${
          isMenuOpen ? "block" : "hidden"
        } w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-teal-900 md:border-none`}
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="block md:inline-block text-teal-800 dark:text-white text-xl hover:text-blue-500 px-3 py-3 border-b-2 border-teal-900 md:border-none"
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="hidden md:block">
        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4 items-center">
            <label
              htmlFor="AcceptConditions"
              className="relative h-8 w-14 cursor-pointer rounded-full dark:bg-[#44c3c3] bg-black transition [-webkit-tap-highlight-color:_transparent] peer-checked:bg-green-500"
            >
              <input
                type="checkbox"
                id="AcceptConditions"
                className="peer sr-only"
                checked={isChecked}
                onChange={handleChange}
              />
              <span className="absolute inset-y-0 left-0 m-1 size-6 rounded-full bg-white transition-all duration-300 ease-in-out peer-checked:left-6"></span>
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
