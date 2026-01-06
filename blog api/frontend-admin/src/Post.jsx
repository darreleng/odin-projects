import formatDate from './utils/formatDate';
import { Link } from "react-router";

export default function Post({ title, content, id, authorName, created_at }) {
  const formattedDate = formatDate(created_at);

  return (
    <li className="post">
      <p className="author">{authorName}</p> 
      <p className="date">{formattedDate}</p>
      <h2 className="title">
        <Link to={`/posts/${id}`}>{title}</Link>
      </h2>
      <p>{content}</p>
      <p className="comments">Comments</p>
    </li>
  );
}