import React from "react";
import styled from "styled-components";
import { Heart } from "lucide-react";
import AddButton from "@/components/ui/addButton";
import ProductViewButton from "./viewProduct";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  handleSwapCartButton: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,  
  handleSwapCartButton,
}) => {

  return (
    <StyledWrapper>
      <div className="card">
        {/* Wishlist Icon */}
        <button className="wishlist">
          <Heart size={16} className="text-gray-700 hover:text-red-500" />
        </button>

        {/* Product Image */}
        <div className="image-container">
          <Image src={product.image} alt={product.name} className="image" />
          <div className="view-button">
            <ProductViewButton productId={product._id} />
          </div>
        </div>

        {/* Product Info */}
        <div className="info">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>

        {/* Swap/Add to Cart Button */}
        <div className="button-container">
          <AddButton onClick={() => handleSwapCartButton(product)}>
            {product.condition === "new" ? "Add to Cart" : "Swap"}
          </AddButton>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  perspective: 1000px;

  .card {
    width: 210px;
    height: 350px;
    border-radius: 20px;
    background: #e0e0e0;
    box-shadow: 8px 8px 16px #bebebe, -8px -8px 16px #ffffff;
    position: relative;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease-out;
    transform-style: preserve-3d;
  }

  .card:hover {
    transform: scale(1.05) rotateX(7deg) rotateY(7deg);
  }

  .image-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
  }

  .view-button {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  .wishlist {
    position: absolute;
    top: 10px;
    right: 10px;
    background: white;
    padding: 5px;
    border-radius: 50%;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .info {
    text-align: center;
    margin-top: 10px;
  }

  .info h3 {
    font-size: 14px;
    color: #333;
  }

  .info p {
    font-size: 16px;
    font-weight: bold;
    color: green;
  }

  .button-container {
    margin-top: auto;
  }
`;


export default ProductCard;
