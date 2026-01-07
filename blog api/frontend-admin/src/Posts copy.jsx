import Post from "./Post";
import { useLoaderData } from "react-router";

export async function loader() {
  const res = await fetch('http://localhost:5000/api/posts');
  if (!res.ok) throw new Error(`Response status: ${res.status}`);
  
  const posts = await res.json();
  const postsWithAuthors = await Promise.all(posts.map(async (post) => {
        const authRes = await fetch(`http://localhost:5000/api/users/${post.author_id}`);
        const author = await authRes.json();
        const commentsRes = await fetch(`http://localhost:5000/api/posts/${post.id}/comments`);
        const comments = await commentsRes.json();
        const numComments = comments.length;
    return { ...post, authorName: author, numComments };
    }));

  return postsWithAuthors;
}

export default function Posts() {
    const data = useLoaderData();

    return (
        <ul className="posts">
            {data.map(post => (
                <Post key={post.id} {...post} />
            ))}
        </ul>
    )
}