import { useEffect, useState } from "react";
import Post from "./Post";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('http://localhost:5000/api/posts');
                if (!res.ok) throw new Error (`Response status: ${res.status}`);
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();

    }, []);
    console.log(posts);
    if (isLoading) return <p>Loading... </p>

    return (
        <ul className="posts">
            {posts.map(post => (
                <Post key={post.id} {...post} />
            ))}
        </ul>
    )
}