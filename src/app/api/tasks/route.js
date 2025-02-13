import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const skillId = searchParams.get('skillId');
  
      // Récupérer l'utilisateur connecté (userId fixe pour le moment)
      const userId = 1;
  
      let whereClause = {};
  
      if (skillId) {
        // Si un skillId spécifique est demandé, vérifier qu'il appartient à l'utilisateur
        const skill = await prisma.skill.findFirst({
          where: {
            id: parseInt(skillId),
            userId: userId
          }
        });
  
        if (!skill) {
          return new Response(JSON.stringify({
            error: 'Compétence non trouvée ou non autorisée'
          }), { status: 404 });
        }
  
        // Utiliser le skillId spécifique
        whereClause.skillId = parseInt(skillId);
      } else {
        // Si aucun skillId n'est spécifié, récupérer les tâches de toutes les compétences de l'utilisateur
        const userSkills = await prisma.skill.findMany({
          where: { userId: userId },
          select: { id: true }
        });
  
        whereClause.skillId = { in: userSkills.map(skill => skill.id) };
      }
  
      const tasks = await prisma.task.findMany({
        where: whereClause,
        include: {
          Skill: true
        },
        orderBy: {
          dueDate: 'asc'
        }
      });
  
      return new Response(JSON.stringify(tasks), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Erreur détaillée lors de la récupération des tâches:', error);
      return new Response(JSON.stringify({
        error: 'Erreur lors de la récupération des tâches',
        details: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    } finally {
      await prisma.$disconnect();
    }
  }
  

// Exemple d'API côté serveur
export async function POST(request) {
    try {
        const data = await request.json();

        if (!data.description || !data.dueDate || !data.skillId) {
            return new Response(JSON.stringify({ error: 'Tous les champs sont requis.' }), { status: 400 });
        }

        // Création de la tâche dans la base de données
        const newTask = await prisma.task.create({
            data: {
                description: data.description,
                dueDate: new Date(data.dueDate),
                skillId: parseInt(data.skillId),
                completed: false
            }
        });

        return new Response(JSON.stringify(newTask), { status: 201 });
    } catch (error) {
        console.error('Erreur lors de la création de la tâche:', error);
        return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
    }
}

export async function PUT(req) {
  const { completed } = await req.json();
  const { searchParams } = new URL(req.url);
  const taskId = parseInt(searchParams.get('taskId'));

  if (!taskId) {
    return new Response(JSON.stringify({ error: 'ID tâche requis' }), { status: 400 });
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { completed },
  });

  return new Response(JSON.stringify(updatedTask), { status: 200 });
}
