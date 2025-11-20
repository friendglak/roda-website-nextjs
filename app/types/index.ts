export enum VehicleType {
  EBIKE = "ebike",
  SCOOTER = "scooter",
  MOPED = "moped"
}

export interface Vehicle {
  id: number;
  name: string;
  type: VehicleType;
  price: number;
  brand: string;
  image_url?: string;
  description?: string;
}

export interface Client {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface CreditApplication {
  id: number;
  client_id: number;
  vehicle_id: number;
  amount: number;
  term_months: number;
  interest_rate: number;
  monthly_payment: number;
  status: string;
  created_at: string;
}

// New interface with nested details
export interface CreditApplicationWithDetails extends CreditApplication {
  client?: Client;
  vehicle?: Vehicle;
}

export interface Payment {
  id: number;
  credit_id: number;
  amount: number;
  payment_date: string;
}
