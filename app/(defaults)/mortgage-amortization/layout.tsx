import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iota | Mortgage Amortization Calculator",
  description: "Discover your dream home with TNC Homeland Real Estate.",
};
export default function MortgageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <>{children}</>
    </>
  );
}
