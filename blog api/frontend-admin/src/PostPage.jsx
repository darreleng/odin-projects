import { useLoaderData } from "react-router";
import formatDate from "./utils/formatDate";

export async function loader({ params }) {
    const res = await fetch(`http://localhost:5000/api/posts/${params.id}`);
    if (!res.ok) throw new Response("Post Not Found", { status: 404 });
    
    const post = await res.json();

    const authorRes = await fetch(`http://localhost:5000/api/users/${post.author_id}`);
    const author = authorRes.json();

    return { post, author };
}

export default function PostPage() {
    const { post, author } = useLoaderData();

    const formattedDate = formatDate(post.created_at);

    return (
        <article>
            <h1>{post.title}</h1>
            <p>By: {author}</p>
            <p>Posted on {formattedDate}</p>
            <p>{post.content}</p>
        </article>
    )
}