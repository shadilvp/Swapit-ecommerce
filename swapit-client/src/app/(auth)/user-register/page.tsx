"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation"; 
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/auth";
import { useState, useEffect } from "react";

const UserRegister = () => {
  const router = useRouter();

  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    const updateBackground = () => {
      setBgImage(window.innerWidth >= 500 ? "url('/Web_Photo_Editor 1@2x (1).png')" : "url('freepik__adjust__49700.png')");
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);

    return () => window.removeEventListener("resize", updateBackground); 
  }, []);

  
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
        router.push("/login");
    },
    onError: (error) => {
        console.error("Registration failed:", error);
    },
    });


  return (
    <div className="flex h-screen w-full bg-no-repeat bg-cover "
      style={{ backgroundImage: bgImage }}
    >

<div 
  className="w-1/2 hidden lg:flex items-center justify-center h-screen"
>
</div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-[#175F3C] bg-opacity-40 shadow-lg rounded-[50px] p-6">
  <h2 className="text-2xl font-bold text-black text-center mb-6">Create Account</h2>

  <Formik

    initialValues={{
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }}

    validationSchema={Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    })}

    onSubmit={(values, { setSubmitting, setErrors }) => {
      mutation.mutate(values, {
        onError: (error: any) => {
          setErrors({ email: error.response?.data?.message || "Registration failed" });
          setSubmitting(false);
        },
      });
    }}
  >
    {({ isSubmitting }) => (
      <Form className="space-y-4">
        <div>
          <label className="block text-black">Full Name</label>
          <Field
            type="text"
            name="name"
            className="w-full px-3 py-2 border bg-[#B0BAC3] opacity-40 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block text-black">Email</label>
          <Field
            type="email"
            name="email"
            className="w-full px-3 py-2 border bg-[#B0BAC3] opacity-40 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block text-black">Password</label>
          <Field
            type="password"
            name="password"
            className="w-full px-3 py-2 border bg-[#B0BAC3] opacity-40 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
        </div>

        <div className="mb-6">
          <label className="block text-black">Confirm Password</label>
          <Field
            type="password"
            name="confirmPassword"
            className="w-full px-3 py-2 border bg-[#B0BAC3] opacity-40 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-1/2 bg-[#105132bd] text-white py-2 rounded-lg hover:bg-[#459a71bd] transition"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </div>

        <p className="text-center text-black mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#0a8549bd] hover:underline">
            Log In
          </a>
        </p>

        {/* Sign Up with Google */}
        <div className="flex justify-center mt-4">
          <button className="flex items-center gap-2 border border-gray-400 text-black px-4 py-2 rounded-[40px] shadow hover:bg-gray-100 transition">
            <img src="/7123025_logo_google_g_icon.png" alt="Google" className="w-5 h-5" />
            Sign Up with Google
          </button>
        </div>
      </Form>
    )}
  </Formik>
</div>

      </div>
    </div>
  );
};

export default UserRegister;
