import toast from "react-hot-toast";
import { create } from "zustand";
import instaAxios from "../lib/axios";
import { useAuthStore } from "./useAuthstore";

export const useChatStore = create((set,get) => ({

    messages: [],
    users: [],
    selectedUsers: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {//generates a list of users on the home page// 
        set({isUsersLoading:true});
        try {
            const res = await instaAxios.get("messages/users");
            set({users: res.data});
            
        } catch (error) {
            console.log("Error in getUsers: ", error);
            toast.error(error.response.data. message);

            
        } finally {
            set({isUsersLoading: false});
        }

    },
    getMessages: async (userId) => {// generates a list of messages liked to the user on the homepage//
        set({isMessagesLoading: true});
        try {
            const res = await instaAxios.get(`messages/${userId}`);
            set({messages: res.data});
            
        } catch (error) {
            console.log("Error in getMessages: ", error);
            toast.error(error.response.data.message);
            
            
        } finally {
            set({isMessagesLoading: false});
        }

        
    },
    sendMessage: async (messageData) => {
        const {selectedUsers, messages} = get();
        try {
            const res = await instaAxios.post(`/messages/send/${selectedUsers._id}`, messageData)
            set({messages:[...messages, res.data]})
            
           
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }

    },
    setSelectedUsers: (selectedUsers) => {
        set({selectedUsers})
    },

    listenToMessages: ()=> {
        const {selectedUsers} = get()
        if(!selectedUsers) return;

        const socket = useAuthStore.getState().socket


        socket.on("newMessage",(newMessage) => {
            set({
                messages:[...get().messages, newMessage]
            });
        })

    },

    unlistenToMessages: ()=> {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage")
    },



 }))