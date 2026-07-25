import React from 'react';
import { LoginForm } from '@/features/authByUsername';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-[#6e9c9f]/95 p-4 animate-fade-in"
        >
            <div className="relative w-full max-w-[440px] rounded bg-white p-10 shadow-2xl animate-scale-in">
                <button 
                    onClick={onClose}
                    type="button" 
                    className="absolute right-5 top-[15px] bg-none p-1 text-2xl leading-none text-black/40 transition-all hover:scale-110 hover:text-black"
                    aria-label="Закрыть"
                >
                    &times;
                </button>
                <LoginForm onSuccess={onClose}/>
            </div>
        </div>
    );
};
