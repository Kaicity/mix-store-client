'use client';

import { HeroUIProvider } from '@heroui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <div className="bg-center bg-cover relative" style={{ backgroundImage: "url('/background.png')" }}>
        <div className="absolute inset-0 bg-black/40" />

        <main className="relative px-3 py-2 sm:px-0 sm:py-0 mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
          {children}
        </main>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
    </HeroUIProvider>
  );
}
