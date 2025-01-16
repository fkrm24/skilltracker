import { useState } from 'react';

export default function SkillModal({ onClose, onAddSkill }) {
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState('');

  // Valider et ajouter une compétence
  const handleAddSkill = (event) => {
    event.preventDefault();

    if (!newSkill.trim()) {
      setError('Veuillez entrer une compétence valide.');
      return;
    }

    onAddSkill(newSkill);
    setNewSkill('');
    setError('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Nouvelle compétence
        </h2>
        <form onSubmit={handleAddSkill}>
          {/* Input for New Skill */}
          <div>
            <label
              htmlFor="newSkill"
              className="block text-sm font-medium text-gray-700"
            >
              Nom de la compétence
            </label>
            <input
              id="newSkill"
              name="newSkill"
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              required
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Error Message */}
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

          {/* Modal Buttons */}
          <div className="mt-4 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
