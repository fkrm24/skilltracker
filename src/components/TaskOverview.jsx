import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function TaskOverview() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des tâches');
        }
        const data = await response.json();
        
        // Filtrer pour n'afficher que les tâches non complétées
        const activeTasks = data.filter(task => !task.completed);
        
        // Trier par date d'échéance
        activeTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        
        // Ne garder que les 5 tâches les plus urgentes
        const urgentTasks = activeTasks.slice(0, 5);
        
        setTasks(urgentTasks);
        setError(null);
      } catch (error) {
        console.error('Erreur:', error);
        setError('Impossible de charger les tâches');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <section className="task-overview bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-bold text-gray-100 mb-4">Tâches urgentes</h2>
        <div className="text-gray-400 text-center p-4">Chargement...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="task-overview bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-bold text-gray-100 mb-4">Tâches urgentes</h2>
        <div className="text-red-400 text-center p-4">{error}</div>
      </section>
    );
  }

  return (
    <section className="task-overview bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3">
      <h2 className="text-3xl font-bold text-gray-100 mb-4">Tâches urgentes</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li 
            key={task.id}
            className="flex flex-col p-4 bg-gray-700 text-yellow-300 rounded-lg shadow-md hover:bg-yellow-400 hover:text-gray-900 transition duration-300"
          >
            <span className="text-lg font-medium">{task.description}</span>
            <div className="mt-2 text-sm text-gray-300">
              <span>Pour : {new Date(task.dueDate).toLocaleDateString()}</span>
              {task.Skill && (
                <Link href={`/skills/${task.Skill.id}`} className="ml-2 text-blue-300 hover:text-blue-400">
                  ({task.Skill.name})
                </Link>
              )}
            </div>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="text-gray-400 text-center p-4">
            Aucune tâche urgente
          </li>
        )}
      </ul>
      <div className="mt-4 text-center">
        <Link href="/skills" className="text-blue-300 hover:text-blue-400">
          Voir toutes les compétences et leurs tâches
        </Link>
      </div>
    </section>
  );
}

export default TaskOverview;
