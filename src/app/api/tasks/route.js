import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const skillId = parseInt(searchParams.get('skillId'));
  
    console.log('skillId:', skillId); // Déboguer ici
  
    if (!skillId) {
      return new Response(JSON.stringify({ error: 'ID de compétence requis' }), { status: 400 });
    }
  
    const tasks = await prisma.task.findMany({
      where: { skillId: skillId },
    });
  
    return new Response(JSON.stringify(tasks), { status: 200 });
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
