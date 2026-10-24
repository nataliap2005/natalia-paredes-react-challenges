
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';

import { auth, db } from '../firebase';

// Crea el perfil de un usuario solo si todavía no existe.
async function ensureUserProfile(
  uid: string,
  name: string,
  email: string
) {
  const reference = doc(db, 'mission_users', uid);
  const snapshot = await getDoc(reference);

  if (!snapshot.exists()) {
    await setDoc(reference, {
      displayName: name || 'Participante',
      email,
      points: 0,
      updatedAt: serverTimestamp()
    });
  }
}

// Registro de nuevos usuarios.
export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const { user } = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  await updateProfile(user, {
    displayName: name.trim()
  });

  await ensureUserProfile(
    user.uid,
    name.trim(),
    user.email || ''
  );

  return user;
}

// Inicio de sesión de usuarios existentes.
export async function loginUser(
  email: string,
  password: string
) {
  const { user } = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  await ensureUserProfile(
    user.uid,
    user.displayName || 'Participante',
    user.email || ''
  );

  return { user };
}

// Cierre de sesión.
export async function logoutUser() {
  return signOut(auth);
}
