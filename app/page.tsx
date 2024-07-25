import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-w-7xl w-screen p-10 justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="text-center flex justify-center items-center">
          <h1 className="text-6xl md:text-8xl">Blog<span className="text-indigo-600 ">Verse</span></h1>
        </div>
        
        <div className="text-lg mb-10 md:text-xl mt-10 text-center flex justify-center items-center">
          <p>BlogVerse is <span className="font-semibold">THE BEST</span> completely <span className="font-semibold text-indigo-600">FREE</span> way to write and share blogs!</p>
      </div>
      <div className="flex flex-row space-x-5">
        <div>
        <Button asChild>
          <Link href='/allBlogs'>All Blogs</Link>
        </Button>
        </div>
        
        <div>
          <Button asChild>
            <Link href='/dashboard'>LogIn</Link>
          </Button>
        </div>
        
      </div>
      </div>
    </div>
  );
}