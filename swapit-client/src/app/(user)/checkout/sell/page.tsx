"use client";

import { fetchSpecificProduct } from "@/services/product";
import { fetchAddress, fetchSpecificAddress } from "@/services/user/address";
import { fetchUserProfile } from "@/services/user/profile";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

const SellPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  interface Address {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    addressLine: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  }

  // Fetch product data
  const {
    data: currentProduct,
    isLoading: currentProductLoading,
    error: currentProductError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchSpecificProduct(productId),
    enabled: !!productId,
  });

  // Fetch user data
  const {
    data: currentUser,
    isLoading: currentUserLoading,
    error: currentUserError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });


  //fetch address
  const { data: addresses, isLoading: addressesLoading, error: addressesError } = useQuery<Address[]>({
      queryKey: ["addresses"],
      queryFn: fetchAddress,
  });

  //fetchSpecificAddress

    // const { data: specificAddress, isLoading: specificAddressLoading, error: specificAddressError } = useQuery({
    //   queryKey: ["user", addressId],
    //   queryFn: () => fetchSpecificAddress(addressId),
    //   enabled: !!addressId,
    // });

  // console.log("address",addresses)

  const handleAddAddress =  () => {
    router.push(`/profile/address?productId=${productId}`);
  };

  if (currentProductLoading || currentUserLoading) {
    return <div>Loading...</div>;
  }

  if (currentProductError || currentUserError) {
    return <div>Error loading data.</div>;
  }

  const formatAddressLine = (address: string, chunkSize: number = 25) => {
    return address.match(new RegExp(`.{1,${chunkSize}}`, "g")) || [];
  };

  return (
    <div className="min-h-screen bg-gray-200 p-24 text-black">
      <div className="max-w-4xl mx-auto bg-white p-16">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold">Shopping Cart</h1>
          <p className="text-sm text-gray-600">Homepage / Clothing Categories / MZ.Shaealog.Cart</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-6">
          {/* Left Column: Login and Shipping Address */}
          <div className="space-y-6">
            {/* Login and User Info */}
            <div>
              <div className="flex justify-between items-center border-2 p-5 pl-16 rounded-xl">
                <span className="text-sm font-semibold">LOGIN</span>
                <div className="text-sm">
                  <p>{currentUser?.user?.name}</p>
                  <p>{currentUser?.user?.phone}</p>
                  <p>{currentUser?.user?.email}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border-2 p-5 pl-16 rounded-xl">
              <h2 className="text-lg font-bold mb-2">SHIPPING ADDRESS</h2>

              {addresses && addresses.length > 0 ? (
              // Show the first available address
                <div>
                  <p><strong>Name:</strong> {addresses[0].firstName} {addresses[0].lastName}</p>
                  <p><strong>Email:</strong> {addresses[0].email}</p>
                  <p><strong>Mobile:</strong> {addresses[0].mobile}</p>
                  <p><strong>Address:</strong> 
                    {formatAddressLine(addresses[0].addressLine).map((line, index) => (
                      <span key={index} className="block">{line}</span>
                    ))}
                  </p>
                  <p>{addresses[0].city}, {addresses[0].state}, {addresses[0].country} - {addresses[0].pinCode}</p>
                </div>
              ) : (
              // Show "No address" message with Add button
                <div className="flex justify-between">
                  <p className="text-sm">You don't have any address</p>
                  <button className="bg-gray-100 rounded-lg px-8" onClick={handleAddAddress}>
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Your Order */}
            <div className="border-2 p-10 rounded-xl">
              <h2 className="text-lg font-bold mb-2">YOUR ORDER</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="space-y-4">
                  {/* Product Details */}
                  {currentProduct?.product && (
                    <>
                      <div className="flex justify-between">
                        <p className="font-semibold text-sm">{currentProduct.product.name}</p>
                        <p className="text-gray-600 text-sm">${currentProduct.product.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <img
                          src={currentProduct.product.image}
                          alt={currentProduct.product.name}
                          width={50}
                          height={50}
                          className="rounded-lg"
                        />
                        <p className="text-xs text-gray-600">
                          {currentProduct.product.description}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600">Quantity: {currentProduct.product.quantity}</p>
                    </>
                  )}

                  {/* Delivery and Discount */}
                  <div className="flex justify-between">
                    <p className="font-semibold text-sm">Delivery</p>
                    <p className="text-gray-600 text-sm">$30 Express</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="font-semibold text-sm">Discount</p>
                    <p className="text-gray-600 text-sm">$80</p>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between border-t pt-4">
                    <p className="font-bold text-sm">Total</p>
                    <p className="font-bold text-sm">
                      ${currentProduct?.product ? currentProduct.product.price - 80 + 30 : "0.00"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle and Right Columns Container */}
          <div className="grid grid-cols-1 gap-6">
            {/* Middle Column: Payment Method */}
            <div>
              <h2 className="text-lg font-bold mb-2 bg-gray-200 rounded-xl pl-5 py-2">
                PAYMENT METHOD
              </h2>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Razorpay</h3>
                <div className="space-y-4">
                  <button className="w-full bg-black text-white py-2 rounded-md text-sm">
                    Pay ${currentProduct?.product ? currentProduct.product.price - 80 + 30 : "0.00"}
                  </button>
                  <p className="text-xs text-gray-500">
                    Your card details would be securely saved for faster payments. Your C/Y will not be stored.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;