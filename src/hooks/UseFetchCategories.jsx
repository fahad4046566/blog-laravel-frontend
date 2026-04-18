import { useEffect, useState } from "react";
import { categoriesApi } from "../api/Category";

const UseFetchCategories = () => {
  const [category, setcategory] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const categories = await categoriesApi();
        setcategory(categories.data.data);
        setloading(false);
      } catch (error) {
        console.error(error);
        seterror(error);
      }
    };
    fetchData();
  }, []);
  return {category,loading,error}
}

export default UseFetchCategories
