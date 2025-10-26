import { ReactNode } from "react";
import Link from "next/link";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className="text-gray-800">
        <header className="flex justify-between items-center px-8 py-4 shadow-sm">
          <div className="text-2xl font-semibold">
            My Company
          </div>
          
          <nav className="flex items-center gap-4">
            <Link href="/en" className="hover:underline">English</Link>
            <Link href="/ko" className="hover:underline">한국어</Link>
          </nav>
        </header>

        <main className="max-w-4xl mx-auto py-12 px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
