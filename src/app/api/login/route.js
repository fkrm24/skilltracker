import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt-par-defaut';

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Nom d/utilisateur ou mot de passe incorrect.' },
        { status: 400 }
      );
    }

    // Comparer le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Nom d/utilisateur ou mot de passe incorrect.' },
        { status: 400 }
      );
    }

    // Créer le token JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        username: user.username
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Créer la réponse
    const response = NextResponse.json(
      { 
        message: 'Connexion réussie',
        user: {
          id: user.id,
          username: user.username
        }
      },
      { status: 200 }
    );

    // Définir le cookie avec le token
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 heures
    });

    return response;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
