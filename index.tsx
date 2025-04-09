import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  content: string;
  image: string;
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts?type=latest")
      .then(res => res.json())
      .then(data => {
        const withImages = data.map((post: any) => ({
          ...post,
          image: `https://picsum.photos/seed/${post.id}/300/200`
        }));
        setPosts(withImages);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Latest Feed</h1>
      {posts.map(post => (
        <div key={post.id} className="mb-4 p-4 shadow rounded bg-white">
          <img src={post.image} alt="Post" className="mb-2 rounded" />
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
