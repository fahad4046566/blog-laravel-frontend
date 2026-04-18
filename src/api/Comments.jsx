import api from "./axiosInstance"

export const postComment = async (body, post_id, token) => { 
 try {
    const response = api.post('/comments',{body,post_id},{
        headers:{Authorization: `Bearer ${token}`}
    })
    return response;
 } catch (error) {
    console.error(error)
 }

}