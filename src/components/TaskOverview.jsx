// src/components/TaskOverview.js
import React from 'react';

function TaskOverview() {
  return (
    <section className="bg-gradient-to-r from-pink-500 to-indigo-600 p-6 rounded-xl shadow-lg text-white mt-6">
      <h2 className="text-3xl font-bold mb-4 text-center transform hover:scale-105 transition duration-300 ease-in-out">
        Tâches en cours
      </h2>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 p-4 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
          <span className="text-xl font-semibold">Créer le composant Sidebar</span>
        </li>
        <li className="flex items-center space-x-3 p-4 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
          <span className="text-xl font-semibold">Ajouter des styles globaux</span>
        </li>
        <li className="flex items-center space-x-3 p-4 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
          <span className="text-xl font-semibold">Intégrer le système de navigation</span>
        </li>
      </ul>
    </section>
  );
}

export default TaskOverview;

