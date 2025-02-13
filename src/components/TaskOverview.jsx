import React from 'react';

function TaskOverview() {
  return (
    <section className="task-overview bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3">
      <h2 className="text-3xl font-bold text-gray-100 mb-4">Tâches en cours</h2>
      <ul className="space-y-4">
        <li className="flex items-center space-x-3 p-4 bg-gray-700 text-yellow-300 rounded-lg shadow-md hover:bg-yellow-400 hover:text-gray-900 transition duration-300">
          <span className="text-lg">Créer le composant Sidebar</span>
        </li>
        <li className="flex items-center space-x-3 p-4 bg-gray-700 text-yellow-300 rounded-lg shadow-md hover:bg-yellow-400 hover:text-gray-900 transition duration-300">
          <span className="text-lg">Ajouter des styles globaux</span>
        </li>
        <li className="flex items-center space-x-3 p-4 bg-gray-700 text-yellow-300 rounded-lg shadow-md hover:bg-yellow-400 hover:text-gray-900 transition duration-300">
          <span className="text-lg">Intégrer le système de navigation</span>
        </li>
      </ul>
    </section>
  );
}

export default TaskOverview;
