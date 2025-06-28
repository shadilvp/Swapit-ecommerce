"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerUser, googleAuth } from "@/services/auth";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";

interface DecodedGoogleToken {
  name: string;
  email: string;
  sub: string;
}

type RegisterResponse = {
  message: string;
  user: {
    name: string;
    email: string;
  };
};

const UserRegister = () => {
  const router = useRouter();

  const mutation = useMutation<
    RegisterResponse,
    AxiosError<{ message?: string }>,
    { name: string; email: string; password: string; confirmPassword: string }
  >({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse): Promise<void> => {
    if (!credentialResponse?.credential) return;

    const decoded = jwtDecode<DecodedGoogleToken>(credentialResponse.credential);
    const { name, email, sub } = decoded;

    try {
      await googleAuth({ name, email, googleId: sub });
      router.push("/login");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="1086489884784-2e3p2a6e32tc8ms6arpusk39fi0rm8ib.apps.googleusercontent.com">
      <div className="flex h-screen w-full bg-gradient-to-r from-[#000] to-[#276539]">
        <div className="w-full flex items-center justify-center p-8">
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
                confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm password is required"),
              })}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                mutation.mutate(values, {
                  onError: (error) => {
                    setErrors({
                      email: error.response?.data?.message || "Registration failed",
                    });
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
                      className="w-full px-3 py-2 border bg-[#B0BAC3] opacity-40 rounded-[50px]"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-black">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border bg-[#B0BAC3] opacity-40 rounded-[50px]"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-black">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className="w-full px-3 py-2 border bg-[#B0BAC3] opacity-40 rounded-[50px]"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-black">Confirm Password</label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="w-full px-3 py-2 border bg-[#B0BAC3] opacity-40 rounded-[50px]"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-1/2 bg-[#105132bd] text-white py-2 rounded-lg"
                    >
                      {isSubmitting ? "Creating..." : "Create Account"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="flex flex-col items-center m-4">
              <p className="p-4">
                Already have an Account{" "}
                <a className="text-[#73ff1c] hover:underline" href="/login">
                  Log In
                </a>
              </p>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Login Failed")}
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default UserRegister;
