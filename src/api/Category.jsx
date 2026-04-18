import api from "./axiosInstance";

export const categoriesApi = () => {
  try {
    const response = api.get('/categories');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
