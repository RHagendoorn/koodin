import Link from "next/link";
import "./globals.css";

import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Koodin Assessment</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white">
        <div className="flex h-screen">
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-white shadow p-4 text-lg font-semibold">
              <Link href="/">Koodin Interview Assessment</Link>
            </header>

            <main className="bg-gray-100 flex-1 p-4 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
