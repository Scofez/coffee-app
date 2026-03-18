export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  origin: string;
}

export interface CoffeeProduct {
  id: number;
  coffee_name: string;
  origin: string;
}

export interface OrderHistory {
  first_name: string;
  last_name: string;
  coffee_name: string;
  bean_origin: string;
}