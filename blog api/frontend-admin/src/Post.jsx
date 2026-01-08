import formatDate from './utils/formatDate';
import { Link } from "react-router";

export default function Post({ title, id, username, created_at, numComments }) {
  const formattedDate = formatDate(created_at);

  return (
    <li className="post">
      <p className="author">{username}</p> 
      <p className="date">{formattedDate}</p>
      <h2 className="title">
        <Link to={`/posts/${id}`}>{title}</Link>
      </h2>
      <p className="comments">Comments ({numComments})</p>
    </li>
  );
}