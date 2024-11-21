// src/components/SkillList.js
import React from 'react';

function SkillList() {
  return (
    <section className="skill-list bg-gray-800 text-white p-6 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Compétences</h2>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 p-4 bg-gray-700 text-blue-300 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
          <span className="text-lg">JavaScript - Niveau : Intermédiaire</span>
        </li>
        <li className="flex items-center space-x-3 p-4 bg-gray-700 text-blue-300 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
          <span className="text-lg">React - Niveau : Avancé</span>
        </li>
        <li className="flex items-center space-x-3 p-4 bg-gray-700 text-blue-300 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
          <span className="text-lg">Node.js - Niveau : Débutant</span>
        </li>
      </ul>
    </section>
  );
}

export default SkillList;
