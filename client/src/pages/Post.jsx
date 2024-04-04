import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';

const Post = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [post, setPost] = useState();
  console.log(post);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          setError(true);
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col justify-center items-center min-h-screen">
      <h1
        className="text-3xl
   mt-10 p-3 text-center font-serif max-w-2xl mx-auto"
      >
        {post && post.title}
      </h1>
      <Link
        className="self-center mt-5"
        to={`/search?category=${post && post.category}`}
      >
        <Button className="text-2xl" color="gray" size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        className="mt-10 rounded-lg max-h-[500px] max-w-[800px] w-full object-cover "
        src={post && post.image}
        alt={post && post.title}
      />
      <div className="flex justify-between p-3 border-slate-500 mx-auto w-full max-w-2xl text-sm ">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
     
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      >
      </div>
        <div className='max-w-4xl max-auto w-full'>
         <CallToAction/>
        </div>
    
    </main>
  );
};
export default Post;
