import { create } from 'zustand';
import axiosHelper from '../lib/axiosHelper';

export const userState = create((set) => ({
    user: {
        loggedIn: false,
        name: "",
        role: "",
    },

    setLoggedUser: (data) => set({ user: { loggedIn: data.loggedIn ? data.loggedIn : false, name: data.name, role: data.role } }),

    logout: async () => {
        const response = await axiosHelper("/api/logout", "GET");
        if (response.status === 200) {
            set({ user: { loggedIn: false, name: "", role: "" } });
            return true;
        }
        return false;
    }

}));