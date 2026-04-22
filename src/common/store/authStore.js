// Create a Zustand store for authentication
import { create } from "zustand";
import { SESSION_HINT_KEY } from "../constants/session";

const initialState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
  permissions: [],
};

const useAuthStore = create((set) => ({
  ...initialState,
  resetAuth: () => set(initialState),
  setAccessToken: (accessToken) =>
    set({ accessToken, isAuthenticated: !!accessToken }),
  setUser: (user) => set({ user }),
  setAuth: (payload) =>
    set((state) => {
      const accessToken =
        payload.accessToken !== undefined
          ? payload.accessToken
          : state.accessToken;
      const permissions =
        payload.permissions !== undefined
          ? payload.permissions
          : state.permissions;
      const nextPermissions = permissions ?? [];
      let user = payload.user !== undefined ? payload.user : state.user;
      if (user) {
        const fromUser = user.permissions;
        user = {
          ...user,
          permissions:
            Array.isArray(fromUser) && fromUser.length > 0
              ? fromUser
              : nextPermissions,
        };
      }
      return {
        accessToken,
        user,
        permissions: nextPermissions,
        isAuthenticated: !!accessToken,
      };
    }),
  clearAuth: () => {
    try {
      localStorage.removeItem(SESSION_HINT_KEY);
    } catch {
      // ignore
    }
    set(initialState);
  },
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useAuthStore;
