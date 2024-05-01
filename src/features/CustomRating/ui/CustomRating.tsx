import React, { useState } from "react";

interface CustomRatingProps {
  onRatingChange: (newRating: number) => void;
}

const CustomRating: React.FC<CustomRatingProps> = ({ onRatingChange }) => {
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <div className="text-[32px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
          onClick={() => handleStarClick(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default CustomRating;
