import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  createProduct as createProductApi,
  getAllProducts as getAllProductsApi,
  deleteProduct as deleteProductApi,
  type GetProductParams,
} from "../../../apis/product.api";
import type { CreateProductData } from "../../../interfaces/product.interface";
import toast from "react-hot-toast";
import { useState } from "react";

export const useProducts = () => {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useState<GetProductParams>({
    page: 1,
    limit: 10,
    search: "",
    sort: "desc",
    sortBy: "createdAt",
  });

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isFetching: isFetchingProducts,
  } = useQuery({
    queryKey: ["products", searchParams],
    queryFn: () => getAllProductsApi(searchParams),
    staleTime: 1000 * 60 * 5,
  });

  const handlePageChange = (page: number, limit?: number) => {
    setSearchParams((prev) => ({ ...prev, page, limit: limit || prev.limit }));
  };

  const handleSearchChange = (search: string) => {
    setSearchParams((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleSortChange = (
    sortBy: "price" | "name" | "createdAt",
    sort: "asc" | "desc"
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      sortBy,
      sort,
      page: 1,
    }));
  };

  const { mutateAsync: createProduct, isPending: isCreatingProduct } =
    useMutation({
      mutationFn: (data: CreateProductData) => createProductApi(data),
      onSuccess: () => {
        toast.success("Product created successfully!");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: (error: AxiosError<{ error?: string }>) => {
        const errorMessage =
          error.response?.data?.error || "Failed to create product.";
        toast.error(errorMessage);
      },
    });

  const { mutateAsync: deleteProduct, isPending: isDeletingProduct } =
    useMutation({
      mutationFn: (id: string) => deleteProductApi(id),
      onSuccess: () => {
        toast.success("Product deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: (error: AxiosError<{ error?: string }>) => {
        const errorMessage =
          error.response?.data?.error || "Failed to delete product.";
        toast.error(errorMessage);
      },
    });

  const handleCreateProduct = async (data: CreateProductData) => {
    return await createProduct(data);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
  };

  const products = productsData?.data?.products || [];
  const pagination = productsData?.data || {
    currentPage: 1,
    perPage: 10,
    total: 0,
    totalPages: 1,
  };

  return {
    products,
    isLoadingProducts,
    isFetchingProducts,
    pagination,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
    searchParams,
    handleCreateProduct,
    isCreatingProduct,
    handleDeleteProduct,
    isDeletingProduct,
  };
};
