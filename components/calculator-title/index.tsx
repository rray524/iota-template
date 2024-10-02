import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h1 className="text-2xl font-bold mb-4">{children}</h1>;
};

export default Title;
