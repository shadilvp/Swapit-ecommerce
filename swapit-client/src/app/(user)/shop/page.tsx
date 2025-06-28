import React, { Suspense } from "react";
import Shop from "./Shop";

export default function SwapPage() {
  return (
    <Suspense fallback={<div className="mt-20 text-center">Loading...</div>}>
      <Shop />
    </Suspense>
  );
} 