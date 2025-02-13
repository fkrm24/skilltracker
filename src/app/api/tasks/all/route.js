import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer toutes les tâches avec leurs compétences associées
    const tasks = await prisma.task.findMany({
      include: {
        Skill: true
      }
    });

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération des tâches' }), 
      { status: 500 }
    );
  }
}
