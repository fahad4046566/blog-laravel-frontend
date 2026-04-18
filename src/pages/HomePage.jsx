import { getPosts } from "../api/Posts";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import { useDebounce } from "../hooks/UseDebounce";
import SearchCategories from "../components/SearchCategories";
import Pagination from "../components/Pagination";
import HeroSection from "../components/HeroSection";
import Heading from "../components/Heading";
import Loading from "../components/Loading";
import { MdReadMore } from "react-icons/md";


const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  },[])
  const [post, setpost] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 500);
  useEffect(() => {
    const fetchData = async () => {
      const params = { page };
      if (debouncedSearch) params.search = debouncedSearch;
      if (categoryId) params.category_id = categoryId;
      try {
        setloading(true);
        const response = await getPosts(params);
        setpost(response.data.data);
        setPage(response.data.current_page);
        setLastPage(response.data.last_page);
        setloading(false);
      } catch (error) {
        seterror(error);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, [debouncedSearch, categoryId, page]);
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <HeroSection />
      <div className="flex justify-center mb-4 ">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <Heading />
      <SearchCategories categoryId={categoryId} setCategoryId={setCategoryId} />
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      {post.length === 0 && !loading && <p className="text-center m-5 text-gray-300 text-3xl">No posts found.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {post.map((data) => {
          const { id, title, body, slug, image } = data;
          return (
            <div
              key={id}
              className="card bg-base-100 shadow-sm border hover:shadow-lg transition"
            >
              <figure className="h-48 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src =
                      "https://i.ytimg.com/vi/8QgQKRcAUvM/maxresdefault.jpg")
                  }
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-bold line-clamp-1">
                  {title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {body?.substring(0, 100)}...
                </p>
                <div className="card-actions justify-end mt-4">
                  <NavLink
                    to={`/PostDetailPage/${slug}`}
                    className="btn btn-primary btn-sm rounded-2xl inline-flex items-center gap-2"
                  >
                    Read More
                    <MdReadMore className="text-lg" />
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination page={page} setPage={setPage} lastPage={lastPage} />
    </>
  );
};

export default HomePage;
