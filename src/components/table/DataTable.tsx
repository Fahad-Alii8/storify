/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, type JSX } from 'react';
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, Eye, } from 'lucide-react';

type Action = {
    label: string | JSX.Element;
    onClick: (row: any) => void;
    icon?: React.ReactNode;
};

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

type DataTableProps = {
    buttonText: string;
    onAdd: () => void;
    columns: { key: string; label: string; sortable?: boolean }[];
    data: Record<string, any>[];
    actions?: Action[];
    pagination?: PaginationProps;
    onSearchChange?: (search: string) => void;
    onSortChange: (sortBy: string, sort: 'asc' | 'desc') => void;
    searchPlaceholder?: string;
    isLoading?: boolean;
    currentSort: {
        sortBy: string;
        sort: 'asc' | 'desc';
    };
};

const DataTable: React.FC<DataTableProps> = ({
    buttonText,
    onAdd,
    columns,
    data,
    actions,
    pagination,
    onSearchChange,
    onSortChange,
    searchPlaceholder = "Search...",
    isLoading = false,
    currentSort,
}) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSort = (key: string) => {
        const newDirection = currentSort?.sortBy === key && currentSort?.sort === 'asc' ? 'desc' : 'asc';
        onSortChange(key, newDirection);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearchChange) {
            onSearchChange(value);
        }
    };

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'inStock':
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        In Stock
                    </span>
                );
            case 'outOfStock':
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Out of Stock
                    </span>
                );
            default:
                return <span className="text-gray-900">{status ?? 'N/A'}</span>;
        }
    };

    const defaultActions = actions || [
        {
            label: 'View',
            onClick: () => { },
            icon: <Eye className="w-4 h-4" />,
        },


    ];

    return (
        <div className="w-full max-w-8xl mx-auto p-6 bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    {onSearchChange && (
                        <div className="relative min-w-64">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={handleSearchInputChange}
                                placeholder={searchPlaceholder}
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-colors duration-200"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    )}
                    <button
                        onClick={onAdd}
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 whitespace-nowrap flex items-center gap-2"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mx-auto w-full">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className={`px-8 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider min-w-[150px] ${col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                                        onClick={() => col.sortable && handleSort(col.key)}
                                    >
                                        <div className="flex items-center justify-center">
                                            {col.label}
                                            {col.sortable && (
                                                <span className="ml-2 text-gray-400">
                                                    {currentSort.sortBy === col.key ? (
                                                        currentSort.sort === 'asc' ? (
                                                            <ChevronUp className="w-4 h-4" />
                                                        ) : (
                                                            <ChevronDown className="w-4 h-4" />
                                                        )
                                                    ) : (
                                                        <ChevronsUpDown className="w-4 h-4" />
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                                {(actions || defaultActions) && (
                                    <th className="px-8 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider min-w-[150px]">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + ((actions || defaultActions) ? 1 : 0)}
                                        className="px-8 py-12 text-center text-gray-500"
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                            <span className="ml-3">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + ((actions || defaultActions) ? 1 : 0)}
                                        className="px-8 py-12 text-center text-gray-500"
                                    >
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, i) => (
                                    <tr key={row._id || i} className="hover:bg-gray-50 transition-colors duration-150">
                                        {columns.map((col) => (
                                            <td
                                                key={col.key}
                                                className="px-8 py-4 text-center text-sm min-w-[150px]"
                                            >
                                                {col.key === 'image' && row.image?.url ? (
                                                    <img
                                                        src={row.image.url}
                                                        alt={row.name || 'Image'}
                                                        className="w-16 h-16 object-cover rounded-lg mx-auto"
                                                    />
                                                ) : col.key === 'status' ? (
                                                    renderStatusBadge(row.status)
                                                ) : (
                                                    <span className="text-gray-900">
                                                        {row[col.key] ?? 'N/A'}
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                        {(actions || defaultActions) && (
                                            <td className="px-8 py-4 text-center text-sm font-medium min-w-[150px]">
                                                <div className="flex space-x-3 justify-center">
                                                    {(actions || defaultActions).map((action, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => action.onClick(row)}
                                                            className="text-blue-600 hover:text-blue-900 transition-colors duration-150 flex items-center gap-1"
                                                        >
                                                            {action.icon}
                                                            <span>{action.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {pagination && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                    <div className="text-sm text-gray-700">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;