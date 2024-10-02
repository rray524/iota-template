import { FooterSection } from "@/types/footer-types";
import ContactButton from "../button/button-contact";
import FooterMenu from "../menu/footer-menu";
import { fieldLabel } from "@/assets/field-label";
import { socialMediaLinks } from "@/helpers/social-media-links";
import SocialMediaLink from "../footer/social-media-links";
const footerSections: FooterSection[] = [
  {
    title: "Ashok ( Ash ) Patel",
    links: [
      { label: "SAVE MAX ACHIEVERS REALTY, Brokerage", href: "#" },
      {
        label:
          "Independently owned and operated.<br/>9 MILMINK ST, Toronto, Nunavut M9W3N3 <br/><br/>ashpatelrealtor@gmail.com",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#1b0a0a]">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-indigo-600 p-6 shadow-lg sm:flex-row sm:justify-between">
          <strong className="text-xl text-white sm:text-xl">
            {fieldLabel["cpa-footer-title"]}
          </strong>

          <ContactButton
            text="Let's Get Started"
            href="/contact"
            textColor="indigo-600"
            bgColor="white"
            hoverBgColor="transparent"
            hoverTextColor="white"
          />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3 justify-items-center lg:justify-items-start">
          <FooterMenu sections={footerSections} />
        </div>
        <div className="mt-16">
          <ul className="flex justify-center gap-6 lg:justify-end">
            {socialMediaLinks.map((link) => (
              <SocialMediaLink
                key={link.label}
                href={link.href}
                label={link.label}
                svgPath={link.svgPath}
              />
            ))}
          </ul>

          <div className="mt-16">
            <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0">
              {fieldLabel["copyright-text"]}
              <br />
              <br />
              {fieldLabel["copyright-text-additional"]}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
