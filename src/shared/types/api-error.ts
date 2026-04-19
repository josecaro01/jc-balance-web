export interface ApiError {
  path: string;
  error: string;
  message: string; 
  timestamp: string;
  status: number;
  code?: string;   
}