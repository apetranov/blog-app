'use client'

import { SignedIn } from "@clerk/nextjs";
import SignedInHeader from "@/components/SignedInHeader";
import { SignedOut } from "@clerk/nextjs";
import Header from "@/components/Header";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "@/firebase/clientApp";
import { collection } from 'firebase/firestore';
import { usePathname, useParams } from 'next/navigation'; // Import from next/navigation

function AllBlogs() {
    const [blogs, blogsLoading, blogsError] = useCollection(
        collection(firestore, "blogs")
    );

    // Note: usePathname and useParams can be used if necessary, but for now, no routing needed here
    const pathname = usePathname(); // This is optional, based on your requirements
    const params = useParams(); // This is optional, based on your requirements

    if (!blogsLoading && blogs) {
        blogs.docs.map((doc) => console.log(doc.data()));
    }

    // Handle navigation if needed
    const handleBlogClick = (id: string) => {
        // Use the next/navigation for routing
        window.location.href = `/blogs/${id}`; // Use client-side navigation
    };

    return (
        
        <div>
            <SignedIn>
                <SignedInHeader />
            </SignedIn>

            <SignedOut>
                <Header />
            </SignedOut>
            
            <div className="flex flex-col justify-center items-center">
            <div className="flex p-5 flex-col justify-center items-center max-w-7xl">
                <h1 className="text-3xl md:text-5xl font-bold">All Blogs</h1>
            </div>

            <div className="p-5">
                {blogs?.docs.map((doc) => {
                    const blogData = doc.data(); // Ensure to cast or type the data as needed
                    return (
                        <div
                            key={doc.id}
                            onClick={() => handleBlogClick(doc.id)}
                            className="p-5 flex rounded-lg shadow-lg flex-col justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <h2 className="text-2xl text-indigo-600 font-semibold">{blogData.title}</h2>
                            <p>{blogData.description}</p>
                            <p>written by <i>{blogData.author}</i></p>
                        </div>
                    );
                })}
            </div>
            </div>
            

            
        </div>
    );
}

export default AllBlogs;
