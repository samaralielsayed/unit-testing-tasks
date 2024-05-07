import React, { useEffect, useState } from 'react'; 

import { fetchComments, Comment } from '../interface/comments';

export default function Comments() {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [error, setError] = useState('');


  useEffect(() => {
    fetchComments()
      .then(comments => {
        setComments(comments);
      })
      .catch(() => {
        setError('Something went wrong');
      });
  }, []);

  if (!comments?.length) return <p>No comments available</p>;
  if (error) return <div role="alert">{error}</div>;

  return (
    <div style={{ maxWidth: 600 }}>
      {comments?.map(comment => (
        <div key={comment.id}>
          <p>{comment.id}</p>
          <h2>{comment.name}</h2>
          <p>{comment.email}</p>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
}
