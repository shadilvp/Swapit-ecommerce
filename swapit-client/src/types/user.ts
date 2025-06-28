export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "seller" | "buyer";
  profileImage?: string;
}


export interface EditProfilePayload {
  name: string;
  email: string;
  phone: string;
  profileImage: File | string | null;
}