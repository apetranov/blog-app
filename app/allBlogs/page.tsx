import { SignedIn } from "@clerk/nextjs"
import SignedInHeader from "@/components/SignedInHeader"
import { SignedOut } from "@clerk/nextjs"
import Header from "@/components/Header"

function AllBlogs() {
  return (
    <div >
        <SignedIn>
            <SignedInHeader/>
        </SignedIn>

        <SignedOut>
            <Header />
        </SignedOut>

    <div className="flex p-5 flex-col justify-center items-center max-w-7">
        <h1 className="text-3xl md:text-5xl font-bold">All Blogs</h1>
    </div>
    </div>
    
  )
}

export default AllBlogs