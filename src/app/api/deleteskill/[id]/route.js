import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await prisma.skill.delete({
      where: { id: parseInt(id) }
    });
    return new Response(JSON.stringify({ message: 'Compétence supprimée avec succès.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Erreur lors de la suppression de la compétence',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await prisma.$disconnect();
  }
}
