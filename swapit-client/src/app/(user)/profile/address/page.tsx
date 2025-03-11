"use client"

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAddress, addAddress } from "@/services/user/address";
import { useRouter, useSearchParams } from "next/navigation";

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

const AddressPage: React.FC = () => {
    const router = useRouter();
      const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const productId = searchParams.get("productId");


    // Fetch addresses using React Query
    const { data: addresses, isLoading, error } = useQuery<Address[]>({
        queryKey: ["addresses"],
        queryFn: fetchAddress,
    });

    console.log("address",addresses)

    // Mutation for adding address
    const addAddressMutation = useMutation({
        mutationFn: addAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            setShowForm(false);
        },
    });
    

    const handleAddAddress = async (values: Omit<Address, "_id">) => {
        addAddressMutation.mutate(values);
    };

    const handleSubmit = () => {
        router.push(`/checkout/sell?productId=${productId}`);
    }

    return (
    <div className="bg-slate-200 min-h-screen flex justify-center items-center">
        <div className="p-6 max-w-6xl w-full bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-600">Address Details</h1>
    
        {/* Back Button */}
        <div className="text-center mb-6">
          <button
            onClick={() => router.push("/")}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 transition-all w-full sm:w-auto"
          >
            Back to Home
          </button>
        </div>
    
        {/* Toggle Add New Address Form */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowForm(prevState => !prevState)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all w-full sm:w-auto"
          >
            {showForm ? 'Cancel' : 'Add New Address'}
          </button>
        </div>
    
        {/* Address Form */}
        {showForm && (
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              mobile: '',
              addressLine: '',
              city: '',
              state: '',
              pinCode: '',
              country: '',
            }}
            onSubmit={handleAddAddress}
          >
            <Form className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              {["firstName", "lastName", "email", "mobile", "addressLine", "city", "state", "pinCode", "country"].map((field) => (
                <div key={field} className="mb-4">
                  <Field
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name={field} component="div" className="text-red-500 mt-1" />
                </div>
              ))}
              <button
                type="submit"
                className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg w-full hover:bg-green-600 transition-all"
                disabled={addAddressMutation.isPending} // Updated from isLoading to isPending
              >
                {addAddressMutation.isPending ? "Submitting..." : "Submit"}
              </button>

            </Form>
          </Formik>
        )}
    
        {/* Loading/Error States */}
        {isLoading ? (
            <p className="text-center text-blue-600">Loading...</p>
        ) : error ? (
            <p className="text-center text-red-500">{(error as Error).message}</p>
        ) : (
            <div className="text-gray-400">
                <h3 className="text-2xl font-semibold text-center mt-8 mb-4">Your Addresses</h3>

                {/* Display List of Addresses */}
                {(addresses ?? []).length > 0 ? (
                    <ul className="space-y-4 max-w-3xl mx-auto">
                    {(addresses ?? []).map((address) => (
                    <li
                        key={address._id}
                        className="bg-white p-6 border border-gray-300 rounded-lg shadow-md"
                    >
                        <p><strong>Name:</strong> {address.firstName} {address.lastName}</p>
                        <p><strong>Email:</strong> {address.email}</p>
                        <p><strong>Mobile:</strong> {address.mobile}</p>
                        <p><strong>Address:</strong> {address.addressLine}, <br />{address.city}, {address.state}, {address.country} - {address.pinCode}</p>
                        <button
                            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all w-full sm:w-auto"
                            onClick={handleSubmit}
                        >Select</button>
                    </li>
                    ))}
                    </ul>
                ) : (
                <p className="text-center text-gray-500">No addresses available.</p>
                )}
            </div>
        )}
      </div>
    </div>

    );
};

export default AddressPage;
