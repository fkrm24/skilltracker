'use client';
import React, { useEffect, useState } from 'react';

function Header() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Récupérer le nom de l'utilisateur depuis le local storage ou l'API
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white rounded-lg shadow-lg mt-6">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 transform hover:scale-105 transition duration-300 ease-in-out text-center">
        {username ? `Bienvenue, ${username}` : 'Bienvenue sur SkillTracker'}
      </h1>
      <p className="text-xl text-center text-blue-200 mt-4">
        Prêt à suivre tes compétences ?
      </p>
    </header>
  );
}

export default Header;
