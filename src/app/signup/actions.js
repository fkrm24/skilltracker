'use server'; 
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function handleSignUp(username, password) {
  try {
    // Vérification si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new Error('Nom d’utilisateur déjà pris');
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

    return newUser;
  } catch (error) {
    throw new Error('Erreur lors de l\'inscription: ' + error.message);
  }
}
