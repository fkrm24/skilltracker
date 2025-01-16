import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Crée une nouvelle instance Prisma

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, level, userId } = body;

    const newSkill = await prisma.skill.create({
      data: {
        name,
        level,
        userId,
      },
    });

    return NextResponse.json(newSkill);
  } catch (error) {
    console.error('Erreur lors de la création de la compétence :', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la compétence.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Ferme la connexion Prisma après chaque requête
  }
}
