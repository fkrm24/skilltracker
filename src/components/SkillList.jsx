// src/components/SkillList.js
import React from 'react';

function SkillList() {
  return (
    <section className="bg-gradient-to-r from-teal-400 to-purple-500 p-6 rounded-xl shadow-xl text-white mt-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Compétences</h2>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 p-4 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
          <span className="text-xl font-semibold">JavaScript</span>
          <span className="ml-auto text-gray-500">Niveau : Intermédiaire</span>
        </li>
        <li className="flex items-center space-x-3 p-4 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
          <span className="text-xl font-semibold">React</span>
          <span className="ml-auto text-gray-500">Niveau : Avancé</span>
        </li>
        <li className="flex items-center space-x-3 p-4 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
          <span className="text-xl font-semibold">Node.js</span>
          <span className="ml-auto text-gray-500">Niveau : Débutant</span>
        </li>
      </ul>
    </section>
  );
}

export default SkillList;
