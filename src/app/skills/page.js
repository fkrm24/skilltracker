'use client';

import { useState, useEffect } from 'react';
import SkillModal from '../../components/SkillModal';

export default function SkillsPage() {
  const [skills, setSkills] = useState([]); // Liste des compétences
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Charger les compétences au montage du composant
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/getskills'); // Appelle l'API pour récupérer les compétences
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des compétences.');
        }
        const skillsData = await response.json();
        setSkills(skillsData); // Met à jour l'état avec les compétences récupérées
      } catch (error) {
        console.error(error);
        alert('Impossible de charger les compétences.');
      }
    };

    fetchSkills(); // Appelle la fonction au chargement
  }, []); // Le tableau vide assure que l'effet est exécuté uniquement une fois

  // Ajouter une compétence
  const handleAddSkill = async (newSkill) => {
    try {
      const response = await fetch('/api/addskill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newSkill.name,
          level: newSkill.level,
          userId: 1, // Remplace par un vrai ID utilisateur
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur API :', errorData);
        throw new Error(errorData.error || "Erreur lors de l'ajout de la compétence.");
      }

      const savedSkill = await response.json();
      setSkills((prevSkills) => [...prevSkills, savedSkill]); // Ajoute la nouvelle compétence à la liste
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'ajout de la compétence.");
    }
  };

  // Supprimer une compétence
  const handleRemoveSkill = async (skillToRemove) => {
    try {
      const response = await fetch(`/api/deleteskill/${skillToRemove.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la compétence.");
      }

      setSkills((prevSkills) =>
        prevSkills.filter((skill) => skill.id !== skillToRemove.id)
      ); // Supprime localement la compétence
    } catch (error) {
      console.error(error);
      alert("Impossible de supprimer la compétence.");
    }
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
            skills.map((skill) => (
              <div
                key={skill.id} // Utilise l'ID comme clé
                className="relative group bg-blue-500 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg hover:scale-105 transition duration-300"
              >
                <span className="text-center font-semibold">{skill.name}</span> {/* Affiche le nom de la compétence */}
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
