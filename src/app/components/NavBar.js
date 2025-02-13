'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAuthPage = ['/login', '/signup', '/'].includes(pathname);

  if (isAuthPage || !session) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 shadow-lg z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-wide">Skill Tracker</h1>
        <ul className="flex space-x-8">
          <li>
            <Link href="/dashboard" className="text-white text-lg font-medium hover:text-gray-200 transition-all duration-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/skills" className="text-white text-lg font-medium hover:text-gray-200 transition-all duration-300">
              Skills
            </Link>
          </li>
          <li>
            <Link href="/calendar" className="text-white text-lg font-medium hover:text-gray-200 transition-all duration-300">
              Calendar
            </Link>
          </li>
          <li>
            <Link href="/tasks" className="text-white text-lg font-medium hover:text-gray-200 transition-all duration-300">
              Tasks
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-white hover:text-gray-200 transition-all duration-300"
          >
            Déconnexion
          </button>
          <img
            src="/profile-placeholder.png"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white hover:border-gray-200 transition-all duration-300"
          />
        </div>
      </div>
    </nav>
  );
}
