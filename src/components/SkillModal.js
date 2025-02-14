import { useState } from 'react';

export default function SkillModal({ onClose, onAddSkill, onUpdateSkill, initialSkill }) {
  const [newSkill, setNewSkill] = useState(initialSkill ? initialSkill.name : '');
  const [level, setLevel] = useState(initialSkill ? initialSkill.level : 0);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!newSkill.trim()) {
      setError('Le nom de la compétence ne peut pas être vide.');
      return;
    }

    const numericLevel = parseFloat(level);
    if (isNaN(numericLevel) || numericLevel < 0 || numericLevel > 100) {
      setError('Le niveau doit être un nombre entre 0 et 100.');
      return;
    }

    try {
      if (initialSkill) {
        await onUpdateSkill(initialSkill.id, { name: newSkill, level: numericLevel });
      } else {
        await onAddSkill({ name: newSkill, level: numericLevel });
        setNewSkill('');
        setLevel(0);
      }
      onClose();
    } catch (error) {
      setError('Erreur lors de l\'enregistrement.');
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {initialSkill ? 'Modifier la compétence' : 'Nouvelle compétence'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Input for Skill Name */}
          <div className="mb-4">
            <label htmlFor="newSkill" className="block text-sm font-medium text-gray-700">
              Nom de la compétence
            </label>
            <input
              id="newSkill"
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              required
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Input for Skill Level */}
          <div className="mb-4">
            <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700">
              Niveau (0 - 100)
            </label>
            <input
              id="skillLevel"
              type="number"
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              min="0"
              max="100"
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
              disabled={!newSkill.trim()}
              className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {initialSkill ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
