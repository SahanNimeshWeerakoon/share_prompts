"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'; 
import { useRouter } from 'next/navigation';

import Profile from '@/components/Profile'

const MyProfile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if(session?.user.id) fetchPosts();
    }, [session]);
    
    const handleEdit = (id) => {
        router.push(`/update-prompt?id=${id}`);
    }

    const handleDelete = async (id) => {
        const hasConfirmed = confirm("Ae you sure you want to delete this prompt?");

        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${id}`, {
                    method: "DELETE"
                });

                setPosts(posts => {
                    return posts.filter(itm => itm._id !== id);
                });
            } catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
}

export default MyProfile;