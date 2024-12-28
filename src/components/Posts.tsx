import React, { useEffect, useState } from 'react';
import Post from './Post';

interface PostType {
  id: number;
  title: string;
  userId: number;
  body: string;
}

function Posts(): JSX.Element {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((result) => result.json())
      .then((posts: PostType[]) => setPosts(posts))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error}</h1>;
  }
  return (
    <div>
      <h1>Posts</h1>
      <hr />
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default Posts;
