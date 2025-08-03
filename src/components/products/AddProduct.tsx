// components/product/AddProductForm.tsx

import { useForm, type SubmitHandler } from 'react-hook-form';
import { createProductSchema } from '../../validation/product.validation';
import type { CreateProductData } from '../../interfaces/product.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, UploadCloud } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AddProductFormProps {
    onSubmit: SubmitHandler<CreateProductData>;
    onCancel: () => void;
    isLoading: boolean;
}

export default function AddProductForm({ onSubmit, onCancel, isLoading }: AddProductFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CreateProductData>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            status: 'inStock',
            description: '',
        },
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const imageFile = watch('image');

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            if (file) {
                const objectUrl = URL.createObjectURL(file);
                setImagePreview(objectUrl);
                return () => URL.revokeObjectURL(objectUrl);
            }
        }
        setImagePreview(null);
    }, [imageFile]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black">Product Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm bg-white text-black`}
                        placeholder="e.g., Wireless Mouse"
                        disabled={isLoading}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-black">Price</label>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register('price')}
                        className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm bg-white text-black`}
                        placeholder="0.00"
                        disabled={isLoading}
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-black">Category</label>
                    <select
                        id="category"
                        {...register('category')}
                        className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm bg-white text-black`}
                        disabled={isLoading}
                    >
                        <option value="">Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Home">Home</option>
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-black">Status</label>
                    <select
                        id="status"
                        {...register('status')}
                        className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm bg-white text-black`}
                        disabled={isLoading}
                    >
                        <option value="inStock">In Stock</option>
                        <option value="outOfStock">Out of Stock</option>
                    </select>
                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
                </div>
            </div>

            <div className="space-y-2 flex flex-col">
                <label className="block text-sm font-medium text-black">Product Image</label>
                <div className="w-full h-48 flex-grow flex items-center justify-center border-2 border-dashed rounded-lg p-2">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Product Preview" className="max-h-full max-w-full object-contain" />
                    ) : (
                        <div className="text-center text-gray-400">
                            <UploadCloud className="mx-auto h-12 w-12" />
                            <p>Image preview</p>
                        </div>
                    )}
                </div>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...register('image')}
                    className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200 ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={isLoading}
                />
                {errors.image && <p className="mt-1 text-sm text-red-600">{typeof errors.image.message === 'string' ? errors.image.message : 'Invalid image'}</p>}
            </div>

            <div className="space-y-6">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-black">Description</label>
                    <textarea
                        id="description"
                        {...register('description')}
                        rows={10}
                        className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm bg-white text-black`}
                        placeholder="A brief description of the product..."
                        disabled={isLoading}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                </div>
            </div>

            <div className="md:col-span-3 flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className="group relative flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                            Creating...
                        </>
                    ) : 'Create Product'}
                </button>
            </div>
        </form>
    );
}