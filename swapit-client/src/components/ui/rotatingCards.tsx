import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import furniture from './../../../public/Furniture.png';
import fasion from './../../../public/Fasion.png';
import books from './../../../public/Books.png';
import mobile from './../../../public/Mobiles.png';
import sports from './../../../public/Sports.png';
import electronics from './../../../public/electronics.png';

const RotatingCard = () => {
  return (
    <StyledWrapper>
      <div className="cube-container">
        <div className="cube">
          <div className="face front"><Image src={furniture} alt="Furniture" layout="fill" objectFit="cover" /></div>
          <div className="face back"><Image src={fasion} alt="Furniture" layout="fill" objectFit="cover" /></div>
          <div className="face right"><Image src={books} alt="Furniture" layout="fill" objectFit="cover" /></div>
          <div className="face left"><Image src={mobile} alt="Furniture" layout="fill" objectFit="cover" /></div>
          <div className="face top"><Image src={sports} alt="Furniture" layout="fill" objectFit="cover" /></div>
          <div className="face bottom"><Image src={electronics} alt="Furniture" layout="fill" objectFit="cover" /></div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cube-container {
    width:  400px;
    height: 300px;
    perspective: 800px;
    margin: 50px auto;
  }

  .cube {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: rotate 8s infinite linear;
  }

  .face {
    position: absolute;
    width: 200px;
    height: 200px;
    color: rgb(214, 21, 21);
    font-size: 18px;
    text-align: center;
    line-height: 300px;
    background: transparent;
    opacity: 0.9;
    border: 2px solid;
    border-image: linear-gradient(to right, #ff6b6b, #355c7d, #557d35, #cfcf16, #a51f1f) 2;
    box-shadow: 0 0 50px rgba(86, 176, 81, 0.8);
  }

  .front {
    transform: translateZ(200px);
  }

  .back {
    transform: rotateY(180deg) translateZ(200px);
  }

  .right {
    transform: rotateY(90deg) translateZ(200px);
  }

  .left {
    transform: rotateY(-90deg) translateZ(200px);
  }

  .top {
    transform: rotateX(90deg) translateZ(200px);
  }

  .bottom {
    transform: rotateX(-90deg) translateZ(200px);
  }

  .cube-container:hover .cube {
    animation-play-state: paused;
  }

  @keyframes rotate {
    0% {
      transform: rotateX(0) rotateY(0) rotateZ(0);
    }

    100% {
      transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
  }`;

export default RotatingCard;
