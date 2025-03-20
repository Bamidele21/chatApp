import {create} from "zustand"
import instaAxios from "../lib/axios"
import toast from "react-hot-toast";
import io from "socket.io-client"
const BASE_URL = "https://chatapp-nanx.onrender.com"

export const useAuthStore = create((set, get)=>({
    authUser: null,
    isSigningUp: false,
    isLogginIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async ()=>  {
        try {
            const res = await instaAxios.get("/auth/check");
            set({authUser: res.data})
            get().connectSocket()
            
        } catch (error) {
            console.log("Error in checkAuth: ", error)
            set ({authUser: null})
            
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async (data)=> {
        try {
            set({isSigningUp: true})
            const res = await instaAxios.post("/auth/signup", data);
            set({authUser: res.data})
            toast.success("Account has been created successfully")
            get().connectSocket()
            
            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
         finally {
            set({isSigningUp: false})
         }

    },
    login: async (data)=> {
        try {
            set({isLogginIn: true})
            const res = await instaAxios.post("/auth/login", data);
            set({authUser: res.data})
            toast.success("Logged in Successfully")
            get().connectSocket()
            
            
        } catch (error) {
            toast.error(error.response.data.message);
            
        } finally {
            set({isLogginIn: false})
            
        }
    },

    logOut: async (data)=> {
        try {
            await instaAxios.post ("/auth/logout");
            set({authUser: null})
            toast.success("Logged out Successfully")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
    },
    updateProfile: async (data)=> {
        set({isUpdatingProfile: true})
        try {
            const res = await instaAxios.put("/auth/update-profile", data);
            set({authUser: res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log ("error updating profile", error)
            toast.error(error.response.data.message);
            
        }
         finally {
            set({isUpdatingProfile: false})
            
        }

    },
    connectSocket: () => {
        const {authUser} = get();
        if (!authUser || get().socket?.connected ) return;

        const socket = io(BASE_URL,
            {query:{
                userId: authUser._id,
            }}
            
        );
        socket.connect ();

        set ({socket: socket});

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds})
        });


    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
},
}))