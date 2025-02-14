import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, name, level } = data;

    if (!id) {
      return NextResponse.json({ message: 'ID requis pour la mise à jour' }, { status: 400 });
    }

    if (!name || !level) {
      return NextResponse.json({ message: 'Le nom et le niveau sont requis' }, { status: 400 });
    }

    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: { 
        name, 
        level: parseInt(level) 
      },
    });

    return NextResponse.json({ message: 'Compétence mise à jour avec succès', skill: updatedSkill });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la compétence:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'Compétence non trouvée' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Erreur lors de la mise à jour de la compétence' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
