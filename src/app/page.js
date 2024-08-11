import Gemini from "@/components/Gemini";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex bg-[#212121] overflow-y-hidden  min-h-screen flex-col items-center justify-between p-24">
      <div className="overflow-y-hidden ">
        <Gemini />
      </div>
    </main>
  );
}
