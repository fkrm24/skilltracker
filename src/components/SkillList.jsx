import React from 'react';

function SkillList() {
  return (
    <section className="skill-list bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3">
      <h2 className="text-3xl font-bold text-gray-100 mb-4">Compétences</h2>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 p-4 bg-gray-700 text-blue-300 rounded-lg shadow-md hover:bg-blue-400 hover:text-gray-900 transition duration-300">
          <span className="text-lg">JavaScript - Niveau : Intermédiaire</span>
        </li>
        <li className="flex items-center space-x-3 p-4 bg-gray-700 text-blue-300 rounded-lg shadow-md hover:bg-blue-400 hover:text-gray-900 transition duration-300">
          <span className="text-lg">React - Niveau : Avancé</span>
        </li>
        <li className="flex items-center space-x-3 p-4 bg-gray-700 text-blue-300 rounded-lg shadow-md hover:bg-blue-400 hover:text-gray-900 transition duration-300">
          <span className="text-lg">Node.js - Niveau : Débutant</span>
        </li>
      </ul>
    </section>
  );
}

export default SkillList;
