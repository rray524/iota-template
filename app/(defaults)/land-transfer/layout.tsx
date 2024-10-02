import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iota | Land Transfer Calculator",
  description: "Discover your dream home with TNC Homeland Real Estate.",
};
export default function LandTransferLayout({
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
