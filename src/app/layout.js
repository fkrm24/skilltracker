import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

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

export const metadata = {
  title: "Skill Tracker",
  description: "Suivez et améliorez vos compétences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navbar */}
        <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 shadow-lg z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Skill Tracker
            </h1>

            {/* Navigation Links */}
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/dashboard"
                  className="text-white text-lg font-medium hover:text-gray-200 transition-all duration-300"
                >
                  Dashboard
                </Link>
              </li>
              
              <li>
                <Link
                  href="/skills"
                  className="text-white text-lg font-medium hover:text-gray-200 transition-all duration-300"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="text-white text-lg font-medium hover:text-gray-200 transition-all duration-300"
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="text-white text-lg font-medium hover:text-gray-200 transition-all duration-300"
                >
                  Tasks
                </Link>
              </li>
            </ul>

            {/* Profile Icon */}
            <div className="flex items-center space-x-4">
              <img
                src="/profile-placeholder.png"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white hover:border-gray-200 transition-all duration-300"
              />
            </div>
          </div>
        </nav>

        {/* Header */}
        <header className="pt-20 pb-10 bg-gradient-to-b from-blue-500 via-purple-600 to-transparent text-white text-center shadow-md">
          <h1 className="text-4xl font-extrabold">Skill Tracker</h1>
          <p className="text-lg mt-4 max-w-3xl mx-auto">
            Gérez vos compétences, organisez votre calendrier et dépassez vos
            objectifs !
          </p>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white text-center py-6">
          <p className="text-sm">
            © 2025 Skill Tracker. Tous droits réservés.
          </p>
        </footer>
      </body>
    </html>
  );
}
