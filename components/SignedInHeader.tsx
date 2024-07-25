import { UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"
import Link from "next/link"

function SignedInHeader() {
  return (
    <div className="flex p-5 space-x-5 items-center flex-row justify-between">
        <div className="font-semibold text-xl md:text-3xl">
            Blog<span className="text-indigo-600">Verse</span>
        </div>


        <div className="items-center flex space-x-2">
            <Button className="bg-white hover:text-white text-black border-2 rounded-lg border-black">
                <Link href="/dashboard">My Blogs</Link>
            </Button>
            <Button className="bg-white hover:text-white text-black border-2 rounded-lg border-black">
                <Link href="/allBlogs">All Blogs</Link>
            </Button>
            <Button className="bg-white hover:text-white text-black border-2 rounded-lg border-black">
                <Link href="/dashboard/createBlog">Create Blog</Link>
            </Button>
            <UserButton />
        </div>
        
    </div>
  )
}

export default SignedInHeader