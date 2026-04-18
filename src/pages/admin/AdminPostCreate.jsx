import { createPost } from "../../api/Posts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../context/AuthContext";
import UseFetchCategories from "../../hooks/UseFetchCategories";
import Loading from "../../components/Loading";

const AdminPostCreate = () => {
  const { category, loading, error } = UseFetchCategories();
  const { token } = useGlobalContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("category_id", data.category);
    formData.append("status", data.status);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }
    try {
      const response = await createPost(formData, token);
      if (response.data.success) {
        navigate("/admin/posts");
      }
    } catch (error) {
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  if (loading) return <div><Loading/></div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <div className="">
       <form action="" onSubmit={handleSubmit(onSubmit)} method="post">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
           <h1 className="m-5 text-center text-4xl font-bold">Create New Post</h1>
        
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

          <label className="label">Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", {
              validate: {
                required: (value) => value?.[0] || "Image is required",
              },
            })}
            className="file-input file-input-primary"
          />
          {errors.image && (
            <div className="text-red-500">{errors.image.message}</div>
          )}

          <label className="label">Category</label>
          <select
            {...register("category")}
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
            {isSubmitting ? `Adding Post...` : `Add Post`}
          </button>
        </fieldset>
      </form>
    </div>
  </>
  );
};

export default AdminPostCreate;
