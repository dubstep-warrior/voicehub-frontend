import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Unsubscribe } from "firebase/auth"; 

// Define a type for the slice state
interface App {
  loading: boolean;
  submitting: boolean;
  users: any[];
  home: {
    selectedCat: string | null;
    selectedSubCat: string | null;
  };
  messages: any;
  userProfiles: any;
  call: any;
  firebaseListeners: Unsubscribe[];
  notifications: any;
  openProfileModal: string; 
  voiceChat: Set<string>
}

// Define the initial state using that type
const initialState: App = {
  loading: false,
  submitting: false,
  users: [],
  home: {
    selectedCat: "dms",
    selectedSubCat: null,
  },
  messages: {},
  userProfiles: {},
  call: null,
  firebaseListeners: [],
  notifications: {},
  openProfileModal: '' , 
  voiceChat: new Set()
};

export const appSlice = createSlice({
  name: "app",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    assign: (state, actions) => {
 
      state.submitting = actions.payload.submitting ?? false;
      state.users = actions.payload.users ?? [];
    },
    update: (state, actions) => {
      Object.keys(actions.payload).forEach((key) => {
        (state[key as keyof App] as any) = actions.payload[key];
      });
     },
    updateAppMessages: (state, actions) => {
      state.messages[actions.payload.chat_id] = actions.payload.messages;
     },
    addFirebaseListener: (state, actions) => {
      state.firebaseListeners.push(actions.payload.listener);
    },
    clearFirebase: (state) => {
      state.firebaseListeners.forEach((listener) => {
        listener();
      });
      state.firebaseListeners = [];
    }, 
    addAppMessage: (state, actions) => {
      state.messages[actions.payload.chat_id].push(actions.payload.message)
     },
    updateAppNotifications: (state, actions) => { 
      state.notifications[actions.payload.chat_id] = actions.payload.notifications;
    }, 
    addVoiceChatMember:  (state, actions) => { 
      state.voiceChat.add(actions.payload.uid)
    }, 
    removeVoiceChatMember:  (state, actions) => { 
      state.voiceChat.delete(actions.payload.uid)
    }, 
  },
});

export const {
  assign,
  update,
  updateAppMessages,
  addFirebaseListener,
  clearFirebase, 
  addAppMessage,
  updateAppNotifications,
  addVoiceChatMember,
  removeVoiceChatMember
} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectApp = (state: RootState) => state.app;

export default appSlice.reducer;
