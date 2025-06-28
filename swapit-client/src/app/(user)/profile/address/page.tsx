import React, { Suspense } from "react";
import AddressPage from "./Adress";

export default function SwapPage() {
  return (
    <Suspense fallback={<div className="mt-20 text-center">Loading...</div>}>
      <AddressPage />
    </Suspense>
  );
}