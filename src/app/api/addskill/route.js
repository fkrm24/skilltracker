import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    
    const newSkill = await prisma.skill.create({
      data: {
        ...data,
        userId: 1 // ID utilisateur fixe
      }
    });

    return NextResponse.json(newSkill);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la compétence:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout de la compétence' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}