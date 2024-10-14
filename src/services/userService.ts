import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/users'; // Ensure this is the correct endpoint

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

export default {
  registerUser,
};
