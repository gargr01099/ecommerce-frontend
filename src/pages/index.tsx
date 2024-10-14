import { useState } from 'react';
import { useRouter } from 'next/router';
import userService from '../services/userService';
import Input from '../components/Input';
import Button from '../components/Button';

const Home = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userService.registerUser(formData);
      console.log('Registration successful');
      router.push('/success'); // Redirect to a success page
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <Input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <select name="role" value={formData.role} onChange={handleChange} className="border rounded p-2 mb-4">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Home;
