import React from 'react';



function Header() {
  return (
    <header className="bg-gradient-to-r from-teal-400 to-purple-500 p-8 text-center rounded-lg shadow-lg text-white mb-6">
      <h1 className="text-4xl font-extrabold leading-tight mb-4 transform hover:scale-105 transition duration-300 ease-in-out">
        Bienvenue sur <span className="text-yellow-400">SkillTracker</span>
      </h1>
      <p className="text-xl font-medium italic opacity-90">
        Prêt à suivre tes compétences ?
      </p>
    </header>
  );
}

export default Header;
