import api from "./axiosInstance";

export const registerApi = async (name,email,password,password_confirmation) => {
  try {
    const response = await api.post('/register',{name,email,password,password_confirmation});
    return response;
  } catch (error) {
    throw error;
  }
}


export const loginApi = async (email,password) => {
  try {
    const response =  await api.post('/login',{email,password});
    return response;
  } catch (error) {
    throw error;
  }
}

 
export const logoutApi = async(token)=>{
  try {
    const response = await api.post('/logout',{},{ 
      headers:{Authorization : `Bearer ${token}`} 
    })
    return response;
  } catch (error) {
    
  }
}