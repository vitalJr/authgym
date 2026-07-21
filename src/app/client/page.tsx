'use client';

import { useSession } from 'next-auth/react';

const ClientPage = () => {
  const { data: session } = useSession();

  if (!session || !session.user) return <h1>Você precisa estar autenticado</h1>;

  return (
    <div>
      <h1>Usuário autenticado</h1>
    </div>
  );
};

export default ClientPage;
