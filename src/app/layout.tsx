import type { Metadata } from "next";
import Image from "next/image";

import "./globals.css";
import Link from "next/link";
import { ReactQueryClientProvider } from "./ClientProvider";

export const metadata: Metadata = {
  title: "Virgin Atlantic | Front End Coding Test",
  description: "Created by Virgin Atlantic Digital Team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className={`wrapper`}>
            <Link href="/">
              <Image
                src="/vah-logo.svg"
                alt="Virgin Atlantic Holidays logo"
                width={130}
                height={50}
                priority
              />
            </Link>
          </div>
        </header>
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  );
}
