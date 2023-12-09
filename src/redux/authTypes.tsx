// types/authTypes.ts
export interface User {
    id: string;
    name: string;
    // Add other user properties here
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
}
