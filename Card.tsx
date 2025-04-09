import React from "react";

interface CardProps {
  title: string;
  content: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ title, content, image }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow mb-4">
      <img src={image} alt={title} className="rounded-xl mb-2" />
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Card;
