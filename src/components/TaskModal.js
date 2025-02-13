import { useState } from 'react';

export default function TaskModal({ onClose, onAddTask, skillId }) {
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!newTask || !dueDate) {
        setError('Veuillez remplir tous les champs.');
        return;
      }

      await onAddTask({ description: newTask, dueDate });
      setNewTask('');
      setDueDate('');
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Nouvelle tâche
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="taskDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <input
              id="taskDescription"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Décrivez la tâche..."
            />
          </div>

          <div>
            <label
              htmlFor="taskDueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date d'échéance
            </label>
            <input
              id="taskDueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
