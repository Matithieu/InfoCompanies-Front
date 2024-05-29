import { create } from 'zustand'

import { User } from '../data/types/user'

type Store = {
  authUser: User | null
  setAuthUser: (user: User | null) => void
  requestLoading: boolean
  setRequestLoading: (isLoading: boolean) => void
}

const useAuthStore = create<Store>((set) => ({
  authUser: null,
  setAuthUser: (user) => set(() => ({ authUser: user })),
  requestLoading: false,
  setRequestLoading: (isLoading) => set(() => ({ requestLoading: isLoading })),
}))

export default useAuthStore
