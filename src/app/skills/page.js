'use client';

import { useState } from 'react';
import SkillModal from '../../components/SkillModal';

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ajouter une compétence
  const handleAddSkill = (newSkill) => {
    setSkills((prevSkills) => [...prevSkills, newSkill]);
    setIsModalOpen(false);
    
  };

  // Supprimer une compétence
  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-6">
      {/* Bouton Ajouter une compétence */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Ajouter une compétence
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <SkillModal
          onClose={() => setIsModalOpen(false)}
          onAddSkill={handleAddSkill}
        />
      )}

      {/* Liste des compétences */}
      <div className="mt-16">
        <h1 className="text-3xl font-semibold text-center text-white mb-8">
          Gestion des Compétences
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div
                key={index}
                className="relative group bg-blue-500 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg hover:scale-105 transition duration-300"
              >
                <span className="text-center font-semibold">{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
                >
                  &times;
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-200 text-center">
              Aucune compétence ajoutée pour le moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
