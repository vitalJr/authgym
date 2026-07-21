import { auth } from 'auth';
// import ClientPage from './client/page';

export default async function Home() {
  const session = await auth();
  console.log({ session });
  return (
    <div>
      <h1>Welcome to NextAuth.js!</h1>
      {session?.user?.name ? session.user.name : 'Guest'}
      {/* <ClientPage /> */}
    </div>
  );
}
