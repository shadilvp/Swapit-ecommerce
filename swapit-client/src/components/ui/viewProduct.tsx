import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const ProductViewButton = ({ productId }: { productId: string }) => {
  const router = useRouter();

  return (
    <StyledWrapper>
      <button className="Btn" onClick={() => router.push(`/shop/${productId}`)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.1em"
          viewBox="0 0 576 512"
          className="svgIcon"
        >
          <path d="M572.52 241.4C518.37 135.6 412.29 64 288 64S57.63 135.6 3.48 241.4a32.35 32.35 0 000 29.2C57.63 376.4 163.71 448 288 448s230.37-71.6 284.52-177.4a32.35 32.35 0 000-29.2zM288 400c-97.2 0-187.2-52.3-236.9-136 49.7-83.7 139.7-136 236.9-136s187.2 52.3 236.9 136c-49.7 83.7-139.7 136-236.9 136zm0-240a104 104 0 10104 104 104.11 104.11 0 00-104-104zm0 176a72 72 0 1172-72 72.08 72.08 0 01-72 72z" />
        </svg>
        <span className="text">View Product</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .Btn {
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition-duration: 0.4s;
    cursor: pointer;
    position: relative;
    background: #32cd32;
    background: -moz-linear-gradient(45deg, #32cd32 0%, #228b22 100%);
    background: -webkit-linear-gradient(45deg, #32cd32 0%, #228b22 100%);
    background: linear-gradient(45deg, #32cd32 0%, #228b22 100%);
    overflow: hidden;
  }

  .svgIcon {
    transition-duration: 0.3s;
  }

  .svgIcon path {
    fill: white;
  }

  .text {
    position: absolute;
    color: rgb(255, 255, 255);
    width: 100px;
    font-weight: 200;
    opacity: 0;
    transition-duration: 0.4s;
  }

  .Btn:hover {
    width: 110px;
    transition-duration: 0.4s;
    border-radius: 30px;
  }

  .Btn:hover .text {
    opacity: 1;
    transition-duration: 0.4s;
  }

  .Btn:hover .svgIcon {
    opacity: 0;
    transition-duration: 0.3s;
  }
`;

export default ProductViewButton;
