import type { ReactNode } from 'react';
import Modal from '../modal/Modal';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: ReactNode;
    isLoading?: boolean;
    confirmText?: string;
    cancelText?: string;
    confirmButtonVariant?: 'danger' | 'primary';
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    isLoading = false,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmButtonVariant = 'primary',
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    const confirmButtonClasses = {
        primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400",
        danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400",
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <div>
                <p className="mb-6 text-gray-600">
                    {message}
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:cursor-not-allowed"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ${confirmButtonClasses[confirmButtonVariant]}`}
                    >
                        {isLoading ? 'Processing...' : confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}