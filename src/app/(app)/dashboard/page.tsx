import { useSession } from "next-auth/react";
import Card from "../../../components/ui/card";
import { prisma } from "@/lib/prisma";
import profile from "../../../../public/analytics.png";
import Image from "next/image";

export default async function Dashboard() {
  const user = await prisma.user.findMany({});
  // console.log(user);
  return (
    <div className="outline px-36 min-h-screen pt-[64px] space-y-4">
      <h1 className="text-4xl">Overview</h1>
      <h2 className="text-3xl">Performance Indicators</h2>
      <Image src={profile} alt="image" width="500" height="500" />
      <div className="grid grid-cols-4 gap-4">
        {/* <Card data={user} /> */}
        {/* <Card data={user?} /> */}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
