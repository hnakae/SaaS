import Image from "next/image";
import pic from "../../../../public/go-player.png";

export default async function Getplus() {
  return (
    <div className="min-h-screen pt-[64px] pb-24 ">
      <div className="text-4xl text-center my-6">GOGUIDES</div>
      <div className="flex justify-center items-center">
        <div className="w-[80vw] h-auto rounded-xl flex">
          <div className="w-[45%] bg-slate-300">
            <Image src={pic} alt="go player" />
          </div>
          <div className="w-[55%] flex flex-col justify-center items-center p-12 space-y-4 bg-white text-black">
            <div className="text-4xl font-semibold">
              Go pro and receive these great benefits:
            </div>
            <div>
              Unlimited access to Aimlabs Discovery, the first AI-powered task
              engine in gaming. *
            </div>
            <div>
              Unlimited access to dozens of masterclasses taught by the greatest
              athletes in eSports.
            </div>
            <div>
              Unlimited access to 14 & 30-day Bootcamps from top pros like
              ImperialHal, Doublelift, and Pengu.
            </div>
            <div className="font-semibold">For only</div>
            <div className="font-bold">$9.99 /month</div>
            <div className="bg-blue-400 px-12 py-4 rounded-md font-semibold cursor-pointer">
              SUBSCRIBE NOW
            </div>
            <div>*Requires an account</div>
          </div>
        </div>
      </div>
    </div>
  );
}
