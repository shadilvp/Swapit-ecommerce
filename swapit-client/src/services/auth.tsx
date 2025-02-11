import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const registerUser = async (data: { fullName: string; email: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
  return response.data;
};


export const loginUser = async (data: { email: string; password: string }) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}; 