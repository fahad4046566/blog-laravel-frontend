import { IoSendSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "../api/Posts";
import { useEffect, useState } from "react";
import { postComment } from "../api/Comments";
import { useGlobalContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import { FaCommentDots } from "react-icons/fa";
const PostDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  },[])
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const { token } = useGlobalContext();

  const { slug } = useParams();
  const [post, setpost] = useState();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const postData = await getPostBySlug(slug);
        setpost(postData.data.data);
        setloading(false);
      } catch (error) {
        seterror(error);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, [slug]);
  const onSubmit = async (data) => {
    try {
      const result = await postComment(data.comment, post.id, token);
      if (result) {
        const updatedPost = await getPostBySlug(slug);
        setpost(updatedPost.data.data);
        reset();
      }
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <div>
        {error && (
          <div className="text-red-500">
            Failed to load post: {error.message}
          </div>
        )}
       <div key={post.id} className="max-w-4xl mx-auto p-6">
    {/* Title */}
    <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
    
    {/* Meta info */}
    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-700">
        <span>📅 {post.created_at}</span>
        <span>🕐 {Math.ceil(post.body?.length / 1000)} min read</span>
    </div>
    
    {/* Featured Image */}
    {post.image && (
        <div className="mb-8 rounded-xl overflow-hidden">
            <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto max-h-125 object-cover"
                onError={(e) =>
                    (e.target.src = "https://i.ytimg.com/vi/8QgQKRcAUvM/maxresdefault.jpg")
                }
            />
        </div>
    )}
    
    {/* Body Content */}
    <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.body}
        </p>
    </div>
</div>
      </div>
     {/* comments form */}
<div className="mt-6 m-12">
    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <FaCommentDots className="text-blue-500" /> Leave a Comment
    </h3>
    
    {token ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <input
                {...register("comment", { required: "Comment cannot be empty" })}
                type="text"
                placeholder="Write your comment..."
                className="input input-bordered flex-1"
            />
            <button
                disabled={isSubmitting}
                type="submit"
                className="btn btn-primary btn-circle"
            >
                {isSubmitting ? (
                    <span className="loading loading-spinner loading-xs"></span>
                ) : (
                    <IoSendSharp />
                )}
            </button>
        </form>
    ) : (
        <div className="text-center text-gray-400 p-4 bg-white/5 rounded-lg">
            Please{" "}
            <a href="/login" className="text-blue-500 hover:underline">
                login
            </a>{" "}
            to leave a comment
        </div>
    )}


        {isSubmitting && (
          <div className="flex items-center gap-2 text-blue-500 my-2">
            <span className="loading loading-spinner loading-sm"></span>
            Adding comment...
          </div>
        )}

        <div className="flex items-center justify-center gap-2 mt-4">
          <FaCommentDots className="text-blue-500" />
          <span className="font-semibold">Comments</span>
        </div>

        <div className="m-4 border rounded-2xl h-80 overflow-y-auto p-4">
          {post.comments &&
            [...post.comments].reverse().map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 mb-4 pb-3 border-b border-gray-700"
              >
                {/* Avatar */}
                <div className="avatar placeholder">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-sm font-bold">
                      {comment.author_name?.[0]?.toUpperCase() || "?"}
                    </span>
                  </div>
                </div>

                {/* Comment Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">
                      {comment.author_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {comment.created_at}
                    </p>
                  </div>
                  <p className="text-sm mt-1">{comment.body}</p>
                </div>
              </div>
            ))}

          {post.comments?.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;
