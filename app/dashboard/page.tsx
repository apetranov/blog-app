'use client';

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from 'next/link';
import SignedInHeader from "@/components/SignedInHeader";
import Header from "@/components/Header";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "@/firebase/clientApp";
import { collection } from 'firebase/firestore';

function Dashboard() {
    const { user } = useUser(); // Get the current user
    const currentUserName = user?.username; // Access the username

    const [blogs, blogsLoading, blogsError] = useCollection(
        collection(firestore, "blogs")
    );

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

            <div className="p-5">
                {filteredBlogs?.length ? (
                    filteredBlogs.map((blog) => {
                        const blogData = blog.data();
                        return (
                            <Link href={`/blogs/${encodeURIComponent(blog.id)}`} key={blog.id}>
                                <div className="p-5 flex rounded-lg shadow-lg flex-col justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors">
                                    <h2 className="text-2xl text-indigo-600 font-semibold">{blogData.title}</h2>
                                    <p>{blogData.description}</p>
                                    <p>written by <i>{blogData.author}</i></p>
                                </div>
                            </Link>
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
