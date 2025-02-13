import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Mettre à jour une tâche (complétion ou modification)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    // Vérifier si la tâche existe
    const existingTask = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingTask) {
      return new Response(
        JSON.stringify({ error: 'Tâche non trouvée' }), 
        { status: 404 }
      );
    }

    // Mettre à jour la tâche
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        ...(data.completed !== undefined && { completed: data.completed }),
        ...(data.description && { description: data.description }),
        ...(data.dueDate && { dueDate: new Date(data.dueDate) }),
      },
    });

    return new Response(JSON.stringify(updatedTask), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la mise à jour de la tâche' }), 
      { status: 500 }
    );
  }
}

// Supprimer une tâche
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Vérifier si la tâche existe
    const existingTask = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingTask) {
      return new Response(
        JSON.stringify({ error: 'Tâche non trouvée' }), 
        { status: 404 }
      );
    }

    // Supprimer la tâche
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ message: 'Tâche supprimée avec succès' }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la suppression de la tâche' }), 
      { status: 500 }
    );
  }
}
