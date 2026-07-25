import { useState } from 'react';
import { AuthModal } from '@/widgets/authModal'; 

export const MainPage = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const handleOpenModal = () => setIsAuthOpen(true);
    const handleCloseModal = () => setIsAuthOpen(false);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">
                Главная Страница 
            </h1>
            
            <button
                onClick={handleOpenModal}
                className="rounded bg-[#6e9c9f] px-6 py-3 font-medium text-white transition-colors hover:bg-[#5a888b] active:scale-95"
            >
                Войти в аккаунт 
            </button>
            <AuthModal isOpen={isAuthOpen} onClose={handleCloseModal} />
        </div>
    );
};
