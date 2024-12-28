import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface PostType {
  id: number;
  title: string;
  body: string;
}

interface CommentType {
  id: number;
  name: string;
  email: string;
  body: string;
}

function PostDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
        res.json()
      ),
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(
        (res) => res.json()
      ),
    ])
      .then(([post, comments]) => {
        setPost(post);
        setComments(comments);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <div>
      <Link to="/">Back to Posts</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>
            <strong>{comment.name}</strong> ({comment.email})
          </p>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostDetail;
