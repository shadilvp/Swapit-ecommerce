import React, { Suspense } from "react";
import ProductSwap from "./ProductSwap";

export default function SwapPage() {
  return (
    <Suspense fallback={<div className="mt-20 text-center">Loading...</div>}>
      <ProductSwap />
    </Suspense>
  );
}