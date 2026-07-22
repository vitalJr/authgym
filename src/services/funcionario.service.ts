import { auth, db, storage } from "@/lib/firebase";
import { Role } from "@/types/funcionario";
import type {
  Funcionario,
  FuncionarioInput,
  FuncionarioPhoto,
  FuncionarioUpdateInput,
} from "@/types/funcionario";

const FUNCIONARIOS_COLLECTION = "funcionarios";

async function uploadFuncionarioPhoto(
  id: string,
  photo: FuncionarioPhoto,
): Promise<string> {
  const file = storage.bucket().file(`funcionarios/${id}/photo`);

  await file.save(photo.buffer, {
    metadata: { contentType: photo.contentType },
  });
  await file.makePublic();

  return file.publicUrl();
}

export async function listFuncionarios(): Promise<Funcionario[]> {
  const snapshot = await db
    .collection(FUNCIONARIOS_COLLECTION)
    .where("active", "==", true)
    .get();

  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }) as Funcionario)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function listManagers(): Promise<Funcionario[]> {
  const snapshot = await db
    .collection(FUNCIONARIOS_COLLECTION)
    .where("active", "==", true)
    .where("role", "==", Role.GERENTE)
    .get();

  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }) as Funcionario)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function createFuncionario(
  input: FuncionarioInput,
): Promise<Funcionario | null> {
  const isManager = input.role === Role.GERENTE;

  let firebaseUser;

  try {
    firebaseUser = await auth.createUser({
      email: input.email,
      password: input.password,
      displayName: input.name,
      disabled: !isManager,
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error.code === "auth/email-already-exists" ||
        error.code === "auth/invalid-password")
    ) {
      return null;
    }

    throw error;
  }

  const { password: _password, photo, ...profile } = input;

  const photoUrl = photo
    ? await uploadFuncionarioPhoto(firebaseUser.uid, photo)
    : undefined;

  const record: Omit<Funcionario, "id"> = {
    ...profile,
    ...(photoUrl ? { photoUrl } : {}),
    isAdmin: false,
    active: true,
    accountEnabled: isManager,
    createdAt: new Date().toISOString(),
  };

  await db.collection(FUNCIONARIOS_COLLECTION).doc(firebaseUser.uid).set(record);

  return { id: firebaseUser.uid, ...record };
}

export async function updateFuncionario(
  id: string,
  input: FuncionarioUpdateInput,
): Promise<void> {
  await db.collection(FUNCIONARIOS_COLLECTION).doc(id).update({ ...input });
}

export async function setFuncionarioActive(
  id: string,
  active: boolean,
): Promise<void> {
  if (!active) {
    await auth.updateUser(id, { disabled: true });
  }

  await db.collection(FUNCIONARIOS_COLLECTION).doc(id).update({
    active,
    ...(active ? {} : { accountEnabled: false }),
  });
}

export async function setFuncionarioAccountEnabled(
  id: string,
  enabled: boolean,
): Promise<void> {
  await auth.updateUser(id, { disabled: !enabled });

  await db
    .collection(FUNCIONARIOS_COLLECTION)
    .doc(id)
    .update({ accountEnabled: enabled });
}

export async function setFuncionarioAdmin(
  id: string,
  isAdmin: boolean,
): Promise<void> {
  await db.collection(FUNCIONARIOS_COLLECTION).doc(id).update({ isAdmin });
}
