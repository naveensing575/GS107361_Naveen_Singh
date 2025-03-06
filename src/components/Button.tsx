import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: "blue" | "red" | "gray";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color = "blue",
}) => {
  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
    gray: "bg-gray-500 hover:bg-gray-600 text-white",
  };

  return (
    <button onClick={onClick} className={`${colors[color]} px-4 py-2 rounded`}>
      {children}
    </button>
  );
};

export default Button;
