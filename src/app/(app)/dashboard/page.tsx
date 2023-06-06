// import { useSession } from "next-auth/react";
import Card from "../../../components/ui/card";
import { prisma } from "@/lib/prisma";
// import profile from "../../../../public/analytics.png";
// import Image from "next/image";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../api/auth/[...nextauth]/route";

import Course from "@/components/ui/course/course";
import Image from "next/image";
interface CourseProps {
  id: number;
  title: string;
  description: string;
  image: string;
}
export default async function Dashboard() {
  // const session = await getServerSession(authOptions);

  const courses = await prisma.course.findMany({});
  // console.log(user);
  return (
    <div className="  min-h-screen py-[64px] space-y-6">
      {/* <Image src={profile} alt="image" width="500" height="500" /> */}

      <div className=" flex flex-col justify-center items-center pt-6 space-y-4">
        {/* <Card data={session?.user?.email} /> */}
        <Image src="/hikaru.jpg" alt="" width={850} height={100} />
        <div className="flex justify-center items-center w-[80%] space-x-4 flex-grow-0">
          <Card data="Rank: [1d]" />
          <Card data="Goal: [2d]" />
          <Card data="challenges: checkmarked calendar" />
          <Card data="Tsumego Categories" />
          <Card data="Kifu Library" />
          <Card data="Game Reviews" />
        </div>
      </div>
      <div className="text-center font-bold text-4xl py-6">My Courses</div>
      {courses?.map((course: CourseProps) => (
        <Course
          key={course.id}
          title={course.title}
          description={course.description}
          image={course.image}
        />
      ))}
    </div>
  );
}
