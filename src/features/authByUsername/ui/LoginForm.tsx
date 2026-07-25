import React, { useState } from 'react';
import { useAppDispatch } from '@/features/authByUsername/model/hooks/useAppDispatch';
import { loginByUsername } from '../model/services/loginByUsername';

interface LoginFormProps {
    onSuccess?: () => void; 
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const dispatch = useAppDispatch();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Заполните все поля');
            return;
        }

        setError('');
        setIsLoading(true);

        const result = await dispatch(loginByUsername({ username }));

        setIsLoading(false);

        if (loginByUsername.fulfilled.match(result)) {

            if (onSuccess) onSuccess();
        } else {
            setError('Ошибка авторизации. Попробуйте еще раз.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
            <h1 className="mb-5 text-2xl font-medium text-[#333333]">Вход в аккаунт</h1>
            
            {error && (
                <div className="mb-3 text-sm text-[#ff4d4d] font-medium">{error}</div>
            )}

            <div className="mb-[15px] w-full text-left">
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    className="h-[45px] w-full border-b border-black py-2.5 text-sm font-normal outline-none transition-colors focus:border-[#6e9c9f] disabled:opacity-50"
                    placeholder="Логин"
                />
            </div>
            
            <div className="mb-[15px] w-full text-left">
                <div className="relative w-full">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="h-[45px] w-full border-b border-black py-2.5 pr-8 text-sm font-normal outline-none transition-colors focus:border-[#6e9c9f] disabled:opacity-50"
                        placeholder="Пароль"
                    />
                    <span 
                        onClick={() => !isLoading && setShowPassword(!showPassword)}
                        className="absolute right-[5px] top-1/2 -translate-y-1/2 cursor-pointer select-none text-xl text-black/40 transition-colors hover:text-black"
                    >
                        {showPassword ? '🙈' : '👁'}
                    </span>
                </div>
            </div>
            
            <button 
                type="submit"
                disabled={isLoading}
                className="mb-[15px] mt-1.5 h-[45px] w-full bg-[#6e9c9f] text-base font-medium text-white transition-all hover:bg-[#5a888b] active:scale-[0.98] disabled:bg-gray-400"
            >
                {isLoading ? 'Вход...' : 'Войти'}
            </button> 
            
            <a href="#" className="mb-1 text-sm text-[#6e9c9f] no-underline transition-colors hover:text-[#5a888b] hover:underline">
                Забыли пароль?
            </a>
            
            <h2 className="mb-[15px] mt-3.5 text-sm font-normal text-black/60">
                Авторизоваться через соцсети
            </h2>
            
            <div className="flex w-full flex-wrap gap-2.5">
                {['Google', 'Apple ID', 'Telegram', 'O!', 'Beeline', 'Mega'].map((network) => (
                    <button 
                        key={network}
                        type="button" 
                        disabled={isLoading}
                        className="h-[38px] flex-[1_1_calc(50%-5px)] rounded border border-[#e0e0e0] bg-[#f9f9f9] text-xs transition-colors hover:border-[#ccc] hover:bg-[#f0f0f0] disabled:opacity-50"
                    >
                        Продолжить с {network}
                    </button>
                ))}
            </div>
        </form>
    );
};
