// import { useSession } from "next-auth/react";
import Card from "../../../components/ui/card";
import { prisma } from "@/lib/prisma";
// import profile from "../../../../public/analytics.png";
// import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const courses = await prisma.course.findMany({});
  // console.log(user);
  return (
    <div className="outline px-36 min-h-screen pt-[64px] space-y-4">
      <h1 className="text-4xl pt-6">My Dashboard</h1>
      <h2 className="text-3xl">Progress Tracker</h2>
      {/* <Image src={profile} alt="image" width="500" height="500" /> */}

      <div className="grid grid-cols-1">
        {/* <Card data={user[0].email} /> */}
        <Card data={session?.user?.email} />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {/* <Card data={user} /> */}
        {/* <Card data={user?} /> */}
        <Card data="Rank: [1d]" />
        <Card data="Goal: [2d]" />
        <Card data="My Courses" />
        <Card data="challenges: checkmarked calendar" />
        <Card data="Tsumego Categories" />
        <Card data="Game Reviews" />
        <Card data="Kifu Library" />
        <Card data="AI Suggestions" />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="text-center font-bold text-4xl py-6">My Courses</div>
        {courses.map((course: any) => (
          <Card key={course.id} data={course.title} />
        ))}
      </div>
    </div>
  );
}
