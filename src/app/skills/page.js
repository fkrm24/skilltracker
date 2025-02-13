'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SkillModal from '../../components/SkillModal';

export default function SkillsPage() {
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState(null);

  // Charger l'utilisateur courant et ses compétences
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      router.push('/login');
      return;
    }
    setUsername(storedUsername);

    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/getskills');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des compétences.');
        }
        const skillsData = await response.json();
        setSkills(skillsData);
      } catch (error) {
        console.error(error);
        alert('Impossible de charger les compétences.');
      }
    };

    fetchSkills();
  }, [router]);

  // Ajouter une compétence
  const handleAddSkill = async (newSkill) => {
    if (!username) {
      alert('Vous devez être connecté pour ajouter une compétence.');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/addskill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newSkill.name,
          level: newSkill.level,
          userId: 1, // Utilisation de l'ID fixe
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur API :', errorData);
        throw new Error(errorData.error || "Erreur lors de l'ajout de la compétence.");
      }

      const savedSkill = await response.json();
      setSkills((prevSkills) => [...prevSkills, savedSkill]);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'ajout de la compétence.");
    }
  };

  // Supprimer une compétence
  const handleRemoveSkill = async (skillToRemove) => {
    if (!username) {
      alert('Vous devez être connecté pour supprimer une compétence.');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`/api/deleteskill/${skillToRemove.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la compétence.");
      }

      setSkills((prevSkills) =>
        prevSkills.filter((skill) => skill.id !== skillToRemove.id)
      );
    } catch (error) {
      console.error(error);
      alert("Impossible de supprimer la compétence.");
    }
  };

  if (!username) {
    return <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-6 flex items-center justify-center">
      <div className="text-white text-center">
        <p className="text-xl mb-4">Veuillez vous connecter pour accéder à vos compétences</p>
        <Link href="/login" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50">
          Se connecter
        </Link>
      </div>
    </div>;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-6 pt-24">
      {/* Bouton Ajouter une compétence */}
      <div className="absolute top-24 right-6">
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
              <Link key={skill.id} href={`/skills/${skill.id}`}>
                <div
                  className="relative group bg-blue-500 text-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
                >
                  <span className="text-center font-semibold">{skill.name}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Empêche le lien de s'ouvrir quand on clique sur supprimer
                      handleRemoveSkill(skill);
                    }}
                    className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
                  >
                    &times;
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-200 text-center">Aucune compétence ajoutée pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
