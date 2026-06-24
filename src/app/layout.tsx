import type { Metadata } from "next";
import { DevTools } from "@/components/devtools/DevTools";
import "./globals.css";

export const metadata: Metadata = {
  title: "acm-asteria",
  description: "Team Hague — FEU Tech Journey to Asteria Techsprint",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <DevTools />
      </body>
    </html>
  );
}
