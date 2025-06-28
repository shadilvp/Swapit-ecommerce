export type ID = string;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
