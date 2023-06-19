import Grid from "@/components/ag-grid/grid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function Library() {
  const data = await prisma.game.findMany();
  return (
    <div className="min-h-screen flex flex-col py-6 px-12">
      <div>
        <Grid games={data} />
      </div>
      <div>
        <button className="bg-slate-300 px-4 py-2 mt-4 rounded-sm">
          Add Kifu
        </button>
      </div>
    </div>
  );
}
