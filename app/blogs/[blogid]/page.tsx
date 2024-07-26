'use client'


import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import SignedInHeader from "@/components/SignedInHeader";
import { SignedOut } from "@clerk/nextjs";
import Header from "@/components/Header";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "@/firebase/clientApp";
import { arrayUnion, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { usePathname, useParams } from 'next/navigation'; // Import from next/navigation
import DashboardSkeleton from "@/components/dashboardSkeleton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import MarkupRenderer from '@/components/MarkupRenderer';
import useRouter  from "next/router";



function Blog( { params, }: 
    {
    params: { blogid: string }
}) {
    const [content, setContent] = useState('');
    const [blogs, blogsLoading, blogsError] = useCollection(
        collection(firestore, "blogs")
    );

    const deleteBlogById = async (id: string) => {
        try {
            const blogRef = doc(firestore, "blogs", id);
            await deleteDoc(blogRef);
            toast.success('Blog deleted successfully');
            window.location.href = '/allBlogs';
        } catch (error) {
          console.error('Error deleting blog: ', error);
        }
      };

    const { user } = useUser();
    const blog = blogs?.docs.find(doc => doc.id === params.blogid)?.data();
    const blog2 = blogs?.docs.find(doc => doc.id === params.blogid)
    if (blogsLoading) return <DashboardSkeleton/>;
    if (blogsError) return <p>Error: {blogsError.message}</p>;
    if (!blog) return <p>Blog not found.</p>;

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        const newComment = {
          author: user?.username,
          content: content,
          timestamp: new Date()
        };
    
        try {
          const blogRef = doc(firestore, 'blogs', params.blogid); // Adjust 'blogs' to your collection name
    
          await updateDoc(blogRef, {
            comments: arrayUnion(newComment)
          });
    
          console.log('Comment added successfully');
    
          // Clear the form
          
          setContent('');
        } catch (error) {
          console.error('Error adding comment: ', error);
        }
      };
  return (
    <div>
        <SignedIn>
            <SignedInHeader />
            
        </SignedIn>

        <SignedOut>
            <Header />
        </SignedOut>
            {user?.username === blog.author ? <div className="justify-center flex items-center"><Button onClick={() => deleteBlogById(params.blogid)} className="bg-red-500 text-white ">Delete Blog</Button></div> : '' }
            <div className="flex p-10 text-center flex-col justify-center items-center" key={blog.id}>
                <h1 className="font-bold text-2xl mb-10 sm:text-5xl">{blog.title}</h1>
                <h2 className="font text-xl mb-10 sm:text-2xl">{blog.description}</h2>
                <h2 className="mb-10">by <span className="font-semibold">{blog.author}</span></h2>
                <div className="mb-10">
                    <MarkupRenderer markupString={blog.content as string} />
                </div>

                <SignedIn>
                <div className="flex p-10 flex-col justify-center items-center">
                    <form onSubmit={handleSubmit} className="flex mb-10 flex-col justify-start items-center">
                    
                    <Textarea value={content}
            onChange={(e) => setContent(e.target.value)} required placeholder="Type your comment here." className="mb-5 w-full shadow-xl"/>
                    <Button type="submit">Comment</Button>
                    </form>

                    
                </div>
                </SignedIn>
                <h1 className="text-xl md:text-2xl font-semibold">Comments</h1>
                {blog.comments && blog.comments.map((comment: { author: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; timestamp: { seconds: number; }; }, index: Key | null | undefined) => (
                    <div key={index} className="flex flex-col border-2 border-black p-10 mb-10 rounded-3xl">
                    <p><strong>{comment.author}</strong>: {comment.content}</p>
                    <p><em>Added on {new Date(comment.timestamp.seconds * 1000).toLocaleString()}</em></p>
                    </div>
                    
                ))}
            </div>


       
    </div>
    
  )
}

export default Blog