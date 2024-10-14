const Button = ({ children, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 transition duration-200"
      {...props}
    >
      {children}
    </button>
  );
};  
  export default Button;
  