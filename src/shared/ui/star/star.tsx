import React from "react";
import { FaStar } from "react-icons/fa";

interface StarProps {
  filled: boolean;
}

const Star: React.FC<StarProps> = ({ filled }) => {
  const color = filled ? "gold" : "gray";

  return <FaStar color={color} />;
};

export default Star;
