import { useLoaderData } from "react-router";
import formatDate from "./utils/formatDate";

export async function loader({ params }) {
    const res = await fetch(`http://localhost:5000/api/posts/${params.id}`);
    if (!res.ok) throw new Response("Post Not Found", { status: 404 });
    
    const post = await res.json();

    const authorRes = await fetch(`http://localhost:5000/api/users/${post.author_id}`);
    const author = authorRes.json();

    const commentsRes = await fetch(`http://localhost:5000/api/posts/${params.id}/comments`);
    const comments = await commentsRes.json();

    // console.log(comments)

    return { post, author, comments };
}

export default function PostPage() {
    const { post, author, comments } = useLoaderData();
    const formattedDate = formatDate(post.created_at);

    return (
        <article>
            <h1>{post.title}</h1>
            <p>By: {author}</p>
            <p>Posted on {formattedDate}</p>
            <p>{post.content}</p>
            <ul className="comments">
                {comments.map(comment => (
                    <li>
                        {comment.username}
                        {formatDate(comment.created_at)}
                        {comment.text}
                    </li>
                ))}
            </ul>
        </article>
    )
}