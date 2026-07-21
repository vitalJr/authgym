import { auth, db } from '@/lib/firebase';
import type {
  AuthenticatedUser,
  LoginCredentials,
  RegisterInput,
  RegisteredUser,
  UserRecord,
} from '@/types/auth';

const USERS_COLLECTION = 'users';

export async function loginWithCredentials(
  credentials: LoginCredentials
): Promise<AuthenticatedUser | null> {
  const usersRef = db.collection(USERS_COLLECTION);

  const [emailSnapshot, usernameSnapshot] = await Promise.all([
    usersRef.where('email', '==', credentials.identifier).limit(1).get(),
    usersRef.where('username', '==', credentials.identifier).limit(1).get(),
  ]);

  const userDoc = emailSnapshot.docs[0] ?? usernameSnapshot.docs[0];

  console.log({ userDoc });

  if (!userDoc) {
    return null;
  }

  const userData = userDoc.data() as UserRecord;

  return {
    id: userDoc.id,
    name: userData.username,
    email: userData.email,
    username: userData.username,
  };
}

export async function findOrCreateOAuthUser(profile: {
  email: string;
  name?: string | null;
}): Promise<AuthenticatedUser> {
  let firebaseUser;

  try {
    firebaseUser = await auth.getUserByEmail(profile.email);
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'auth/user-not-found'
    ) {
      firebaseUser = await auth.createUser({
        email: profile.email,
        displayName: profile.name ?? undefined,
      });
    } else {
      throw error;
    }
  }

  const userDocRef = db.collection(USERS_COLLECTION).doc(firebaseUser.uid);
  const userDoc = await userDocRef.get();

  const username = profile.name ?? profile.email;

  if (!userDoc.exists) {
    const record: UserRecord = {
      username,
      email: profile.email,
      createdAt: new Date().toISOString(),
    };

    await userDocRef.set(record);
  }

  const userData = (userDoc.data() as UserRecord | undefined) ?? {
    username,
    email: profile.email,
  };

  return {
    id: firebaseUser.uid,
    name: userData.username,
    email: userData.email,
    username: userData.username,
  };
}

export async function registerUser(
  input: RegisterInput
): Promise<RegisteredUser | null> {
  const usersRef = db.collection(USERS_COLLECTION);

  const usernameSnapshot = await usersRef
    .where('username', '==', input.username)
    .limit(1)
    .get();

  if (!usernameSnapshot.empty) {
    return null;
  }

  let userRecord;

  try {
    userRecord = await auth.createUser({
      email: input.email,
      password: input.password,
      displayName: input.username,
    });
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error.code === 'auth/email-already-exists' ||
        error.code === 'auth/invalid-password')
    ) {
      return null;
    }

    throw error;
  }

  const record: UserRecord = {
    username: input.username,
    email: input.email,
    birthDate: input.birthDate,
    gender: input.gender,
    createdAt: new Date().toISOString(),
  };

  await usersRef.doc(userRecord.uid).set(record);

  return {
    id: userRecord.uid,
    username: input.username,
    email: input.email,
  };
}
