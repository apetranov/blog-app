'use client';

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from 'next/link';
import SignedInHeader from "@/components/SignedInHeader";
import Header from "@/components/Header";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "@/firebase/clientApp";
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

function Dashboard() {
    const { user } = useUser(); // Get the current user
    const currentUserName = user?.username; // Access the username

    const [blogs, blogsLoading, blogsError] = useCollection(
        collection(firestore, "blogs")
    );

    
    const deleteBlogById = async (id: string) => {
        try {
            const blogRef = doc(firestore, "blogs", id);
            await deleteDoc(blogRef);
            toast.success('Blog deleted successfully');
        } catch (error) {
          console.error('Error deleting blog: ', error);
        }
      };

    // Optional: Log blog data to console
    if (!blogsLoading && blogs) {
        blogs.docs.map((doc) => console.log(doc.data()));
    }

    const filteredBlogs = blogs?.docs.filter((blog) => {
        const blogData = blog.data();
        return blogData.author === currentUserName;
    });

    return (
        <div className="flex flex-col justify-center items-center ">

            <div className="flex p-5 justify-center items-center max-w-7xl">
                <h1 className="text-3xl md:text-5xl font-bold">Your Blogs</h1>
            </div>

            <div className="p-5 flex flex-col justify-center items-center ">
                {filteredBlogs?.length ? (
                    filteredBlogs.map((blog) => {
                        const blogData = blog.data();
                        return (
                            <div key={blog.id}>
                                 <Link href={`/blogs/${encodeURIComponent(blog.id)}`} key={blog.id}>
                                <div className="p-5 mb-5 flex rounded-lg shadow-lg flex-col justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors">
                                    <h2 className="text-2xl text-center text-indigo-600 font-semibold">{blogData.title}</h2>
                                    <p className="text-center">{blogData.description}</p>
                                    <p className="text-center">written by <i>{blogData.author}</i></p>
                                </div>
                            </Link>
                            <div>
                            {user?.username === blogData.author ? <div className="justify-center mb-10 flex items-center"><Button onClick={() => deleteBlogById(blog.id)} className="bg-red-500 text-white ">Delete Blog</Button></div> : '' }
                            </div>
                            </div>  
                           
                        );
                    })
                ) : (
                    <p>No blogs available or you are not the author of any blogs.</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
