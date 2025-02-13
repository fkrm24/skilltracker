'use client';

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Charger les tâches
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks/all');
      if (response.ok) {
        const data = await response.json();
        const calendarEvents = data.map(task => ({
          id: task.id.toString(),
          title: task.description,
          start: task.dueDate,
          end: task.dueDate,
          backgroundColor: task.completed ? '#E8FFF5' : '#EFF6FF', // Fond clair
          borderColor: task.completed ? '#059669' : '#2563EB', // Bordure colorée
          textColor: task.completed ? '#059669' : '#1E40AF', // Texte en bleu foncé
          classNames: ['calendar-event'],
          extendedProps: {
            skillId: task.skillId,
            completed: task.completed
          }
        }));
        setTasks(calendarEvents);
      }
    };

    const fetchSkills = async () => {
      const response = await fetch('/api/getskills');
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    };

    fetchTasks();
    fetchSkills();
  }, []);

  const handleEventClick = (clickInfo) => {
    const task = clickInfo.event;
    const skill = skills.find(s => s.id === task.extendedProps.skillId);
    
    alert(`
      Tâche: ${task.title}
      Date d'échéance: ${new Date(task.start).toLocaleDateString()}
      Statut: ${task.extendedProps.completed ? 'Terminée' : 'En cours'}
      Compétence: ${skill ? skill.name : 'Non spécifiée'}
    `);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-white mb-8">Calendrier des tâches</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <style jsx global>{`
            /* Styles pour le calendrier */
            .fc {
              background-color: white;
            }
            
            /* En-têtes du calendrier */
            .fc .fc-toolbar-title {
              color: #1a202c;
              font-weight: 600;
            }
            
            /* Boutons du calendrier */
            .fc .fc-button {
              background-color: #2563EB;
              border-color: #1D4ED8;
              font-weight: 500;
              color: white;
            }
            
            .fc .fc-button:hover {
              background-color: #1D4ED8;
            }
            
            /* En-têtes des jours */
            .fc .fc-col-header-cell {
              background-color: #f3f4f6;
              padding: 8px;
            }
            
            .fc .fc-col-header-cell-cushion {
              color: #1f2937;
              font-weight: 600;
              padding: 6px;
            }
            
            /* Cellules des jours */
            .fc .fc-daygrid-day {
              background-color: white;
            }
            
            .fc .fc-daygrid-day-number {
              color: #1f2937;
              font-weight: 500;
              padding: 8px;
            }
            
            /* Événements */
            .fc-event {
              padding: 4px 6px !important;
              margin: 2px 0 !important;
              border-radius: 4px !important;
              border-width: 2px !important;
              background-color: transparent !important;
            }

            .fc-event-title {
              font-weight: 600 !important;
              font-size: 0.95rem !important;
              text-shadow: none !important;
            }

            .calendar-event {
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              transition: transform 0.1s ease-in-out;
            }

            .calendar-event:hover {
              transform: scale(1.02);
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              z-index: 5;
            }
            
            /* Aujourd'hui */
            .fc .fc-day-today {
              background-color: #EFF6FF !important;
            }
            
            /* Grille */
            .fc td, .fc th {
              border-color: #e5e7eb;
            }

            /* Style pour les événements en mode semaine/jour */
            .fc-timegrid-event .fc-event-title {
              font-size: 0.95rem !important;
              font-weight: 600 !important;
              padding: 2px 4px !important;
            }

            /* Amélioration de la visibilité du texte dans les petites cellules */
            .fc-daygrid-event {
              white-space: normal !important;
              overflow: hidden !important;
              text-overflow: ellipsis !important;
              display: block !important;
              line-height: 1.3 !important;
            }

            /* Style spécifique pour le survol des événements */
            .fc-event:hover {
              background-color: #F8FAFC !important;
            }
          `}</style>
          
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={tasks}
            eventClick={handleEventClick}
            height="auto"
            locale="fr"
            buttonText={{
              today: "Aujourd'hui",
              month: 'Mois',
              week: 'Semaine',
              day: 'Jour'
            }}
          />
        </div>
      </div>
    </div>
  );
}
