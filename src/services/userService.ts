import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users'; // Ensure this is the correct endpoint

const registerUser = async (userData:any) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error; // Rethrow or handle as needed
  }
};
const loginUser =async(userData:any)=>{
  try{
    const response =await axios.post(`${API_URL}/signin`,userData);
    const {accessToken}= response.data;
    console.log('Login successful:', response.data);  
    localStorage.setItem('accessToken', accessToken); // Store the access token
    return response.data;
  }catch(error){
    console.error('Login failed:', error);  
    throw error; // Rethrow or handle as needed 
  }
}
export const getAdminProfile = async()=>{
  try{
    const response = await axios.get(`${API_URL}/me`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include token if required
    },
  });
    return response.data;
  }catch(error){
    console.error('Admin Profile fetch failed:', error);
    throw error; // Rethrow or handle as needed
  }
}

export const getUserProfile = async(userId:number)=>{
  try {
    const response = await axios.get(`${API_URL}/single/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include token if required
      },
    });
    console.log('User Profile fetched successfully:', response.data);
    return response.data;
  }catch(error){
    console.error('User Profile fetch failed:', error);
    throw error; // Rethrow or handle as needed
  }
} 

export default {
  registerUser,
  loginUser
};
