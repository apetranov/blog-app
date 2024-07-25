'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'
import { firestore } from '@/firebase/clientApp'; // Adjust import according to your setup
import { collection, addDoc } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';

function CreateBlog() {
    const { user } = useUser();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!user) {
            alert('You must be logged in to create a blog.');
            return;
        }

        try {
            // Reference to the "blogs" collection
            const blogsCollectionRef = collection(firestore, 'blogs');

            // Add a new document with the input values
            await addDoc(blogsCollectionRef, {
                title,
                description,
                content,
                author: user.username // Add the author's username or email
            });

            // Clear form fields
            setTitle('');
            setDescription('');
            setContent('');

            toast.success('Blog created successfully!');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Error creating blog');
        }
    };

  return (
    <div>
        <div className="flex p-5 flex-col justify-center items-center max-w-7xl">
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
                    <div>
                        <h2>Title</h2>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='border-2 border-black rounded-lg w-full'
                            required
                        />
                    </div>

                    <div>
                        <h2>Description</h2>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='border-2 border-black h-40 rounded-lg w-full'
                            required
                        />
                    </div>

                    <div>
                        <h2>Content</h2>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className='border-2 border-black h-64 rounded-lg w-full'
                            required
                        />
                    </div>

                    <Button type="submit">Create</Button>
                </form>
        </div>
    </div>
    
  )
}

export default CreateBlog