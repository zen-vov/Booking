import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Star from "@/shared/ui/Icons/Star/Star";
import Star from "@/shared/ui/star/star";

interface AuthorNameProps {
  userId: number;
}

const AuthorName: React.FC<AuthorNameProps> = ({ userId }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const userResponse = await fetch(
          `http://studhouse.kz/api/v1/auth/user/${userId}/`
        );
        const user = await userResponse.json();
        console.log("full name memem", user.full_name);
        setUser(user.full_name);
      } catch (error) {
        console.error("Error fetching user name: ", error);
      }
    };
    fetchName();
  }, []);

  return <>{user}</>;
};

const ReviewSlider: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  //   const [user, setUser] = useState<any[]>();
  //   const [id, setId] = useState<number>();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://studhouse.kz/api/v1/review/");
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
          //   setId(data.author);
          //   console.log("author of review: ", data.author);
        } else {
          console.error("Ошибка при загрузке отзывов");
        }
      } catch (error) {
        console.error("Ошибка при загрузке отзывов:", error);
      }
    };
    // const fetchName = async () => {
    //   try {
    //     const userResponse = await fetch(
    //       `http://studhouse.kz/api/v1/auth/user/${id}/`
    //     );
    //     const user = await userResponse.json();
    //     console.log("full name memem", user.full_name);
    //     setUser(user.full_name);
    //   } catch (error) {
    //     console.error("Error fetching user name: ", error);
    //   }
    // };

    // fetchName();
    fetchReviews();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="px-4 py-8">
      <Slider {...sliderSettings}>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="px-2"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            <div className="bg-white rounded-lg shadow-lg p-4 mx-2">
              <p className="text-[16px] mb-[40px] overflow-hidden">
                {review.text}
              </p>
              <div className="flex items-center gap-[3px] mb-[10px]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} filled={starIndex < review.rating} />
                ))}
              </div>
              <p className="text-[16px] font-[500]">
                <AuthorName userId={review.author} />
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewSlider;
