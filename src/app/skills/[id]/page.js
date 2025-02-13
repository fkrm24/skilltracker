'use client'; 

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import TaskModal from '../../../components/TaskModal';

export default function SkillDetails() {
  const { id } = useParams(); 
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const fetchTasks = async () => {
    const response = await fetch(`/api/tasks?skillId=${id}`);
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async (taskData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: taskData.description,
          dueDate: taskData.dueDate,
          skillId: parseInt(id),
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de la tâche');
      }

      const addedTask = await response.json();
      setTasks([...tasks, addedTask]);
      alert('Tâche ajoutée avec succès !');
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la tâche');
      }

      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed: !currentStatus } : task
      ));
    } catch (error) {
      alert(error.message);
    }
  };

  const startEditing = (task) => {
    setEditingTask({
      ...task,
      dueDate: new Date(task.dueDate).toISOString().split('T')[0]
    });
  };

  const saveEdit = async () => {
    try {
      const response = await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: editingTask.description,
          dueDate: editingTask.dueDate
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification de la tâche');
      }

      setTasks(tasks.map(task =>
        task.id === editingTask.id ? editingTask : task
      ));
      setEditingTask(null);
      alert('Tâche modifiée avec succès !');
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la tâche');
      }

      setTasks(tasks.filter(task => task.id !== taskId));
      alert('Tâche supprimée avec succès !');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/skills" className="text-white hover:text-gray-200 mb-4 inline-block">
              ← Retour aux compétences
            </Link>
            <h1 className="text-3xl font-semibold text-white mt-4">Tâches pour cette compétence</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Ajouter une tâche
          </button>
        </div>

        {isModalOpen && (
          <TaskModal
            onClose={() => setIsModalOpen(false)}
            onAddTask={addTask}
            skillId={id}
          />
        )}

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white text-lg">Aucune tâche pour le moment</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-lg shadow-lg p-4 transform hover:scale-[1.02] transition-transform duration-300 ${
                  task.completed ? 'bg-green-50' : ''
                }`}
              >
                {editingTask && editingTask.id === task.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editingTask.description}
                      onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="date"
                      value={editingTask.dueDate}
                      onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingTask(null)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Sauvegarder
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className={`text-lg ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                        {task.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        Échéance : {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleTaskCompletion(task.id, task.completed)}
                        className={`p-1 rounded-full ${
                          task.completed ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-600'
                        }`}
                        title={task.completed ? "Marquer comme non terminée" : "Marquer comme terminée"}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => startEditing(task)}
                        className="p-1 text-blue-600 hover:text-blue-700 rounded-full"
                        title="Modifier"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-red-600 hover:text-red-700 rounded-full"
                        title="Supprimer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
