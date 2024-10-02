import Link from "next/link";
import React from "react";

interface SocialMediaLinkProps {
  href: string;
  label: string;
  svgPath: string;
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({
  href,
  label,
  svgPath,
}) => {
  return (
    <li>
      <Link
        href={href}
        rel="noreferrer"
        target="_blank"
        className="text-teal-700 transition hover:text-teal-700/75"
      >
        <span className="sr-only">{label}</span>
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d={svgPath} clipRule="evenodd" />
        </svg>
      </Link>
    </li>
  );
};

export default SocialMediaLink;
