// pages/index.tsx
import Register from "./register";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-300 to-purple-600 p-6">
      <header className="w-full p-4 shadow-lg">
        <h1 className="text-white text-4xl font-bold text-center drop-shadow-lg">
          ECommerce Store
        </h1>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <Register />
      </main>

      <footer className="w-full bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2023 ECommerce Store. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue-300 hover:text-blue-100 mx-2">Privacy Policy</a>
            <a href="#" className="text-blue-300 hover:text-blue-100 mx-2">Terms of Service</a>
            <a href="#" className="text-blue-300 hover:text-blue-100 mx-2">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
