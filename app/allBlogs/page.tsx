'use client'


import { SignedIn } from "@clerk/nextjs";
import SignedInHeader from "@/components/SignedInHeader";
import { SignedOut } from "@clerk/nextjs";
import Header from "@/components/Header";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "@/firebase/clientApp";
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { usePathname, useParams } from 'next/navigation'; // Import from next/navigation
import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function AllBlogs() {
    const [blogs, blogsLoading, blogsError] = useCollection(
        collection(firestore, "blogs")
    );
    const {user} = useUser()
    const deleteBlogById = async (id: string) => {
        try {
            const blogRef = doc(firestore, "blogs", id);
            await deleteDoc(blogRef);
            toast.success('Blog deleted successfully');
        } catch (error) {
          console.error('Error deleting blog: ', error);
        }
      };

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

            <div className="p-5 flex flex-col justify-center items-center">
                {blogs?.docs.map((doc) => {
                    const blogData = doc.data(); // Ensure to cast or type the data as needed
                    return (
                        <div>
                            <div
                            key={doc.id}
                            onClick={() => handleBlogClick(doc.id)}
                            className="p-5 flex mb-5 rounded-lg shadow-lg flex-col justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <h2 className="text-2xl text-center text-indigo-600 font-semibold">{blogData.title}</h2>
                            <p className="text-center">{blogData.description}</p>
                            <p className="text-center">written by <i>{blogData.author}</i></p>
                        </div>
                        <div>
                            {user?.username === blogData.author ? <div className="justify-center mb-10 flex items-center"><Button onClick={() => deleteBlogById(doc.id)} className="bg-red-500 text-white ">Delete Blog</Button></div> : '' }

                        </div>
                        </div>
                        
                    );
                })}
            </div>
            </div>
            

            
        </div>
    );
}

export default AllBlogs;
