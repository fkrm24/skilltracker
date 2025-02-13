import { useState } from 'react';

export default function SkillModal({ onClose, onAddSkill, onUpdateSkill, initialSkill }) {
  const [newSkill, setNewSkill] = useState(initialSkill ? initialSkill.name : '');
  const [level, setLevel] = useState(initialSkill ? initialSkill.level : 0); // État pour le niveau
  const [error, setError] = useState('');

  // Valider et ajouter une compétence
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newSkill && level >= 0) {
        if (initialSkill) {
          // Mode modification
          await onUpdateSkill(initialSkill.id, { name: newSkill, level });
          onClose();
        } else {
          // Mode ajout
          await onAddSkill({ name: newSkill, level });
          setNewSkill(''); // Réinitialiser le champ de la compétence
          setLevel(0); // Réinitialiser le niveau
        }
      } else {
        setError('Veuillez remplir tous les champs.');
      }
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {initialSkill ? 'Modifier la compétence' : 'Nouvelle compétence'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Input for New Skill */}
          <div className="mb-4">
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

          {/* Input for Skill Level */}
          <div className="mb-4">
            <label
              htmlFor="skillLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Niveau (0 - 100)
            </label>
            <input
              id="skillLevel"
              name="skillLevel"
              type="number"
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
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
              {initialSkill ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
