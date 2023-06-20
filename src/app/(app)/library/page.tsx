import Grid from "@/components/ag-grid/grid";
import Form from "@/components/form/form";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function Library() {
  const data = await prisma.game.findMany();
  return (
    <div className="min-h-screen flex flex-col py-6 px-12">
      <div>
        <Grid games={data} />
      </div>
      <div className="outline  mt-4 p-6">
        <Form />
      </div>
    </div>
  );
}
