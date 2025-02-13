import React, { useState, useEffect } from 'react';

function SkillList() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/getskills');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des compétences');
        }
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section className="skill-list bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3">
      <h2 className="text-3xl font-bold text-gray-100 mb-4">Compétences</h2>
      <ul className="space-y-4">
        {skills.map((skill) => (
          <li 
            key={skill.id}
            className="flex items-center space-x-3 p-4 bg-gray-700 text-blue-300 rounded-lg shadow-md hover:bg-blue-400 hover:text-gray-900 transition duration-300"
          >
            <span className="text-lg">{skill.name} - Niveau : {skill.level}</span>
          </li>
        ))}
        {skills.length === 0 && (
          <li className="text-gray-400 text-center p-4">
            Aucune compétence trouvée
          </li>
        )}
      </ul>
    </section>
  );
}

export default SkillList;
