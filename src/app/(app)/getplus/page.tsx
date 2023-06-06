import Image from "next/image";
import pic from "../../../../public/hikaru.jpg";

export default async function Getplus() {
  return (
    <div className="min-h-screen pt-[64px] pb-24 ">
      <div className="text-4xl text-center my-6">GOGUIDES</div>

      <div className="flex justify-center items-center px-12">
        <div className=" overflow-hidden  relative h-full rounded-lg ">
          <Image src={pic} alt="go player" className="z-0 " />
          <div className="absolute bottom-0 left-0 z-10 flex flex-col justify-center items-center p-12 space-y-4 bg-opaque h-full w-[40%] text-xs">
            <div>
              <div className="text-2xl text-center font-semibold">
                Go pro and receive these great benefits:
              </div>
              <div>Unlimited Lifetime Access to New Content</div>
              <div>Unlimited access to dozens of masterclasses</div>
              <div className="pb-6">Unlimited Game Reviews</div>
            </div>
            <div>
              <div className="font-semibold">For only</div>
              <div className="font-bold">
                <span className="line-through">$9.99/month</span> FREE
              </div>
              <div className="bg-blue-400 px-12 py-4 rounded-md font-semibold cursor-pointer">
                SUBSCRIBE NOW
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
