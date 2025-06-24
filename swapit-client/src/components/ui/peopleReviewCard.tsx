import React from "react";
import styled from "styled-components";
import Image from "next/image";

import photo1 from "../../../public/reviews/handsome-happy-bearded-man.jpg";
import photo2 from "../../../public/reviews/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign.jpg";
import photo3 from "../../../public/reviews/young-girl-standing-straight-posing-camera-checked-shirt-red-t-shirt-looking-happy-front-view.jpg";
import photo4 from "../../../public/reviews/young-handsome-guy-wearing-checkered-shirt-looking-standing-emotionless-white-wall.jpg";



const PeopleReviewCard = () => {
  const reviews = [
    {
      name: "Alice",
      photo: photo1,
      text: "Amazing service!",
    },
    {
      name: "Bob",
      photo: photo2,
      text: "Loved the experience.",
    },
        {
      name: "Hrithik",
      photo: photo3,
      text: "Amazing service!",
    },
    {
      name: "Doe",
      photo: photo4,
      text: "Loved the experience.",
    },
        {
      name: "John",
      photo: photo1,
      text: "Amazing service!",
    },
    {
      name: "Alex",
      photo: photo2,
      text: "Loved the experience.",
    },
        {
      name: "Messi",
      photo: photo3,
      text: "Amazing service!",
    },
    {
      name: "Ronaldo",
      photo: photo4,
      text: "Loved the experience.",
    },    {
      name: "Mppape",
      photo: photo1,
      text: "Amazing service!",
    },
    {
      name: "Neymar",
      photo: photo2,
      text: "Loved the experience.",
    },
    // ...add 8 more
  ];

  return (
    <StyledWrapper>
      <div className="card-3d">
        {reviews.map((review, index) => (
          <div key={index}>
            <p className="review-text">"{review.text}"</p>
            <Image
              className="avatar"
              src={review.photo}
              alt={review.name}
              width={60}
              height={60}
            />
            <p className="name">{review.name}</p>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @keyframes autoRun3d {
    from {
      transform: perspective(800px) rotateY(-360deg);
    }
    to {
      transform: perspective(800px) rotateY(0deg);
    }
  }

  @keyframes animateBrightness {
    10% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(0.1);
    }
    90% {
      filter: brightness(1);
    }
  }

  .card-3d {
    position: relative;
    width: 400px;
    height: 200px;
    transform-style: preserve-3d;
    transform: perspective(900px);
    animation: autoRun3d 20s linear infinite;
    will-change: transform;
  }

  .card-3d div {
    position: absolute;
    width: 120px;
    height: 180px;
    background-color: rgb(255, 255, 255);
    border: solid 2px lightgray;
    border-radius: 1rem;
    top: 50%;
    left: 50%;
    transform-origin: center center;
    animation: animateBrightness 20s linear infinite;
    transition-duration: 200ms;
    will-change: transform, filter;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background-color: white;
  }
  .review-text {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .avatar {
    border-radius: 100%;
    object-fit: cover;
    margin-bottom: 0.5rem;
    border: 2px solid #ccc;
  }

  .name {
    font-weight: bold;
    color: #444;
    font-size: 0.85rem;
  }

  .card-3d:hover {
    animation-play-state: paused !important;
  }

  .card-3d:hover div {
    animation-play-state: paused !important;
  }

  .card-3d div:nth-child(1) {
    transform: translate(-50%, -50%) rotateY(0deg) translateZ(300px);
    animation-delay: -0s;
  }

  .card-3d div:nth-child(2) {
    transform: translate(-50%, -50%) rotateY(36deg) translateZ(300px);
    animation-delay: -2s;
  }

  .card-3d div:nth-child(3) {
    transform: translate(-50%, -50%) rotateY(72deg) translateZ(300px);
    animation-delay: -4s;
  }

  .card-3d div:nth-child(4) {
    transform: translate(-50%, -50%) rotateY(108deg) translateZ(300px);
    animation-delay: -6s;
  }

  .card-3d div:nth-child(5) {
    transform: translate(-50%, -50%) rotateY(144deg) translateZ(300px);
    animation-delay: -8s;
  }

  .card-3d div:nth-child(6) {
    transform: translate(-50%, -50%) rotateY(180deg) translateZ(300px);
    animation-delay: -10s;
  }

  .card-3d div:nth-child(7) {
    transform: translate(-50%, -50%) rotateY(216deg) translateZ(300px);
    animation-delay: -12s;
  }

  .card-3d div:nth-child(8) {
    transform: translate(-50%, -50%) rotateY(252deg) translateZ(300px);
    animation-delay: -14s;
  }

  .card-3d div:nth-child(9) {
    transform: translate(-50%, -50%) rotateY(288deg) translateZ(300px);
    animation-delay: -16s;
  }

  .card-3d div:nth-child(10) {
    transform: translate(-50%, -50%) rotateY(324deg) translateZ(300px);
    animation-delay: -18s;
  }
`;

export default PeopleReviewCard;
