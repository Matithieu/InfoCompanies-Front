// store/authSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User } from './authTypes';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const loginUser = createAsyncThunk<User, { username: string; password: string }, AsyncThunkConfig>(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            // Implement login logic here
            // Return the user data on successful login
            return {} as User;
        } catch (error) {
            return rejectWithValue('Login failed');
        }
    }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message || 'Login failed';
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
