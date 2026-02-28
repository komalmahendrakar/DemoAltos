import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Altus — Premium Corporate Solutions",
  description:
    "Altus is a premium corporate solutions provider delivering world-class results with innovative strategies and cutting-edge technology.",
  keywords: ["Altus", "corporate", "premium", "solutions", "enterprise"],
  authors: [{ name: "Altus Team" }],
  openGraph: {
    title: "Altus — Premium Corporate Solutions",
    description:
      "Altus is a premium corporate solutions provider delivering world-class results.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
