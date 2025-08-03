export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  status: "inStock" | "outOfStock";
  category: string;
  image: {
    public_id: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  price: number;
  description: string;
  status: "inStock" | "outOfStock";
  category: string;
  image: FileList;
}
