// src/components/TaskOverview.js
import React from 'react';

function TaskOverview() {
  return (
    <section className="task-overview bg-gray-800 text-white p-6 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Tâches en cours</h2>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 p-4 bg-gray-700 text-yellow-400 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
          <span className="text-lg">Créer le composant Sidebar</span>
        </li>
        <li className="flex items-center space-x-3 p-4 bg-gray-700 text-yellow-400 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
          <span className="text-lg">Ajouter des styles globaux</span>
        </li>
        <li className="flex items-center space-x-3 p-4 bg-gray-700 text-yellow-400 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
          <span className="text-lg">Intégrer le système de navigation</span>
        </li>
      </ul>
    </section>
  );
}

export default TaskOverview;
