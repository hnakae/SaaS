import Image from "next/image";
import pic from "../../../../public/hikaru.jpg";

export default async function Getplus() {
  return (
    <div className="min-h-screen pb-24 ">
      <div className="text-4xl text-center my-6">GOGUIDES</div>

      <div className="flex justify-center items-center px-12">
        <div className=" overflow-hidden  relative h-full rounded-lg ">
          <Image src={pic} alt="go player" className="z-0 " priority />
          <div className="z-10 flex flex-col  bg-opaque h-full w-[40%] text-xs">
            <div className="bg-opaque space-y-4 h-[60%] w-[40%] absolute top-0 left-0 flex flex-col justify-center items-center ">
              <div className="text-2xl text-center font-semibold">
                Go pro and receive these great benefits:
              </div>
              <div>Unlimited Lifetime Access to New Content</div>
              <div>Unlimited access to dozens of masterclasses</div>
              <div className="pb-6">Unlimited Game Reviews</div>
            </div>
            <div className="bg-opaque absolute bottom-0 left-0 h-[40%] w-[40%] flex flex-col justify-center items-center space-y-4">
              <div className="font-semibold">For only</div>
              <div className="font-bold">
                <span className="line-through">$9.99/month</span> FREE for ogs
                dans
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
