import UseFetchCategories from "../hooks/UseFetchCategories";

const SearchCategories = ({categoryId,setCategoryId}) => {
    const {category} =UseFetchCategories()
  return (
    <div className="flex justify-center">
      <div className="flex gap-2  overflow-x-auto  p-2 rounded-4xl w-90 md:w-165">
        <button
          onClick={() => setCategoryId("")}
          className={`px-4 py-2 rounded-full ${!categoryId ? "bg-blue-500 text-gray-900" : "bg-gray-200 text-gray-900"}`} >
          All
        </button>
        {category.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryId(cat.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              categoryId == cat.id ? "bg-blue-500 text-gray-900 hover:cursor-pointer" : "bg-gray-200 text-gray-900 hover:cursor-pointer"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchCategories;
