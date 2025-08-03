import api from ".";
import type { CreateProductData } from "../interfaces/product.interface";

export interface GetProductParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "asc" | "desc";
  sortBy?: "price" | "name" | "createdAt";
  category?: string;
  status?: string;
}

export const createProduct = async (productData: CreateProductData) => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("price", productData.price.toString());
  formData.append("category", productData.category);
  formData.append("status", productData.status);
  if (productData.description) {
    formData.append("description", productData.description);
  }
  if (productData.image && productData.image[0]) {
    formData.append("image", productData.image[0]);
  }
  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getAllProducts = (params: GetProductParams = {}) => {
  return api.get("/products", {
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search || "",
      sort: params.sort || "asc",
      sortBy: params.sortBy || "price",
      category: params.category,
      status: params.status,
    },
  });
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export default {
  createProduct,
  getAllProducts,
  deleteProduct,
};
