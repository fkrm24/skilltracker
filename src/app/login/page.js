'use client'; // Nécessaire pour les hooks React dans Next.js

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Pour la redirection après connexion
import Link from 'next/link'; // Pour le lien vers la page d'inscription

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (username && password) {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        // Lire une seule fois la réponse JSON
        const result = await response.json();

        if (response.ok) {
          localStorage.setItem('username', result.user.username); // Sauvegarder le nom de l'utilisateur
          router.push('/dashboard'); // Rediriger vers le Dashboard
        } else {
          setError(result.error || 'Nom d’utilisateur ou mot de passe incorrect.');
        }
      } else {
        setError('Veuillez remplir tous les champs.');
      }
    } catch (err) {
      setError("Une erreur s'est produite, veuillez réessayer.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-md shadow-md hover:opacity-90 transition"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Pas encore de compte ?{' '}
          <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
            Inscrivez-vous ici
          </Link>
        </p>
      </div>
    </div>
  );
}
