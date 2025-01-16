// /src/app/api/getskills/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany(); // Récupère toutes les compétences
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Erreur lors de la récupération des compétences :', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des compétences.' },
      { status: 500 }
    );
  }
}
