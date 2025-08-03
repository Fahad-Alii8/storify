/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import DataTable from '../../components/table/DataTable';
import Modal from '../../components/modal/Modal';
import { useProducts } from '../../components/products/hooks/useProduct';
import type { CreateProductData } from '../../interfaces/product.interface';
import type { SubmitHandler } from 'react-hook-form';
import AddProductForm from '../../components/products/AddProduct';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmationModal from '../../components/modal/ConfirmationModal';

interface ProductRow {
    _id: string;
    name: string;
    [key: string]: any;
}

export default function Products() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<ProductRow | null>(null);

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
        handleDeleteProduct,
        isDeletingProduct,
    } = useProducts();

    const columns = [
        { key: 'image', label: 'Image', },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'description', label: 'Description' },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
    ];

    const handleConfirmDelete = async () => {
        if (productToDelete) {
            await handleDeleteProduct(productToDelete._id);
            setProductToDelete(null);
        }
    };

    const actions = [
        {
            label: <Pencil className="w-4 h-4 text-blue-600 cursor-pointer" />,
            onClick: (row: ProductRow) => {
                console.log('Edit product:', row);
            },
        },
        {
            label: <Trash2 className="w-4 h-4 text-red-600 cursor-pointer" />,
            onClick: (row: ProductRow) => {
                setProductToDelete(row);
            },
        },
    ];

    const handleFormSubmit: SubmitHandler<CreateProductData> = async (data) => {
        try {
            await handleCreateProduct(data);
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DataTable
                buttonText="Add Product"
                onAdd={() => setIsAddModalOpen(true)}
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
                isOpen={isAddModalOpen}
                onClose={() => !isCreatingProduct && setIsAddModalOpen(false)}
                title="Add New Product"
            >
                <AddProductForm
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsAddModalOpen(false)}
                    isLoading={isCreatingProduct}
                />
            </Modal>

            <ConfirmationModal
                isOpen={!!productToDelete}
                onClose={() => setProductToDelete(null)}
                onConfirm={handleConfirmDelete}
                isLoading={isDeletingProduct}
                title="Confirm Deletion"
                message={
                    <>
                        Are you sure you want to delete the product "<strong>{productToDelete?.name}</strong>"? This action cannot be undone.
                    </>
                }
                confirmText="Delete"
                confirmButtonVariant="danger"
            />
        </div>
    );
}