import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";
import { LoginButton, LogoutButton } from "./auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findFirst({
    where: {
      email: "test@test.io",
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100">
      <LoginButton />
      <LogoutButton />
      <div>Hello, {user?.name}</div>
      <h2>Server Call</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User />
    </main>
  );
}
