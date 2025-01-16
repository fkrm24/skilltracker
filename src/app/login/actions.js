'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function handleLogin(data) {
  const username = data.get('username');
  const password = data.get('password');

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user && user.password === password) {
    // Redirection vers le dashboard après connexion réussie
    redirect('/dashboard');
  } else {
    throw new Error('Nom d’utilisateur ou mot de passe incorrect');
  }
}
