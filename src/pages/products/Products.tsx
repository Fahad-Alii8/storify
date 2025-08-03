/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import DataTable from '../../components/table/DataTable';
import Modal from '../../components/modal/Modal';
import { useProducts } from '../../components/products/hooks/useProduct';
import type { CreateProductData } from '../../interfaces/product.interface';
import type { SubmitHandler } from 'react-hook-form';
import AddProductForm from '../../components/products/AddProduct';
import { Pencil, Trash2 } from 'lucide-react';

export default function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
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
    } = useProducts();

    const columns = [
        { key: 'image', label: 'Image', },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'description', label: 'Description', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
    ];
    const actions = [
        {
            label: <Pencil className="w-4 h-4 text-blue-600 cursor-pointer" />,
            onClick: (row: any) => {
                console.log('Edit product:', row);
            },
        },
        {
            label: <Trash2 className="w-4 h-4 text-red-600 cursor-pointer" />,
            onClick: (row: any) => {
                console.log('Delete product:', row);
            },
        },
    ];

    const handleFormSubmit: SubmitHandler<CreateProductData> = async (data) => {
        try {
            await handleCreateProduct(data);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DataTable
                buttonText="Add Product"
                onAdd={() => setIsModalOpen(true)}
                columns={columns}
                data={products}
                actions={actions}
                pagination={{
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages,
                    onPageChange: handlePageChange,
                }}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
                currentSort={{
                    sortBy: searchParams.sortBy ?? 'createdAt',
                    sort: searchParams.sort ?? 'desc',
                }}

                searchPlaceholder="Search products..."
                isLoading={isLoadingProducts || isFetchingProducts}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => !isCreatingProduct && setIsModalOpen(false)}
                title="Add New Product"
            >
                <AddProductForm
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsModalOpen(false)}
                    isLoading={isCreatingProduct}
                />
            </Modal>
        </div>
    );
}