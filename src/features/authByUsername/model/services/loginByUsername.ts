import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '@/entities/user';

interface LoginProps {
    username: string;
}

export const loginByUsername = createAsyncThunk<void, LoginProps>(
    'auth/loginByUsername',
    async ({ username }, thunkAPI) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const mockUser = {
                id: '1',
                username: username,
            };
            const mockToken = 'fake-jwt-token-12345';
            thunkAPI.dispatch(
                userActions.setAuthData({
                    user: mockUser,
                    token: mockToken,
                })
            );
        } catch (error) {
            return thunkAPI.rejectWithValue('Неверный логин или пароль');
        }
    }
);
