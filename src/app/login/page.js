'use client'; 
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [error, setError] = useState('');

  async function handleLogin(event) {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (user && user.password === password) {
        
        redirect('/dashboard');
      } else {
        setError('Nom d’utilisateur ou mot de passe incorrect');
      }
    } catch (error) {
      setError('Une erreur s\'est produite');
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      {/* Main content */}
      <div className="flex-1 p-8 flex items-center justify-center">
        {/* Card container */}
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Connexion</h1>

          {/* Formulaire de connexion */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Se connecter
              </button>
            </div>
          </form>

          {/* Inscription Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Inscrivez-vous ici
               </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}