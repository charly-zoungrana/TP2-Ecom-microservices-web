export interface Bill {
  id:           string;
  billingDate:  string;
  customerId:   string;
  productItems: ProductItem[];
  customer:     Customer;
}

export interface Customer {
  id:    string;
  name:  string;
  email: string;
}

export interface ProductItem {
  id:        string;
  productId: string;
  quantity:  number;
  price:     number;
  discount:  number;
  product:   Product;
}


export interface Product {
  id:       string;
  name:     string;
  price:    number;
  quantity: number;
}
