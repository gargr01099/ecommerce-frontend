/**
 * Represents a user in the application.
 * 
 * @property {string} name - The full name of the user.
 * @property {string} username - The unique username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {'user' | 'admin'} role - The role of the user, either 'user' or 'admin'.
 * @property {string} address - The address of the user.
 * @property {string} phone - The phone number of the user.
 */
export interface User {
    name: string;
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    address: string;  
    phone: string;  
  }
  