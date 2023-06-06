import { prisma } from "@/lib/prisma";
import Course from "@/components/ui/course/course";
interface CourseProps {
  id: number;
  title: string;
  description: string;
  image: string;
}
export default async function Courses() {
  const courses = await prisma.course.findMany({});
  return (
    <div className="min-h-screen py-[64px] space-y-6">
      <div className="pt-6 text-4xl text-center">MASTER COURSES</div>
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
