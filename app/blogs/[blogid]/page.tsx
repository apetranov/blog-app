'use client'

import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import SignedInHeader from "@/components/SignedInHeader";
import { SignedOut } from "@clerk/nextjs";
import Header from "@/components/Header";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "@/firebase/clientApp";
import { collection } from 'firebase/firestore';
import { usePathname, useParams } from 'next/navigation'; // Import from next/navigation
import DashboardSkeleton from "@/components/dashboardSkeleton";


function Blog( { params, }: 
    {
    params: { blogid: string }
}) {
    const [blogs, blogsLoading, blogsError] = useCollection(
        collection(firestore, "blogs")
    );
    const blog = blogs?.docs.find(doc => doc.id === params.blogid)?.data(); 
    if (blogsLoading) return <DashboardSkeleton/>;
    if (blogsError) return <p>Error: {blogsError.message}</p>;
    if (!blog) return <p>Blog not found.</p>;
  return (
    <div>
        <SignedIn>
            <SignedInHeader />
            
        </SignedIn>

        <SignedOut>
            <Header />
        </SignedOut>
        
            <div className="flex p-10 text-center flex-col justify-center items-center" key={blog.id}>
                <h1 className="font-bold text-2xl mb-10 sm:text-5xl">{blog.title}</h1>
                <h2 className="font text-xl mb-10 sm:text-2xl">{blog.description}</h2>
                <h2 className="mb-10">by <span className="font-semibold">{blog.author}</span></h2>
                <div>
                    {blog.content}
                </div>
            </div>
       
    </div>
    
  )
}

export default Blog