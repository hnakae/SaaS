export default async function Guides() {
  return (
    <div className="min-h-screen pt-[64px] flex flex-col justify-center items-center px-12">
      <div className=" w-full container my-1 grid grid-cols-2 bg-white text-center gap-4">
        <div className="outline flex flex-col">
          <div>Article</div>
          <div>Title</div>
          <div>Description</div>
        </div>
        <div className="outline">Article</div>
        <div className="outline">Article</div>
        <div className="outline">Article</div>
        <div className="outline">Article</div>
        <div className="outline">Article</div>
        <div className="outline">Article</div>
      </div>
    </div>
  );
}
