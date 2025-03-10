"use client";

const SellPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 text-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold">Shopping Cart</h1>
          <p className="text-sm text-gray-600">Homepage / Clothing Categories / MZ.Shaealog.Cart</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Login and Shipping Address */}
          <div className="space-y-6">
            {/* Login and User Info */}
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">LOGIN</span>
                <div className="text-sm">
                  <p>Michael Smith</p>
                  <p>+804 - 445 - 4453</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-lg font-bold mb-2">SHIPPING ADDRESS</h2>
              <p className="text-sm">Brody Cooper, New Civil Colony, Salt Lake City, Utah</p>
              <p className="text-sm">United States, 2971 Avenue.</p>
            </div>
          </div>

          {/* Middle Column: Payment Method */}
          <div>
            <h2 className="text-lg font-bold mb-2">PAYMENT METHOD</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Debit / Credit Card</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter Card Number *"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="MM"
                    className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
                  />
                  <input
                    type="text"
                    placeholder="YYYY"
                    className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
                  />
                  <input
                    type="text"
                    placeholder="C/V *"
                    className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-md text-sm">
                  Pay $117.00
                </button>
                <p className="text-xs text-gray-500">
                  Your card details would be securely saved for faster payments. Your C/Y will not be stored.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Net Banking</h3>
              <div className="flex space-x-4">
                <button className="flex-1 bg-white p-2 rounded-md shadow-sm text-center text-sm">
                  Google / Apple Wallet
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Your Order */}
          <div>
            <h2 className="text-lg font-bold mb-2">YOUR ORDER</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="font-semibold text-sm">Jeans with sequins</p>
                  <p className="text-gray-600 text-sm">$39.00</p>
                </div>
                <p className="text-xs text-gray-600">Star XL | Color Blue</p>
                <p className="text-xs text-gray-600">Q2</p>

                <div className="flex justify-between">
                  <p className="font-semibold text-sm">Robinson Printed</p>
                  <p className="text-gray-600 text-sm">$29.00</p>
                </div>
                <p className="text-xs text-gray-600">Star XXL | Color Blue</p>
                <p className="text-xs text-gray-600">Q1</p>

                <div className="flex justify-between">
                  <p className="font-semibold text-sm">Delivery</p>
                  <p className="text-gray-600 text-sm">$30 Express</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-semibold text-sm">Discount</p>
                  <p className="text-gray-600 text-sm">$80</p>
                </div>

                <div className="flex justify-between border-t pt-4">
                  <p className="font-bold text-sm">Total</p>
                  <p className="font-bold text-sm">$117.00</p>
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