import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    replyMessage: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setReplyMessage: (state, action) => {
      state.replyMessage = action.payload;
    },
  },
});

export const { setMessages, addMessage,setReplyMessage } = messageSlice.actions;
export default messageSlice.reducer;
