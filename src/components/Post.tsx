import './Post.css';
import { Link } from 'react-router-dom';

interface PostProps {
  id: number;
  title: string;
  userId: number;
  body: string;
}

function Post({ id, title, userId, body }: PostProps): JSX.Element {
  return (
    <div className="post">
      <small>{id}</small>
      <h2>Title: {title}</h2>
      <p>{body}</p>
      <h3>User ID: {userId}</h3>
      <div className="button">
        <Link to={`/posts/${id}`}>
          <button>Comments</button>
        </Link>
      </div>
    </div>
  );
}

export default Post;
