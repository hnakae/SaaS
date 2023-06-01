import Link from "next/link";

export default async function Courses() {
  return (
    <div className="min-h-screen pt-[64px] space-y-6">
      <div className="pt-6 text-center">Master courses</div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            <Link href="getplus">PRO</Link>
          </div>
          <div>TITLE</div>
          <div className="pb-4">Description</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            PRO
          </div>
          <div>TITLE</div>
          <div className="pb-4">Description</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            PRO
          </div>
          <div>TITLE</div>
          <div className="pb-4">Description</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            PRO
          </div>
          <div>TITLE</div>
          <div className="pb-4">Description</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            PRO
          </div>
          <div>TITLE</div>
          <div className="pb-4">Description</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            PRO
          </div>
          <div>TITLE</div>
          <div className="pb-4">Description</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-t">
        <div className="relative w-[80vw] h-[300px] outline rounded-lg flex flex-col justify-end space-y-4  items-center">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            PRO
          </div>
          <div>TITLE</div>
          <div className="pb-4">Description</div>
        </div>
      </div>
    </div>
  );
}
