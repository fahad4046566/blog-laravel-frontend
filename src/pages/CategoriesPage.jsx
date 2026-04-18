import Loading from "../components/Loading";
import UseFetchCategories from "../hooks/UseFetchCategories";
import { useEffect } from "react";

const CategoriesPage = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    },[])
  const { category, loading, error } = UseFetchCategories();

  if (loading) return <div><Loading/></div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Categories</h1>
          <p className="text-gray-400">
            Browse posts by topic — {category?.length || 0} categories
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {category?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/?category=${cat.id}`)}
              className="px-6 py-3 bg-white/10 rounded-full hover:bg-blue-500 hover:text-white transition"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default CategoriesPage;
