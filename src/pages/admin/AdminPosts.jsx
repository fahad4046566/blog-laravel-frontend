import { getAdminPosts, deleteApi } from "../../api/Posts";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
const AdminPosts = () => {
  const { token } = useGlobalContext();
  const [post, setpost] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const PostData = await getAdminPosts(token, { page });
        setpost(PostData.data.data);
        setLastPage(PostData.data.last_page);
        setloading(false);
      } catch (error) {
        seterror(error);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, [page]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmed) return;
    try {
      await deleteApi(id, token);
      const PostData = await getAdminPosts(token);
      setpost(PostData.data.data);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete post");
    }
  };

  if (loading) return <div><Loading/></div>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div>
        <NavLink to={"/admin/posts/create"}>
          <button className="btn btn-success">Add Post</button>
        </NavLink>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {post.map((p) => {
                return (
                  <tr key={p.id}>
                    <th>{p.id}</th>
                    <th>{p.title}</th>
                    <td>{p.status}</td>
                    <td className="flex gap-2">
                      <NavLink to={`/admin/posts/edit/${p.slug}`}>
                        <button className="btn btn-warning">
                          <MdEdit className="text-2xl" />
                        </button>
                      </NavLink>
                      <button
                        onClick={() => {
                          handleDelete(p.id);
                        }}
                        className="btn btn-error"
                      >
                        <MdDelete className="text-2xl" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} lastPage={lastPage} setPage={setPage} />
    </>
  );
};

export default AdminPosts;
