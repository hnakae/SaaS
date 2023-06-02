import Link from "next/link";

export default async function Courses() {
  return (
    <div className="min-h-screen pt-[64px] space-y-6">
      <div className="pt-6 text-4xl text-center">MASTER COURSES</div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            PRO
          </div>
          <div className="text-3xl font-bold">PROVERBS</div>
          <div className="pb-4 text-lg font-semibold">Fundamental Concepts</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            PRO
          </div>
          <div className="text-3xl font-bold">Basic Instinct</div>
          <div className="pb-4 text-lg font-semibold">Shape Intuition</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            PRO
          </div>
          <div className="text-3xl font-bold">Joseki Tier List</div>
          <div className="pb-4 text-lg font-semibold">Knowledge</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            <Link href="getplus">PRO</Link>
          </div>
          <div className="text-3xl font-bold">Alpha Go Zero vs Master</div>
          <div className="pb-4 text-lg font-semibold">Systematic Opening</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            PRO
          </div>
          <div className="text-3xl font-bold">Macro Strategies</div>
          <div className="pb-4 text-lg font-semibold">Combinations</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            PRO
          </div>
          <div className="text-3xl font-bold">Basic Instinct else Tenuki</div>
          <div className="pb-4 text-lg font-semibold">
            First Class Moves for Fighting Control
          </div>
        </div>
      </div>
    </div>
  );
}
