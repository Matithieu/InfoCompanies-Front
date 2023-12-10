import { create } from "zustand";
import { IUser } from "../data/IUser";

type Store = {
  authUser: IUser | null;
  requestLoading: boolean;
  setAuthUser: (user: IUser | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
};

const useStore = create<Store>((set) => ({
  authUser: JSON.parse(localStorage.getItem('authUser') || 'null'),
  requestLoading: false,
  setAuthUser: (user) => {
    localStorage.setItem('authUser', JSON.stringify(user));
    set((state) => ({ ...state, authUser: user }));
  },
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
}));

export default useStore;
