export default async function Guides() {
  return (
    <div className="min-h-screen pt-[64px] p-4">
      <div className="h-screen pt-1 flex">
        <div className="w-[60vw] h-[300px]  flex flex-col justify-center items-center">
          <div className=" w-full h-full">Image</div>
          <div>Featured Article</div>
        </div>
        <div className="w-[40vw] h-auto">
          <div>image </div>
          <div>title</div>
        </div>
      </div>
      <div className="h-screen">
        <h1>Latest Articles</h1>
        <p>The most recent guides ...</p>
        <div className="grid grid-cols-4 space-x-6 space-y-6">
          <div className="flex flex-col outline">
            <div>image</div>
            <div>title</div>
            <div>date</div>
          </div>
          <div className="flex flex-col outline">
            <div>image</div>
            <div>title</div>
            <div>date</div>
          </div>
          <div className="flex flex-col outline">
            <div>image</div>
            <div>title</div>
            <div>date</div>
          </div>
          <div className="flex flex-col outline">
            <div>image</div>
            <div>title</div>
            <div>date</div>
          </div>
          <div className="flex flex-col outline">
            <div>image</div>
            <div>title</div>
            <div>date</div>
          </div>
          <div className="flex flex-col outline">
            <div>image</div>
            <div>title</div>
            <div>date</div>
          </div>
          <div className="flex flex-col outline">
            <div>image</div>
            <div>title</div>
            <div>date</div>
          </div>
          <div className="flex flex-col outline">
            <div>image</div>
            <div>title</div>
            <div>date</div>
          </div>
        </div>
      </div>
    </div>
  );
}
