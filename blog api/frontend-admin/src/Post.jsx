import { useState, useEffect } from "react"
import formatDate from './utils/formatDate';

export default function Post({title, content, id, author_id, created_at}) {

    const [author, setAuthor] = useState(null);

    useEffect(() => {
        async function fetchAuthor() {
            try {
                const res = await fetch(`http://localhost:5000/api/users/${author_id}`);
                if (!res.ok) throw new Error(`Response status: ${res.status}`);
                const data = res.json();
                setAuthor(data);
            } catch (error) {
                console.error(error);
            }
        }
        
        fetchAuthor();
    }, []);

    const formattedDate = formatDate(created_at);

    return (
            <li className="post">
                <p className="author">{author}</p>
                <p className="date">{formattedDate}</p>
                <h2 className="title">
                    <a href={`http://localhost:5000/api/posts/${id}`}>{title}</a>
                </h2>
                <p className="comments">Comments</p>
            </li>
        )
}

'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis laborum delectus doloremque deleniti debitis libero id repellat est commodi eveniet, nam aliquid quam assumenda recusandae nulla vel, voluptatum qui quas?'