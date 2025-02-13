"use client";

import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthPage = ["/login", "/signup", "/"].includes(pathname);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const username = localStorage.getItem('username');
    setIsAuthenticated(!!username);

    // Si l'utilisateur n'est pas connecté et essaie d'accéder à une page protégée
    if (!username && !isAuthPage) {
      router.push('/login');
    }
    // Si l'utilisateur est connecté et essaie d'accéder aux pages d'auth
    else if (username && isAuthPage) {
      router.push('/dashboard');
    }
  }, [pathname, isAuthPage, router]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {isAuthenticated && !isAuthPage && (
          <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 shadow-lg z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white tracking-wide">Skill Tracker</h1>
              <ul className="flex space-x-8">
                <li>
                  <Link href="/dashboard" className="text-white text-lg font-medium hover:text-gray-200 transition-all duration-300">Dashboard</Link>
                </li>
                <li>
                  <Link href="/skills" className="text-white text-lg font-medium hover:text-gray-200 transition-all duration-300">Skills</Link>
                </li>
                <li>
                  <Link href="/calendar" className="text-white text-lg font-medium hover:text-gray-200 transition-all duration-300">Calendar</Link>
                </li>
                <li>
                  <Link href="/tasks" className="text-white text-lg font-medium hover:text-gray-200 transition-all duration-300">Tasks</Link>
                </li>
              </ul>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => {
                    localStorage.removeItem('username');
                    router.push('/login');
                  }}
                  className="text-white hover:text-gray-200 transition-all duration-300"
                >
                  Déconnexion
                </button>
                <img src="/profile-placeholder.png" alt="Profile" className="w-10 h-10 rounded-full border-2 border-white hover:border-gray-200 transition-all duration-300" />
              </div>
            </div>
          </nav>
        )}
        <main className={`container mx-auto px-6 ${!isAuthPage ? 'pt-24' : ''} py-8`}>{children}</main>
      </body>
    </html>
  );
}
