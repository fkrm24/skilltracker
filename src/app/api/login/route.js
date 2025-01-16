import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Nom d’utilisateur ou mot de passe incorrect.' }),
        { status: 400 }
      );
    }

    // Comparer le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: 'Nom d’utilisateur ou mot de passe incorrect.' }),
        { status: 400 }
      );
    }

    // Tout est bon, l'utilisateur est authentifié
    return new Response(
      JSON.stringify({ message: 'Connexion réussie', user }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la connexion: ' + error.message }),
      { status: 500 }
    );
  }
}
