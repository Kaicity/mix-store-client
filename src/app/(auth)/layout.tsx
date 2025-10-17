import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập để nhận được nhiều ưu đãi hơn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="px-3 py-2 sm:px-0 sm:py-0 mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
          {children}
        </main>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
