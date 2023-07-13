import GoGame from "@/components/go-game-split/GoGame";
export default function Board() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {/* <div className="text-center text-4xl font-bold">Board</div> */}
        <GoGame />
      </div>
    </>
  );
}
