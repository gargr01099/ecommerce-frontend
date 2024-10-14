export interface User {
    name: string;
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    address: string;  
    phone: string;  
  }
  