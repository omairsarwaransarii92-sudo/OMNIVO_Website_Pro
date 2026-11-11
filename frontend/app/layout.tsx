import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OMNIVO | Custom Software, AI Agents & Apps",
  description: "Custom software, AI agents, web and mobile applications, and quality testing, scoped around a real business need.",
  icons: { icon: "/assets/omnivo-logo.webp" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}