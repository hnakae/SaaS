// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
// import { User } from "./user";
import Layout from "../components/layout";
// import { LoginButton, LogoutButton } from "./auth";
import Hero from "../components/sections/hero";
// import { NavigationMenu } from "@radix-ui/react-navigation-menu";

export default function Home() {
  // const session = await getServerSession(authOptions);

  // const user = await prisma.user.findFirst({
  //   where: {
  //     email: "test@test.io",
  //   },
  // });
  return (
    <main className="flex items-center justify-center ">
      <Layout>
        <Hero />
        {/* <Projects />
        <Skills />
        <About />
        <Tasks />
        <Contact /> */}
      </Layout>
    </main>
  );
}
