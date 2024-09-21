import { create } from 'zustand'

import { User } from '../data/types/user'

type Store = {
  authUser: User | null
  setAuthUser: (user: Partial<User> | null) => void
  requestLoading: boolean
  setRequestLoading: (isLoading: boolean) => void
}

const useAuthStore = create<Store>((set) => ({
  authUser: null,
  setAuthUser: (user) => set(() => ({ authUser: user as User | null })),
  requestLoading: false,
  setRequestLoading: (isLoading) => set(() => ({ requestLoading: isLoading })),
}))

export default useAuthStore
