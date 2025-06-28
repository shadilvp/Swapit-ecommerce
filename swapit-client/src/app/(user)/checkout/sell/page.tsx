import React, { Suspense } from "react";
import SellPage from "./Sell";

export default function SwapPage() {
  return (
    <Suspense fallback={<div className="mt-20 text-center">Loading...</div>}>
      <SellPage />
    </Suspense>
  );
}