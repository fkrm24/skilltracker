import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    // Vérification si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Nom d’utilisateur déjà pris' }),
        { status: 400 }
      );
    }

    // Hachage du mot de passe pour le stockage sécurisé
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Utilisateur créé avec succès', user: newUser }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erreur lors de l\'inscription: ' + error.message }),
      { status: 500 }
    );
  }
}
