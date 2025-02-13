import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      where: {
        userId: 1 // ID utilisateur fixe
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Erreur lors de la récupération des compétences:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des compétences' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}