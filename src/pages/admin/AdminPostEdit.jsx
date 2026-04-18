import { editPost, getPostBySlug } from "../../api/Posts";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../context/AuthContext";
import UseFetchCategories from "../../hooks/UseFetchCategories";
import Loading from "../../components/Loading";

const AdminPostEdit = () => {
  const { category, loading, error } = UseFetchCategories();
  const { slug } = useParams();
  const { token } = useGlobalContext();
  const [postId, setPostId] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("category_id", data.category_id);
    formData.append("status", data.status);
     console.log("Form data being sent:", data);
    try {
      const response = await editPost(postId, data, token);
      if (response.data.success) {
        navigate("/admin/posts");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getIDBySlug = async () => {
      const response = await getPostBySlug(slug);
      setPostId(response.data.data.id);
      reset(response.data.data);
    };
    getIDBySlug();
  }, [slug]);

  if (loading) return <div><Loading/></div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
        <form action="" className="flex justify-center  md:m-30" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <h1 className="text-center text-4xl font-bold">Edit Post</h1>

          <label className="label">Title</label>
          <input
            {...register("title", {
              required: "Post Title is required",
              minLength: { value: 2, message: "Title is too short" },
            })}
            className="input"
            placeholder="Title"
          />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}

          <label className="label">Body</label>
          <textarea
            {...register("body", {
              required: "Post Title is required",
              minLength: { value: 40, message: "Post Body is too short" },
            })}
            className="textarea"
            placeholder="Post Body"
          />
          {errors.body && (
            <div className="text-red-500">{errors.body.message}</div>
          )}

          <label className="label">Category</label>
          <select
            {...register("category_id")}
            defaultValue="Pick a font"
            className="select select-ghost"
          >
            <option disabled={true}>Select Category</option>
            {category.map((cat) => {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
          <label className="label">Status</label>
          <select
            {...register("status")}
            defaultValue="Pick a font"
            className="select select-ghost"
          >
            <option disabled={true}>Select Status</option>
            <option>public</option>
            <option>drafted</option>
          </select>
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary mt-4"
          >
            {isSubmitting ? `Adding Updated Post...` : `Update Post`}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AdminPostEdit;
