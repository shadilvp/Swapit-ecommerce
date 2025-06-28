"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { googleAuth } from "@/services/auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "sonner";
import { AxiosError } from "axios";


const LoginPage = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login Successful:", data);

      if (data.role === "admin") {
        toast.success("admin loggined succesfully");
        router.push("/dashboard");
      } else {
        toast.success("user loggined succesfully");
        router.push("/");
      }
    },
    onError: (error) => {
      toast.error("no user found");
      console.error("Login failed:", error);
    },
  });

  interface GoogleJwtPayload {
    name: string;
    email: string;
    sub: string;
  }

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (!credentialResponse.credential) {
      toast.error("Invalid credential from Google");
      return;
    }

    const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
    console.log("Decoded Google User:", decoded);

    const googleUser = {
      name: decoded.name,
      email: decoded.email,
      googleId: decoded.sub,
    };

    try {
      const res = await googleAuth(googleUser);
      toast.success("user loggined succesfully");
      console.log("Google Login Success:", res);
      router.push("/");
    } catch (error) {
      toast.error("login failed");
      console.error("Google Login Error:", error);
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={
        "1086489884784-2e3p2a6e32tc8ms6arpusk39fi0rm8ib.apps.googleusercontent.com"
      }
    >
      <div className="flex h-screen w-full bg-gradient-to-r from-[#000000] to-[#165628]">
        {/* <div className="w-1/2 hidden lg:flex items-center justify-center h-screen"></div> */}

        <div className="w-full  flex items-center justify-center p-8">
          <div className="w-full max-w-sm bg-[#175F3C] bg-opacity-30 shadow-lg rounded-[70px] p-6">
            <h2 className="text-2xl font-bold text-black text-center mb-6">
              Login
            </h2>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email is required"),
                password: Yup.string()
                  .min(6, "Password must be at least 6 characters")
                  .required("Password is required"),
              })}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                mutation.mutate(values, {
                  onError: (error) => {
                    const axiosError = error as AxiosError<{
                      message?: string;
                    }>;
                    setErrors({
                      email:
                        axiosError.response?.data?.message ||
                        "Registration failed",
                    });
                    setSubmitting(false);
                  },
                });
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-black">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border bg-[#B0BAC3] opacity-40 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-black">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className="w-full px-3 py-2 border bg-[#B0BAC3] opacity-40 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-1/2 bg-[#105132bd] text-white py-2 rounded-lg hover:bg-[#459a71bd] transition"
                    >
                      {isSubmitting ? "Logining..." : "Login"}
                    </button>
                  </div>

                  <p className="text-center text-black mt-4">
                    Don&#39;t have an acount?{" "}
                    <a
                      href="/user-register"
                      className="text-[#fff] hover:underline"
                    >
                      Sign Up
                    </a>
                  </p>

                  <div className="flex justify-center mt-4">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => console.log("Login Failed")}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
