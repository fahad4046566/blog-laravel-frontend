import api from "./axiosInstance";

export const getPosts= async(params= {}) => {
  try {
    const posts = await api.get('/posts',{params});
    return posts;
  } catch (error) {
    console.error(error);
  }
}
export const getPostBySlug = async (slug) => {
  try {
    const posts = await api.get(`/posts/${slug}`);
    return posts;
  } catch (error) {
    console.error(error);
  }
}
// admin APIs portion 
export const getAdminPosts = async (token,params={}) => {
    const response = await api.get('/admin/posts', {
        params: params,
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
};
export const createPost = async (data, token) => { 
   const response = await api.post('/admin/posts',data,{
      headers: { Authorization: `Bearer ${token}` }
   })
   return response;
 }
 export const editPost = async (slug,data, token) => { 
   const response = await api.put(`/admin/posts/${slug}`,data,{
      headers: { Authorization: `Bearer ${token}` }
   })
   return response;
 }
 export const deleteApi = async(id,token)=>{
   const response = await api.delete(`/admin/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
 }
