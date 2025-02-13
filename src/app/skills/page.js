'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SkillModal from '../../components/SkillModal';
import dynamic from 'next/dynamic';

// Import dynamique de react-confetti pour éviter les erreurs SSR
const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

export default function SkillsPage() {
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [skillProgress, setSkillProgress] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedSkill, setCompletedSkill] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);

  // Charger l'utilisateur courant et ses compétences
  useEffect(() => {
    // Vérifier s'il y a des confettis à afficher
    const shouldShowConfetti = localStorage.getItem('showConfetti') === 'true';
    const completedSkillName = localStorage.getItem('completedSkill');
    
    if (shouldShowConfetti && completedSkillName) {
      setShowConfetti(true);
      setCompletedSkill(completedSkillName);
      // Nettoyer le localStorage
      localStorage.removeItem('showConfetti');
      localStorage.removeItem('completedSkill');
    }

    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      router.push('/login');
      return;
    }
    setUsername(storedUsername);

    const fetchSkillsAndProgress = async () => {
      try {
        // Récupérer les compétences
        const skillsResponse = await fetch('/api/getskills');
        if (!skillsResponse.ok) {
          throw new Error('Erreur lors du chargement des compétences.');
        }
        const skillsData = await skillsResponse.json();
        setSkills(skillsData);

        // Récupérer les tâches pour chaque compétence
        const progressData = {};
        for (const skill of skillsData) {
          const tasksResponse = await fetch(`/api/tasks?skillId=${skill.id}`);
          if (tasksResponse.ok) {
            const tasks = await tasksResponse.json();
            const completedTasks = tasks.filter(task => task.completed).length;
            const totalTasks = tasks.length;
            progressData[skill.id] = {
              progress: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
              isComplete: totalTasks > 0 && completedTasks === totalTasks
            };
          }
        }
        setSkillProgress(progressData);
      } catch (error) {
        console.error(error);
        alert('Impossible de charger les compétences.');
      }
    };

    fetchSkillsAndProgress();
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
      {/* Stats en haut */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-12 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/20 rounded-lg p-4 text-white text-center">
            <h3 className="text-lg font-semibold mb-2">Total Compétences</h3>
            <p className="text-3xl font-bold">{skills.length}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-white text-center">
            <h3 className="text-lg font-semibold mb-2">Compétences Complétées</h3>
            <p className="text-3xl font-bold">
              {Object.values(skillProgress).filter(p => p.isComplete).length}
            </p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 text-white text-center">
            <h3 className="text-lg font-semibold mb-2">Progression Globale</h3>
            <p className="text-3xl font-bold">
              {Math.round(Object.values(skillProgress).reduce((acc, curr) => acc + curr.progress, 0) / (skills.length || 1))}%
            </p>
          </div>
        </div>
      </div>
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
          editingSkill={editingSkill}
        />
      )}

      {/* Liste des compétences */}
      <div className="mt-8">
        <h1 className="text-3xl font-semibold text-center text-white mb-12">
          Gestion des Compétences
        </h1>
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 justify-items-center">
          {showConfetti && completedSkill && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <ReactConfetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={500}
                onConfettiComplete={() => {
                  setShowConfetti(false);
                  setCompletedSkill(null);
                }}
              />
              <div className="bg-white p-6 rounded-lg shadow-xl z-10 text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  Félicitations !
                </h2>
                <p className="text-gray-700">
                  Vous avez terminé toutes les tâches pour la compétence "{completedSkill}" !
                </p>
              </div>
            </div>
          )}
          {skills.length > 0 ? (
            skills.map((skill) => {
              const progress = skillProgress[skill.id]?.progress || 0;
              const isComplete = skillProgress[skill.id]?.isComplete || false;
              
              return (
                <Link key={skill.id} href={`/skills/${skill.id}`}>
                  <div className="relative group w-40 h-40">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-lg rounded-full px-3 py-1 text-white text-sm font-medium">
                      Niveau {skill.level || 1}
                    </div>
                    <div
                      className="absolute inset-0 bg-green-500 rounded-full"
                      style={{
                        clipPath: `inset(${100 - progress}% 0 0 0)`,
                        transition: 'clip-path 1s ease-in-out'
                      }}
                    />
                    <div
                      className={`relative w-full h-full flex items-center justify-center rounded-full shadow-lg hover:scale-105 transition duration-300 cursor-pointer ${
                        isComplete ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                    >
                      <span className="text-center font-semibold text-white text-lg px-2">{skill.name}</span>
                      <div className="absolute top-0 right-0 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setEditingSkill(skill);
                            setIsModalOpen(true);
                          }}
                          className="p-2 bg-yellow-500/80 hover:bg-yellow-500 text-white rounded-lg transition-colors duration-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveSkill(skill);
                          }}
                          className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors duration-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-gray-200 text-center">Aucune compétence ajoutée pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
